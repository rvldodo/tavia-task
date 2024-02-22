import { BadRequestException } from "../../exceptions/bad-request.js";
import { ErrorCodes, HttpException } from "../../exceptions/base.root.js";
import { NotFoundException } from "../../exceptions/not-found.js";
import userRepo from "../../repository/user.repo.js";
import { BASE_URL } from "../../secret.js";
import { hashPassword } from "../../utils/bcrypt.js";
import { decodeToken, encryptToken } from "../../utils/jwt.js";
import { usePassportStrategies } from "../../utils/passport.utils.js";
import sendMessage from "../../utils/sendmail.js";

export const signup = async (req, res, next) => {
  const user = await usePassportStrategies(req, res, "signup");
  if (user instanceof BadRequestException)
    new BadRequestException("Problem when create user", ErrorCodes.BAD_REQUEST);
  return res.status(201).json({ data: user });
};

export const login = async (req, res, next) => {
  const token = await usePassportStrategies(req, res, "login");
  if (token instanceof HttpException)
    new BadRequestException("Login failed", ErrorCodes.BAD_REQUEST);

  return res.status(200).json({ token });
};

export const userConfirm = async (req, res, next) => {
  const token = req.params.token;
  if (!token)
    new BadRequestException("There is no token", ErrorCodes.BAD_REQUEST);

  const payload = decodeToken(token);
  if (!payload.email)
    new BadRequestException("Payload is empty", ErrorCodes.BAD_REQUEST);

  const user = await userRepo.findByQuery({
    email: payload?.email,
    is_active: false,
  });
  if (!user) new NotFoundException("User not found", ErrorCodes.USER_NOT_FOUND);

  await userRepo.updateUserById(payload?.id, { is_active: true });

  return res.status(200).json({ message: "User active" });
};

export const forgetPassword = async (req, res, next) => {
  const user = await userRepo.findByQuery({
    email: req.body.email.toLowerCase(),
  });

  if (!user) new NotFoundException("User not found", ErrorCodes.USER_NOT_FOUND);

  const payload = {
    id: user?.id,
    email: user?.email,
  };
  const token = encryptToken(payload);

  const link = `${BASE_URL}api/auth/forget-password/verify/${token}`;
  const html = `
                <p>Klik <a href=${link}>disini</a> untuk reset password</p>
`;

  sendMessage(
    req.body.email.toLowerCase(),
    "Lupa password",
    html,
    "Email sent successfully",
  );

  return res.status(200).json({ message: "Email sent successfully", token });
};

export const verifyTokenForgetPassword = async (req, res, next) => {
  const token = req.params.token;
  if (!token)
    new BadRequestException("There is no token", ErrorCodes.BAD_REQUEST);

  const payload = decodeToken(token);
  const user = await userRepo.findByQuery({ id: payload?.id });

  if (!user) new NotFoundException("User not found", ErrorCodes.USER_NOT_FOUND);

  const hash = await hashPassword(req.body.password);

  await userRepo.updateUserById(user?.id, { password: hash });

  return res.status(200).json({ message: "successfully reset password" });
};
