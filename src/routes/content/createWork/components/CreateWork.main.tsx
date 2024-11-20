import React from 'react';
import useRightBodyComponent from '../react/RightBodyComponent.hook';

const CreateWork: React.FC = () => {
	const { rightBodyComponent, setRightBodyComponentType } = useRightBodyComponent();

	function handleOnNewTypeClick() {
		setRightBodyComponentType("NewTaskTypeForm");
	}

	return (
		<div className="bg-gray-100 min-h-screen p-8">
			<div className="col-span-4 bg-white p-6 rounded shadow">
				<h2 className="text-xl font-semibold mb-4">Work title</h2>
				<input
					type="text"
					className="w-full border rounded p-2 mb-6"
					placeholder="Enter work title"
				/>
				<h3 className="text-lg font-medium mb-4">Information</h3>
				<div className="space-y-4">
					{Array.from({ length: 3 }).map((_, index) => (
						<div
							key={index}
							className="flex items-center gap-4 border p-2 rounded"
						>
							<input
								type="text"
								className="flex-grow border rounded p-2"
								placeholder="Name"
							/>
							<input
								type="text"
								className="flex-grow border rounded p-2"
								placeholder="Type"
							/>
							<input
								type="text"
								className="flex-grow border rounded p-2"
								placeholder="Content"
							/>
							<button className="text-red-500 hover:text-red-700">
								<i className="fas fa-trash-alt"></i>
							</button>
						</div>
					))}
					<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
						Add field
					</button>
				</div>

				<h3 className="text-lg font-medium mt-6 mb-4">Tasks</h3>
				<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
					onClick={handleOnNewTypeClick}>
					New type
				</button>
				<div className="space-y-4">
					{Array.from({ length: 3 }).map((_, index) => (
						<div
							key={index}
							className="border p-4 rounded flex flex-col gap-3 bg-gray-50 shadow"
						>
							<h3 className="font-semibold">Basic task</h3>
							<ul className="text-sm list-disc pl-4">
								<li>Groupable</li>
								<li>Has due</li>
								<li>Has priority</li>
								<li>Revertible</li>
							</ul>
							<div className="flex items-center justify-between">
								<button className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600">
									Insert
								</button>
								<button className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-400">
									Modify
								</button>
								<button className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">
									Remove
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Right Body */}
			{rightBodyComponent}

		</div>
	);
};

export default CreateWork;
