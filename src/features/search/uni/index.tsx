import { useEffect, useState } from "react"
import {
  IonButton,
  IonButtons,
  IonCol,
  IonHeader,
  IonIcon,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonRow,
  IonTitle,
  IonToolbar,
  IonContent
} from "@ionic/react"
import { useDispatch } from "react-redux"
import useWindowWidth from "../../../hooks/useWindowWidth"
import { searchGetSuccess } from "../../../datasource/store/action/index"
import { useQuery } from "@apollo/client"
import { UNIVERSITY_SERVICE_GQL } from "../../../datasource/servers/types"
import { useLocation } from "react-router"
import { INITIAL_QUERY_DATA } from "./filter/constants"
import { URLgetter } from "../../../utils/lib/URLupdate"
import { useHistory } from "react-router-dom"
import clsx from "clsx"
import { DesktopFilter } from "./desktopFilter"
import { MobileFilter } from "./mobileFilter"
import {ResultsColumn} from "./resultColumn"



function index({ query, loading }) {
  const windowWidth = useWindowWidth()
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const searchParams = new URLSearchParams(location.search)

  const [activeSubTab, setActiveSubTab] = useState("u")



  const [filterPage, setFilterPage] = useState(1)



  useEffect(() => {
    const url = URLgetter("st")
    if (url) {
      setActiveSubTab(url)
    } else {
      setActiveSubTab("u")
    }
  }, [history.location.search])




return (
  <>
    <IonRow>
      {/* {isDesktop ? (
        <DesktopFilter filterPage={filterPage} setIsLoading={setIsLoading} />
      ) : (
          <MobileFilter
            filterPage={1} // Example page number
            setIsLoading={() => {}} // Replace with actual setIsLoading function
          />
      )} */}
      <ResultsColumn
        activeSubTab={activeSubTab}
        filterPage={filterPage}
        setFilterPage={setFilterPage}
        loading={loading}
      />
    </IonRow>
  </>
)
}

export default index
