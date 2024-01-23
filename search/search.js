import http from "k6/http";
import { check } from "k6";
import getCookieAuthHeader from "../helpers/get-cookie-auth-header.js";
const config = require("../config.js").default;
import { jurisdictionItemsSearchPayload } from "../queries/search-jurisdictions.js";

const jurisdictionSearchEndpoint = `${config.hostUrl}/api/jurisdictions/search`;

export const options = {
  thresholds: {
    // 90% of requests must finish within 400ms.
    http_req_duration: ["p(90) < 400"],
    // During the whole test execution, the error rate must be lower than 1%.
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Cookike: getCookieAuthHeader("super_admin"),
  };

  const jurisdictionRes = http.post(
    jurisdictionSearchEndpoint,
    JSON.stringify(jurisdictionItemsSearchPayload),
    {
      headers,
    }
  );
  console.log("JURISDICTION RESPONSE STATUS", jurisdictionRes.status);
  check(jurisdictionRes, {
    "search is status 200": (r) => r.status === 200
  })
}