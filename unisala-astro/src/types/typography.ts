import type { ReactNode } from "react";

// eslint-disable-next-line no-undef
export interface ITypography
  // eslint-disable-next-line no-undef
  extends React.AllHTMLAttributes<HTMLIonTextElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  children?: ReactNode;
  className?: string;
}
