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

// Define props if you have any for NavBar, for example:
interface NavBarProps {
    // Define any props here if needed, for now, it's empty as we don't have specific props based on your code.
}
type RouteParams = {
    path?: string;
}


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
        <Tabs>
            <RouterOutlet>
                <PageRoute />
            </RouterOutlet>


            {/* <TabBar slot={isMobile ? "bottom" : "top"}>
                <TabButton tab={"unisala"} href={'/'} layout ="icon-start">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUsQiplH_OWtHnMb1Nrk31z58OJN009JG-w&usqp=CAU"
                        alt="logo"
                        style={{
                            width: "45px"
                        }}
                    />
                </TabButton>
                {navigat.map((item, index) => (
                    <TabButton tab={item.name} href={'/' + item.name}>
                        <item.Icon fill={active === item.link ? "blue" : "#747372"} />
                        <Label>{item.name}</Label>
                    </TabButton>
                ))}
            </TabBar> */}

            <TabBar slot={isMobile? "bottom": "top"} >
                {!isMobile && (
                    <TabButton tab="unisala" href="/" style={{ display: 'flex' }}>
                     <img
                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUsQiplH_OWtHnMb1Nrk31z58OJN009JG-w&usqp=CAU"
                         alt="logo"
                         style={{ width: "45px" }}
                     />
                 </TabButton>
                )}

                <TabBar>
                 <SearchBar/>
                    </TabBar>

                {navigation?.map(({name, Icon, link}) => (
                    <TabButton key={name} tab={name}
                        onClick={() => handleTabClick(link)} selected={activeTab === link}
                        className={activeTab === link ? 'tab-button-active' : 'tab-button-inactive'}
                    >
                        <Icon />
                        <Label  style ={{  fontSize: isMobile? "10px": ''}}>{name}</Label>
                    </TabButton>
                ))}
            </TabBar>

        </Tabs>

    );
};
