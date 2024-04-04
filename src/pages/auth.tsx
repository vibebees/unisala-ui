import React from "react"
import { CardContent } from "../components/defaults"
import Layout from './layout';
import LoginPage from "../features/login"
const AuthPage = ({ allProps }) => {

  return (
    <Layout
      mainContent={<LoginPage allProps={{}} />}
    />
  )
}
export default AuthPage











