module.exports = {
  apps: [
    {
      name: 'MandalaServer',
      script: 'dist/src/app.js',
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        PHASE: 'development',
      },
      env_production: {
        PHASE: 'production',
      },
    },
  ],
}
