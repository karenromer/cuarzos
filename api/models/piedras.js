'use strict';
module.exports = (sequelize, DataTypes) => {
  const piedras = sequelize.define('piedras', {
    name: DataTypes.STRING,
    colour: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  piedras.associate = function(models) {
    // associations can be defined here
  };
  return piedras;
};