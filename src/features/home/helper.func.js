import {
  IonCard,
  IonText,
  IonCol,
  IonItem,
  IonAvatar,
  IonLabel,
  IonHeader,
  IonIcon,
  IonButton
} from "@ionic/react"

import { Link } from "react-router-dom"
import { SearchBar } from "../../component/searchBox"
import { useSelector } from "react-redux"
import { Avatar } from "../../component/Avatar"
import { useState } from "react"
import { useLocation } from "react-router"
import TopSpaces from "../../component/TopSpaces/TopSpaces"
import { useQuery } from "@apollo/client"
import { USER_SERVICE_GQL } from "servers/types"
import { fetchFamousUniversities } from "graphql/user"
import CustomTrackingLink from "features/analytics/LinkTrack"
import ImageWithLoader from "component/Reusable/Image/ImageWithLoader"
import TopOrgs from "features/org/TopOrgs"

export const screenGreaterThan1000 = () => {
  const { data: famousUniversities } = useQuery(fetchFamousUniversities, {
      variables: { limit: 100, page: 0 },
      context: { server: USER_SERVICE_GQL }
    }),
    getFamousUniversity = famousUniversities?.getFamousUniversity || [
      {
        unitId: "Cambridge, MA",
        name: "Harvard University",
        pictures:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ85CYmrXtcB5lixCO4OD31B0lH2bSUWnYlwzXt&s=0"
      },
      {
        unitId: "New York, NY",
        name: "New York, NY",
        pictures:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzvc2BzBLe6O21S54mP4emzDPX0BV7Uha9kh0V&s=0"
      },
      {
        unitId: "Princeton, NJ",
        name: "Princeton University",
        pictures:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWNw-o9FeNO_CPrOI_0GXJubkKMN1ORUHGILlo&s=0"
      },
      {
        unitId: "Stanford, CA",
        name: "Stanford University",
        pictures:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaAc3w5Bl9m8O-BjtEBT5ag4o95voXy8uJQ1iC&s=0"
      },
      {
        unitId: "Berkeley, CA",
        name: "University of California",
        pictures:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuS-57V0-jthS3Xt7V-w-H3aYD2FfUg0rZEOAx&s=0"
      },
      {
        unitId: "Philadelphia, PA",
        name: "California Institute of Technology",
        pictures:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbypxZ6lLq4T3ZXxprpRysIjk03Zbr2rtBzLu2&s=0"
      }
    ]
  return (
    <IonCol
      size="auto"
      className="famousUniList"
      style={{
        maxWidth: "300px",
        height: "90vh",
        position: "sticky",
        top: "0px",
        overflow: "auto"
      }}
    >
      <IonCard className="my-0">
        <IonText color="dark">
          <h6 style={{ padding: "10px" }}>Famous Universities</h6>
        </IonText>

        {getFamousUniversity?.map((item, index) => {
          return (
            <CustomTrackingLink
              to={`/university/${item?.name}`}
              destination={"/university"}
              title="Clicked on famous university List card"
              key={index}
            >
              <IonItem
                style={{
                  margin: "0px",
                  padding: "0px"
                }}
                lines="none"
                key={index}
              >
                <IonAvatar slot="start">
                  <ImageWithLoader
                    src={item.pictures}
                    style={{
                      borderRadius: "100%",
                      width: "40px",
                      height: "40px",
                      overflow: "hidden",
                      objectFit: "cover"
                    }}
                  />
                </IonAvatar>
                <IonLabel>
                  <h2
                    style={{
                      margin: 0
                    }}
                  >
                    {item.name}
                  </h2>
                </IonLabel>
              </IonItem>
            </CustomTrackingLink>
          )
        })}
        <Link to="/search?tab=uni" style={{ marginTop: "120px" }}>
          <IonText
            className="max-w-[250px] text-[#3880FF] text-center  font-semibold"
            fill="solid"
            style={{
              "--background": "white",
              "--background-hover": "#eee"
            }}
          >
            <h1 className="py-4">Search Universities</h1>
          </IonText>
        </Link>
      </IonCard>
    </IonCol>
  )
}

