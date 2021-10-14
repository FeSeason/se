module.exports = function install(projectPath, cb) {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const args = ['install']

  let job = require('child_process').spawn(npm, args, { // eslint-disable-line
    stdio: 'inherit',
    cwd: projectPath
  })

  job.on('close', cb)
}