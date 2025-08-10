module.exports = {

  env: 'production',
    log: {
      level: 'info',
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
      username: 'root@localhost',
      password: '',
    },
  
  };