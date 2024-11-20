import React from "react";

const InsertTaskCanvas: React.FC = () => {
	return (
		<div className="bg-gray-100 min-h-screen p-8">
			<div className="grid grid-cols-12 gap-6">

				{/* Right Panel */}
				<div className="col-span-8 bg-white p-6 rounded shadow">
					{/* Breadcrumb Navigation */}
					<nav className="text-sm text-gray-500 mb-4">
						<span className="text-gray-700 font-medium">Task 1</span> &gt;{" "}
						<span>Task 2</span> &gt; <span>Task 3</span>
					</nav>

					{/* View Selector */}
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-xl font-semibold">Task Details</h2>
						<div className="space-x-4">
							<button className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400">
								Diagram
							</button>
							<button className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400">
								Table
							</button>
						</div>
					</div>

					{/* Main Content */}
					<div className="bg-gray-200 h-[400px] rounded flex items-center justify-center">
						<p className="text-gray-500">Task details visualization here</p>
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="mt-8 flex justify-end gap-4">
				<button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
					Cancel
				</button>
				<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
					Create
				</button>
			</div>
		</div>
	);
};

export default InsertTaskCanvas;