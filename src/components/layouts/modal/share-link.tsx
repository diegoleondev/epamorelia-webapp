import { IconCopy, IconWhatsapp } from "@/icons";
import whatsappLink from "@/utils/whatsapp-link";
import toast from "react-hot-toast";
import {
  Anchor,
  Button,
  ButtonBar,
  ButtonLink,
  Modal,
  Title,
} from "../../../components";

interface Props {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalShareLink(props: Props) {
  const { url, isOpen, onClose } = props;

  const copyUrl = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    toast.promise(navigator.clipboard.writeText(url), {
      loading: "Copiando...",
      success: "Copiado",
      error: "Error al copiar",
    });
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Title>Compartir Link 🔗</Title>
      <Anchor href={url} target="_blank" embed break>
        {url}
      </Anchor>
      <ButtonBar>
        <ButtonLink icon href={whatsappLink({ message: url })} target="_blank">
          <IconWhatsapp />
        </ButtonLink>
        <Button icon onClick={copyUrl}>
          <IconCopy />
        </Button>
      </ButtonBar>
    </Modal>
  );
}
