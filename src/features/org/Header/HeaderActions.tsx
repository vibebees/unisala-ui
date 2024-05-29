import React from "react";
import { useMutation } from "@apollo/client";
import { DeleteOrgSpace } from "@datasource/graphql/user";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { useIonToast, IonPopover } from "@ionic/react";
import { useHistory } from "react-router";
import { DeleteIcon, OptionIcon, EditIcon } from "@components/packages/icons";
import { useOrgContext } from "..";
import CustomModal from "@components/defaults/atoms/Modal";
import UpdateSpaceForm from "@components/packages/updateSpaceForm";
import { Spinner } from "@components/defaults";

const HeaderActions = () => {
  const { _id } = useOrgContext();

  console.log("id", _id);

  const history = useHistory();
  const [present, dismiss] = useIonToast();
  const [deleteSpace, { loading }] = useMutation(DeleteOrgSpace, {
    context: { server: USER_SERVICE_GQL },
    variables: { id: _id },
    onCompleted: (data) => {
      if (data?.deleteOrgSpaceById?.status?.success) {
        present({
          duration: 5000,
          message: "Space has been deleted successfully",
          buttons: [
            {
              text: "X",
              handler: () => {
                dismiss();
              },
            },
          ],
          color: "primary",
          mode: "ios",
        });

        setTimeout(() => {
          history.push("/home");
        }, 100);
      } else {
        present({
          duration: 3000,
          message: "Error occured while deleting the space.",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios",
        });
      }
    },
    onError: (error) => {
      console.error("Error deleting space:", error);
      present({
        duration: 3000,
        message: `Error occurred: ${error.message}`,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios",
      });
    },
  });
  return (
    <div>
      <>
        <button
          className=" absolute top-6 active:scale-90 duration-200 group right-6 w-fit h-fit"
          id="popover-trigger"
        >
          <div className="size-10 p-3 group-hover:bg-neutral-700 border border-neutral-500 rounded-full bg-neutral-600 grid place-content-center rotate-90">
            <OptionIcon className="scale-90" />
          </div>
        </button>
        <IonPopover trigger="popover-trigger" triggerAction="click" size="auto">
          <div className="rounded-md">
            <CustomModal
              header="Edit Organization Space"
              ModalData={<UpdateSpaceForm />}
            >
              <button className="flex   py-3 items-center hover:bg-neutral-200 justify-center w-full gap-5">
                Update Space <EditIcon />
              </button>
            </CustomModal>
            <button
              onClick={() => {
                deleteSpace();
              }}
              disabled={loading}
              className="flex  text-red-500 hover:text-red-700 py-3 items-center hover:bg-red-100 justify-center w-full gap-5"
            >
              Delete Space <DeleteIcon height={20} width={20} />
              {loading && <Spinner></Spinner>}
            </button>
          </div>
        </IonPopover>
        -
      </>
    </div>
  );
};

export default HeaderActions;
