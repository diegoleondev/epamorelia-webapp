import requestCSR from "@/utils/request-csr";
import {
  createBranchValidator,
  findOneBranchValidator,
  updateBranchValidator,
  type CreateBranchProps,
  type FindAllBranchUsersProps,
  type UpdateBranchProps,
  type findOmeBranchProps,
} from "@/validators/branch";
import requestSSR from "../utils/request-srr";

export async function findOneBranchAPI(props: findOmeBranchProps) {
  const preResponse = findOneBranchValidator(props);
  if (!preResponse.success) return preResponse;

  return await requestSSR<Branch>({
    url: `/branch/${props.id}`,
    method: "GET",
  });
}

export async function findAllBranchUsersAPI(props: FindAllBranchUsersProps) {
  const preResponse = findOneBranchValidator(props);
  if (!preResponse.success) return preResponse;

  return await requestSSR<User[]>({
    url: `/branch/${props.id}/users`,
    method: "GET",
  });
}

export async function findAllBranchesAPI() {
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
