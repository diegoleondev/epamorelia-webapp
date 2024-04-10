"use client";

import { ENV, ROUTES } from "@/constants";
import { isNullish } from "@/utils/check";
import parseClassNames from "@/utils/parseClassNames";
import { useEffect, useState } from "react";
import { Button, ButtonLink, Modal, ModalShareLink, Text, Title } from "..";
import styles from "./table.module.css";

interface Element {
  id: string;
  reference: string | null;
  roleId: string;
  sourceUserName: string;
  targetUserName: string;
}

interface BranchInvitationsProps {
  data: Element[] | null | undefined;
}

interface ActionModalProps {
  selected: string;
  data: BranchInvitationsProps["data"];
  onUpdateData: (data: BranchInvitationsProps["data"]) => void;
}

function ActionModal(props: ActionModalProps) {
  const [selected, setSelected] = useState<Element | null>();
  const [shareLink, setShareLink] = useState(false);

  if (isNullish(props.data)) return null;

  const handleCloseShareLink = () => {
    setShareLink(false);
  };

  const handleOpenShareLink = () => {
    setShareLink(true);
  };

  useEffect(() => {
    const fined = props.data?.find((e) => e.id === props.selected);

    setSelected(fined);
  }, [props.selected]);

  if (isNullish(selected)) return null;

  return (
    <>
      <Title>{selected.reference ?? "Sin ref"}</Title>
      <Button onClick={handleOpenShareLink}>Compartir link</Button>
      <ModalShareLink
        isOpen={shareLink}
        onClose={handleCloseShareLink}
        url={`${ENV.APP_URL}${ROUTES.SIGN_UP}/${selected.id}`}
      />
    </>
  );
}

export default function BranchInvitations(props: BranchInvitationsProps) {
  const [modal, setModal] = useState("");

  const closeModal = () => {
    setModal("");
  };

  const handleAction = (e: any) => {
    const id = e.target.getAttribute("data-id");

    if (typeof id !== "string") return;
    setModal(id);
  };

  return (
    <>
      <section className={parseClassNames(styles.table, styles.bcIn)}>
        <div className={parseClassNames(styles.row, styles.header)}>
          <Text className={styles.cell}>Ref</Text>
          <Text className={styles.cell}>role</Text>
          <Text className={styles.cell}>Origen</Text>
          <Text className={styles.cell}>Nombre</Text>
        </div>
        <div className={styles.body} onClick={handleAction}>
          {props.data?.map((branch) => (
            <div key={branch.id} data-id={branch.id} className={styles.row}>
              <Text className={styles.cell}>{branch.reference}</Text>
              <Text className={styles.cell}>{branch.roleId}</Text>
              <Text className={styles.cell}>{branch.sourceUserName}</Text>
              <Text className={styles.cell}>{branch.targetUserName}</Text>
            </div>
          ))}
        </div>
        <ButtonLink className={styles.footer} href={`${ROUTES.USER}/new`}>
          Invitar usuario
        </ButtonLink>
      </section>
      <Modal onClose={closeModal} open={modal !== ""}>
        <ActionModal
          selected={modal}
          data={props.data}
          onUpdateData={(data) => {
            closeModal();
          }}
        />
      </Modal>
    </>
  );
}
