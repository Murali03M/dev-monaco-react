module.exports = {
    apps: [
      {
        name: 'frontend',
        script: 'npm',
              args: ['run preview', '--port', '5173'],
  
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };