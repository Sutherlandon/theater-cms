const base_url = 'localhost';
const config = {
  dev: {
    base_url: 'localhost',
    front_end_port: '3000',
    api_port: '3001',
    api_path: `${base_url}:3001`,
    secret: 'F263E67FDB92E859FC45511AE31EACCED41920F394DEA44608210F2BF9D2E509',
  }
}

module.exports = config;
