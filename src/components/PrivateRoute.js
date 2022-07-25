import { Navigate, useLocation } from "react-router-dom";
import { useSession } from "../authContext/AuthProvider";

export default function PrivateRoute({ children }) {
  const { isAuthed } = useSession();
  return isAuthed ? children : <Navigate to="/login" />;
}
