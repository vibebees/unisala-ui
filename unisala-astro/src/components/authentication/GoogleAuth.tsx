import React, { useRef, memo } from "react";
import { useScript } from "@/hooks/useScript";
import { useAstroMutation } from "@/datasource/apollo-client";
import { GoogleLogin } from "@/datasource/graphql/user";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";
import { navigator } from "@/utils/lib/URLupdate";
import toast from "react-hot-toast";
import { setUser } from "@/store/userStore";

export const GoogleAuth = memo(() => {
  const googlebuttonref = useRef<any>();

  const params = new URLSearchParams(window.location.search);

  const [Googlelogin] = useAstroMutation(GoogleLogin, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: (data) => {
      if (data.google?.status?.success && data.google && data.google.data) {
        setUser({
          id: user?.id,
          authenticated: true,
          email: user?.email,
          firstName: user?.firstName,
          lastName: user?.lastName,
          accessToken: user?.accessToken,
          refreshToken: user?.refreshToken,
          newUser: user?.newUser,
        });

        if ( data?.google?.data?.newUser) {
          toast.success("Account created successfully.");
          navigator('/welcome-form/intro')
        } else {
          toast.success("Logged in successfully.");
          navigator()
        };
      }
    },
    onError: (error) => {
      console.log("login error", error);
    },
  });

  const onGoogleSignIn = (user: any) => {
    const { credential } = user;
    const payload = {
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
});
export default GoogleAuth;
