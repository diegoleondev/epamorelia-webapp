import { LayoutScreenGeneric, Text } from "@/components";
import Paragraph from "@/components/texts/paragraph";

// DODO: refactor screen

export default function LayoutError() {
  return (
    <LayoutScreenGeneric title="Error" href="/">
      <Text>
        <Paragraph>
          Ha ocurrido un error, reporta el error e inténtalo de nuevo mas tarde.
        </Paragraph>
      </Text>
    </LayoutScreenGeneric>
  );
}
