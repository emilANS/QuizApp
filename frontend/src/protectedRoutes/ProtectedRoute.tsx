import { Navigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";
import type { JSX } from "react";

interface Props {
    children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
    const { isAuthenticated } = UseAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;