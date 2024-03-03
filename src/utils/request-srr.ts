"use server";

import { ENV, HTTP_STATES } from "@/constants";
import { cookies } from "next/headers";
import { type RequestManager } from "./request";

const getSession = () => {
  return cookies().get("accessToken")?.value;
};

const requestSSR: RequestManager = async (props) => {
  const { method, url, body, next } = props;
  const urlEnriched = props.host === "next" ? url : `${ENV.API_URL}${url}`;

  try {
    const response = await fetch(urlEnriched, {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getSession()}`,
      },
      method,
      next,
    });

    const { success, details = {}, data } = await response.json();

    if (!response.ok) {
      details._ = details._ ?? String(response.status);
    }

    return { success, details, data };
  } catch (error) {
    console.error("Fetch error", error);

    return {
      success: false,
      details: {
        _: HTTP_STATES.UNKNOWN_ERROR,
      },
      data: null,
    };
  }
};

export default requestSSR;
