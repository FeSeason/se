const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')
const pkg = require('../package.json')
const logger = require('./log')

const downloadTemplate = require('./loadTemplate')
const tools = require('./ioUtils')
const install = require('../lib/install')

function init(projectName, templateName) {
  const projectPath = tools.getProjectPath(projectName)

  if (!projectName) {
    logger.fatal('project name must exist！')
    process.exit(-1)
  }

  if (tools.fileExist(projectPath)) {
    logger.fatal('project name already exists in the current folder!')
    process.exit(-1)
  }

  downloadTemplate(projectName, templateName, (err, projectPath) => {
    if (err) {
      logger.fatal(err)
      process.exit(-1)
    }

    const resolveSuccessLog = () => {
      logger.clear()
      logger.success(` ----------------------------------------------`)
      logger.success(` Project ${projectName} initialization completed!`)
      logger.success(` Enter project ${projectName} and start coding!`)
      logger.success(` cd ./${projectName} && npm run dev`)
      logger.success(' Good Luck !')
      logger.success(` ----------------------------------------------\n`)
    }
    
    const packageJsonPath = path.resolve(projectPath, 'package.json')

    if (!fs.existsSync(packageJsonPath)) {
      resolveSuccessLog()
      
      return
    }

    let packageJsonFile = require(packageJsonPath)  // eslint-disable-line

    packageJsonFile.name = projectName
    packageJsonFile.sources = {
      template: 'se-create',
      version: pkg.version
    }

    tools.writeFileInfo(packageJsonPath, packageJsonFile, () => {

      execSync('git init', {
        cwd: projectPath
      })

      logger.success(`Wait for the last step to install dependencies ...`)

      install(projectPath, resolveSuccessLog)
    })
  })
}

module.exports = init