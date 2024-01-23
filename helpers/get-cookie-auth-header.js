import http from "k6/http";
import { check } from "k6";
const config = require("../config.js").default
import { userTypes } from "../users.js";

export default function getCookieAuthHeader(role) {
  const authEndpoint = `${config.hostUrl}/api/login`;
  const authPayload = { user: userTypes[role] };
  console.log("AUTH PAYLOAD", JSON.stringify(authPayload))
  console.log("AUTH ENDPOINT", authEndpoint)

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const authRes = http.post(authEndpoint, JSON.stringify(authPayload), {
    headers,
  });

  console.log("AUTH STATUS", authRes.status)
  check(authRes, {
    "auth is status 200": (r) => r.status === 200,
  });
  const vuJar = http.cookieJar();
  const cookiesForURL = vuJar.cookiesForURL(authRes.url);
  check(null, {
    "vu jar has cookie '_hous_permit_portal_session'": () => cookiesForURL._hous_permit_portal_session.length > 0,
  });
  return `_hous_permit_portal_session=${cookiesForURL._hous_permit_portal_session[0]}`;
}
