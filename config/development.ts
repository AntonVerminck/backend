module.exports = {
    env: 'development',
  
    log: {
      level: 'silly',
      disabled: false,
    },

    cors: { 
      origins: ['http://localhost:5173'], 
      maxAge: 3 * 60 * 60, 
    },

    database: {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      name: 'Webservices',
      username: 'root',
      password: 'root',
    },
  
  };