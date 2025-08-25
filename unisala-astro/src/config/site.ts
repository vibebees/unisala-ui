import type { SidebarNavItem, SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Unisala",
  description: "Unisala: Unisala is your space to learn smarter, experiment with top LLMs, and build momentum with a community that fuels your growth"  ,
  url: "https://unisala.com",
  ogImage: "images/unisala.png",
  links: {
    linkedin: "https://www.linkedin.com/company/unisala/", // Add actual links if available
    github: "https://github.com/vibebees"
  }
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
    title: "Legal",
    items: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Accessibility", href: "/accessibility" },
    ],
  },
];
