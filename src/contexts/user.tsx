"use client";

import { createContext, useContext, useEffect, useState } from "react";

type UserContextValue = {
  setData: (data: User) => void;
  clearData: () => void;
} & User;

const initialData: User = {
  id: "",
  username: "",
  email: "",
  roleId: "",
  branchId: "",
  createdAt: "",
  expiresIn: 0,
  token: "",
  verified: false,
};

const UserContext = createContext<UserContextValue>({
  ...initialData,
  setData: () => {},
  clearData: () => {},
});

export function UserContextProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(initialData);

  const clearData = () => {
    setUser((s) => ({ ...s, initialData }));
  };

  const setData = (data: User) => {
    setUser(data);
  };

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data !== null) {
      setUser(JSON.parse(data) as User);
      return;
    }

    setUser(initialData);
  }, []);

  useEffect(() => {
    if (user.id === "") return;
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ ...user, setData, clearData }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default function useUserContext() {
  return useContext(UserContext);
}
