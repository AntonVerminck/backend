
const { Sequelize, DataTypes, Model } = require('sequelize');
const { getLogger } = require('../core/logging'); 


const config = require('config');

const NODE_ENV = config.get('env');
const isDevelopment = NODE_ENV === 'development';


const DATABASE_NAME = config.get('database.name');
const DATABASE_HOST = config.get('database.host');
const DATABASE_PORT = config.get('database.port');
const DATABASE_USERNAME = config.get('database.username');
const DATABASE_PASSWORD = config.get('database.password');
const DATABASE_DIALECT = config.get('database.dialect');

let sequelize; 
let Cinema;
let Gebruiker;
let Film;
let gezieneFilm;
let tijdslot;

 async function  initializeData() {
  const logger = getLogger(); 
  logger.info('Initializing connection to the database'); 
 }
 
  const SequelizeOptions = {
    database: DATABASE_NAME,
    username: DATABASE_USERNAME, 
    password: DATABASE_PASSWORD,
    options: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      //dialect: 'mysql',
      dialectOptions: {
        insecureAuth: isDevelopment 
    }
    }
   
  };

  sequelize =  new Sequelize(DATABASE_NAME,DATABASE_USERNAME, DATABASE_PASSWORD,{
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      dialect: 'mysql',
      dialectOptions: {
        insecureAuth: isDevelopment 
    }
    }); 
  

  Gebruiker  = sequelize.define('Gebruiker', {
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING, 
    allowNull: false
  }
  }, {
    // Other model options go here
  });


  Cinema = sequelize.define('Cinema',{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // Model attributes are defined here
    naam: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postcode: {
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    adres:{
      type: DataTypes.STRING
    }
  }, {

  });

  Film = sequelize.define('Film',{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // Model attributes are defined here
    naam: {
      type: DataTypes.STRING,
      allowNull: false
    },
    regisseur: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING, 
      allowNull: false
    }
  }, {

  });



  gezieneFilm = sequelize.define('gezieneFilm', {
    score: DataTypes.DOUBLE
  });
  Gebruiker.belongsToMany(Film, { through: gezieneFilm});
  Film.belongsToMany(Gebruiker, { through: gezieneFilm});



  tijdslot = sequelize.define('tijdslot', { 
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tijd: DataTypes.DATE
  });
  Cinema.belongsToMany(Film, { through: tijdslot});
  Film.belongsToMany(Cinema, { through: tijdslot});

 // await sequelize.sync();
//};


  function getSequelize() {

    if (!Sequelize)
      throw new Error(
        'Please initialize the data layer before getting the seqel instance'
      );
    return Sequelize;
  }

const db = {};

db.Sequelize = Sequelize;
db.Cinema = Cinema;
db.Film = Film;
db.Gebruiker = Gebruiker;




module.exports = {
  initializeData, 
  getSequelize, 
  db,


};









