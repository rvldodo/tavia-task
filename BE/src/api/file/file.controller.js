import { employeeList } from "../../utils/xlsx.js";
import { BadRequestException } from "../../exceptions/bad-request.js";
import { ErrorCodes } from "../../exceptions/base.root.js";
import readXlsxFile from "read-excel-file";
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

  readXlsxFile(path).then((res) => {
    res.rows.shift();

    res.rows.forEach((v) => {
      data.push({
        first_name: v[0],
        last_name: v[1],
        email: v[2],
        password: v[3],
        mobile_phone: v[4],
        phone: v[5],
        place_of_birth: v[6],
        birthdate: v[7],
        gender: v[8],
        marital_status: v[9],
        blood_type: v[10],
        religion: v[11],
        identity_type: v[12],
        identity_number: v[13],
        identity_expired_date: v[14],
        postal_code: v[15],
        citizen_id_address: v[16],
        residential_address: v[17],
      });
    });
  });

  const result = await userRepo.bulkInsert(data);
  if (!result)
    new BadRequestException(
      "Cannot insert data from file",
      ErrorCodes.BAD_REQUEST,
    );

  return res.status(200).json(result);
};
