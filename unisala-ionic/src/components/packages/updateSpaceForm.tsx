import { useMutation } from "@apollo/client";
import {
  IonButton,
  IonCol,
  IonContent,
  IonInput,
  IonLabel,
  IonRow,
  useIonToast,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { UpateOrgSpace } from "@datasource/graphql/user";
import { useOrgContext } from "@features/org";

const UpdateSpace = ({ setIsOpen }: any) => {
  const { name, description, _id } = useOrgContext();
  const [editSpaceDetails, setEditSpaceDetails] = useState({
    name: name || "",
    description: description || "",
  });
  const [present, dismiss] = useIonToast();

  const history = useHistory();
  const [editSpaceCategoryById, { loading }] = useMutation(UpateOrgSpace, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: (data) => {
      if (data?.editSpaceCategoryById?.status.success) {
        setIsOpen(false);
        setTimeout(() => {
          history.push(
            `/space/${data?.editSpaceCategoryById?.spaceCategory?.name}`
          );
        }, 100);
      } else {
        present({
          duration: 3000,
          message: data?.editSpaceCategoryById?.status?.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios",
        });
      }
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    editSpaceCategoryById({
      variables: {
        id: _id,
        name: editSpaceDetails?.name,
        description: editSpaceDetails?.description,
      },
    });
  };

  return (
    <IonContent>
      <form action="" className="p-4">
        <IonRow>
          <IonCol>
            <IonLabel>
              Name <span className="text-[red]">*</span>
            </IonLabel>
            <IonInput
              type="text"
              placeholder="Name of your space"
              fill="outline"
              required
              value={editSpaceDetails?.name}
              onIonChange={(e) =>
                setEditSpaceDetails({
                  ...editSpaceDetails,
                  name: e.detail.value || "",
                })
              }
              color="dark"
              className="mt-2 !px-3 rounded-md border duration-200 transition-all border-neutral-300 focus-within:border-neutral-500 w-full "
              name="name"
            ></IonInput>
          </IonCol>
        </IonRow>
        <IonRow class="mt-2">
          <IonCol>
            <IonLabel>
              Description
              <span className="ml-1 text-xs font-500 text-gray-700">
                ( Describe about your space in short)
              </span>
            </IonLabel>
            <IonInput
              color="dark"
              type="text"
              onIonChange={(e) =>
                setEditSpaceDetails({
                  ...editSpaceDetails,
                  description: e.detail.value || "",
                })
              }
              fill="outline"
              placeholder="This space is about ....."
              className="mt-2 !px-3 rounded-md border duration-200 transition-all border-neutral-300 focus-within:border-neutral-500 w-full "
              name="description"
              value={editSpaceDetails.description}
            ></IonInput>
          </IonCol>
        </IonRow>

        <IonButton
          disabled={loading}
          type="button"
          onClick={handleSubmit}
          className="mt-4"
        >
          {loading ? "Updating..." : "Update"}
        </IonButton>
      </form>
    </IonContent>
  );
};

export default UpdateSpace;
