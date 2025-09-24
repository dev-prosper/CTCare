"use server";

import { TCookieOpts } from "@/types";
import { cookies } from "next/headers";
import { COOKIE_NAMES } from "@/constants";
import {
  ACCESS_TOKEN_COOKIE_OPTS,
  REFRESH_TOKEN_COOKIE_OPTS,
  ACCESS_TOKEN_EXPIRATION_COOKIE_OPTS,
} from "@/constants";

export const getCookie = async (name: string) => {
  return (await cookies()).get(name)?.value;
};

export const setCookies = async (
  name: string,
  value: string,
  cookieOpts?: TCookieOpts,
) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, cookieOpts);
};

export const deleteCookies = async (name: string) => {
  (await cookies()).delete(name);
};

export const getAccessRefreshTokens = async () => {
  const [accessToken, refreshToken, accessTokenExpiration] = await Promise.all([
    getCookie(COOKIE_NAMES.ACCESS_TOKEN),
    getCookie(COOKIE_NAMES.REFRESH_TOKEN),
    getCookie(COOKIE_NAMES.ACCESS_TOKEN_EXPIRATION),
  ]);
  return { accessToken, refreshToken, accessTokenExpiration };
};

export const setAccessRefreshTokens = async (
  accessToken: string,
  refreshToken: string,
) => {
  await Promise.all([
    setCookies(
      COOKIE_NAMES.ACCESS_TOKEN,
      accessToken,
      ACCESS_TOKEN_COOKIE_OPTS,
    ),
    setCookies(
      COOKIE_NAMES.REFRESH_TOKEN,
      refreshToken,
      REFRESH_TOKEN_COOKIE_OPTS,
    ),
    setCookies(
      COOKIE_NAMES.ACCESS_TOKEN_EXPIRATION,
      (new Date().getTime() + 3 * 86400 * 1000).toString(),
      ACCESS_TOKEN_EXPIRATION_COOKIE_OPTS,
    ),
  ]);
};

export const deleteAccessRefreshTokens = async () => {
  await Promise.all([
    deleteCookies(COOKIE_NAMES.ACCESS_TOKEN),
    deleteCookies(COOKIE_NAMES.REFRESH_TOKEN),
    deleteCookies(COOKIE_NAMES.ACCESS_TOKEN_EXPIRATION),
  ]);
};
