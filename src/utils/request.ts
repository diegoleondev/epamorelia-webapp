interface RequestOptions {
  url: string;
  body?: any;
  host?: "next" | "api";
  next?: NextFetchRequestConfig;
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
}

export declare type RequestManager = <Data>(options: RequestOptions) => Promise<
  | {
      success: true;
      details: Record<string, string>;
      data: Data;
    }
  | {
      success: false;
      details: Record<string, string>;
      data: null;
    }
>;
