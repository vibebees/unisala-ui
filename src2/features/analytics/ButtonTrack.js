import ReactGA from "react-ga4"
export const ButtonTrack = (action) => {
  ReactGA.event({
    action: action
  })
}
