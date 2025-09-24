import { TCookieOpts } from "@/types";

export const COOKIE_NAMES = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  ACCESS_TOKEN_EXPIRATION: "accessTokenExpiresAt",
};

export const TOKEN_NAMES = {
  ACCESS_TOKEN: "ctc-act",
  REFRESH_TOKEN: "ctc-rft",
  ACCESS_TOKEN_EXPIRATION: "ctc-act-exp",
};

export const AUTH_COOKIE_OPTS: TCookieOpts = {
  path: "/",
  httpOnly: true,
  sameSite: "strict",
};

export const REFRESH_TOKEN_COOKIE_OPTS: TCookieOpts = {
  ...AUTH_COOKIE_OPTS,
  maxAge: 7 * 86400, // 7days
};

export const ACCESS_TOKEN_COOKIE_OPTS: TCookieOpts = {
  ...AUTH_COOKIE_OPTS,
  //   maxAge: 3 * 86400, // 3 days
  maxAge: 3600, // 1 hour
};

export const ACCESS_TOKEN_EXPIRATION_COOKIE_OPTS: TCookieOpts = {
  ...AUTH_COOKIE_OPTS,
  maxAge: 4 * 3600, // 4 days (1 day more than access token just in case)
};
