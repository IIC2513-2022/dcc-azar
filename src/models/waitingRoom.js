const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class waitingRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: 'creatorId',
        as: 'creator',
        allowNull: false,
      });
      // define association here
    }
  }
  waitingRoom.init({
    name: DataTypes.STRING,
    creatorId: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'waitingRoom',
  });
  return waitingRoom;
};
