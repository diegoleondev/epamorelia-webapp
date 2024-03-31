"use client";

import { ButtonAsync, LayoutScreenGeneric, Text } from "@/components";
import Paragraph from "@/components/texts/paragraph";
import { useAuth } from "@/hooks";
interface ProfilePageProps {
  params: {
    userId: string;
  };
}

export default function ProfilePage(props: ProfilePageProps) {
  const auth = useAuth();

  return (
    <LayoutScreenGeneric href="/" title="Perfil">
      <h1>Profile</h1>
      <Text>
        <Paragraph>Nombre: {auth.user.username}</Paragraph>
        <Paragraph>Email: {auth.user.email}</Paragraph>
        <Paragraph>Role: {auth.user.roleId}</Paragraph>
        <Paragraph>Branch: {auth.user.branchId}</Paragraph>
        <Paragraph>Id: {auth.user.id}</Paragraph>
      </Text>
      <ButtonAsync
        color="secondary"
        onClick={async () => await auth.logOut().catch(console.error)}
      >
        cerrar sesión
      </ButtonAsync>
    </LayoutScreenGeneric>
  );
}
