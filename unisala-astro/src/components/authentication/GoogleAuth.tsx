import React, { useRef, memo } from "react";
import { useScript } from "@/hooks/useScript";
import { useAstroMutation } from "@/datasource/apollo-client";
import { GoogleLogin } from "@/datasource/graphql/user";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";

export const GoogleAuth = memo(() => {
  const googlebuttonref = useRef<any>();

  const params = new URLSearchParams(window.location.search);

  const [Googlelogin] = useAstroMutation(GoogleLogin, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: (data) => {
      if (data.google?.status?.success && data.google && data.google.data) {
        // history.push("/feed");
      }
    },
    onError: (error) => {
      console.log("login error", error);
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
        "608310021370-snd65n66i5e9nt1nb15pgfpuuvkqevfq.apps.googleusercontent.com",
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
});
export default GoogleAuth;
