const validateSignup = (data: ISignupInput): ISignupErrors => {
  const errors: ISignupErrors = {};
  if (!data?.firstName) {
    errors.firstName = "First name required";
  }
  if (!data?.lastName) {
    errors.lastName = "Last name required";
  }
  if (
    !data?.email?.match(
      /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/gi
    )
  ) {
    errors.email = "Invalid email address.";
  }
  if (!data?.password) {
    errors.password = "Password field is required";
  } else if (
    !data?.password?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/gi)
  ) {
    errors.password =
      "Password must be at least 8 characters long, contain at least one lowercase, uppercase letter, number and symbol";
  }
  return errors;
};
const validateSignIn = (data: ILoginInput): ILoginInputErrors => {
  const errors: ILoginInputErrors = {};
  if (
    !data?.email?.match(
      /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/gi
    )
  ) {
    errors.email = "Invalid email address.";
  }
  if (!data?.password) {
    errors.password = "Password field is required";
  } else if (
    !data?.password?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/gi)
  ) {
    errors.password =
      "Password must be at least 8 characters long, contain at least one lowercase, uppercase letter, number and symbol";
  }
  return errors;
};

export { validateSignIn, validateSignup };
