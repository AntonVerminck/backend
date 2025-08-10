import config from 'config';
const packageJson = require('../../package.json');


const ping = () => ({ pong: true });


const getVersion = () => ({
  env: config.get<string>('env'),
  version: packageJson.version,
  name: packageJson.name,
});

module.exports = {
  ping,
  getVersion,
};