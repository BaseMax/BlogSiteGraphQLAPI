import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { Blog, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  const validPassword = 'Test123!';
  const invalidPassword = 'InvalidPassword1!';

  let blogs: Blog[];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    prisma = app.get(PrismaService);
  });
  beforeEach(async () => {
    await prisma.blog.deleteMany({});
    const blogsData = [
      {
        username: 'blog1',
        password: await argon2.hash(validPassword),
        isAdmin: true,
      },
      {
        username: 'blog2',
        password: await argon2.hash(validPassword),
        isAdmin: false,
      },
      {
        username: 'blog3',
        password: await argon2.hash(validPassword),
        isAdmin: false,
      },
    ]
    blogs = await Promise.all(
      blogsData.map(async (blogData) => {
        return prisma.blog.create({
          data: {
            ...blogData,
          },
        });
      })
    );
  })

  afterAll(async () => {
    await app.close();
  });

  describe("authentication", () => {
    describe("Register+me", () => {
      it("Register a new user and get the user's profile with an Authorization Bearer token", async () => {
        const newUser = {
          username: 'newuser',
          password: validPassword,
          isAdmin: false,
        };
        let authToken: string;

        // Register the new user
        const res1 = await request(app.getHttpServer())
          .post('/auth/register')
          .send(newUser)
          .expect(201);

        // Get the user's profile with an Authorization Bearer token
        authToken = `Bearer ${res1.body.token}`;
        const res2 = await request(app.getHttpServer())
          .get('/auth/me')
          .set('Authorization', authToken)
          .expect(200);

        expect(res2.body).toEqual({
          id: res1.body.user.id,
          username: newUser.username,
          isAdmin: newUser.isAdmin,
        });

      })

      it("Try to get the user's profile without an Authorization Bearer token", async () => {
        await request(app.getHttpServer())
          .get('/auth/me')
          .expect(401);

      })


      it("Try to register a user with an invalid password", async () => {
        const invalidUser = {
          username: 'invaliduser',
          password: "invalid",
          isAdmin: false,
        };

        await request(app.getHttpServer())
          .post('/auth/register')
          .send(invalidUser)
          .expect(400);

      })


      it("Try to register a user with an existing username", async () => {
        const existingUser = {
          username: blogs[0].username,
          password: validPassword,
          isAdmin: false,
        };

        await request(app.getHttpServer())
          .post('/auth/register')
          .send(existingUser)
          .expect(400);

      })

      it("Try to get the user's profile with an invalid Authorization Bearer token", async () => {
        const invalidAuthToken = 'Bearer invalidtoken';

        await request(app.getHttpServer())
          .get('/auth/me')
          .set('Authorization', invalidAuthToken)
          .expect(401);

      })

      it("Try to get the user's profile with an expired Authorization Bearer token", async () => {
        // Generate an expired token
        const expiredToken = jwt.sign({ id: blogs[0].id }, 'secret', { expiresIn: '-1s' });
        const expiredAuthToken = `Bearer ${expiredToken}`;

        await request(app.getHttpServer())
          .get('/auth/me')
          .set('Authorization', expiredAuthToken)
          .expect(401);

      })

    })
    describe("login", () => {


      it("Login with correct credentials and get the user's profile with an Authorization Bearer token", async () => {
        const userCredentials = {
          username: blogs[0].username,
          password: validPassword,
        };

        let authToken: string;

        // Login with correct credentials
        const res1 = await request(app.getHttpServer())
          .post('/auth/login')
          .send(userCredentials)
          .expect(201);

        // Get the user's profile with an Authorization Bearer token
        authToken = `Bearer ${res1.body.token}`;
        const res2 = await request(app.getHttpServer())
          .get('/auth/me')
          .set('Authorization', authToken)
          .expect(200);

        expect(res2.body).toEqual({
          id: blogs[0].id,
          username: blogs[0].username,
          isAdmin: blogs[0].isAdmin,
        });

      })

      it("Login with incorrect password", async () => {
        const invalidCredentials = {
          username: blogs[0].username,
          password: invalidPassword,
        };

        await request(app.getHttpServer())
          .post('/auth/login')
          .send(invalidCredentials)
          .expect(400);

      })


      it("Login with missing username or password", async () => {
        const missingUsername = {
          password: validPassword,
        };

        const missingPassword = {
          username: blogs[0].username,
        };

        await request(app.getHttpServer())
          .post('/auth/login')
          .send(missingUsername)
          .expect(400);

        await request(app.getHttpServer())
          .post('/auth/login')
          .send(missingPassword)
          .expect(400);

      })

      it("Login with invalid request body", async () => {
        const invalidRequestBody = {
          username: blogs[0].username,
          password: 12345,
        };

        await request(app.getHttpServer())
          .post('/auth/login')
          .send(invalidRequestBody)
          .expect(400);

      })

    })
  })
});
