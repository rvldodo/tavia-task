"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Employees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      mobile_phone: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      place_of_birth: {
        type: Sequelize.STRING,
      },
      birthdate: {
        type: Sequelize.DATE,
      },
      gender: {
        type: Sequelize.ENUM,
        values: ["MALE", "FEMALE"],
      },
      marital_status: {
        type: Sequelize.ENUM,
        values: ["SINGLE", "MARRIED"],
      },
      blood_type: {
        type: Sequelize.ENUM,
        values: ["O", "A", "B", "AB"],
      },
      religion: {
        type: Sequelize.ENUM,
        values: ["CHRISTIAN", "MUSLIM", "CATHOLIC", "BUDDHIST"],
      },
      identity_type: {
        type: Sequelize.ENUM,
        values: ["ID", "DRIVING_LICENSE", "PASSPORT"],
      },
      identity_number: {
        type: Sequelize.STRING,
      },
      identity_expired_date: {
        type: Sequelize.DATE,
      },
      postal_code: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      citizen_id_address: {
        type: Sequelize.TEXT,
      },
      residential_address: {
        type: Sequelize.TEXT,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Employees");
  },
};
