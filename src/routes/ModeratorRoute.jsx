import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useRole from "../hooks/useRole";
import PropTypes from "prop-types";

export default function ModeratorRoute({ children }) {
  const [role, isLoading] = useRole();

  if (isLoading) return <Loading />;
  if (role === "moderator") return children;
  return <Navigate to="/dashboard" replace="true" />;
}

ModeratorRoute.propTypes = {
  children: PropTypes.element,
};
