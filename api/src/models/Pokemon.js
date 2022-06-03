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
      defaultValue: 0
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  }, {timestamps: false});
};
