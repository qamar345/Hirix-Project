const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Hirix Job Portal API",
    version: "1.0.0",
    description: "API documentation for the Hirix Job Portal backend, covering Admin, Employee (Employer), and Job Seeker endpoints.",
  },
  servers: [
    {
      url: "http://localhost:9000",
      description: "Development Server",
    },
  ],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "x-access-token",
        description: "JWT token for authenticating protected routes",
      },
    },
  },
  paths: {
    "/admin-login": {
      post: {
        summary: "Admin Login",
        tags: ["Admin"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "admin@hirix.com.pk" },
                  password: { type: "string", example: "adminpassword" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Successful login" },
          401: { description: "Invalid credentials" },
        },
      },
    },
    "/employee-login": {
      post: {
        summary: "Employer/Employee Login",
        tags: ["Employer"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "employer@hirix.com.pk" },
                  password: { type: "string", example: "password123" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Successful login" },
        },
      },
    },
    "/employee-signup": {
      post: {
        summary: "Employer Signup",
        tags: ["Employer"],
        security: [{ ApiKeyAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                  name: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Successfully signed up" },
        },
      },
    },
    "/user-login": {
      post: {
        summary: "Job Seeker Login",
        tags: ["Job Seeker"],
        security: [{ ApiKeyAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Successful login" },
        },
      },
    },
    "/get-posts": {
      get: {
        summary: "Get All Job Posts",
        tags: ["Combined"],
        parameters: [
          { name: "search", in: "query", schema: { type: "string" } },
          { name: "city", in: "query", schema: { type: "string" } },
          { name: "category", in: "query", schema: { type: "string" } },
        ],
        responses: {
          200: { description: "List of job posts" },
        },
      },
    },
    "/postbyEmployee/{id}": {
      post: {
        summary: "Post a Job as Employer",
        tags: ["Employer"],
        security: [{ ApiKeyAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  city: { type: "string" },
                  workplace_type: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Job posted successfully" },
        },
      },
    },
    "/appliedTo/{id}": {
      get: {
        summary: "Get Applications for Job Seeker",
        tags: ["Job Seeker"],
        security: [{ ApiKeyAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
          { name: "type", in: "query", schema: { type: "string" }, description: "applied or wishlist" },
          { name: "search", in: "query", schema: { type: "string" } },
        ],
        responses: {
          200: { description: "Successful response" },
        },
      },
    },
    "/get-skills": {
      get: {
        summary: "Get List of Skills",
        tags: ["Combined"],
        responses: {
          200: { description: "List of skillset items" },
        },
      },
    },
  },
};

module.exports = swaggerSpec;
