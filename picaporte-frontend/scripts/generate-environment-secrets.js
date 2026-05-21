const fs = require('fs');
const path = require('path');

const secretsPath = path.join(__dirname, '..', 'src', 'environments', 'environment.secrets.ts');

if (fs.existsSync(secretsPath)) {
  console.log('[env] Using existing src/environments/environment.secrets.ts');
  process.exit(0);
}

const readEnv = (name, fallback = '') => process.env[name] || fallback;
const toTsString = (value) => JSON.stringify(value);

const redirectUriEnv = process.env.NG_APP_AUTH0_REDIRECT_URI;
const redirectUriValue = redirectUriEnv
  ? toTsString(redirectUriEnv)
  : "window.location.origin + '/callback'";

const fileContents = `export const secrets = {
  apiKey: ${toTsString(readEnv('NG_APP_API_KEY'))},
  mapboxAccessToken: ${toTsString(readEnv('NG_APP_MAPBOX_ACCESS_TOKEN'))},
  auth0: {
    domain: ${toTsString(readEnv('NG_APP_AUTH0_DOMAIN'))},
    clientId: ${toTsString(readEnv('NG_APP_AUTH0_CLIENT_ID'))},
    audience: ${toTsString(readEnv('NG_APP_AUTH0_AUDIENCE', 'https://picaporte-api'))},
    redirectUri: ${redirectUriValue}
  }
};
`;

fs.writeFileSync(secretsPath, fileContents, 'utf8');

const missingVars = [
  'NG_APP_API_KEY',
  'NG_APP_MAPBOX_ACCESS_TOKEN',
  'NG_APP_AUTH0_DOMAIN',
  'NG_APP_AUTH0_CLIENT_ID'
].filter((name) => !process.env[name]);

console.log(`[env] Generated ${path.relative(process.cwd(), secretsPath)}`);
if (missingVars.length > 0) {
  console.warn(`[env] Missing optional public env vars: ${missingVars.join(', ')}`);
}
