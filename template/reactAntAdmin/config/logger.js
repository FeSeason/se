const ip = require('ip');
const chalk = require('chalk');
const divider = chalk.gray('\n-----------------------------------');
const logger = {
  error: err => {
    console.error(chalk.red(err));
  },

  appStarted: (port, host, tunnelStarted) => {
    const arr = [];

    arr.push(`${chalk.bold(`Server started ! ${chalk.green('✓')}`)}${divider}
本地: ${chalk.green(`http://${host}:${port}`)}
局域网: ${
      chalk.green(`http://${ip.address()}:${port}`) +
      (tunnelStarted ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}` : '')
    }${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);

    return arr;
  }
};


module.exports = logger;
