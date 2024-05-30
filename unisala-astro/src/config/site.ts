import type { SidebarNavItem, SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Unisala",
  description: "Connecting students worldwide with universities and educational resources, helping them make informed decisions for their future.",
  url: "https://unisala.com",
  ogImage: "https://unisala.com/og-image.jpg",  // Update with an actual path to an image that represents Unisala
  links: {
    twitter: "https://twitter.com/unisala",  // Update with your actual Twitter handle if available
    github: "https://github.com/yourgithub/unisala",  // Update with your actual GitHub repository for Unisala if it's open-source or public
  },
};
export const footerLinks: SidebarNavItem[] = [
  {
    title: "About Unisala",
    items: [
      { title: "Who We Are", href: "/about" },
      { title: "Our Mission", href: "/mission" },
      { title: "Team", href: "/team" },
      { title: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "University Finder", href: "/universities" },
      { title: "Consulting Services", href: "/consulting" },
      { title: "Webinars", href: "/webinars" },
      { title: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Accessibility", href: "/accessibility" },
    ],
  },
];
