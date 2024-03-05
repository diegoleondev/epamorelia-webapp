import requestSSR from "@/utils/request-srr";
import { findOneUserValidator, type FindOneUserProps } from "@/validators/user";

export async function findOneUserApi(props: FindOneUserProps) {
  const preRequest = findOneUserValidator(props);
  if (!preRequest.success) return preRequest;

  return await requestSSR<User>({
    url: `/user/${props.id}`,
    host: "api",
    method: "GET",
  });
}
