

import React, { ElementType, forwardRef, ReactNode } from "react";
import { cn } from "../../utils"; // Assuming cn is a className utility

interface CustomComponentProps {
  children?: ReactNode;
  className?: string;
}

// A higher-order component that takes an Ionic component and returns a new component with a forwarded ref
export const CustomWrapper = <T extends ElementType>(Component: any) =>  {
  type Props = CustomComponentProps & Omit<React.ComponentProps<T>, keyof CustomComponentProps>;

  const ForwardedComponent = forwardRef<HTMLElement, Props>(({ children, className, ...rest }, ref) => {
    return (
      <Component ref={ref} className={cn(" ", className)} {...rest}>
        {children}
      </Component>
    );
  });

  ForwardedComponent.displayName = `Custom${Component?.displayName || Component?.name}`;

  return ForwardedComponent;
}

