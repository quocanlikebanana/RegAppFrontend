import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
	return (
		<Box sx={{
			transition: 'all 0.3s ease-in-out',
		}}>
			<Outlet />
		</Box>
	);
};

export default Layout;
