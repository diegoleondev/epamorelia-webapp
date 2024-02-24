"use client";

import { ButtonAsync, LayoutScreenAuth, UtilMessageError } from "@/components";
import { useAuth } from "@/hooks";
import { IconEye, IconEyeOff } from "@/icons";
import { useState } from "react";

interface Props {
  params: {
    token: string;
  };
}

const initialForm = {
  password: "",
};

type FormData = typeof initialForm;
type FormErrors = Partial<Record<keyof FormData | "_", string>>;

export default function ResetPasswordPage(props: Props) {
  const auth = useAuth();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<FormErrors>({});

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (props.params.token === null) return;

    await auth
      .resetPassword({ ...form, token: props.params.token })
      .then(setError)
      .catch(console.log);
  };

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <LayoutScreenAuth>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className="label-input-icon-error">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            onChange={handleChange}
            name="password"
            value={form.password}
            className="input"
            autoComplete="new-password"
          />
          <div>
            {showPassword ? (
              <IconEyeOff onClick={handleToggleShowPassword} />
            ) : (
              <IconEye onClick={handleToggleShowPassword} />
            )}
          </div>
          <UtilMessageError>{error?.password}</UtilMessageError>
        </label>
        <UtilMessageError>{error?._}</UtilMessageError>
        <ButtonAsync onClick={handleSubmit} type="submit">
          cambiar Contraseña
        </ButtonAsync>
      </form>
    </LayoutScreenAuth>
  );
}
