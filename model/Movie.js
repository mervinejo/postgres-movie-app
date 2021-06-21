const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'mervine@21', {
  host: 'localhost',
  dialect:'postgres'
});


const Movie = sequelize.define('Movie', {

  movieId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
 year:{
    type: DataTypes.INTEGER,
 },
 length:{
    type: DataTypes.STRING,
 },
 actors:{
    type: DataTypes.STRING,
 },


}, {
    tableName: "movies",
    underscored: true,
    timestamps: false

});


console.log(Movie === sequelize.models.Movie);
module.exports = Movie;