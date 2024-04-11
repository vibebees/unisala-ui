import {
  IonAlert,
  IonAvatar,
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonChip,
  IonCol,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonFabList,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonModal,
  IonNav,
  IonNote,
  IonPage,
  IonPopover,
  IonProgressBar,
  IonRadio,
  IonRadioGroup,
  IonRange,
  IonRefresher,
  IonRefresherContent,
  IonReorder,
  IonReorderGroup,
  IonRippleEffect,
  IonRouterOutlet,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonSkeletonText,
  IonSpinner,
  IonSplitPane,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonText,
  IonTextarea,
  IonThumbnail,
  IonTitle,
  IonToast,
  IonToggle,
  IonToolbar,
  IonRow
} from '@ionic/react';
import { IonReactRouter as OriginalIonReactRouter } from '@ionic/react-router';

import { CustomWrapper } from './wrapper';
import { forwardRef } from 'react';
import { cn } from '../../utils';
import useCustomToast from './apis/toast.api';
import { AvatarProfile } from '../packages/Avatar';
// Wrap and export Ionic components
export const Alert = CustomWrapper(IonAlert);
export const Avatar = AvatarProfile
export const BackButton = CustomWrapper(IonBackButton);
export const Badge = CustomWrapper(IonBadge);
export const Button = CustomWrapper(IonButton);
export const Buttons = CustomWrapper(IonButtons);
export const Card = CustomWrapper(IonCard);
export const CardContent = CustomWrapper(IonCardContent);
export const CardHeader = CustomWrapper(IonCardHeader);
export const CardSubtitle = CustomWrapper(IonCardSubtitle);
export const CardTitle = CustomWrapper(IonCardTitle);
export const Checkbox = CustomWrapper(IonCheckbox);
export const Chip = CustomWrapper(IonChip);
export const Col = CustomWrapper(IonCol);
export const Content = IonContent
export const Page = IonPage
export const Datetime = CustomWrapper(IonDatetime);
export const Fab = CustomWrapper(IonFab);
export const FabButton = CustomWrapper(IonFabButton);
export const FabList = CustomWrapper(IonFabList);
export const Footer = CustomWrapper(IonFooter);
export const Grid = CustomWrapper(IonGrid);
export const Header = CustomWrapper(IonHeader);
export const Icon = CustomWrapper(IonIcon);
export const Img = CustomWrapper(IonImg);
export const InfiniteScroll = CustomWrapper(IonInfiniteScroll);
export const InfiniteScrollContent = CustomWrapper(IonInfiniteScrollContent);
export const Input = CustomWrapper(IonInput);
export const Item = CustomWrapper(IonItem);
export const ItemDivider = CustomWrapper(IonItemDivider);
export const ItemGroup = CustomWrapper(IonItemGroup);
export const ItemOption = CustomWrapper(IonItemOption);
export const ItemOptions = CustomWrapper(IonItemOptions);
export const ItemSliding = CustomWrapper(IonItemSliding);
export const Label = CustomWrapper(IonLabel);
export const List = CustomWrapper(IonList);
export const ListHeader = CustomWrapper(IonListHeader);
export const Menu = CustomWrapper(IonMenu);
export const MenuButton = CustomWrapper(IonMenuButton);
export const MenuToggle = CustomWrapper(IonMenuToggle);
export const Modal = CustomWrapper(IonModal);
export const Nav = CustomWrapper(IonNav);
export const Note = CustomWrapper(IonNote);
export const Popover = CustomWrapper(IonPopover);
export const ProgressBar = CustomWrapper(IonProgressBar);
export const Radio = CustomWrapper(IonRadio);
export const RadioGroup = CustomWrapper(IonRadioGroup);
export const Range = CustomWrapper(IonRange);
export const Refresher = CustomWrapper(IonRefresher);
export const RefresherContent = CustomWrapper(IonRefresherContent);
export const Reorder = CustomWrapper(IonReorder);
export const ReorderGroup = CustomWrapper(IonReorderGroup);
export const RippleEffect = CustomWrapper(IonRippleEffect);
export const RouterOutlet = IonRouterOutlet
export const Searchbar = CustomWrapper(IonSearchbar);
export const Segment = CustomWrapper(IonSegment);
export const SegmentButton = CustomWrapper(IonSegmentButton);
export const Select = CustomWrapper(IonSelect);
export const SelectOption = CustomWrapper(IonSelectOption);
export const SkeletonText = CustomWrapper(IonSkeletonText);
export const Spinner = CustomWrapper(IonSpinner);
export const SplitPane = CustomWrapper(IonSplitPane);
export const Tab = CustomWrapper(IonTab);
export const TabBar = IonTabBar
export const TabButton = IonTabButton
export const Tabs = IonTabs
export const Text = CustomWrapper(IonText);
export const Textarea = CustomWrapper(IonTextarea);
export const Thumbnail = CustomWrapper(IonThumbnail);
export const Title = CustomWrapper(IonTitle);
export const Toast = CustomWrapper(IonToast);
export const Toggle = CustomWrapper(IonToggle);
export const Toolbar = CustomWrapper(IonToolbar);
export const Row = CustomWrapper(IonRow);
export const useIonToast = useCustomToast
export const SimpleAvatar = IonAvatar

export  const Typography = forwardRef(
  ({ variant = "h2", children, className, ...rest }, ref) => {
    return (
      <IonText ref={ref} {...rest}>
        {variant === "h1" && (
          <h1 className={cn("text-xl", className)}>{children}</h1>
        )}
        {variant === "h2" && <h2 className={className}>{children}</h2>}
        {variant === "h3" && <h3 className={className}>{children}</h3>}
        {variant === "h4" && <h4 className={className}>{children}</h4>}
        {variant === "h5" && <h5 className={className}>{children}</h5>}
        {variant === "h6" && <h6 className={className}>{children}</h6>}
        {variant === "p" && <p className={className}>{children}</p>}
      </IonText>
    )
  }
)

Typography.displayName = "Typography"

export const ReactRouter = OriginalIonReactRouter
