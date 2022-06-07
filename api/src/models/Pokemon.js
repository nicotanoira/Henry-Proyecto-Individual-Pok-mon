const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  //defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    healthPoints: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 35
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 55
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 30
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 66
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 3
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 7
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'https://mcdn.wallpapersafari.com/medium/89/90/KdNu1B.png'
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  }, {timestamps: false});
};
