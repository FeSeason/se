const fs = require('fs')
const path = require('path')
const config = require('../config')
const logger = require('./log')

function fileExist(folderPath) {
  try {
    fs.statSync(folderPath)
  } catch (e) {
    return false
  }
  return true
}

function getProjectPath(projectName) {
  return path.join(process.cwd(), path.sep, projectName)
}

function getTemplateFiles(fileData) {
  return fileData.filter(file => file.type === 'file')
}

function resolveFilePath(path) {
  if (!fileExist(path)) {
    logger.fatal(`${path} is not exist`)
  } else {
    return path
  }
}

function loadFile(filePath) {
  const path = resolveFilePath(filePath)
  let config

  try {
    config = require(path) // eslint-disable-line
  } catch (err) {
    logger.fatal(err.message)
  }
  return config
}

function assembleConfig(webpackConfigPath, packagejsonConfigPath, port) {
  let config = {}

  config.webpackConfig = loadFile(webpackConfigPath)
  config.pkgConfig = loadFile(packagejsonConfigPath)

  if (port) {
    config.port = port
  }

  return config
}

// ATTENTION: Default build environment is test, means will load config/test.env.js
function resolveBuildEnv(typeEnv = config.buildEnv.test) {
  if (config.buildEnv[typeEnv]) {
    logger.log(`current build environment is [${typeEnv}], node environment is [${process.env.NODE_ENV}]`)

    return typeEnv || config.buildEnv.test
  } else {
    logger.fatal(`current build environment [${typeEnv}] not support!`)
  }
}

function writeFileInfo(filePath, data, cb) {
  data = JSON.stringify(data, null, 2)
  fs.writeFile(filePath, data, function err(err) {
    if (err) {
      logger.fatal(err)
    }
    if (cb) {
      return cb()
    }
  })
}

module.exports = {
  fileExist,
  getProjectPath,
  getTemplateFiles,
  loadFile,
  assembleConfig,
  resolveBuildEnv,
  writeFileInfo,
}