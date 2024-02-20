import exceljs from "exceljs";
import { database } from "../repository/root.js";

export const employeeList = async () => {
  const db = await database;
  const employees = await db.Employee.findAll();

  const workbook = new exceljs.Workbook();

  const worksheet = workbook.addWorksheet("Employee list");
  worksheet.columns = [
    {
      header: "ID",
      key: "id",
      width: 35,
      style: { font: { size: 14 }, alignment: { horizontal: "center" } },
    },
    {
      header: "First Name",
      key: "first_name",
      width: 20,
      style: { font: { size: 14 }, alignment: { horizontal: "center" } },
    },
    {
      header: "Last Name",
      key: "last_name",
      width: 20,
      style: { font: { size: 14 }, alignment: { horizontal: "center" } },
    },
    {
      header: "Email",
      key: "email",
      width: 35,
      style: { font: { size: 14 }, alignment: { horizontal: "center" } },
    },
    {
      header: "Mobile Phone",
      key: "mobile_phone",
      width: 20,
      style: { font: { size: 14 }, alignment: { horizontal: "center" } },
    },
    {
      header: "Phone",
      key: "phone",
      width: 20,
      style: { font: { size: 14 }, alignment: { horizontal: "center" } },
    },
    {
      header: "Place of birth",
      key: "place_of_birth",
      width: 20,
      style: { font: { size: 14 }, alignment: { horizontal: "center" } },
    },
    {
      header: "Birthdate",
      key: "birthdate",
      width: 20,
      style: { font: { size: 14 }, alignment: { horizontal: "center" } },
    },
    {
      header: "Gender",
      key: "gender",
      width: 20,
      style: { font: { size: 14 }, alignment: { horizontal: "center" } },
    },
    {
      header: "Status",
      key: "marital_status",
      width: 20,
      style: { font: { size: 14 }, alignment: { horizontal: "center" } },
    },
    {
      header: "Religion",
      key: "religion",
      width: 20,
      style: { font: { size: 14 }, alignment: { horizontal: "center" } },
    },
    {
      header: "Blood type",
      key: "blood_type",
      width: 20,
      style: { font: { size: 14 }, alignment: { horizontal: "center" } },
    },
    {
      header: "Identity type",
      key: "identity_type",
      width: 20,
      style: { font: { size: 14 }, alignment: { horizontal: "center" } },
    },
    {
      header: "ID Number",
      key: "identity_number",
      width: 20,
      style: { font: { size: 14 }, alignment: { horizontal: "center" } },
    },
    {
      header: "ID expired",
      key: "identity_expired_date",
      width: 20,
      style: { font: { size: 14 }, alignment: { horizontal: "center" } },
    },
    {
      header: "Postal code",
      key: "postal_code",
      width: 20,

      style: { font: { size: 14 }, alignment: { horizontal: "center" } },
    },
    {
      header: "City address",
      key: "citizen_id_address",
      width: 20,

      style: { font: { size: 14 }, alignment: { horizontal: "center" } },
    },
    {
      header: "Address",
      key: "residential_address",
      width: 30,

      style: { font: { size: 14 }, alignment: { horizontal: "center" } },
    },
  ];

  employees.forEach((v) => worksheet.addRow(v));
  worksheet.getRow(1).eachCell(
    (cell) =>
      (cell.font = {
        bold: true,
        size: 15,
        alignment: { horizontal: "center" },
      }),
  );
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};
