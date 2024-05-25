import { IonCard, useIonToast } from "@ionic/react";
import { authInstance } from "../../../../datasource/api/axiosInstance";
import { useOrgContext } from "@features/org";
import React, { useState } from "react";
import SendButton from "./SendButton";
import { userServer } from "../../../../datasource/servers/endpoints";

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [present, dismiss] = useIonToast();
  const [loading, setLoading] = useState(false);
  const { _id } = useOrgContext();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.type !== "text/csv") {
      present("Only CSV files are allowed", 3000);
      return present({
        duration: 3000,
        message: "Only CSV files are allowed",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios",
      });
    }
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      return present({
        duration: 3000,
        message: "Please select a file to upload",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios",
      });
    }

    const formData = new FormData();
    setLoading(true);
    formData.append("file", selectedFile);
    authInstance
      .post(`${userServer}/org-invite-all/${_id}`, formData)
      .then((res) => {
        if (res.data.success) {
          present({
            duration: 3000,
            message: "Invitation sent successfully",
            buttons: [{ text: "X", handler: () => dismiss() }],
            color: "primary",
            mode: "ios",
          });
        }
        setSelectedFile(null);
      })
      .catch((err) => {
        present({
          duration: 3000,
          message: err?.message || " Something went wrong",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios",
        });
      })
      .finally(() => {
        setSelectedFile(null);
        setLoading(false);
      });
  };
  return (
    <div className="w-full h-full">
      <IonCard className="ion-no-margin  ion-no-padding shadow-none px-4 py-6">
        <input
          type="file"
          className="border-2 border-neutral-300 rounded-lg p-2 w-full"
          accept=".xls, .xlsx, .csv"
          onChange={handleFileChange}
        />

        <SendButton
          loading={loading}
          label="Send Invitation"
          onclick={handleUpload}
        />
      </IonCard>
    </div>
  );
};

export default FileUploader;
