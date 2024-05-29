import React, { ChangeEvent, FormEvent, useContext } from "react";
import { IonRow, IonSpinner, useIonToast } from "@ionic/react";
import { useState } from "react";
import { validateSignup } from "@utils/components/validate";
import AuthInput from "../AuthInput";
import "../auth.css";
import { AuthenticationContext } from "../Authentication";
import { useMutation } from "@apollo/client";
import { Register } from "@datasource/graphql/user";
import { RegisterMutation } from "src/types/gqlTypes/graphql";
import { USER_SERVICE_GQL } from "@datasource/servers/types";

export const SignUpForm = () => {
  const { setauth } = useContext(AuthenticationContext)!;
  const [errors, seterrors] = useState<ISignupErrors>({});
  const [present, dismiss] = useIonToast();
  const searchParams = new URLSearchParams(window.location.search);
  const spaceOrgName = searchParams.get("org");
  const code = searchParams.get("code");
  const email = searchParams.get("email") ?? "";
  const [input, setInput] = useState<ISignupInput>({
    firstName: "",
    lastName: "",
    email: email,
    password: "",
    spaceOrgName,
    type: spaceOrgName && "invitation",
    code: code,
  });

  const [RegisterUser, { loading }] = useMutation<RegisterMutation>(Register, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: input.password,
      spaceOrgName: input.spaceOrgName,
      type: input.type,
      code: input.code,
    },
    onCompleted: () => {
      setauth((prev) => {
        return {
          ...prev,
          email: input.email,
          state: "SignUpVerification",
        };
      });
    },
    onError: (error) => {
      present({
        message: error.message,
        duration: 3000,
        color: "danger",
        buttons: [{ text: "X", handler: () => dismiss() }],
      });
    },
  });

  const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((pre) => {
      return { ...pre, [name]: value };
    });

    // if user changes the mail from the invitation one then it will not be invited
    if (name === "email" && value !== email) {
      setInput((pre) => {
        return { ...pre, type: null, spaceOrgName: null };
      });
    }
    seterrors({
      ...errors,
      [name]: "",
    });
  };
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const validateErrors = validateSignup(input);
    if (Object.keys(validateErrors).length === 0) {
      RegisterUser();
    } else {
      seterrors(validateErrors);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="auth-name">
        <div>
          <label className="auth-label">First name</label>
          <AuthInput
            validation={errors?.firstName}
            type="text"
            name="firstName"
            value={input?.firstName}
            HandleChange={HandleChange}
          />
        </div>
        <div>
          <label className="auth-label">Last name</label>
          <AuthInput
            validation={errors?.lastName}
            HandleChange={HandleChange}
            type="text"
            name="lastName"
            value={input?.lastName}
          />
        </div>
      </div>
      <div className="auth-input-div">
        <label className="auth-label">Email</label>
        <br />
        <AuthInput
          validation={errors?.email}
          HandleChange={HandleChange}
          type="text"
          name="email"
          value={input?.email}
          disabled={!!email}
        />
      </div>
      <div className="auth-input-div">
        <label className="auth-label">Password</label>
        <br />
        <AuthInput
          validation={errors?.password}
          HandleChange={HandleChange}
          type="password"
          name="password"
          value={input?.password}
        />
      </div>
      <div className="auth-policy">
        <p
          style={{ color: "#3880ff", cursor: "pointer" }}
          onClick={() => {
            setauth((prev) => {
              return {
                ...prev,
                state: "emailVerify",
              };
            });
          }}
        >
          Forgot Password?
        </p>
      </div>
      <br />
      <button
        type="submit"
        onSubmit={submitHandler}
        className="block text-center bg-blue-600 w-full outline-none text-sm text-white uppercase rounded-2xl tracking-wide py-2 text-opacity-90 hover:opacity-90"
      >
        {loading ? <IonSpinner></IonSpinner> : "Register"}
      </button>

      <IonRow
        onClick={() => {
          setauth((prev) => {
            return {
              ...prev,
              state: "signin",
            };
          });
        }}
        className="auth-change mt-7 inline-flex"
      >
        <p className="text-blue-600 font-medium text-lg">
          Already a member?{" "}
          <span className="underline underline-offset-4"> sign in</span>
        </p>
      </IonRow>
    </form>
  );
};
export default SignUpForm;
