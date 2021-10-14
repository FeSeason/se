const NODE_ENV = {
  PROD: 'production',
  DEV: 'development'
}

const BUILD_ENV = {
  DEV: 'test',
  TEST: 'test',
  UAT: 'uat',
  PROD: 'prod'
}

const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = {
  NODE_ENV,
  BUILD_ENV
}