"use client";

import { updateFormUserDataApi } from "@/api/form-user-data";
import { ENV, ROUTES } from "@/constants";
import { index } from "@/utils/parse";
import parseClassNames from "@/utils/parseClassNames";
import React, { useEffect, useState } from "react";
import {
  Anchor,
  Button,
  ButtonAsync,
  ButtonBar,
  ButtonLink,
  Modal,
  Text,
  Title,
  UtilLoader,
} from "..";
import styles from "./table.module.css";

interface BranchFormUserDataTableProps {
  forms: FormUserData[];
  branchId: string;
}

const editEditable = async (id: string, editable: boolean) => {
  await updateFormUserDataApi({ id, editable });
};

const deleteForm = async (id: string) => {
  await updateFormUserDataApi({ id, deleted: true });
};

const MODALS = {
  EDITABLE_OFF: {
    title: "Bloquear edición",
    message:
      "Al bloquear la edición de este formulario, los usuarios no podrán modificarlo. podrás desbloquearlo en cualquier momento.",
    action: {
      label: "Bloquear",
      fun: async (id: string) => {
        await editEditable(id, false);

        return (indexed: Record<string, FormUserData>) => ({
          ...indexed,
          [id]: { ...indexed[id], editable: false },
        });
      },
    },
  },
  EDITABLE_ON: {
    title: "Desbloquear edición",
    message:
      "Al desbloquear la edición de este formulario, los usuarios podrán modificarlo. podrás bloquearlo en cualquier momento.",
    action: {
      label: "Desbloquear",
      fun: async (id: string) => {
        await editEditable(id, true);

        return (indexed: Record<string, FormUserData>) => ({
          ...indexed,
          [id]: { ...indexed[id], editable: true },
        });
      },
    },
  },
  DELETE: {
    title: "Eliminar formulario",
    message: "¿Estás seguro que quieres eliminar este formulario?",
    action: {
      label: "Eliminar",
      fun: async (id: string) => {
        await deleteForm(id);

        return (indexed: Record<string, FormUserData>) => {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete indexed[id];
          return indexed;
        };
      },
    },
  },
  _: {
    title: "",
    message: "",
    action: {
      label: "",
      fun: async () => {
        return (indexed: Record<string, FormUserData>) => indexed;
      },
    },
  },
};

interface ActionModalProps {
  focus: string;
  data: Record<string, FormUserData>;
  onChange: (data: Record<string, FormUserData>) => void;
  onClose: () => void;
}

function ActionModal(props: ActionModalProps) {
  const { data, focus, onChange, onClose } = props;
  const current = data[focus];
  const [modal, setModal] = useState<keyof typeof MODALS>("_");

  if (current === undefined) {
    onClose();
    return null;
  }

  return (
    <>
      <Title>{current.fullName}</Title>
      <ButtonLink
        color="primary"
        href={`${ENV.APP_URL}/form/${current.id}`}
        target="_blank"
      >
        Ver formulario
      </ButtonLink>
      <Button
        color={current.editable ? "success" : "danger"}
        onClick={() => {
          setModal(current.editable ? "EDITABLE_OFF" : "EDITABLE_ON");
        }}
      >
        {current.editable ? "bloquear edición" : "desbloquear edición"}
      </Button>
      <Button
        color="danger"
        onClick={() => {
          setModal("DELETE");
        }}
      >
        Eliminar formulario
      </Button>
      <Button color="secondary" onClick={onClose}>
        Cancelar
      </Button>
      <Modal
        onClose={() => {
          setModal("_");
        }}
        open={modal !== "_"}
      >
        <Title>{MODALS[modal].title}</Title>
        <Text>{MODALS[modal].message}</Text>
        <ButtonBar>
          <ButtonAsync
            onClick={async () => {
              const cb = await MODALS[modal].action.fun(current.id);
              onChange(cb(data));
              setModal("_");
            }}
            color="secondary"
          >
            {MODALS[modal].action.label}
          </ButtonAsync>
          <Button
            onClick={() => {
              setModal("_");
            }}
          >
            Cancelar
          </Button>
        </ButtonBar>
      </Modal>
    </>
  );
}
export default function BranchFormsDataUserTable(
  props: BranchFormUserDataTableProps,
) {
  const [indexed, setIndexed] = useState<
    Record<string, FormUserData> | undefined
  >(undefined);
  const [selected, setSelected] = useState<string>("");

  const handleAction = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const id = target.getAttribute("data-id");

    if (typeof id === "string") {
      setSelected(id);
    }
  };

  const closeModal = () => {
    setSelected("");
  };

  useEffect(() => {
    setIndexed(
      index(
        props.forms.sort((a, b) => a.fullName.localeCompare(b.fullName)),
        "id",
      ),
    );
  }, [props.forms]);

  return (
    <>
      <section
        className={parseClassNames(styles.table, styles.formUserData)}
        onClick={handleAction}
      >
        <div className={parseClassNames(styles.row, styles.header)}>
          <Text className={styles.cell}>Nombre</Text>
          <Text className={styles.cell} align="center">
            Estado
          </Text>
          <Text className={styles.cell} align="center">
            Completo
          </Text>
          <Text className={styles.cell} align="center">
            Editable
          </Text>
        </div>
        {indexed === undefined && (
          <div className={styles.empty}>
            <UtilLoader />
          </div>
        )}
        <div className={styles.body}>
          {indexed !== undefined &&
            Object.entries(indexed).map(([key, form]) => (
              <div key={form.id} className={styles.row} data-id={form.id}>
                <Text className={styles.cell} key={form.id}>
                  {form.fullName}
                </Text>
                <Text className={styles.cell} align="center">
                  {form.completed && !form.editable ? "✅" : "❌"}
                </Text>
                <Text className={styles.cell} align="center">
                  {form.completed ? "si" : "no"}
                </Text>
                <Text className={styles.cell} align="center">
                  {form.editable ? "si" : "no"}
                </Text>
              </div>
            ))}
        </div>
        <Anchor
          className={styles.footer}
          href={`${ROUTES.BRANCH}/${props.branchId}/forms/create`}
        >
          Crear nuevo formulario
        </Anchor>
      </section>
      <Modal onClose={closeModal} open={selected !== ""}>
        <ActionModal
          data={indexed ?? {}}
          focus={selected}
          onChange={setIndexed}
          onClose={closeModal}
        />
      </Modal>
    </>
  );
}