export const screenLessThan768 = ({
  setActiveProfile,
  personCircle,
  activeProfile,
  username,
  loggedIn,
  ProfilePop,
  propsall
}) => {
  return (
    <IonHeader
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        backgroundColor: "white",
        padding: "8px",
        borderBottom: "1px solid #e0e0e0"
      }}
      className="ion-no-border"
    >
      <div
        style={{
          display: "flex",
          alignSelf: "center",
          height: "100%",
          width: "95%",
          margin: "auto",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <SearchBar />
        {loggedIn && (
          // <Link to={`/@/${username}`}>
          <div className="profile-pop">
            <IonIcon
              size="large"
              onClick={() =>
                setActiveProfile({ profile: !activeProfile.profile })
              }
              icon={personCircle}
              color="medium"
              className="ml-2 scale-125"
            />
            {activeProfile.profile && (
              <div className="absolute max-[290px]:-left-44 shadow-md h-32 bg-white z-30 -left-52">
                <ProfilePop allProps={{ propsall }} />
              </div>
            )}
            {/* <Authentication
              setActiveNavDrop={setActiveProfile}
              activeNavDrop={activeProfile}
            /> */}
          </div>
          // </Link>
        )}
      </div>
    </IonHeader>
  )
}
export const screensMoreThan768 = ({
  activeTab,
  setActiveTab,
  unisalaImg,
  profileData,
  loggedIn,
  topSpaces,
  topOrgs
}) => {
  const { user } = useSelector((state) => state.userProfile)
  const [percentage, setPercentage] = useState(0)

  const radius = 45
  const dashArray = radius * Math.PI * 2
  const dataOffset = dashArray - (dashArray * percentage) / 100

  return (
    <IonCol
      size="auto"
      style={{
        height: "90vh",
        position: "sticky",
        top: "0px",
        overflow: "auto"
      }}
      className="profileCard"
    >
      {loggedIn ? (
        <>
          <IonCard className="my-0">
            <div className="aside-profile">
              <div className="w-24 h-24 rounded-full overflow-hidden   !border-[7px] !border-neutral-200">
                <Avatar
                  username={user.username}
                  profilePic={user?.picture}
                  size="medium"
                />
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="160px"
                height="160px"
                className="progress-ring"
              >
                <defs>
                  <linearGradient id="GradientColor">
                    <stop offset="0%" stopColor="#e91e63" />
                    <stop offset="100%" stopColor="#673ab7" />
                  </linearGradient>
                </defs>
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  strokeLinecap="round"
                  style={{
                    fill: "none",
                    stroke: "url(#GradientColor)",
                    strokeWidth: "7px",
                    strokeDasharray: dashArray,
                    strokeDashoffset: dataOffset
                  }}
                />
              </svg>
            </div>
            <div className="aside-profile-details">
              <IonText className="flex justify-content-center" color="dark">
                <h6>{user?.firstName + " " + user?.lastName}</h6>
              </IonText>
              <IonText color="medium">
                <p>@{user.username}</p>
              </IonText>
            </div>
          </IonCard>

          <IonCard className="overflow-y-auto my-4 max-h-[348px]">
            <IonText color="dark">
              <h6 className="text-center my-2 font-semibold">Top Spaces</h6>
            </IonText>

            <TopSpaces topSpaces={topSpaces} />
            <Link to="/space" style={{ marginTop: "120px" }}>
              <IonText
                className="max-w-[250px] text-[#3880FF] text-center  font-semibold"
                fill="solid"
                style={{
                  "--background": "white",
                  "--background-hover": "#eee"
                }}
              >
                <h1 className="py-4">Browse More Spaces</h1>
              </IonText>
            </Link>
          </IonCard>

          <IonCard className="overflow-y-auto my-4 max-h-[348px]">
            <IonText color="dark">
              <h6 className="text-center my-2 font-semibold">
                Top Organization
              </h6>
            </IonText>
            <TopOrgs topOrgs={topOrgs?.data} />
          </IonCard>
        </>
      ) : (
        <IonCard
          style={{
            maxWidth: "250px"
          }}
        >
          <img src={unisalaImg} alt="unisala" />
          <h5
            className="black-text"
            style={{
              textAlign: "center",
              fontSize: "1.2rem",
              lineHeight: "26px",
              padding: "5px"
            }}
          >
            If studying abroad is your dream, making it simple is ours! ✅
          </h5>
        </IonCard>
      )}
    </IonCol>
  )
}
