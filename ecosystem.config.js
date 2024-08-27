module.exports = {
    apps: [
      {
        name: 'DiscordBot',
        script: 'npm',
        args: 'run start:production',
        output: `./logs/${new Date().toISOString().slice(0, 10)}-out.log`,
        error: `./logs/${new Date().toISOString().slice(0, 10)}-error.log`,
      }
    ]
  };
  