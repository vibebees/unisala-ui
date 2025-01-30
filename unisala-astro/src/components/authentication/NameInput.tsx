 
import React from "react";
import { User, ArrowLeft } from "lucide-react";
import SubmitButton from "./SubmitButton";
import { useAstroMutation } from "@/datasource/apollo-client";
import { RegisterV2 } from "@/datasource/graphql/user";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";
import toast from "react-hot-toast";

interface NameInputProps {
  setName: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
    }>
  >;
  name: { firstName: string; lastName: string };
  onBack: () => void;
  email: string;
  setAuthState: React.Dispatch<
    React.SetStateAction<"email" | "name" | "pincode">
  >;
}

const NameInput: React.FC<NameInputProps> = ({
  onBack,
  email,
  name,
  setName,
  setAuthState,
}) => {
  const [RegisterUser, { loading }] = useAstroMutation(RegisterV2, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: (data: any) => {
      const status = data?.registerV2?.status?.success;
      if (status) {
        setAuthState("pincode");
      } else {
        toast.error(
          data?.registerV2?.status?.message ||
            "Error occured while checking email address. Please try again."
        );
      }
    },
    onError: (error) => {
      toast.error(
        error?.message ||
          "Error occured while checking email address. Please try again."
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.firstName.trim() || !name.lastName.trim()) {
      return toast.error("Please enter your full name.");
    }
    RegisterUser({
      variables: {
        email,
        firstName: name.firstName,
        lastName: name.lastName,
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center mb-6">
        <button
          type="button"
          onClick={onBack}
          className="text-neutral-400 hover:text-neutral-900 transition-colors duration-300 mr-4"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-neutral-100">
          Nice to meet you
        </h2>
      </div>
      <p className="text-gray-600 dark:text-neutral-300">
        Please enter your full name
      </p>

      <div className="relative mb-6">
        <User className="h-6 w-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={name.firstName}
          onChange={(e) => setName({ ...name, firstName: e.target.value })}
          className="w-full p-3 pl-12 border dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder:text-neutral-300 border-gray-300 rounded-lg "
          placeholder="First name"
          required
        />
      </div>
      <div className="relative mb-6">
        <User className="h-6 w-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={name.lastName}
          onChange={(e) => setName({ ...name, lastName: e.target.value })}
          className="w-full p-3 pl-12 border dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder:text-neutral-300 border-gray-300 rounded-lg "
          placeholder="Last name"
          required
        />{" "}
      </div>
      <div className="text-sm text-gray-600 dark:text-neutral-300 mb-6">
        <p>By providing your name, you're taking the first step towards:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Personalizing your account</li>
          <li>Improving our communication with you</li>
          <li>Enhancing your overall experience</li>
        </ul>
      </div>
      <SubmitButton disabled={loading} isLoading={loading} />
      <p className="text-xs text-gray-500 text-center mt-4 dark:text-neutral-400">
        We value your privacy and will never share your personal information
        without your consent.
      </p>
    </form>
  );
};

export default NameInput;
