import { ENV } from "@/constants/env";

interface GeneralProps {
  url: string;
  method: "GET" | "POST";
  body: any;
  host?: "next" | "api";
}

interface RequestMethodProps {
  url: string;
  body: any;
  host?: "next" | "api";
}

const general = async (props: GeneralProps) => {
  const url = props.host === "api" ? `${ENV.API_URL}${props.url}` : props.url;

  try {
    const response = await fetch(url, {
      body: JSON.stringify(props.body),
      headers: {
        "Content-Type": "application/json",
      },
      method: props.method,
    });

    const { success, details = {}, data } = await response.json();
    return {
      success: Boolean(success),
      details: details as Record<string, string>,
      data,
    } as const;
  } catch (error) {
    return {
      success: false,
      details: {
        _: "ERROR",
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
