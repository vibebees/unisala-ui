import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { IonCard, IonCardSubtitle, IonText, IonIcon } from "@ionic/react";
import {
  location,
  calendar,
  logoGithub,
  logoTwitch,
  logoFacebook,
  logoYoutube,
  logoTwitter,
  logoInstagram,
  logoLinkedin,
} from "ionicons/icons";
import UserCtaBtns from "./userCtaBtns/UserCtaBtns";

import "./index.css";
import AvatarProfile from "../../../components/packages/Avatar";
import { ThreadSkeleton } from "@components/packages/skeleton/threadSkeleton";

const ProfileHeader = ({
  tab,
  setTab,
  data,
  loading,
}: {
  tab: any;
  setTab: any;
  data: any;
  loading: Boolean;
}) => {
  const {
    firstName,
    lastName,
    username,
    profilePic,
    coverPicture,
    oneLinerBio,
    location: userLocation,
    doj,
    socialLinks,
  } = data;

  const icons = {
    twitter: logoTwitter,
    github: logoGithub,
    facebook: logoFacebook,
    youtube: logoYoutube,
    twitch: logoTwitch,
    instagram: logoInstagram,
    linkedin: logoLinkedin,
  };

  const tabMenu = [
    { id: 0, menu: username },
    { id: 1, menu: "Threads" },
    { id: 2, menu: "List" },
    { id: 3, menu: "Saved" },
    { id: 4, menu: "Roadmap" },
    { id: 5, menu: "Guestbook" },
  ];

  const changeTab = (tabs) => {
    setTab(tabs);
  };

  if (loading) {
    <ThreadSkeleton />;
  }

  return (
    <IonCard className="profile-header mb-2 max-md:mx-1">
      <div className="user-banner">
        <div className="user-banner__cover">
          <img
            src={
              coverPicture ||
              "https://img.freepik.com/premium-photo/back-school-education-banner-background_8087-1192.jpg?w=1380"
            }
            className="user-banner__cover--img"
            alt="userName banner"
          />
        </div>

        <div className="user-profile">
          <AvatarProfile profilePic={profilePic} username={username} />
          <div className="border-[7px] border-neutral-300  absolute left-0 top-0 bottom-0  right-0 rounded-full z-10" />
        </div>

        <UserCtaBtns data={data} />
      </div>

      <div className="short-info-wrapper">
        <IonText color="dark">
          <h1 className="text-xl capitalize font-bold">
            {firstName + " " + lastName}
          </h1>
          <IonCardSubtitle className="font-bold">@{username}</IonCardSubtitle>
        </IonText>

        <div className="inline-2 flex-wrap">
          {userLocation && (
            <IonCardSubtitle className="icon-text">
              <IonIcon className="icon-16" icon={location} />
              {userLocation}
            </IonCardSubtitle>
          )}
          <IonCardSubtitle className="icon-text font-semibold">
            <IonIcon className="icon-16" icon={calendar} />
            joined {doj?.split("T")[0]?.split("-")?.join("/")}
          </IonCardSubtitle>
        </div>
        <IonText>
          <p>{oneLinerBio}</p>
        </IonText>
        <div className="inline-1">
          {Array.isArray(socialLinks) &&
            socialLinks.map((social, i) => {
              const { name, url } = social;
              return (
                <Link to={url} key={i}>
                  <IonIcon className="black-icon-28" icon={icons[name]} />
                </Link>
              );
            })}
        </div>

        <ul className="inline-2 profile-header__tab-menu">
          {tabMenu.map((tabItem) => {
            const { id, menu } = tabItem;
            return (
              <li
                key={id}
                onClick={() => {
                  changeTab(id);
                }}
                className={id === tab ? "profile-header__tab-menu--active" : ""}
              >
                <h4 className="profile-header__tab-menu--h4">{menu}</h4>
              </li>
            );
          })}
        </ul>
      </div>
    </IonCard>
  );
};

ProfileHeader.propTypes = {
  setTab: propTypes.func.isRequired,
  tab: propTypes.number.isRequired,
  data: propTypes.object.isRequired,
};

export default ProfileHeader;
