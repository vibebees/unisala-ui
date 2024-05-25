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
  onClick: (e: any, nav: string) => {},
  Identifier: "t",
};
