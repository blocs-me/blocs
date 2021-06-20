import LandingPage from "../components/LandingPage"
import { A, NavLink } from "../components/Nav"
import useAuth from "../hooks/useAuth"

function Landing() {
  useAuth()

  return <LandingPage />
}

export default Landing
