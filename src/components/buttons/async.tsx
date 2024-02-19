"use client";

import { UtilLoader } from "@/components";
import { useState } from "react";
import Button from "./normal";
import type { ButtonAsyncProps } from "./types";

const STATE = {
  IDLE: "idle",
  LOADING: "loading",
};

export default function ButtonAsync(props: ButtonAsyncProps) {
  const [state, setState] = useState(STATE.IDLE);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const fun = async () => {
      if (typeof props.onClick !== "function") return;
      setState(STATE.LOADING);

      await props.onClick(event);
    };

    fun()
      .then(() => {
        setState(STATE.IDLE);
      })
      .catch(() => {
        setState(STATE.IDLE);
      });
  };

  const MESSAGES = {
    [STATE.IDLE]: props.children,
    [STATE.LOADING]: <UtilLoader />,
  };

  return (
    <Button {...props} onClick={handleClick} disabled={state === STATE.LOADING}>
      {MESSAGES[state]}
    </Button>
  );
}
