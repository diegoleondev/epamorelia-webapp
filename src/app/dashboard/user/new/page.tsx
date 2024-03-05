"use client";

import { FormUserInvitation, LayoutScreenGeneric } from "@/components";

export default function NewUserPage() {
  return (
    <LayoutScreenGeneric title="Invitar Usuario" href="/">
      <FormUserInvitation />
    </LayoutScreenGeneric>
  );
}
