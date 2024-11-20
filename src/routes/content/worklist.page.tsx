import React from 'react';

const WorkListPage: React.FC = () => {
	return (<>
		<div className="bg-white shadow px-8 py-4 flex items-center justify-between">
			<div className="flex items-center gap-4">
				<button className="text-gray-600 text-xl">
					<i className="fas fa-bars"></i>
				</button>
				<button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
					Sort
				</button>
				<button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
					Search
				</button>
			</div>
			<div className="flex items-center gap-4">
				<button className="bg-purple-100 text-purple-700 px-4 py-2 rounded hover:bg-purple-200 flex items-center gap-2">
					<i className="fas fa-upload"></i> Import
				</button>
				<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2">
					<i className="fas fa-plus"></i> New Work
				</button>
			</div>
		</div>

		{/* Card Grid */}
		<main className="px-8 py-6">
			<div className="grid grid-cols-3 gap-6">
				{Array.from({ length: 9 }).map((_, index) => (
					<div
						key={index}
						className="bg-white rounded shadow overflow-hidden border border-gray-200"
					>
						<div className="h-40 bg-pink-400"></div>
						<div className="p-4 text-sm">
							<p>Last edited: 3 days ago</p>
							<p>Created on: 01/01/2024</p>
						</div>
					</div>
				))}
			</div>
		</main>
	</>);
};

export default WorkListPage;