import Dashboard from "../../components/Dashboard"
import { A, NavLink } from "../../components/Nav"
import useAuth from "../../hooks/useAuth"
import useUser from "../../hooks/useUser"

const MainDashboard = () => {
  useAuth()
  return <Dashboard title="DASHBOARD" />
}

export default MainDashboard
