module.exports = {
  extension: ['ts'],
  reporter: 'spec',
  timeout: 2000,
  recursive: true,
  exit: true,
  spec: ['test/**/*test.ts'],
  require: 'ts-node/register'
};