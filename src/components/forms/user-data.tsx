"use client";

import { findOneBranchAPI } from "@/api/branch";
import { createFormUserDataApi } from "@/api/form-user-data";
import { ENV, MESSAGES } from "@/constants";
import useUserContext from "@/contexts/user";
import { IconCopy, IconWhatsapp } from "@/icons";
import { detailsToMessage } from "@/utils/details-to-message";
import whatsappLink from "@/utils/whatsapp-link";
import { type Details } from "@/validators/validatorHandler";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Anchor,
  Button,
  ButtonAsync,
  ButtonBar,
  ButtonLink,
  Modal,
  Title,
  UtilMessageError,
} from "..";

interface Props {
  branchId: string;
}

export default function FormUserData(props: Props) {
  const user = useUserContext();

  const { branchId } = props;
  const [fullName, setFullName] = useState("");
  const [branch, setBranch] = useState("");
  const [errors, setErrors] = useState<Details>({});

  const [modal, setModal] = useState(false);
  const [formId, setFormId] = useState("");
  const url = `${ENV.APP_URL}/form/${formId}`;

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const copyUrl = () => {
    console.log("copyUrl");
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    toast.promise(navigator.clipboard.writeText(url), {
      loading: "Copiando...",
      success: "Copiado",
      error: "Error al copiar",
    });
  };

  const handleSubmit = async (e: any) => {
    const response = await createFormUserDataApi({ fullName, branchId });
    if (response.success) {
      toast.success("Formulario creado");
      setFullName("");
      openModal();
      setErrors({});
      setFormId(response.data.id);
      return;
    }

    setErrors(
      detailsToMessage({
        details: response.details,
        dictionary: MESSAGES.FORM_USER_DATA,
      }),
    );
  };

  useEffect(() => {
    findOneBranchAPI({ id: branchId })
      .then((response) => {
        if (!response.success) {
          return;
        }

        setBranch(response.data?.name);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className="label">
          Sede
          <input className="input" type="text" value={branch} readOnly />
        </label>
        <label className="label">
          Creado por
          <input className="input" type="text" value={user.username} readOnly />
        </label>
        <label className="label">
          Nombre Completo
          <input
            className="input"
            type="text"
            name="fullName"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          <UtilMessageError>{errors.fullName}</UtilMessageError>
        </label>
        <ButtonAsync onClick={handleSubmit}>Crear</ButtonAsync>
      </form>
      <Modal open={modal} onClose={closeModal}>
        <Title>Compartir Link 🔗</Title>
        <Anchor href={url} target="_blank" embed break>
          {url}
        </Anchor>
        <ButtonBar>
          <ButtonLink
            icon
            href={whatsappLink({ message: url })}
            target="_blank"
          >
            <IconWhatsapp />
          </ButtonLink>
          <Button icon onClick={copyUrl}>
            <IconCopy />
          </Button>
        </ButtonBar>
      </Modal>
    </>
  );
}
