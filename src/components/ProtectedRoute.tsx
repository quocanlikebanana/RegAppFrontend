import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../app/strore';

interface ProtectedRouteProps {
	element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;