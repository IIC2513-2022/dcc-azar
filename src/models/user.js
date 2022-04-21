const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: 'First name must contain only letters',
        },
        notEmpty: {
          msg: 'First name is required',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: 'First name must contain only letters',
        },
        notEmpty: {
          msg: 'First name is required',
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: {
          msg: 'Username must be alphanumeric',
        },
        notEmpty: {
          msg: 'Username is required',
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Age must be an integer',
        },
        max: {
          args: [120],
          msg: 'Age must be less than 120',
        },
        min: {
          args: [1],
          msg: 'Age must be greater than 1',
        },
        notEmpty: {
          msg: 'Age is required',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValidPassword(value) {
          if (!value.match(/[A-Z]/) || !value.match(/[a-z]/) || !value.match(/[0-9]/) || !value.match(/[@$!%*?&]/)) {
            throw new Error('The password must contain at least one uppercase letter, one lowercase letter, one number and one special character');
          }
        },
        notEmpty: {
          msg: 'Password is required',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
