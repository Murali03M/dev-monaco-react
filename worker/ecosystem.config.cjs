module.exports = {
    apps: [
      {
        name: 'worker', 
        script: './src/worker.js',  
        watch: false, 
        instances: 1, 
        exec_mode: 'fork',  
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        }
      }
    ]
  };