import passport from "passport";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import userRepo from "../repository/user.repo.js";
import { BadRequestException } from "../exceptions/bad-request.js";
import { ErrorCodes } from "../exceptions/base.root.js";
import { encryptToken } from "../utils/jwt.js";
import sendMessage from "./sendmail.js";
import { BASE_URL } from "../secret.js";

export const usePassportStrategies = async (req, res, strategy) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(strategy, { session: true }, async (err, user) => {
      if (err) {
        return reject(err);
      }

      return resolve(user);
    })(req, res);
  });
};

export const signupPassport = async (
  { email, password, ...restBody },
  next,
) => {
  const userToCreate = {
    ...restBody,
    password: await hashPassword(password),
    email: email.toLowerCase(),
  };

  const duplicate = await userRepo.findByQuery({ email });
  try {
    if (duplicate)
      next(
        new BadRequestException(
          "User already exist",
          ErrorCodes.USER_ALREADY_EXISTS,
        ),
      );

    const user = await userRepo.createUser(userToCreate);

    if (!user)
      next(
        new BadRequestException("Cannot create user", ErrorCodes.BAD_REQUEST),
      );

    const token = encryptToken({ id: user?.id, email: email.toLowerCase() });

    const html = `
                <p>Klik <a href=${BASE_URL}api/auth/verify/${token}>disini</a> untuk aktivasi akun anda</p>
            `;
    sendMessage(email, "Aktivasi akun", html, "Email sent successfully");

    next(null, user);
  } catch (err) {
    next(null, err);
  }
};

export const loginPassport = async ({ email, password }, next) => {
  const user = await userRepo.findByQuery({ email, is_active: true });

  try {
    if (!user)
      next(
        new BadRequestException("User not found", ErrorCodes.USER_NOT_FOUND),
      );

    const compare = await comparePassword(password, user?.password);

    if (!compare)
      next(new BadRequestException("Password invalid", ErrorCodes.BAD_REQUEST));
    const payload = {
      id: user?.id,
      email: user?.email,
    };

    const jwt = encryptToken(payload);
    next(null, jwt);
  } catch (err) {
    next(null, err);
  }
};
