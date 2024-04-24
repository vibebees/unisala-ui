import React, { ChangeEvent, useContext } from "react";
import { IonRow, IonSpinner, useIonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import { userServer } from "../../../../datasource/servers/endpoints";
import { registerUser } from "../../../../datasource/store/action/authenticationAction";
import { validateSignup } from "../../../../utils/components/validate";
import AuthInput from "../AuthInput";
import "../auth.css";
import { setCache } from "../../../../utils/cache";
import { AuthenticationContext } from "@features/login";

export const SignUpForm = () => {
  const { setauth } = useContext(AuthenticationContext)!;
  const [errors, seterrors] = useState<ISignupErrors>({});
  const [present, dismiss] = useIonToast();
  const [datacheck, setdatacheck] = useState(false);
  const [save, setsave] = useState(false);

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
    code: code && code,
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
  const submitHandler = (e) => {
    e.preventDefault();
    seterrors(validateSignup(input));
    setdatacheck(true);
  };
  // dispatch = useDispatch();

  // useEffect(() => {
  //   if (Object.keys(errors).length === 0 && datacheck) {
  //     setsave(true);
  //     setCache("email", input.email);
  //     // dispatch(
  //     //   registerUser({
  //     //     userServer: userServer,
  //     //     input,
  //     //     setdatacheck,
  //     //     setauth,
  //     //     setsave,
  //     //     present,
  //     //     dismiss,
  //     //   })
  //     // );
  //     if (spaceOrgName) {
  //       setCache("org", spaceOrgName);
  //     }
  //   }
  // }, [errors]);

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
      <button
        type="submit"
        onSubmit={submitHandler}
        className="block text-center bg-blue-600 w-full outline-none text-sm text-white uppercase rounded-2xl tracking-wide py-2 text-opacity-90 hover:opacity-90"
      >
        {save ? <IonSpinner></IonSpinner> : "Register"}
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
