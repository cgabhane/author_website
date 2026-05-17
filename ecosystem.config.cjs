module.exports = {
  apps: [
    {
      name: "chetangabhane-portfolio",
      script: "dist/index.js",
      cwd: "/var/www/chetangabhane.in",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
      error_file: "/var/log/pm2/chetangabhane-error.log",
      out_file: "/var/log/pm2/chetangabhane-out.log",
      log_file: "/var/log/pm2/chetangabhane-combined.log",
      time: true,
    },
  ],
};
