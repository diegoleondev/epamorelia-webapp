"use client";

import { findAllBranchesAPI } from "@/api/branch";
import { createUserInvitationApi } from "@/api/user-invitation";
import { ButtonAsync, ButtonLink, UtilMessageError } from "@/components";
import { ENV, MESSAGES, ROUTES } from "@/constants";
import useUserContext from "@/contexts/user";
import { detailsToMessage } from "@/utils/details-to-message";
import { type Details } from "@/validators/validatorHandler";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  initialData?: {
    id: string;
    branchId: string;
    roleId: number;
    sourceId: string;
  };
}

const getDataForm = (form: HTMLFormElement) => {
  const formData = new FormData(form);
  const data = {
    roleId: String(formData.get("roleId")) as "ADMIN",
    branchId: String(formData.get("branchId")),
    reference: String(formData.get("reference")),
  };

  return data;
};

const submitHandler = async (formRef: HTMLFormElement) => {
  const form = getDataForm(formRef);

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

/* const updateHandler = async (formRef: HTMLFormElement, branchId: string) => {
  const data = getDataForm(formRef);

  const { details, success } = await updateBranchApi({ ...data, id: branchId });

  if (success) {
    formRef.reset();
    toast.success(`Sede ${data.name} actualizada`);
    return;
  }

  const messages = detailsToMessage({
    dictionary: MESSAGES.BRANCH,
    details,
  });

  return messages;
}; */

export default function FormUser(props: Props) {
  const user = useUserContext();

  const formRef = useRef<HTMLFormElement>(null);
  const [allBranches, setAllBranches] = useState<Branch[]>([]);
  const [errors, setErrors] = useState<Details>({});

  const [invitationId, setInvitationId] = useState<string | null>(null);

  const createUserInvitation = async () => {
    if (formRef.current === null) return;
    const response = await submitHandler(formRef.current);
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
          <select className="input" name="roleId">
            <option value="ADMIN">ADMIN</option>
            <option value="MANAGER">MANAGER</option>
            <option value="STAFF">STAFF</option>
            <option value="USER">USER</option>
          </select>
          <UtilMessageError>{errors.roleId}</UtilMessageError>
        </label>
        <label className="label">
          Sede
          <select
            className="input"
            name="branchId"
            defaultValue={user.branchId}
          >
            {allBranches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
          <UtilMessageError>{errors.branchId}</UtilMessageError>
        </label>
        <label>
          Referencia
          <input type="text" name="reference" className="input" />
          <UtilMessageError>{errors.reference}</UtilMessageError>
        </label>
        <ButtonAsync onClick={createUserInvitation}>Crear</ButtonAsync>
        <UtilMessageError>{errors._}</UtilMessageError>
      </form>
      {invitationId !== null && (
        <ButtonLink
          href={`https://api.whatsapp.com/send?text=Hola, te invito a EPA Morelia, por favor registrate en la siguiente ${ENV.APP_URL}/${ROUTES.SIGN_UP}/${invitationId}`}
          target="_blank"
        >
          Enviar invitation por WhatsApp
        </ButtonLink>
      )}
      <Toaster />
    </>
  );
}
