"use client";

import { updateFormUserDataPublicApi } from "@/api/form-user-data";
import { MESSAGES } from "@/constants";
import { detailsToMessage } from "@/utils/details-to-message";
import { type Details } from "@/validators/validatorHandler";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { ButtonAsync, Text, UtilMessageError } from "..";

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
  console.log(formData.get("sex"));
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
        <Text>Nombre Completo</Text>
        <input
          type="text"
          name="fullName"
          className="input"
          defaultValue={data.fullName ?? initialData.fullName}
        />
        <UtilMessageError>{errors.fullName}</UtilMessageError>
      </label>
      <label className="label">
        <Text>Teléfono</Text>
        <input
          type="number"
          name="phone"
          className="input"
          defaultValue={data.phone ?? initialData.phone}
        />
        <UtilMessageError>{errors.phone}</UtilMessageError>
      </label>
      <label className="label">
        <Text>Soy</Text>
        <select
          className="input"
          name="userType"
          defaultValue={data.userType ?? initialData.userType}
        >
          <option value="0">EPA</option>
          <option value="1">Tio</option>
          <option value="2">Asesor</option>
        </select>
      </label>
      <label className="label">
        <Text>Sede (Auto asignado)</Text>
        <input
          type="text"
          name="branchId"
          className="input"
          defaultValue={data.branchName ?? initialData.branchId}
          readOnly
        />
      </label>
      <label className="label">
        <Text>Genero</Text>
        <select
          className="input"
          name="sex"
          defaultValue={data.sex ?? initialData.sex ? "1" : "0"}
        >
          <option value="0">Femenino</option>
          <option value="1">Masculino</option>
        </select>
        <UtilMessageError>{errors.sex}</UtilMessageError>
      </label>
      <br />
      <span>Contacto de Emergencia</span>
      <label className="label">
        <Text>Nombre</Text>
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
        <Text>Teléfono</Text>
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
      <br />
      <span>Información Médica</span>
      <label className="label">
        <Text>
          ¿Eres alérgico a algún alimento o sustancia en particular? Si es así,
          ¿cuál es tu alergia?
        </Text>
        <textarea
          name="allergies"
          className="input"
          defaultValue={data.allergies ?? initialData.allergies}
        />
        <UtilMessageError>{errors.allergies}</UtilMessageError>
      </label>
      <label className="label">
        <Text>
          ¿Padeces alguna enfermedad crónica o afección médica que requiera
          atención especial? Si es así, ¿cuál es la enfermedad o condición que
          enfrentas?
        </Text>
        <textarea
          name="diseases"
          className="input"
          defaultValue={data.diseases ?? initialData.diseases}
        />
        <UtilMessageError>{errors.diseases}</UtilMessageError>
      </label>
      <label className="label">
        <Text>
          ¿Tomas algún medicamento de forma regular o puntualmente para tratar
          alguna condición médica? Si es así, ¿cuál es el medicamento que tomas
          y para qué lo necesitas?
        </Text>
        <textarea
          name="medicine"
          className="input"
          defaultValue={data.medicine ?? initialData.medicine}
        />
        <UtilMessageError>{errors.medicine}</UtilMessageError>
      </label>
      <br />
      <ButtonAsync type="submit" onClick={updateBranch}>
        Guardar
      </ButtonAsync>
      <UtilMessageError>{errors._}</UtilMessageError>
    </form>
  );
}
