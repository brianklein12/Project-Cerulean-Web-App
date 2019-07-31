module.exports = {
  apps: [{
    name: 'Project-C',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-164-130-248.compute-1.amazonaws.com',
      key: '~/downloads/bk_key_pair.pem',
      ref: 'origin/master',
      repo: 'git@github.com:brianklein12/Project-Cerulean-Web-App.git',
      path: '/home/ubuntu/Project-Cerulean',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
