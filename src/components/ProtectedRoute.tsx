import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
	protectorFunction: () => boolean;
	element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ protectorFunction, element }) => {
	return protectorFunction() ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;