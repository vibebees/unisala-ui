import {useQuery} from "@apollo/client"
import {IonCardTitle, IonCol, IonContent, IonIcon, IonRow} from "@ionic/react"
import CourseCard from "../../components/packages/courseCard"
import {SearchBar} from "../../components/packages/searchBox"
import UserCard from "../../components/packages/userCard"
import {userSearch} from "../../datasource/graphql/user"
import useDocTitle from "../../hooks/useDocTitile"
import {school} from "ionicons/icons"
import {useContext, useEffect, useState} from "react"
import {Link, useHistory, useLocation} from "react-router-dom"
import {UNIVERSITY_SERVICE_GQL, USER_SERVICE_GQL} from "../../datasource/servers/types"
import {URLgetter} from "../../utils/lib/URLupdate"
import SearchTab from "./atoms/SearchTab"
import UniSearchResult from "./uni"
import {ExploreFilterPopupContext} from "./uni/ExploreUniFilterPopupContext"
import UserSearchResult from "./user"
import {UniSearchDataList} from "../../datasource/graphql/uni"

export const SearchTemplate = () => {
  const [tab, setTab] = useState("all")
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get("q") || ""
  useDocTitle("Search ᛫ " + query)
  const history = useHistory()

  const { data: unidata, loading, refetch} = useQuery(UniSearchDataList, {
    variables: { name: query },
    context: { server: UNIVERSITY_SERVICE_GQL }
  })
  const { data: searchUser } = useQuery(userSearch(query), {
    context: { server: USER_SERVICE_GQL }
  })

  useEffect(() => {
    const getTab = URLgetter("tab")
    if (getTab) {
      setTab(getTab)
    } else {
      setTab("all")
    }
  }, [history.location.search])
  const { setPopUp } = useContext(ExploreFilterPopupContext)


  useEffect(() => {
    refetch()
  }, [query])

  const UniversityResults = ({ universities, loading }) => {
    return (
      <div>
        <h3 style={{ color: "#4d4d4d" }}>Universities</h3>
        <div>
          {universities?.length ? (
            universities?.map((data, index) => (
              <Link to={`/university/${data?.name}`} key={index}>
                <CourseCard allProps={data} />
              </Link>
            ))
          ) : (
            <IonCardTitle style={{ textAlign: "center", color: "#898989" }}>
              {!loading && " Sorry! No result found."}
            </IonCardTitle>
          )}
        </div>
      </div>
    )
  }

  const UserResults = ({ users, loading }) => {
    return (
      <div>
        <h3 style={{ marginBottom: "1rem", color: "#4d4d4d" }}>Users</h3>
        {users?.length ? (
          <div className="grid-3">
            {users.map((user, index) => (
              <UserCard
                key={index}
                profileBanner={user?.coverPicture}
                profileImg={user?.picture}
                name={user?.firstName + " " + user?.lastName}
                username={user?.username}
                location={user?.location}
                oneLineBio={user?.oneLineBio}
              />
            ))}
          </div>
        ) : (
          <IonCardTitle style={{ textAlign: "center", color: "#898989" }}>
            {loading ? "Loading..." : "Sorry! No result found"}
          </IonCardTitle>
        )}
      </div>
    )
  }
  const SearchFilterRow = ({ setPopUp }) => {
    return (
      <IonRow className="mobile-row">
         <IonCol size="auto">
            <IonIcon
              icon={school}
              onClick={() => setPopUp(true)}
              size="large"
              color="success"
            />
        </IonCol>
        <IonCol>
          <SearchBar />
        </IonCol>
      </IonRow>
    )
  }
return (
    <IonContent>
      <SearchFilterRow setPopUp={setPopUp} />
      {tab !== "uni" && <SearchTab />}

      <IonRow>
        <IonCol className="result-col">
          {tab === "all" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <UserResults users={searchUser?.searchUser?.user} loading={loading} />
              <UniversityResults universities={unidata?.searchSchool} loading={loading} />
              <div>
                <h3 style={{ marginBottom: "1rem", color: "#4d4d4d" }}>Posts</h3>
              </div>
            </div>
          )}
          {tab === "user" && <UserSearchResult query={query} />}
          {tab === "uni" && <UniSearchResult query={query} />}
          {tab === "post" && <h1>Posts</h1>}
        </IonCol>
      </IonRow>
    </IonContent>
  )


/*
return (
    <>

    <IonRow className="mobile-row">
      <IonCol>
        <SearchBar />
      </IonCol>
      <IonCol size="auto">
        <IonIcon
          icon={school}
          onClick={() => setPopUp(true)}
          size="large"
        />
      </IonCol>
    </IonRow>

        {tab !== "uni" && <SearchTab />}

        <IonRow>
          <IonCol className="result-col">
            {tab === "all" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem"
                }}
              >
                <div>
                  <h3
                    style={{
                      marginBottom: "1rem",
                      color: "#4d4d4d"
                    }}
                  >
                    Users
                  </h3>

                  {searchUser?.searchUser?.user.length ? (
                    <div className="grid-3">
                      {searchUser?.searchUser?.user.map((user, index) => (
                        <UserCard
                          key={index}
                          profileBanner={user?.coverPicture}
                          profileImg={user?.picture}
                          name={user?.firstName + " " + user?.lastName}
                          username={user?.username}
                          loaction={user?.location}
                          oneLineBio={user?.oneLineBio}
                        />
                      ))}
                    </div>
                  ) : (
                    <IonCardTitle
                      style={{
                        textAlign: "center",
                        color: "#898989"
                      }}
                    >
                      {loading ? "Loading..." : "Sorry! No result found"}
                    </IonCardTitle>
                  )}
                </div>

                <div>
                  <h3
                    style={{
                      color: "#4d4d4d"
                    }}
                  >
                    Universities
                  </h3>
                  <div>
                    {Array.isArray(unidata?.searchSchool) &&
                    unidata?.searchSchool.length ? (
                      unidata?.searchSchool.map((data, index) => {
                        return (
                          <Link to={`/university/${data?.name}`} key={index}>
                            <CourseCard allProps={data} />
                          </Link>
                        )
                      })
                    ) : (
                      <IonCardTitle
                        style={{
                          textAlign: "center",
                          color: "#898989"
                        }}
                      >
                        {!loading && " Sorry! No result found."}
                      </IonCardTitle>
                    )}
                  </div>
                </div>

                <div>
                  <h3
                    style={{
                      marginBottom: "1rem",
                      color: "#4d4d4d"
                    }}
                  >
                    Posts
                  </h3>
                </div>
              </div>
            )}
            {tab === "user" && <UserSearchResult query={query} />}
            {tab === "uni" && (
                <UniSearchResult query={query} />
             )}
            {tab === "post" && <h1>Posts</h1>}
          </IonCol>
        </IonRow>
    </>
  )
*/
}

