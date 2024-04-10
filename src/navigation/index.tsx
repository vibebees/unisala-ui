import React, { useEffect, useState } from 'react';
import {
    Badge, Col, Icon, Label, RouterOutlet, Row, TabBar, TabButton, Tabs, Text,
    Header, Toolbar, Title, Searchbar, Buttons, MenuButton
} from "../components/defaults/"
import { personCircle } from 'ionicons/icons';
import { Link, Redirect, Route, useHistory, useLocation, useParams } from 'react-router-dom';
import Tab1 from '../pages2/Tab1';
import Tab2 from '../pages2/Tab2';
import Tab3 from '../pages2/Tab3';
import { PageRoute } from './PageRoute';
import { ExploreIcon, HomeIcon, PeopleIcon, MessageIcon } from '../components/packages/icons';
import { SearchBar } from '../components/packages/searchBox';
import { authenticated, getCache, userName } from '../utils/cache';
import { IonCol, IonGrid, IonHeader, IonRow } from '@ionic/react';
import { max } from 'moment';
import { useSelector } from 'react-redux';

// Define props if you have any for NavBar, for example:
interface NavigationProps {
    // Define any props here if needed, for now, it's empty as we don't have specific props based on your code.
}
type RouteParams = {
    path?: string;
}



export const Navigation: React.FC<NavigationProps> = () => {
    const authenticated = getCache("refreshToken");
     let profileLink = authenticated ? "/@/" + userName : "/profile";
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
            name: " Network",
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
            name: "Profile",
            Icon: PeopleIcon,
            link: profileLink
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
    const [ activeTab, setActiveTab ] = useState<string>("");
    const handleTabClick = (path: string) => {
        history.push(path);
    };
    useEffect(() => {
        setActiveTab(location.pathname);
    }, [ location ]);
    const desktopViewCss = { marginRight: "0px", paddingStart: "0px", paddingEnd: "0px", maxWidth: '10%' }
    const styleForIcon = { flex: "0 0 auto", padding: 0, height: "100%", width: '50px' }
    const styleForSearch = { flex: "0 0 auto", width: "100%"}
    const navBarStyle = isMobile
    ? { width: "100%", height: "50px", border: 'none' , boxShadow:'none'}
    : { width: "50%", height: "55px", border: 'none', boxShadow:'none' };

    return (
        <>
            <IonHeader style={navBarStyle}>
                <IonGrid
                    style={{
                        // boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
                        position: "sticky",
                        top: 0,
                        marginBottom: "10px"
                    }}
                >
                    <IonRow>
                        <IonCol style={isMobile ? {...styleForIcon, display: 'none'} : styleForIcon} size='1'>
                            <Link to="/">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUsQiplH_OWtHnMb1Nrk31z58OJN009JG-w&usqp=CAU"
                                    alt="logo"
                                    style={{width: "45px" }}
                                />
                            </Link>
                        </IonCol>
                        <IonCol  style={{...styleForSearch}} size='11'>
                            <SearchBar />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonHeader>

            <Tabs>
                <RouterOutlet>
                    <PageRoute />
                </RouterOutlet>

                <TabBar slot={isMobile ? "bottom" : "top"} className=" justify-end padding-0">



                    {navigation?.map(({ name, Icon, link }) => (
                        <TabButton key={name} tab={name}
                            onClick={() => handleTabClick(link)} selected={activeTab === link}
                            className={activeTab === link ? 'tab-button-active' : 'tab-button-inactive'}
                            style={isMobile ? { padding: "0px", margin: "0px" } : desktopViewCss}
                        >
                            <Icon />
                            <Label style={{ fontSize: isMobile ? "10px" : '' }}>{name}</Label>
                        </TabButton>
                    ))}
                </TabBar>

            </Tabs>

        </>

    );
};
