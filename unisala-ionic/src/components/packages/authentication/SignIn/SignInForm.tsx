import React, { FormEvent, useState, useContext, useLayoutEffect } from "react";
import { IonSpinner, useIonToast } from "@ionic/react";
import { Typography, Button, Row } from "@components/defaults";
import AuthInput from "../AuthInput";
import { Login } from "@datasource/graphql/user";
import { validateSignIn } from "@utils/components/validate";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { LoginMutation } from "src/types/gqlTypes/graphql";
import { useMutation } from "@apollo/client";
import { useAuth } from "@context/AuthContext";
import { useHistory } from "react-router";
import { AuthenticationContext } from "../Authentication";

const SignInForm = () => {
  const { setauth } = useContext(AuthenticationContext)!;
  const params = new URLSearchParams(window.location.search);
  const { UpdateAuth, authenticated } = useAuth();
  const history = useHistory();
  const spaceOrgName = params.get("org");
  const [errors, setErrors] = useState<ILoginInputErrors>({});
  const [present, dismiss] = useIonToast();

  useLayoutEffect(() => {
    if (authenticated) {
      if (input?.spaceOrgName && input.code) {
        return history.push(`/org/${input.spaceOrgName}?inv=t`);
      }
      history.push("/feed");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  const [input, setInput] = useState<ILoginInput>({
    email: params.get("email") ?? "",
    password: "",
    spaceOrgName,
    type: spaceOrgName && "invitation",
    code: parseInt(params.get("code") ?? "0"),
  });

  const [LoginUser, { loading }] = useMutation<LoginMutation>(Login, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      email: input.email,
      password: input.password,
      spaceOrgName: input.spaceOrgName,
      type: input.type,
      code: input.code,
    },
    onCompleted: (data) => {
      if (data.login?.status?.success && data.login && data.login.data) {
        UpdateAuth({
          id: data.login?.data.id!,
          firstName: data.login.data?.firstName!,
          lastName: data.login.data.lastName!,
          username: data.login.data?.username!,
          accessToken: data.login.data?.accessToken!,
          refreshToken: data.login.data?.refreshToken!,
          newUser: data.login.data?.newUser!,
          role: data.login.data?.role!,
        });
        present({
          message: "Login Successful",
          duration: 3000,
          color: "success",
          buttons: [{ text: "X", handler: () => dismiss() }],
        });
        window.location.reload();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateSignIn(input);
    if (Object.keys(validationErrors).length === 0) {
      LoginUser();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-input-div">
        <label className="auth-label">Email</label>
        <br />
        <AuthInput
          HandleChange={handleChange}
          type="text"
          name="email"
          value={input?.email}
          validation={errors?.email}
        />
      </div>
      <div className="auth-input-div">
        <label className="auth-label">Password</label>
        <br />
        <AuthInput
          HandleChange={handleChange}
          type="password"
          name="password"
          value={input?.password}
          validation={errors?.password}
        />
      </div>
      <div className="auth-policy">
        <Typography
          style={{ color: "#3880ff", cursor: "pointer" }}
          onClick={() => {
            setauth((prev) => {
              return {
                ...prev,
                state: "emailVerify",
              };
            });
          }}
          variant="p"
        >
          Forgot Password?
        </Typography>
      </div>
      <Button
        disabled={loading}
        type="submit"
        shape="round"
        onSubmit={handleSubmit}
        className="block text-center  w-full outline-none text-sm text-white uppercase rounded-2xl tracking-wide  text-opacity-90 hover:opacity-90"
      >
        {loading ? <IonSpinner></IonSpinner> : "Login"}
      </Button>

      <Row
        onClick={() => {
          setauth((prev) => {
            return {
              ...prev,
              state: "signup",
            };
          });
        }}
        className="auth-change mt-8 inline-flex "
      >
        <p className="text-blue-600 font-medium text-lg">
          Not Registered Yet?{" "}
          <span className="underline underline-offset-4"> Click Here</span>
        </p>
      </Row>
    </form>
  );
};
export default SignInForm;
