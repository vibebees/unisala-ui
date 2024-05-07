import React, { useState } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonInput,
  useIonToast,
  IonSpinner,
} from "@ionic/react";
import { create, logOut } from "ionicons/icons";
import { useMutation } from "@apollo/client";
import { EditProfile, getUserGql } from "@datasource/graphql/user";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { awsBucket, bucketName } from "@datasource/servers/s3.configs";
import "./index.css";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "@datasource/store/action/userProfile";
import { useHistory } from "react-router-dom";
import { Button, Label } from "@components/defaults";
import { EditIcon } from "@components/packages/icons";
function index({ profileHeader }) {
  // for autocomplete location
  const Avatar = () => "Avatar";

  const {
    firstName,
    lastName,
    oneLinerBio,
    location,
    profilePic,
    username,
    coverPicture,
  } = profileHeader;
  const [input, setInput] = useState(profileHeader);
  const [isOpen, setIsOpen] = useState(false);
  const [present, dismiss] = useIonToast();
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [coverImageName, setCoverImageName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [editProfile, { loading }] = useMutation(EditProfile, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      ...input,
      profilePicture: profileImage ? imageName : profilePic,
      coverPicture: coverImage ? coverImageName : coverPicture,
    },
    update: (cache, { data: { editProfile } }) => {
      const { getUser } = cache.readQuery({
        query: getUserGql,
        variables: { username },
      });
      cache.writeQuery({
        query: getUserGql,
        variables: { username },
        data: {
          getUser: {
            ...getUser,
            user: {
              ...getUser.user,
              ...editProfile.user,
            },
          },
        },
      });
    },
    onCompleted: (data) => {
      // update uesr details in redux
      if (data?.editProfile?.status?.success) {
        // if username is changed just refresh the page
        if (profileHeader?.username !== input.username) {
          history.push("/@/" + input?.username);
        }
        //  change user details in store
        dispatch(updateUserProfile({ user: { ...input }, loggedIn: true }));

        present({
          duration: 3000,
          message: "Profile Updated",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios",
        });
      } else {
        present({
          duration: 3000,
          message: data?.editProfile?.status.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios",
        });
      }
    },
    onError: (error) => {
      present({
        duration: 3000,
        message: error.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios",
      });
    },
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  let windowWidth = window.innerWidth;

  const handleSubmit = (e) => {
    e.preventDefault();
    editProfile();
    profileImage && fileUpdate();
    coverImage && coverImageUpload();
    setIsOpen(false);
    setProfileImage(null);
  };

  let handleProfileImage = (e) => {
    setProfileImage(e.target.files[0]);
    let filename = e.target.files[0].name.split(".") || "";
    setImageName(filename[0] + Date.now() + "." + filename[1] || "");
  };

  let handleCoverImage = (e) => {
    setCoverImage(e.target.files[0]);
    let filename = e.target.files[0].name.split(".") || "";
    setCoverImageName(filename[0] + Date.now() + "." + filename[1] || "");
  };

  const fileUpdate = async () => {
    if (profileImage) {
      const params = {
        Bucket: bucketName("user"),
        Key: imageName,
        ContentType: profileImage.type,
        ACL: "public-read",
      };

      // Generate a pre-signed URL
      await awsBucket("user").getSignedUrl(
        "putObject",
        params,
        async (err, url) => {
          if (err) {
            console.error(err);
            return;
          }

          // Upload the file to S3 using the pre-signed URL
          const result = await fetch(url, {
            method: "PUT",
            body: profileImage,
            headers: {
              "Content-Type": profileImage.type,
            },
          });

          if (result.ok) {
            // If the upload is successful, add the post with the S3 image URL
            console.log(url);
          } else {
            console.error("Failed to upload image to S3");
          }
        }
      );
    }
  };

  const coverImageUpload = async () => {
    if (coverImage) {
      const params = {
        Bucket: bucketName("user"),
        Key: coverImageName,
        ContentType: coverImage.type,
        ACL: "public-read",
      };

      // Generate a pre-signed URL
      await awsBucket("user").getSignedUrl(
        "putObject",
        params,
        async (err, url) => {
          if (err) {
            console.error(err);
            return;
          }

          // Upload the file to S3 using the pre-signed URL
          const result = await fetch(url, {
            method: "PUT",
            body: coverImage,
            headers: {
              "Content-Type": coverImage.type,
            },
          });

          if (result.ok) {
            // If the upload is successful, add the post with the S3 image URL
          } else {
            console.error("Failed to upload image to S3");
          }
        }
      );
    }
  };

  return (
    <>
      <Button>
        <EditIcon />
        <span>{"Edit"}</span>
      </Button>

      <IonButtons
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        className="profile-drop-btn"
        lines="none"
      >
        <IonIcon slot="start" icon={logOut} />
        <Label color="dark">Log out</Label>
      </IonButtons>
      <IonModal
        onDidDismiss={() => {
          setIsOpen(false);
          setProfileImage(null);
        }}
        isOpen={isOpen}
        mode="ios"
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Profile</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  setIsOpen(false);
                  setProfileImage(null);
                }}
              >
                Close
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding modal-content">
          <form onSubmit={handleSubmit}>
            <div className="mb-1">
              <h5 className="font-semibold mb-2 text-black/7">
                Update Profile Cover Image
                <span className="text-xs font-semibold ml-2 text-slate-700">
                  ( Recommended 1200px x 400px. Max size: 4 mb)
                </span>
              </h5>

              <label className="upload-file">
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => handleCoverImage(e)}
                />
              </label>
            </div>

            <div className="inline-1 my-4">
              <div className="user-profile__edit">
                {profileImage ? (
                  <Avatar
                    profilePic={URL.createObjectURL(profileImage)}
                    username={username}
                  />
                ) : (
                  <Avatar profilePic={profilePic} username={username} />
                )}
              </div>
              <div className="upload-profile-pic-text">
                <h5 className="font-semibold mb-2 text-black/7">
                  Set Profile Picture
                </h5>
                <p className="text-sm mb-2">
                  You can change your profile picture or upload a photo
                </p>
                <label className="upload-file">
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => handleProfileImage(e)}
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <h5>User Name</h5>
                <IonInput
                  mode="md"
                  onIonChange={handleChange}
                  name="username"
                  className="input-box "
                  placeholder={profileHeader?.username || "User name"}
                ></IonInput>
              </div>

              <div className="flex flex-col space-y-2">
                <h5>First Name</h5>
                <IonInput
                  mode="md"
                  onIonChange={handleChange}
                  name="firstName"
                  className="input-box "
                  placeholder={profileHeader?.firstName || "First Name"}
                ></IonInput>
              </div>

              <div className="flex flex-col space-y-2">
                <h5>Last Name</h5>
                <IonInput
                  mode="md"
                  onIonChange={handleChange}
                  name="lastName"
                  className="input-box "
                  placeholder={profileHeader?.lastName || "Last Name"}
                ></IonInput>
              </div>

              <div className="flex flex-col space-y-2">
                <h5>Location</h5>
                <IonInput
                  mode="md"
                  onIonChange={handleChange}
                  name="location"
                  className="input-box "
                  placeholder={profileHeader?.location || "Location"}
                ></IonInput>
              </div>

              <div className="flex flex-col space-y-2">
                <h5>One-liner Bio</h5>
                <IonInput
                  mode="md"
                  onIonChange={handleChange}
                  name="oneLinerBio"
                  className="input-box "
                  placeholder={profileHeader?.oneLinerBio || "One-liner Bio"}
                ></IonInput>
              </div>

              <IonButton
                disabled={loading}
                type="submit"
                mode="ios"
                expand="block"
              >
                {loading ? <IonSpinner /> : "Save Changes"}
              </IonButton>
            </div>
          </form>
        </IonContent>
      </IonModal>
    </>
  );
}

export default index;
