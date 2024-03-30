"use client";

import { updateFormUserDataPublicApi } from "@/api/form-user-data";
import { MESSAGES } from "@/constants";
import { detailsToMessage } from "@/utils/details-to-message";
import { type Details } from "@/validators/validatorHandler";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { ButtonAsync, UtilMessageError } from "..";

interface Props {
  data: FormUserData;
}

const initialData = {
  id: "",
  userType: 0,
  fullName: "",
  branchId: "",
  phone: "",
  sex: false,
  emergencyContactFullName: "",
  emergencyContactPhone: "",
  allergies: "",
  diseases: "",
  medicine: "",
};

const getDataForm = (form: HTMLFormElement) => {
  const formData = new FormData(form);
  const data = {
    userType: Number(formData.get("userType")),
    fullName: String(formData.get("fullName")),
    phone: String(formData.get("phone")),
    branchId: String(formData.get("branchId")),
    sex: formData.get("sex") === "1",
    emergencyContactFullName: String(formData.get("emergencyContactFullName")),
    emergencyContactPhone: String(formData.get("emergencyContactPhone")),
    allergies: String(formData.get("allergies")),
    diseases: String(formData.get("diseases")),
    medicine: String(formData.get("medicine")),
  };

  return data;
};

const updateHandler = async (formRef: HTMLFormElement, formId: string) => {
  const data = getDataForm(formRef);

  const { details, success } = await updateFormUserDataPublicApi({
    ...data,
    id: formId,
  });

  if (success) {
    toast.success(`Datos actualizados`);
    return;
  }

  const messages = detailsToMessage({
    dictionary: MESSAGES.FORM_USER_DATA,
    details,
  });

  toast.error("Revisa los campos");

  return messages;
};

export default function FormUserDataPublic(props: Props) {
  const { data } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Details>({});

  const updateBranch = async () => {
    if (formRef.current === null) return;

    const messages = await updateHandler(
      formRef.current,
      data.id ?? initialData.id,
    );

    setErrors(messages ?? {});
  };

  return (
    <form
      ref={formRef}
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label className="label">
        <span>Nombre Completo (Auto asignado)</span>
        <input
          type="text"
          name="fullName"
          className="input"
          defaultValue={data.fullName ?? initialData.fullName}
          readOnly
        />
        <UtilMessageError>{errors.fullName}</UtilMessageError>
      </label>
      <label className="label">
        <span>Teléfono</span>
        <input
          type="number"
          name="phone"
          className="input"
          defaultValue={data.phone ?? initialData.phone}
        />
        <UtilMessageError>{errors.phone}</UtilMessageError>
      </label>
      <label className="label">
        <span>Sede (Auto asignado)</span>
        <input
          type="text"
          name="branchId"
          className="input"
          defaultValue={data.branchName ?? initialData.branchId}
          readOnly
        />
      </label>
      <label className="label">
        <span>Genero</span>
        <select
          className="input"
          defaultValue={(data.sex, initialData.sex ? "1" : "0")}
        >
          <option value="0">Femenino</option>
          <option value="1">Masculino</option>
        </select>
        <UtilMessageError>{errors.sex}</UtilMessageError>
      </label>
      <label className="label">
        <span>Contacto de Emergencia</span>
        <input
          type="text"
          name="emergencyContactFullName"
          className="input"
          defaultValue={
            data.emergencyContactFullName ??
            initialData.emergencyContactFullName
          }
        />
        <UtilMessageError>{errors.emergencyContactFullName}</UtilMessageError>
      </label>
      <label className="label">
        <span>Teléfono de Emergencia</span>
        <input
          type="number"
          name="emergencyContactPhone"
          className="input"
          defaultValue={
            data.emergencyContactPhone ?? initialData.emergencyContactPhone
          }
        />
        <UtilMessageError>{errors.emergencyContactPhone}</UtilMessageError>
      </label>
      <label className="label">
        <span>Alergias</span>
        <input
          type="text"
          name="allergies"
          className="input"
          defaultValue={data.allergies ?? initialData.allergies}
        />
        <UtilMessageError>{errors.allergies}</UtilMessageError>
      </label>
      <label className="label">
        <span>Enfermedades</span>
        <input
          type="text"
          name="diseases"
          className="input"
          defaultValue={data.diseases ?? initialData.diseases}
        />
        <UtilMessageError>{errors.diseases}</UtilMessageError>
      </label>
      <label className="label">
        <span>Medicamentos</span>
        <input
          type="text"
          name="medicine"
          className="input"
          defaultValue={data.medicine ?? initialData.medicine}
        />
        <UtilMessageError>{errors.medicine}</UtilMessageError>
      </label>
      <ButtonAsync type="submit" onClick={updateBranch}>
        Guardar
      </ButtonAsync>
      <UtilMessageError>{errors._}</UtilMessageError>
    </form>
  );
}
