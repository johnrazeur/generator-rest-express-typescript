"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");
const mkdirp = require("mkdirp");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("appname", { type: String, required: false });
    this.name = this.options.appname || "myapp";
    this.version = "1.0.0";
    this.description = "My cool TypeScript REST API";
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the splendid ${chalk.red(
          "generator-rest-express-typescript"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "description",
        message: `App description [${this.description}]`
      }
    ];

    if (!this.options.appname) {
      prompts.unshift({
        type: "input",
        name: "name",
        message: `App name [${this.name}]`
      });
    }

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.name = props.name || this.name;
      this.description = props.description || this.description;
    });
  }

  writing() {
    const src = this.sourceRoot();
    const dest = this.destinationPath(this.name);

    this.fs.copy(src, dest);

    const files = ["package.json", "README.md"];

    const opts = {
      name: this.name,
      version: this.version,
      description: this.description
    };

    files.forEach(f => {
      this.fs.copyTpl(
        this.templatePath(f),
        this.destinationPath(`${this.name}/${f}`),
        opts
      );
    });

    this.fs.move(
      this.destinationPath(`${this.name}`, "gitignore"),
      this.destinationPath(`${this.name}`, ".gitignore")
    );

    this.fs.move(
      this.destinationPath(`${this.name}`, "eslintrc.js"),
      this.destinationPath(`${this.name}`, ".eslintrc.js")
    );

    mkdirp(this.destinationPath(`${this.name}`, "src", "migration"));
  }

  install() {
    const appDir = path.join(process.cwd(), this.name);
    process.chdir(appDir);
    this.npmInstall();
  }
};
