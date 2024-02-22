import { employeeList } from "../../utils/xlsx.js";
import { BadRequestException } from "../../exceptions/bad-request.js";
import { ErrorCodes } from "../../exceptions/base.root.js";
import excelToJson from "convert-excel-to-json";
import fs from "fs-extra";
import userRepo from "../../repository/user.repo.js";

export const exportFile = async (req, res, next) => {
  const file = await employeeList();

  if (!file)
    new BadRequestException("Cannot export file", ErrorCodes.BAD_REQUEST);
  const date = new Date().toISOString().replace(/[-:.]/g, "");
  const filename = `${date}-report.xlsx`;

  res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );

  return res.send(file);
};

export const importFile = async (req, res, next) => {
  const filename = req.file.filename;

  if (!req.file)
    new BadRequestException("No file to import", ErrorCodes.BAD_REQUEST);

  const path = "./public/" + filename;

  let data = [];
  const excelData = excelToJson({
    sourceFile: path,
    header: {
      rows: 1,
    },
    columnToKey: {
      A: "id",
      B: "first_name",
      C: "last_name",
      D: "email",
      E: "password",
      F: "mobile_phone",
      E: "phone",
      G: "place_of_birth",
      H: "birthdate",
      I: "gender",
      J: "marital_status",
      K: "religion",
      L: "blood_type",
      M: "identity_type",
      N: "identity_number",
      O: "identity_expired_date",
      P: "postal_code",
      Q: "citizen_id_address",
      R: "residental_address",
    },
  });

  excelData["Employee list"].forEach((v) => {
    const { id, ...rest } = v;
    data.push(rest);
  });

  const result = await userRepo.bulkInsertData(data);
  if (!result)
    new BadRequestException(
      "Cannot insert data from file",
      ErrorCodes.BAD_REQUEST,
    );

  return res.status(200).json(result);
};
