"use client";

import { findAllBranchesAPI } from "@/api/branch";
import { createUserInvitationApi } from "@/api/user-invitation";
import { ButtonAsync, ModalShareLink, UtilMessageError } from "@/components";
import { ENV, HTTP_STATES, MESSAGES, ROUTES } from "@/constants";
import ROLES from "@/constants/roles";
import useUserContext from "@/contexts/user";
import { detailsToMessage } from "@/utils/details-to-message";
import { type Details } from "@/validators/validatorHandler";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Paragraph from "../texts/paragraph";

interface Props {
  initialData?: {
    id: string;
    branchId: string;
    roleId: number;
    sourceId: string;
  };
}

interface SubmitInvitation {
  roleId: string;
  branchId: string;
  reference: string;
}

const submitHandler = async (
  form: Partial<SubmitInvitation>,
  formRef: HTMLFormElement,
) => {
  // @ts-expect-error data is not defined
  const { details, success, data } = await createUserInvitationApi(form);

  if (success) {
    formRef.reset();
    toast.success(`Invitación creada.`);
    return {
      messages: {},
      data: data.id,
    };
  }

  const messages = detailsToMessage({
    dictionary: MESSAGES.BRANCH,
    details,
  });

  return {
    messages,
    data: null,
  };
};

const getRoles = (weight: number) =>
  Object.entries(ROLES)
    .filter(([, role]) => role < weight)
    .map(([key]) => key);

export default function FormUser(props: Props) {
  const user = useUserContext();

  const formRef = useRef<HTMLFormElement>(null);
  const [allBranches, setAllBranches] = useState<Branch[]>([]);
  const [errors, setErrors] = useState<Details>({});
  const [form, setForm] = useState({
    roleId: "STAFF",
    branchId: props.initialData?.branchId ?? user.branchId,
    reference: "",
  });

  const [invitationId, setInvitationId] = useState<string | null>(null);

  const onUpdate = (event: any) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createUserInvitation = async () => {
    if (formRef.current === null) return;
    const response = await submitHandler(form, formRef.current);
    setErrors(response.messages);
    setInvitationId(response.data);
  };

  useEffect(() => {
    findAllBranchesAPI()
      .then((res) => {
        if (res.success) {
          setAllBranches(res.data.sort((a, b) => a.name.localeCompare(b.name)));
        }
      })
      .catch(() => {});
  }, []);

  if (errors._ === HTTP_STATES.UNAUTHORIZED) {
    return <Paragraph>Acceso no autorizado</Paragraph>;
  }

  return (
    <>
      <form
        className="form"
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className="label">
          Rol
          <select
            className="input"
            name="roleId"
            value={form.roleId}
            onChange={onUpdate}
          >
            {getRoles(user.role).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <UtilMessageError>{errors.roleId}</UtilMessageError>
        </label>
        {user.role >= ROLES.ADMIN && (
          <label className="label">
            Sede
            <select
              className="input"
              name="branchId"
              defaultValue={user.branchId}
              onChange={onUpdate}
              value={form.branchId}
            >
              {allBranches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
            <UtilMessageError>{errors.branchId}</UtilMessageError>
          </label>
        )}
        <label>
          Referencia
          <input
            type="text"
            name="reference"
            className="input"
            value={form.reference}
            onChange={onUpdate}
          />
          <UtilMessageError>{errors.reference}</UtilMessageError>
        </label>
        <ButtonAsync onClick={createUserInvitation}>Crear</ButtonAsync>
        <UtilMessageError>{errors._}</UtilMessageError>
      </form>
      <ModalShareLink
        isOpen={invitationId !== null}
        onClose={() => {
          setInvitationId(null);
        }}
        url={`${ENV.APP_URL}${ROUTES.SIGN_UP}/${invitationId}`}
      />
      <Toaster />
    </>
  );
}
