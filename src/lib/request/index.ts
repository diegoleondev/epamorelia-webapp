import { ENV, HTTP_STATES } from "@/constants";
interface GeneralProps {
  url: string;
  method: "GET" | "POST";
  body?: any;
  host?: "next" | "api";
}

interface RequestMethodProps {
  url: string;
  body?: any;
  host?: "next" | "api";
}

const getSession = () => {
  try {
    return localStorage.getItem("accessToken");
  } catch (error) {
    return "no token";
  }
};

const general = async (props: GeneralProps) => {
  const url = props.host === "api" ? `${ENV.API_URL}${props.url}` : props.url;

  try {
    const response = await fetch(url, {
      body: JSON.stringify(props.body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getSession()}`,
      },
      method: props.method,
    });

    const { success, details = {}, data } = await response.json();
    details._ = details._ ?? String(response.status);

    return {
      success: Boolean(success),
      details: details as Record<string, string>,
      data,
    } as const;
  } catch (error) {
    console.error("Fetch error", error);
    return {
      success: false,
      details: {
        _: HTTP_STATES.UNKNOWN_ERROR,
      },
      data: null,
    } as const;
  }
};

const get = async (props: RequestMethodProps) =>
  await general({
    url: props.url,
    method: "GET",
    body: props.body,
    host: props.host,
  });

const post = async (props: RequestMethodProps) =>
  await general({
    url: props.url,
    method: "POST",
    body: props.body,
    host: props.host,
  });

const request = {
  get,
  post,
};

export default request;
