module.exports = {
  name: "main",
  script: "bin/www",
  env: {
    NODE_ENV: "development",
    NODE_PATH: ".",
  },
  env_production: {
    NODE_ENV: "production",
    NODE_PATH: ".",
  },
};
