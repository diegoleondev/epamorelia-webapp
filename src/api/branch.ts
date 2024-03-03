import requestCSR from "@/utils/request-csr";
import {
  createBranchValidator,
  getBranchValidator,
  updateBranchValidator,
  type CreateBranchProps,
  type GetBranchProps,
  type GetBranchUsersProps,
  type UpdateBranchProps,
} from "@/validators/branch";
import requestSSR from "../utils/request-srr";

export async function getBranchAPI(props: GetBranchProps) {
  const preResponse = getBranchValidator(props);
  if (!preResponse.success) return preResponse;

  return await requestSSR<Branch>({
    url: `/branch/${props.id}`,
    method: "GET",
  });
}

export async function getBranchUsersAPI(props: GetBranchUsersProps) {
  const preResponse = getBranchValidator(props);
  if (!preResponse.success) return preResponse;

  return await requestSSR<User[]>({
    url: `/branch/${props.id}/users`,
    method: "GET",
  });
}

export async function getAllBranchesAPI() {
  return await requestSSR<Branch[]>({
    url: "/branch",
    method: "GET",
  });
}

export async function createBranchApi(body: CreateBranchProps) {
  const preResponse = createBranchValidator(body);
  if (!preResponse.success) return preResponse;

  return await requestCSR<Branch["id"]>({
    url: "/branch",
    body,
    method: "POST",
  });
}

export async function updateBranchApi(body: UpdateBranchProps) {
  const preResponse = updateBranchValidator(body);
  if (!preResponse.success) return preResponse;

  return await requestCSR<Branch["id"]>({
    url: `/branch/${body.id}`,
    body,
    method: "PATCH",
  });
}
