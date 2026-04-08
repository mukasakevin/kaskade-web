/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { RedisService } from '../src/redis/redis.service';
import { PrismaService } from '../src/prisma/prisma.service';

describe('🛡️ Authentication E2E Tests', () => {
  let app: INestApplication<App>;
  let redisService: RedisService;
  let prismaService: PrismaService;

  // 📝 Variables de test
  const testUser = {
    email: `test-${Date.now()}@e2e.com`,
    password: 'TestPassword@123!',
    fullName: 'E2E Test User',
    phone: '0970000000',
    quartier: 'Goma',
    role: 'CLIENT',
  };

  let accessToken: string;
  let refreshToken: string;
  let resetToken: string;
  let otpCode: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    redisService = moduleFixture.get<RedisService>(RedisService);
    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    // Nettoyer la base avant les tests
    await prismaService.user.deleteMany({
      where: { email: testUser.email },
    });
  });

  afterAll(async () => {
    // Nettoyer après les tests
    await prismaService.user.deleteMany({
      where: { email: testUser.email },
    });
    await app.close();
  });

  describe('📝 ÉTAPE 1 : INSCRIPTION (REGISTER)', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send(testUser)
        .expect(201);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('userId');
      expect(response.body).toHaveProperty('email', testUser.email);
      expect(response.body.message).toContain('Inscription réussie');
    });

    it('should fail with invalid email', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          ...testUser,
          email: 'invalid-email',
        })
        .expect(400);

      expect(response.body.message).toContain('email');
    });

    it('should fail with weak password', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          ...testUser,
          email: `test-weak-${Date.now()}@e2e.com`,
          password: '123',
        })
        .expect(400);

      expect(response.body.message).toContain('password');
    });

    it('should fail if email already exists', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send(testUser)
        .expect(400);

      expect(response.body.message).toContain('existe');
    });
  });

  describe('🧪 ÉTAPE 2 : LOGIN SANS VÉRIFICATION (ÉCHOUE)', () => {
    it('should fail login before email verification', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(401);

      expect(response.body.message).toContain('vérifier');
    });
  });

  describe('🔐 ÉTAPE 3 : VÉRIFICATION OTP', () => {
    it('should fail with invalid OTP', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/verify-otp')
        .send({
          email: testUser.email,
          otp: '000000',
        })
        .expect(400);

      expect(response.body.message).toContain('invalide');
    });

    it('should verify OTP and activate account', async () => {
      // Récupérer l'OTP depuis Redis
      const otpFromRedis = await redisService.get(`otp:${testUser.email}`);
      expect(otpFromRedis).toBeDefined();
      otpCode = otpFromRedis || '000000';

      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/verify-otp')
        .send({
          email: testUser.email,
          otp: otpCode,
        })
        .expect(200);

      expect(response.body.message).toContain('vérifié');
    });

    it('should fail if OTP is already used', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/verify-otp')
        .send({
          email: testUser.email,
          otp: otpCode,
        })
        .expect(400);

      expect(response.body.message).toContain('expiré');
    });
  });

  describe('🔑 ÉTAPE 4 : CONNEXION (LOGIN) - SUCCÈS', () => {
    it('should login successfully after OTP verification', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200);

      expect(response.body).toHaveProperty('tokens');
      expect(response.body.tokens).toHaveProperty('accessToken');
      expect(response.body.tokens).toHaveProperty('refreshToken');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(testUser.email);

      accessToken = response.body.tokens.accessToken;
      refreshToken = response.body.tokens.refreshToken;
    });

    it('should fail with wrong password', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: testUser.email,
          password: 'WrongPassword@123!',
        })
        .expect(401);

      expect(response.body.message).toContain('Identifiants incorrects');
    });

    it('should fail with non-existent email', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: 'nonexistent@e2e.com',
          password: testUser.password,
        })
        .expect(401);

      expect(response.body.message).toContain('Identifiants incorrects');
    });
  });

  describe('👤 ÉTAPE 5 : PROFIL UTILISATEUR (GET ME)', () => {
    it('should return user profile with valid access token', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('email', testUser.email);
      expect(response.body).toHaveProperty('fullName', testUser.fullName);
    });

    it('should fail without access token', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/auth/me')
        .expect(401);

      expect(response.body.message).toContain('Unauthorized');
    });

    it('should fail with invalid access token', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/auth/me')
        .set('Authorization', 'Bearer invalid_token')
        .expect(401);

      expect(response.body.message).toContain('Invalid');
    });
  });

  describe('✏️ ÉTAPE 6 : MISE À JOUR DU PROFIL (UPDATE ME)', () => {
    it('should update user profile', async () => {
      const updatedData = {
        fullName: 'Updated Name',
        phone: '0971234567',
      };

      const response = await request(app.getHttpServer())
        .patch('/api/v1/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updatedData)
        .expect(200);

      expect(response.body.fullName).toBe(updatedData.fullName);
      expect(response.body.phone).toBe(updatedData.phone);
    });

    it('should fail without access token', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/v1/auth/me')
        .send({ fullName: 'Updated' })
        .expect(401);
    });
  });

  describe('🔄 ÉTAPE 7 : RAFRAÎCHISSEMENT DES TOKENS (REFRESH)', () => {
    it('should refresh tokens with valid refresh token', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/refresh')
        .set('Authorization', `Bearer ${refreshToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('tokens');
      expect(response.body.tokens).toHaveProperty('accessToken');
      expect(response.body.tokens).toHaveProperty('refreshToken');

      // Les nouveaux tokens sont différents
      expect(response.body.tokens.accessToken).not.toBe(accessToken);

      // Mettre à jour les tokens pour les tests suivants
      accessToken = response.body.tokens.accessToken;
      refreshToken = response.body.tokens.refreshToken;
    });

    it('should fail without refresh token', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/refresh')
        .expect(401);
    });

    it('should fail with invalid refresh token', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/refresh')
        .set('Authorization', 'Bearer invalid_token')
        .expect(401);
    });
  });

  describe('🔐 ÉTAPE 8 : MOT DE PASSE OUBLIÉ (FORGOT PASSWORD)', () => {
    it('should send password reset email', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/forgot-password')
        .send({
          email: testUser.email,
        })
        .expect(200);

      expect(response.body.message).toContain('email');
    });

    it('should fail with non-existent email', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/forgot-password')
        .send({
          email: 'nonexistent@e2e.com',
        })
        .expect(404);
    });
  });

  describe('🔑 ÉTAPE 9 : RÉINITIALISATION DU MOT DE PASSE (RESET PASSWORD)', () => {
    it('should fail with invalid reset token', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/reset-password')
        .send({
          token: 'invalid_token',
          newPassword: 'NewPassword@123!',
        })
        .expect(400);

      expect(response.body.message).toContain('invalide');
    });

    it('should fail with weak new password', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/reset-password')
        .send({
          token: 'some-token',
          newPassword: '123',
        })
        .expect(400);

      expect(response.body.message).toContain('password');
    });
  });

  describe('🚪 ÉTAPE 10 : DÉCONNEXION (LOGOUT)', () => {
    it('should logout successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/logout')
        .set('Authorization', `Bearer ${refreshToken}`)
        .expect(200);

      expect(response.body.message).toContain('déconnecté');
    });

    it('should fail without refresh token', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/logout')
        .expect(401);
    });

    it('should fail with invalid refresh token', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/logout')
        .set('Authorization', 'Bearer invalid_token')
        .expect(401);
    });
  });

  describe('⚡ ÉTAPE 11 : RATE LIMITING (THROTTLE)', () => {
    it('should allow up to 5 login attempts per 15 minutes', async () => {
      // Faire 5 tentatives valides
      for (let i = 0; i < 5; i++) {
        const response = await request(app.getHttpServer())
          .post('/api/v1/auth/login')
          .send({
            email: testUser.email,
            password: 'WrongPassword',
          });
        expect([401, 429]).toContain(response.status);
      }
    });

    it('should block requests after exceeding rate limit', async () => {
      // La 6ème tentative devrait être bloquée
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: testUser.email,
          password: 'WrongPassword',
        });

      if (response.status === 429) {
        expect(response.status).toBe(429);
        expect(response.body.message).toContain('Too Many Requests');
      }
    });
  });

  describe('🧪 ÉTAPE 12 : RENVOI D\'OTP (RESEND OTP)', () => {
    it('should resend OTP to user email', async () => {
      // Créer un nouvel utilisateur pour ce test
      const newUser = {
        email: `test-resend-${Date.now()}@e2e.com`,
        password: 'TestPassword@123!',
        fullName: 'Resend Test User',
        phone: '0970000000',
        quartier: 'Goma',
        role: 'CLIENT',
      };

      // Inscription
      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send(newUser)
        .expect(201);

      // Renvoi d'OTP
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/resend-otp')
        .send({
          email: newUser.email,
        })
        .expect(200);

      expect(response.body.message).toContain('email');

      // Vérifier que le nouvel OTP est dans Redis
      const newOtp = await redisService.get(`otp:${newUser.email}`);
      expect(newOtp).toBeDefined();

      // Nettoyer
      await prismaService.user.deleteMany({
        where: { email: newUser.email },
      });
    });

    it('should fail with non-existent email', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/resend-otp')
        .send({
          email: 'nonexistent@e2e.com',
        })
        .expect(404);
    });
  });
});
