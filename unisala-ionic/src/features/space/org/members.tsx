import React from "react"
import UserCard from "../../../component/userCard"
import {IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow} from "@ionic/react"
import "./members.css"
import Tabs from "../../../component/tabs"
import {useHistory} from "react-router"

const org = {
    members: [
        {
            "_id": "65941aa7cb2a068a66323bf1",
            "firstName": "dipu",
            "lastName": "testing",
            "username": "dipu",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "64b3ce6a20785e9049ec9483",
            "firstName": "test",
            "lastName": "test",
            "username": "testtest100",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "650da2757753c42d984d2754",
            "firstName": "ankit",
            "lastName": "test",
            "username": "xafari2579",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "64b92d0d20785e9049ec9beb",
            "firstName": "test",
            "lastName": "test",
            "username": "test",
            "picture": "test",
            "coverPicture": "test",
            "location": "test",
            "__typename": "SearchUser"
        },
        {
            "_id": "659249a7cb2a068a6632015e",
            "firstName": "testing",
            "lastName": "testing",
            "username": "testing1",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "657bcb9b2541004ec2fc1ba7",
            "firstName": "test",
            "lastName": "baroyak283",
            "username": "baroyak283",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "65045fbb4ea5bcce01ea490b",
            "firstName": "test2",
            "lastName": "test",
            "username": "no.reply",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "656694b9b528871c40a29a37",
            "firstName": "test",
            "lastName": "ătacoda1101",
            "username": "ătacoda1101",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        }
    ],

    students: [
        {
            "_id": "65941aa7cb2a068a66323bf1",
            "firstName": "dipu",
            "lastName": "testing",
            "username": "dipu",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "64b3ce6a20785e9049ec9483",
            "firstName": "test",
            "lastName": "test",
            "username": "testtest100",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
         },
         {
            "_id": "65941aa7cb2a068a66323bf1",
            "firstName": "dipu",
            "lastName": "testing",
            "username": "dipu",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "64b3ce6a20785e9049ec9483",
            "firstName": "test",
            "lastName": "test",
            "username": "testtest100",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        }, {
            "_id": "65941aa7cb2a068a66323bf1",
            "firstName": "dipu",
            "lastName": "testing",
            "username": "dipu",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "65941aa7cb2a068a66323bf1",
            "firstName": "dipu",
            "lastName": "testing",
            "username": "dipu",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "64b3ce6a20785e9049ec9483",
            "firstName": "test",
            "lastName": "test",
            "username": "testtest100",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
         },
         {
            "_id": "65941aa7cb2a068a66323bf1",
            "firstName": "dipu",
            "lastName": "testing",
            "username": "dipu",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "64b3ce6a20785e9049ec9483",
            "firstName": "test",
            "lastName": "test",
            "username": "testtest100",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        }, {
            "_id": "65941aa7cb2a068a66323bf1",
            "firstName": "dipu",
            "lastName": "testing",
            "username": "dipu",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "64b3ce6a20785e9049ec9483",
            "firstName": "test",
            "lastName": "test",
            "username": "testtest100",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "650da2757753c42d984d2754",
            "firstName": "ankit",
            "lastName": "test",
            "username": "xafari2579",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "64b92d0d20785e9049ec9beb",
            "firstName": "test",
            "lastName": "test",
            "username": "test",
            "picture": "test",
            "coverPicture": "test",
            "location": "test",
            "__typename": "SearchUser"
        },
        {
            "_id": "659249a7cb2a068a6632015e",
            "firstName": "testing",
            "lastName": "testing",
            "username": "testing1",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "657bcb9b2541004ec2fc1ba7",
            "firstName": "test",
            "lastName": "baroyak283",
            "username": "baroyak283",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "65045fbb4ea5bcce01ea490b",
            "firstName": "test2",
            "lastName": "test",
            "username": "no.reply",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "656694b9b528871c40a29a37",
            "firstName": "test",
            "lastName": "ătacoda1101",
            "username": "ătacoda1101",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        }
    ],

     alumini: [
        {
            "_id": "65941aa7cb2a068a66323bf1",
            "firstName": "dipu",
            "lastName": "testing",
            "username": "dipu",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "64b3ce6a20785e9049ec9483",
            "firstName": "test",
            "lastName": "test",
            "username": "testtest100",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "650da2757753c42d984d2754",
            "firstName": "ankit",
            "lastName": "test",
            "username": "xafari2579",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "64b92d0d20785e9049ec9beb",
            "firstName": "test",
            "lastName": "test",
            "username": "test",
            "picture": "test",
            "coverPicture": "test",
            "location": "test",
            "__typename": "SearchUser"
        },
        {
            "_id": "659249a7cb2a068a6632015e",
            "firstName": "testing",
            "lastName": "testing",
            "username": "testing1",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "657bcb9b2541004ec2fc1ba7",
            "firstName": "test",
            "lastName": "baroyak283",
            "username": "baroyak283",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "65045fbb4ea5bcce01ea490b",
            "firstName": "test2",
            "lastName": "test",
            "username": "no.reply",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "656694b9b528871c40a29a37",
            "firstName": "test",
            "lastName": "ătacoda1101",
            "username": "ătacoda1101",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
         },
         {
            "_id": "65941aa7cb2a068a66323bf1",
            "firstName": "dipu",
            "lastName": "testing",
            "username": "dipu",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "64b3ce6a20785e9049ec9483",
            "firstName": "test",
            "lastName": "test",
            "username": "testtest100",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "650da2757753c42d984d2754",
            "firstName": "ankit",
            "lastName": "test",
            "username": "xafari2579",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "64b92d0d20785e9049ec9beb",
            "firstName": "test",
            "lastName": "test",
            "username": "test",
            "picture": "test",
            "coverPicture": "test",
            "location": "test",
            "__typename": "SearchUser"
        },
        {
            "_id": "659249a7cb2a068a6632015e",
            "firstName": "testing",
            "lastName": "testing",
            "username": "testing1",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "657bcb9b2541004ec2fc1ba7",
            "firstName": "test",
            "lastName": "baroyak283",
            "username": "baroyak283",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "65045fbb4ea5bcce01ea490b",
            "firstName": "test2",
            "lastName": "test",
            "username": "no.reply",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "656694b9b528871c40a29a37",
            "firstName": "test",
            "lastName": "ătacoda1101",
            "username": "ătacoda1101",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
         },
         {
            "_id": "65941aa7cb2a068a66323bf1",
            "firstName": "dipu",
            "lastName": "testing",
            "username": "dipu",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "64b3ce6a20785e9049ec9483",
            "firstName": "test",
            "lastName": "test",
            "username": "testtest100",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "650da2757753c42d984d2754",
            "firstName": "ankit",
            "lastName": "test",
            "username": "xafari2579",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "64b92d0d20785e9049ec9beb",
            "firstName": "test",
            "lastName": "test",
            "username": "test",
            "picture": "test",
            "coverPicture": "test",
            "location": "test",
            "__typename": "SearchUser"
        },
        {
            "_id": "659249a7cb2a068a6632015e",
            "firstName": "testing",
            "lastName": "testing",
            "username": "testing1",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "657bcb9b2541004ec2fc1ba7",
            "firstName": "test",
            "lastName": "baroyak283",
            "username": "baroyak283",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "65045fbb4ea5bcce01ea490b",
            "firstName": "test2",
            "lastName": "test",
            "username": "no.reply",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        },
        {
            "_id": "656694b9b528871c40a29a37",
            "firstName": "test",
            "lastName": "ătacoda1101",
            "username": "ătacoda1101",
            "picture": null,
            "coverPicture": null,
            "location": null,
            "__typename": "SearchUser"
        }
    ]
}

