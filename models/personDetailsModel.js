module.exports = (sequelize, DataTypes) => {
  const Persons = sequelize.define(
    'persons',
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      heightCM: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weightKG: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
  return Persons;
};
