import { config } from "../config/env.js";

export const sendTokenResponse = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + config.cookieExpireDays * 86400000),
      httpOnly: true,
      sameSite: config.isProduction ? "lax" : undefined,
    })
    .json({ success: true, user, message });
};
