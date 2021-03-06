"use strict";
const path = require("path");
const helpers = require("yeoman-test");
const assert = require("yeoman-assert");

describe("generator-rest-express-typescript:app", () => {
  describe("default install", () => {
    beforeAll(done => {
      return helpers
        .run(path.join(__dirname, "../generators/app"))
        .withPrompts({ description: "the description" })
        .withPrompts({ docker: false })
        .on("end", done);
    });

    it("the generator can be required without throwing", () => {
      // Not testing the actual run of generators yet
      require("../generators/app");
    });

    it("creates expected files", () => {
      assert.file([
        "README.md",
        ".gitignore",
        "package.json",
        "ormconfig.json",
        ".eslintrc.js",
        "tsconfig.json",
        "src",
        "src/config",
        "src/config/config.ts",
        "src/middlewares",
        "src/middlewares/checkJwt.ts",
        "src/lib",
        "src/lib/test",
        "src/lib/test/fixtures",
        "src/lib/test/fixtures/users.json",
        "src/lib/app.ts",
        "src/lib/typeorm.ts",
        "src/lib/testUtils.ts",
        "src/lib/server.ts",
        "src/controllers",
        "src/controllers/AuthController.ts",
        "src/controllers/__tests__",
        "src/controllers/__tests__/AuthController.ts",
        "src/controllers/__tests__/UserController.ts",
        "src/controllers/UserController.ts",
        "src/migration",
        "src/routes",
        "src/routes/AuthRoutes.ts",
        "src/routes/BaseRoutes.ts",
        "src/routes/index.ts",
        "src/routes/UserRoutes.ts",
        "src/services",
        "src/services/UserService.ts",
        "src/entities",
        "src/entities/Project.ts",
        "src/entities/User.ts",
        "swaggerDef.js",
        "swagger.json"
      ]);
    });

    it("creates expected npm scripts", () => {
      assert.fileContent("package.json", '"migration:run"');
      assert.fileContent("package.json", '"start"');
      assert.fileContent("package.json", '"build"');
      assert.fileContent("package.json", '"test"');
      assert.fileContent("package.json", '"debug"');
      assert.fileContent("package.json", '"swagger:generate"');
    });

    it("shouldn't add Dockerfile", () => {
      assert.noFile("Dockerfile");
      assert.noFile(".dockerignore");
    });

    it("should generate variables in every file", () => {
      const expectedName = "myapp";
      const expectedDescription = "the description";
      const expectedVersion = "1.0.0";
      const nameDir = path.basename(process.cwd());
      assert.fileContent("package.json", `"name": "${expectedName}"`);
      assert.fileContent(
        "package.json",
        `"description": "${expectedDescription}"`
      );
      assert.fileContent("package.json", `"version": "${expectedVersion}"`);

      assert.fileContent("README.md", `# ${expectedName}`);
      assert.fileContent("README.md", expectedDescription);

      assert.fileContent("swagger.json", `"title": "${expectedName}"`);
      assert.fileContent(
        "swagger.json",
        `"description": "${expectedDescription}"`
      );
      assert.fileContent("swagger.json", `"version": "${expectedVersion}"`);

      assert.fileContent("swaggerDef.js", `title: '${expectedName}'`);
      assert.fileContent(
        "swaggerDef.js",
        `description: '${expectedDescription}'`
      );
      assert.fileContent("swaggerDef.js", `version: '${expectedVersion}'`);

      assert.strictEqual(nameDir, expectedName);
    });
  });

  describe("with docker", () => {
    beforeAll(done => {
      return helpers
        .run(path.join(__dirname, "../generators/app"))
        .withPrompts({ description: "the description" })
        .withPrompts({ docker: true })
        .on("end", done);
    });

    it("should add Dockerfile", () => {
      assert.file("Dockerfile");
      assert.file(".dockerignore");
    });
  });

  describe("default install with option name", () => {
    beforeAll(done => {
      return helpers
        .run(path.join(__dirname, "../generators/app"))
        .withArguments("argumentName")
        .on("end", done);
    });

    it("should generate the same appname in every file", () => {
      const expectedName = "argumentName";
      const nameDir = path.basename(process.cwd());
      assert.fileContent("package.json", `"name": "${expectedName}"`);
      assert.strictEqual(nameDir, expectedName);
    });
  });
});