export const Members = () => {
    const history = useHistory()
    const myDefaultMembers = "Members"
    const typeOfMember = {
        options: [
            {
                "name": myDefaultMembers,
                "icon": "people",
                "count": 6,
                "nav": "members"
            },
            {
                "name": "Students",
                "icon": "business",
                "count": 30,
                "nav": "students"

            },
            {
                "name": "Alumini",
                "icon": "school",
                "count": 600,
                "nav": "alumini"

            }
        ],
        onClick: (event, nav) => {
             const currentUrl = new URL(window.location.href)
            currentUrl.searchParams.set("mem", nav)
            history.push(currentUrl.pathname + currentUrl.search)
        },
        scrollable: false
    }

    const getQueryParam = (param) => {
        const queryParams = new URLSearchParams(location.search)
        return queryParams.get(param)
    }
    const memberType = (getQueryParam("mem") || myDefaultMembers)
    const orgChart = org[memberType]
    return (
        <IonGrid>
            <IonCard className="members-card">
                <IonCardHeader>
                    <IonCardTitle className="members-title">{memberType.toUpperCase()} : {orgChart?.length}</IonCardTitle>
                </IonCardHeader>
                <IonRow className="bg-white" >
                <Tabs config={typeOfMember} />
            </IonRow>
            </IonCard>


            <IonRow>
                {orgChart?.map((user, index) => (
                    <IonCol
                        key={index}
                        size="12"
                        sizeSm="6"
                        sizeMd="4"
                        sizeLg="4"
                        sizeXl="4"
                    >
                        <UserCard
                            key={index}
                            profileBanner={user?.coverPicture}
                            profileImg={user?.picture}
                            name={user?.firstName + " " + user?.lastName}
                            username={user?.username}
                            loaction={user?.location}
                            oneLineBio={"president"}
                        />
                    </IonCol>
                ))}
            </IonRow>
        </IonGrid>)

}
