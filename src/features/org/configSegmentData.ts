import { URLupdate } from "@utils/lib/URLupdate";

export const configSegment = {
  options: [
    {
      name: "Feed",
      icon: "home",
      nav: "feed",
    },
    {
      name: "Org",
      icon: "people",
      nav: "org",
    },
    {
      name: "Apply",
      icon: "clipboard",
      nav: "apply",
    },
    {
      name: "History",
      icon: "time",
      nav: "history",
    },
    {
      name: "Invite",
      icon: "people",
      nav: "invite",
    },
  ],
  Identifier: "t",
};

export const typeOfMember = {
  options: [
    {
      name: "Members",
      icon: "people",
      count: 6,
      nav: "members",
    },
    {
      name: "Students",
      icon: "business",
      count: 30,
      nav: "students",
    },
    {
      name: "Alumini",
      icon: "school",
      count: 600,
      nav: "alumini",
    },
  ],
  Identifier: "mem",
  scrollable: false,
};
