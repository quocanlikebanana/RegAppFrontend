import React from 'react';
import { LayoutProps } from './Contract';
import { Box, Slide } from '@mui/material';
import sunsetImage from '../../assets/sunset.jpg';


const OutsideLayout: React.FC<LayoutProps> = ({ children }) => {
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
				{children}
			</Box>
		</Slide>
	);
};

export default OutsideLayout;