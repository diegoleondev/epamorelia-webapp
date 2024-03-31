import requestCSR from "@/utils/request-csr";
import requestSSR from "@/utils/request-srr";
import { objectToSearchParams } from "@/utils/url";
import {
  FindAllFormUserDataValidator,
  createFormUserDataValidator,
  findOneFormUserDataValidator,
  updateFormUserDataPublicValidator,
  updateFormUserDataValidator,
  type CreateFormUserDataOptions,
  type DeleteFormUserDataOptions,
  type FindAllFormUserDataOptions,
  type FindOneFormUserDataOptions,
  type UpdateFormUserDataOptions,
} from "@/validators/form-user-data";

export const findOneFormUserDataApi = async (
  options: FindOneFormUserDataOptions,
) => {
  const preRequest = findOneFormUserDataValidator(options);
  if (!preRequest.success) return preRequest;

  return await requestSSR<FormUserData>({
    url: `/form/user-data/${options.id}`,
    host: "api",
    method: "GET",
  });
};

export async function findAllFormUserDataApi(
  options: FindAllFormUserDataOptions,
) {
  const preRequest = FindAllFormUserDataValidator(options);
  if (!preRequest.success) return preRequest;

  return await requestSSR<FormUserData[]>({
    url: `/form/user-data?${objectToSearchParams(options)}`,
    host: "api",
    method: "GET",
  });
}

export async function createFormUserDataApi(
  options: CreateFormUserDataOptions,
) {
  const preRequest = createFormUserDataValidator(options);
  if (!preRequest.success) return preRequest;

  return await requestCSR<{ id: string }>({
    url: "/form/user-data",
    host: "api",
    method: "POST",
    body: options,
  });
}

export async function updateFormUserDataApi(
  options: UpdateFormUserDataOptions,
) {
  const preRequest = updateFormUserDataValidator(options);
  if (!preRequest.success) return preRequest;

  return await requestCSR<{ id: string }>({
    url: `/form/user-data/${options.id}`,
    host: "api",
    method: "PATCH",
    body: options,
  });
}

export async function updateFormUserDataPublicApi(
  options: UpdateFormUserDataOptions,
) {
  const preRequest = updateFormUserDataPublicValidator(options);
  if (!preRequest.success) return preRequest;

  return await requestCSR<{ id: string }>({
    url: `/form/user-data/${options.id}/public/`,
    host: "api",
    method: "PATCH",
    body: options,
  });
}

export async function deleteFormUserDataApi(
  options: DeleteFormUserDataOptions,
) {
  return await requestCSR<{ id: string }>({
    url: `/form/user-data/${options.id}`,
    host: "api",
    method: "DELETE",
    body: options,
  });
}
