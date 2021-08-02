import React, { useContext, useEffect } from "react";
import { authContext } from "../../Contexts/AuthContext";
import MainLayout from "../../Layouts/MainLayout";

export default function AccountPage() {
  const { user } = useContext(authContext);

  console.log(user);

  return (
    <MainLayout>
      <h1 style={{ color: "#fff" }}>{user.email}</h1>
    </MainLayout>
  );
}
