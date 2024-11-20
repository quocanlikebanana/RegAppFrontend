import React from 'react';
import { Box, Slide } from '@mui/material';
import sunsetImage from '/src/assets/sunset.jpg';
import { Outlet } from 'react-router-dom';


const AuthLayout: React.FC = () => {
	return (
		<Slide in>
			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '100vh',
				backgroundImage: `url(${sunsetImage})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}>
				<Outlet />
			</Box>
		</Slide>
	);
};

export default AuthLayout;