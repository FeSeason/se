const path = require('path')
const renderTemplate = require('./renderTemplate')
const logger = require('./log')

const templateRoot = path.resolve(__dirname, '../template')

function downloadTemplate(projectName, templateName, cb) {
  const projectPath = path.join(process.cwd(), projectName)

  const render = function render(templateName) {
    const templateDir = path.resolve(templateRoot, templateName)
    renderTemplate(templateDir, projectPath)
  }

  logger.success(`Start loading template: [${templateName}]`)
  render(templateName)
  logger.success(`Template load Successful!`)

  cb(null, projectPath)
}

module.exports = downloadTemplate