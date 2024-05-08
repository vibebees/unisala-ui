import React, { useRef } from "react";
import { useIonToast } from "@ionic/react";
import "./auth.css";
import { useHistory } from "react-router";
import { useScript } from "../../../hooks/useScript";
import { useMutation } from "@apollo/client";
import { GoogleLogin } from "@datasource/graphql/user";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { GoogleMutation } from "src/types/gqlTypes/graphql";
import { useAuth } from "@context/AuthContext";

export const GoogleAuth = () => {
  const { UpdateAuth } = useAuth();
  const [present, dismiss] = useIonToast();
  const googlebuttonref = useRef<any>(),
    history = useHistory();

  const params = new URLSearchParams(window.location.search);

  const [Googlelogin, { loading }] = useMutation<GoogleMutation>(GoogleLogin, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: (data) => {
      console.log("login data", data);
      if (data.google?.status?.success && data.google && data.google.data) {
        console.log("login data", data.google.data);
        UpdateAuth({
          id: data.google?.data.id!,
          firstName: data.google.data?.firstName!,
          lastName: data.google.data.lastName!,
          username: data.google.data?.username!,
          accessToken: data.google.data?.accessToken!,
          refreshToken: data.google.data?.refreshToken!,
          newUser: data.google.data?.newUser!,
          role: data.google.data?.role!,
        });
        present({
          message: "Login Successful",
          duration: 3000,
          color: "success",
          buttons: [{ text: "X", handler: () => dismiss() }],
        });
        document.getElementById("close-auth-modal")?.click();
        history.push("/feed");
      }
    },
    onError: (error) => {
      console.log("login error", error);
      present({
        message: error.message,
        duration: 3000,
        color: "danger",
        buttons: [{ text: "X", handler: () => dismiss() }],
      });
    },
  });

  const onGoogleSignIn = (user: any) => {
    const { credential } = user;
    let payload = {
      email: params.get("email"),
      spaceOrgName: params.get("org"),
      code: params.get("code"),
      token: credential,
      type: params.get("org") && "invitation",
    };
    Googlelogin({ variables: payload });
  };

  useScript("https://accounts.google.com/gsi/client", () => {
    // @ts-ignore
    window?.google.accounts.id.initialize({
      client_id:
        "1001592245381-rbpoecv2se6v3avlkisbbsfpl09cjfs4.apps.googleusercontent.com",
      callback: onGoogleSignIn,
      auto_select: false,
    });

    // @ts-ignore
    window.google.accounts.id.renderButton(googlebuttonref.current, {
      size: "large",
      shape: "circle",
      theme: "outline",
    });
  });

  return <div ref={googlebuttonref} />;
};
export default GoogleAuth;
