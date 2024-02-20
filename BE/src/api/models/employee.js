import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      mobile_phone: DataTypes.STRING,
      phone: DataTypes.STRING,
      place_of_birth: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      gender: {
        type: DataTypes.ENUM("MALE", "FEMALE"),
      },
      marital_status: {
        type: DataTypes.ENUM("SINGLE", "MARRIED"),
      },
      blood_type: {
        type: DataTypes.ENUM("O", "A", "B", "AB"),
      },
      religion: {
        type: DataTypes.ENUM("CHRISTIAN", "MUSLIM", "CATHOLIC", "BUDDHIST"),
      },
      identity_type: {
        type: DataTypes.ENUM("ID", "DRIVING_LICENSE", "PASSPORT"),
      },
      identity_number: DataTypes.STRING,
      identity_expired_date: DataTypes.DATE,
      postal_code: DataTypes.INTEGER,
      citizen_id_address: DataTypes.TEXT,
      residential_address: DataTypes.TEXT,
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Employee",
    },
  );
  return Employee;
};
