 
import React from "react";
import { Mail } from "lucide-react";
import GoogleAuth from "./GoogleAuth";
import SubmitButton from "./SubmitButton";
import { useAstroMutation } from "@/datasource/apollo-client";
import { checkEmail } from "@/datasource/graphql/user";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";
import toast from "react-hot-toast";

interface EmailInputProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setAuthState: React.Dispatch<
    React.SetStateAction<"email" | "name" | "pincode">
  >;
}

const EmailInput: React.FC<EmailInputProps> = ({
  email,
  setEmail,
  setAuthState,
}) => {
  const [CheckEmail, { loading }] = useAstroMutation(checkEmail, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      email,
    },
    onCompleted: (data: any) => {
      const newUser = data?.checkEmail?.data?.newUser;
      if (newUser) {
        toast.success("Email address is available. Please enter your name.");
        setAuthState("name");
      } else {
        setAuthState("pincode");
      }
    },
    onError: (error: any) => {
      toast.error(
        error?.message ||
          "Error occured while checking email address. Please try again."
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    CheckEmail();
  };

  return (
    <div className="space-y-6  h-full transition-all duration-300 ease-in-out">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-neutral-50">
          Welcome to Unisala
        </h2>
        <p className="text-gray-600 mt-1 dark:text-neutral-300">
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            Sign up
          </span>{" "}
          or{" "}
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            log in
          </span>{" "}
          to continue to Unisala
        </p>
      </div>

      <div className="flex justify-center w-full py-5">
        <GoogleAuth />
      </div>

      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 dark:text-neutral-200">
          or continue with email
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="my-2">
            <label
              htmlFor="email"
              className="text-base text-gray-800 dark:text-neutral-200"
            >
              Enter your email address
            </label>
          </div>
          <div className="relative">
            <Mail className="h-6 w-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-warning h-12 pl-12 dark:text-neutral-100 dark:border-neutral-500 dark:bg-neutral-700 border border-gray-300 rounded-lg   "
              placeholder="your email address"
              required
            />
          </div>
        </div>

        <br />
        <SubmitButton isLoading={loading} disabled={loading} />
      </form>
    </div>
  );
};

export default EmailInput;
