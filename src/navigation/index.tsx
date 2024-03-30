import React, { useEffect, useState } from 'react';
import { IonBadge, IonCol, IonIcon, IonLabel, IonRouterOutlet, IonRow, IonTabBar, IonTabButton, IonTabs, IonText } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { Link, Redirect, Route, useHistory, useLocation, useParams } from 'react-router-dom';
import Tab1 from '../pages2/Tab1';
import Tab2 from '../pages2/Tab2';
import Tab3 from '../pages2/Tab3';
import { PageRoute } from './PageRoute';
import { ExploreIcon, HomeIcon, PeopleIcon, MessageIcon } from '../components/packages/icons';
import { IonHeader, IonToolbar, IonTitle, IonSearchbar, IonButtons, IonMenuButton } from '@ionic/react';
import { SearchBar } from '../components/packages/searchBox';

// Define props if you have any for NavBar, for example:
interface NavBarProps {
    // Define any props here if needed, for now, it's empty as we don't have specific props based on your code.
}
type RouteParams = {
    path?: string;
}

const SearchNavBar: React.FC = () => {
    const [ searchText, setSearchText ] = useState('');

    const handleSearch = (event: CustomEvent) => {
        setSearchText(event.detail.value);
        // Trigger the search logic using searchText
    };

    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>My App</IonTitle>
                <IonSearchbar
                    value={searchText}
                    onIonChange={handleSearch}
                    showCancelButton="focus"
                    placeholder="Search"
                ></IonSearchbar>
            </IonToolbar>
        </IonHeader>
    );
};

const SearchBar = () => {

    return (
        // <IonSearchbar></IonSearchbar>
        <div style={{ width: "100%" }}>
        <SearchBar />
    </div>
    )
}
export const NavBar: React.FC<NavBarProps> = () => {
    const navigation = [
        {
            name: "Home",
            Icon: HomeIcon,
            link: "/home"
        },
        {
            name: "Explore Universities",
            Icon: ExploreIcon,
            link: "/search?tab=uni"
        },
        {
            name: "My Network",
            Icon: PeopleIcon,
            link: "/mynetwork"
        },
        {
            name: "Messages",
            Icon: MessageIcon,
            link: "/messages",
            count: 0
        },
        {
            name: "My Profile",
            Icon: PeopleIcon,
            link: "/profile"
        }
    ]
    // find current user path
    const { path } = useParams<RouteParams>();
    const [ active, setActive ] = useState<string>("home");

    useEffect(() => {
        setActive(window.location.pathname)
    }, [])

    // Hook to detect window size
    const useWindowSize = () => {
        const [ windowSize, setWindowSize ] = useState({
            width: window.innerWidth,
        });

        useEffect(() => {
            const handleResize = () => {
                setWindowSize({
                    width: window.innerWidth,
                });
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return windowSize;
    };

    const { width } = useWindowSize();
    const isMobile = width <= 768; // You can adjust this value
    const history = useHistory();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<string>("");
    const handleTabClick = (path: string) => {
        history.push(path);
      };
      useEffect(() => {
        setActiveTab(location.pathname);
      }, [location]);

    return (
        <IonTabs>
            <IonRouterOutlet>
                <PageRoute />
            </IonRouterOutlet>


            {/* <IonTabBar slot={isMobile ? "bottom" : "top"}>
                <IonTabButton tab={"unisala"} href={'/'} layout ="icon-start">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUsQiplH_OWtHnMb1Nrk31z58OJN009JG-w&usqp=CAU"
                        alt="logo"
                        style={{
                            width: "45px"
                        }}
                    />
                </IonTabButton>
                {navigation.map((item, index) => (
                    <IonTabButton tab={item.name} href={'/' + item.name}>
                        <item.Icon fill={active === item.link ? "blue" : "#747372"} />
                        <IonLabel>{item.name}</IonLabel>
                    </IonTabButton>
                ))}
            </IonTabBar> */}

            <IonTabBar slot={isMobile? "bottom": "top"} >
                {!isMobile && (
                    <IonTabButton tab="unisala" href="/" style={{ display: 'flex' }}>
                     <img
                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUsQiplH_OWtHnMb1Nrk31z58OJN009JG-w&usqp=CAU"
                         alt="logo"
                         style={{ width: "45px" }}
                     />
                 </IonTabButton>
                )}

                <IonTabBar>
                 <SearchBar/>
                    </IonTabBar>

                {navigation.map(({name, Icon, link}) => (
                    <IonTabButton key={name} tab={name}
                        onClick={() => handleTabClick(link)} selected={activeTab === link}
                        className={activeTab === link ? 'tab-button-active' : 'tab-button-inactive'}
                    >
                        <Icon />
                        <IonLabel>{name}</IonLabel>
                    </IonTabButton>
                ))}
            </IonTabBar>

        </IonTabs>

    );
};
