import React from "react";
import logo from "/src/assets/logo.png";

const Header: React.FC = () => {
	return (
		<header className="bg-grey-9 px-8 py-4 flex items-center justify-between">
			<div className="flex items-center space-x-6">
				<img src={logo} alt="Nitodo" className="w-8 h-8" />
				<div className="font-t-4 bg-gradient-1 text-transparent bg-clip-text">
					Nitodo
				</div>
				<nav className="flex space-x-8 text-sm text-white font-h-4">
					<a href="#" className="hover:text-gray-300">
						Products
					</a>
					<a href="#" className="hover:text-gray-300">
						Pricing
					</a>
					<a href="#" className="hover:text-gray-300">
						Guidance
					</a>
				</nav>
			</div>
			<div className="flex items-center space-x-4">
				<button className="p-2 rounded-full bg-gray-800">
					<i className="fas fa-bars text-white"></i>
				</button>
				<button className="p-2 rounded-full bg-gray-800">
					<i className="fas fa-moon text-white"></i>
				</button>
			</div>
		</header>
	);
};

export default Header;