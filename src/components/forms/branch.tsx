"use client";

import { MESSAGES } from "@/constants";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { createBranchApi, updateBranchApi } from "@/api/branch";
import { ButtonAsync, UtilMessageError } from "@/components";
import { detailsToMessage } from "@/utils/details-to-message";
import { type Details } from "@/validators/validatorHandler";

interface BranchFormProps {
  initialData?: {
    id?: string;
    name: string;
    limit: number;
  };
}

const getDataForm = (form: HTMLFormElement) => {
  const formData = new FormData(form);
  const data = {
    name: String(formData.get("name")),
    limit: parseInt(formData.get("limit")?.toString() ?? "0"),
  };

  return data;
};

const submitHandler = async (formRef: HTMLFormElement) => {
  const data = getDataForm(formRef);

  const { details, success } = await createBranchApi(data);

  if (success) {
    formRef.reset();
    toast.success(`Sede ${data.name} creada`);
    return;
  }

  const messages = detailsToMessage({
    dictionary: MESSAGES.BRANCH,
    details,
  });

  return messages;
};

const updateHandler = async (formRef: HTMLFormElement, branchId: string) => {
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
};

export default function FormBranch(props: BranchFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { initialData } = props;
  const [errors, setErrors] = useState<Details>({});

  const isUpdateMode = typeof initialData?.id === "string";

  const createBranch = async () => {
    if (formRef.current === null) return;

    const messages = await submitHandler(formRef.current);
    if (messages === undefined) return;

    setErrors(messages);
  };

  const updateBranch = async () => {
    if (formRef.current === null) return;

    const messages = await updateHandler(
      formRef.current,
      initialData?.id ?? "",
    );
    if (messages === undefined) return;

    setErrors(messages);
  };

  const actionButton = isUpdateMode ? (
    <ButtonAsync type="submit" onClick={updateBranch}>
      Actualizar
    </ButtonAsync>
  ) : (
    <ButtonAsync type="submit" onClick={createBranch}>
      Guardar
    </ButtonAsync>
  );

  return (
    <form
      className="form"
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
      }}
      onClick={() => {
        setErrors({});
      }}
    >
      <label className="label">
        <span>Nombre</span>
        <input
          type="text"
          name="name"
          className="input"
          defaultValue={initialData?.name}
        />
        <UtilMessageError>{errors.name}</UtilMessageError>
      </label>
      <label className="label">
        <span>Limite</span>
        <input
          type="number"
          name="limit"
          className="input"
          defaultValue={initialData?.limit}
        />
        <UtilMessageError>{errors.limit}</UtilMessageError>
      </label>
      {actionButton}
      <UtilMessageError>{errors._}</UtilMessageError>
    </form>
  );
}
