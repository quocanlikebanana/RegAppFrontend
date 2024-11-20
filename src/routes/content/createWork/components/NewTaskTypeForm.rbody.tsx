import React from 'react';
import useRightBodyComponent from '../react/RightBodyComponent.hook';


const NewTaskTypeForm: React.FC = () => {
	const { setRightBodyComponentType } = useRightBodyComponent();

	function handleCancelClick() {
		setRightBodyComponentType("InsertTaskCanvas");
	}

	return (
		<div className="bg-gray-100 min-h-screen p-8">
			<div className="grid grid-cols-12 gap-6">
				{/* Task Template */}
				<div className="col-span-4 bg-white p-6 rounded shadow">
					<h2 className="text-xl font-semibold mb-4">Task template</h2>
					<input
						type="text"
						className="w-full border rounded p-2 mb-4"
						placeholder="Type name"
					/>
					<input
						type="text"
						className="w-full border rounded p-2 mb-6"
						placeholder="Based on"
					/>
					<h3 className="text-lg font-medium mb-4">Properties</h3>
					<div className="space-y-3">
						{[
							"Groupable",
							"Has due",
							"Has priority",
							"Revertible",
						].map((property, index) => (
							<div
								key={index}
								className="flex items-center justify-between"
							>
								<span>{property}</span>
								<input
									type="checkbox"
									className="w-5 h-5 rounded-full"
									defaultChecked
								/>
							</div>
						))}
					</div>
					<h3 className="text-lg font-medium mt-6 mb-4">Fields</h3>
					<div className="space-y-4">
						{Array.from({ length: 3 }).map((_, index) => (
							<div
								key={index}
								className="flex items-center gap-4 border p-2 rounded"
							>
								<input
									type="text"
									className="flex-grow border rounded p-2"
									placeholder="Field name"
								/>
								<input
									type="text"
									className="flex-grow border rounded p-2"
									placeholder="Field type"
								/>
								<button className="text-red-500 hover:text-red-700">
									<i className="fas fa-trash-alt"></i>
								</button>
							</div>
						))}
						<button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
							Add task field
						</button>
					</div>
				</div>

				{/* From Library */}
				<div className="col-span-3 space-y-6">
					<div className="bg-white p-6 rounded shadow">
						<h2 className="text-xl font-semibold mb-4">From library</h2>
						<div className="space-y-4">
							{Array.from({ length: 3 }).map((_, index) => (
								<div
									key={index}
									className="border p-4 rounded flex justify-between items-center bg-gray-50 shadow"
								>
									<h3 className="font-semibold text-sm">Basic task</h3>
									<button className="bg-purple-500 text-white px-4 py-2 rounded text-sm hover:bg-purple-600">
										Apply
									</button>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="mt-8 flex justify-end gap-4">
				<button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
					onClick={handleCancelClick}>
					Cancel
				</button>
				<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
					Create
				</button>
			</div>
		</div>
	);
};

export default NewTaskTypeForm;