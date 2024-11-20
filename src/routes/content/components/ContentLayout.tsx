import React from 'react';
import Header from './Header';
import LongFooter from './LongFooter';
import { Outlet } from 'react-router-dom';



const ContentLayout: React.FC = () => {

	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<Outlet />
			<LongFooter />
		</div>

	);
};

export default ContentLayout;
