

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


//export all ionic imports as custom components for example IonToolbar as Toolbar
export {
    IonButton as Button,
    IonToolbar as Toolbar,
    IonAlert as Alert,
    IonAvatar as Avatar,
    IonBackButton as BackButton,
    IonBadge as Badge,
    IonButtons as Buttons,
    IonCard as Card,
    IonCardContent as CardContent,
    IonCardHeader as CardHeader,
    IonCardSubtitle as CardSubtitle,
    IonCardTitle as CardTitle,
    IonCheckbox as Checkbox,
    IonChip as Chip,
    IonCol as Col,
    IonContent as Content,
    IonDatetime as Datetime,
    IonFab as Fab,
    IonFabButton as FabButton,
    IonFabList as FabList,
    IonFooter as Footer,
    IonGrid as Grid,
    IonHeader as Header,
    IonIcon as Icon,
    IonImg as Img,
    IonInfiniteScroll as InfiniteScroll,
    IonInfiniteScrollContent as InfiniteScrollContent,
    IonInput as Input,
    IonItem as Item,
    IonItemDivider as ItemDivider,
    IonItemGroup as ItemGroup,
    IonItemOption as ItemOption,
    IonItemOptions as ItemOptions,
    IonItemSliding as ItemSliding,
    IonLabel as Label,
    IonList as List,
    IonListHeader as ListHeader,
    IonMenu as Menu,
    IonMenuButton as MenuButton,
    IonMenuToggle as MenuToggle,
    IonModal as Modal,
    IonNav as Nav,
    IonNote as Note,
    IonPage as Page,
    IonPopover as Popover,
    IonProgressBar as ProgressBar,
    IonRadio as Radio,
    IonRadioGroup as RadioGroup,
    IonRange as Range,
    IonRefresher as Refresher,
    IonRefresherContent as RefresherContent,
    IonReorder as Reorder,
    IonReorderGroup as ReorderGroup,
    IonRippleEffect as RippleEffect,
    IonRouterOutlet as RouterOutlet,
    IonSearchbar as Searchbar,
    IonSegment as Segment,
    IonSegmentButton as SegmentButton,
    IonSelect as Select,
    IonSelectOption as SelectOption,
    IonSkeletonText as SkeletonText,
    IonSpinner as Spinner,
    IonSplitPane as SplitPane,
    IonTab as Tab,
    IonTabBar as TabBar,
    IonTabButton as TabButton,
    IonTabs as Tabs,
    IonText as Text,
    IonTextarea as Textarea,
    IonThumbnail as Thumbnail,
    IonTitle as Title,
    IonToast as Toast,
    IonToggle as Toggle,
}