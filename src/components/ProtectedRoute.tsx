import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { noAuth } from '../app/env';


const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
	// Route protect from Frontend -> still crackable
	const isAuthenticated = useSelector((state: RootState) => state.auth.user !== null);
	return (isAuthenticated || noAuth) ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;