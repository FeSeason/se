#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const commander = require('commander');
const logger = require('../lib/log');
const init = require('../lib/init');
const { version } = require('../package.json');
const { templates } = require('../config');
const argv = process.argv;

const initFn = () => {
  logger.warn(`
-------------------------------------------------------------------
  ⛳️  当前最新版本 ${version} | ${new Date().toLocaleString()}
-------------------------------------------------------------------
`, false)

  let project, template;

  let questions = [{
    type: 'input',
    name: 'projectName',
    message: chalk.yellow('Input your project name?'),
  }, {
    type: 'list',
    name: 'templateName',
    message: chalk.yellow('What template do you want to use?'),
    default: templates[0].value,
    choices: templates
  }];

  if (template === undefined) {
    let quesItem = []

    if (project) {
      quesItem = questions.slice(1, 2)
    } else {
      quesItem = questions.concat()
    }

    inquirer
      .prompt(questions)
      .then(({
        projectName,
        templateName,
        type,
      }) => {
        project = project || projectName

        init(project.trim(), templateName)
      })
      .catch(err => {
        logger.fatal(err)
        process.exit(-1)
      })
  }
}

initFn();