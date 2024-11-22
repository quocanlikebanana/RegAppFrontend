import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
	const navigate = useNavigate()
	function handleStartNowClick() {
		navigate("/work");
	}

	return (
		<main className="flex-1 bg-gray-100">
			{/* Hero Section */}
			<section className="p-8">
				<div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center">
					<div className="flex-1 space-y-6">
						<h1 className="text-4xl font-bold">
							Your Goals, Your Way With{" "}
							<span className="text-pink-500">Nitodo</span>
						</h1>
						<div className="w-full h-64 bg-gray-300 rounded-lg"></div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-12">
				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{[
						{
							title: "Task Analysis",
							description:
								"Break down tasks into smaller, manageable subtasks and arrange them with activity diagrams.",
						},
						{
							title: "AI-Powered",
							description:
								"Incorporates AI to provide suggestions on different operations.",
						},
						{
							title: "Templates",
							description:
								"Task analyses can be saved as templates for reuse on similar tasks.",
						},
						{
							title: "Customization",
							description:
								"Customize your task as well with diverse content and success measurement.",
						},
					].map((feature, index) => (
						<div
							key={index}
							className="bg-white p-6 rounded-lg shadow-md text-center space-y-4"
						>
							<div className="w-full h-32 bg-gray-200 rounded-lg"></div>
							<h3 className="font-semibold text-lg">{feature.title}</h3>
							<p className="text-sm text-gray-600">{feature.description}</p>
						</div>
					))}
				</div>
				<div className="flex justify-center mt-8">
					<button onClick={handleStartNowClick} className="px-6 py-3 bg-purple-500 text-white font-bold rounded-lg shadow-lg hover:bg-purple-600">
						Start Now
					</button>
				</div>
			</section>
		</main>
	);
};

export default DashboardPage;
