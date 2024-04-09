"use client";

import {
  Button,
  ButtonLink,
  Modal,
  Text,
  Title,
  UtilLoader,
} from "@/components";
import { ROUTES } from "@/constants";
import parseClassNames from "@/utils/parseClassNames";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./table.module.css";

interface BranchTableProps {
  data: Branch[];
}

interface ActionsProps {
  selected: string;
  onClose: () => void;
  data: Branch[];
}

function ModalActions(props: ActionsProps) {
  const [branch, setBranch] = useState<Branch | undefined>(undefined);

  useEffect(() => {
    const branch = props.data.find((branch) => branch.id === props.selected);

    if (branch !== undefined) {
      setBranch(branch);
    }
  }, [props.data]);

  return (
    <>
      <Title>{branch?.name}</Title>
      <ButtonLink href={`${ROUTES.BRANCH}/${branch?.id}`}>Ver</ButtonLink>
      <Button onClick={() => toast.success("En desarrollo 😊")}>
        Descargar excel
      </Button>
      <Button onClick={props.onClose} color="secondary">
        Cerrar
      </Button>
    </>
  );
}

export default function Table(props: BranchTableProps) {
  const { data } = props;
  const [modal, setModal] = useState<string>("");

  const handleAction = (event: any) => {
    const target = event.target as HTMLElement;
    const id = target.getAttribute("data-id");

    if (typeof id === "string") {
      console.log(id);
      setModal(id);
    }
  };

  const closeModal = () => {
    setModal("");
  };

  return (
    <>
      <section className={parseClassNames(styles.table)}>
        <div className={parseClassNames(styles.row, styles.header)}>
          <Text className={styles.cell}>Sede</Text>
          <Text className={styles.cell} align="center">
            Limite
          </Text>
          <Text className={styles.cell} align="center">
            Asistentes
          </Text>
        </div>
        {data === undefined && (
          <div className={styles.empty}>
            <UtilLoader />
          </div>
        )}
        <div className={styles.body} onClick={handleAction}>
          {data.map((branch) => (
            <div key={branch.id} data-id={branch.id} className={styles.row}>
              <Text className={styles.cell}>{branch.name}</Text>
              <Text className={styles.cell} align="center">
                {branch.limit}
              </Text>
              <Text className={styles.cell} align="center">
                {branch.counter}
              </Text>
            </div>
          ))}
        </div>
        <ButtonLink className={styles.footer} href={`${ROUTES.BRANCH}/new `}>
          Agregar nueva sede
        </ButtonLink>
      </section>
      <Modal open={modal !== ""} onClose={closeModal}>
        <ModalActions data={data} selected={modal} onClose={closeModal} />
      </Modal>
    </>
  );
}
