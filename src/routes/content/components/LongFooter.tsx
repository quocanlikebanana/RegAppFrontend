import React from "react";

const LongFooter: React.FC = () => {
	return (
		<footer className="bg-black text-white py-8">
			<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Resources */}
				<div>
					<h4 className="font-semibold text-lg mb-4">Resources</h4>
					<ul className="space-y-2 text-sm">
						<li>Technical Support</li>
						<li>FAQs</li>
						<li>Documentation</li>
						<li>Feedback</li>
						<li>Purchasing and Licensing</li>
					</ul>
				</div>
				{/* Contacts */}
				<div>
					<h4 className="font-semibold text-lg mb-4">Contacts</h4>
					<ul className="space-y-2 text-sm">
						<li>📍 Ho Chi Minh City, Vietnam</li>
						<li>📧 nitodo.ango@gmail.com</li>
					</ul>
				</div>
				{/* Follow Us */}
				<div>
					<h4 className="font-semibold text-lg mb-4">Follow Us</h4>
					<ul className="space-y-2 text-sm">
						<li>📺 YouTube</li>
						<li>📘 Facebook</li>
						<li>🔗 LinkedIn</li>
					</ul>
				</div>
			</div>
			<div className="text-center text-sm mt-8">
				Copyright © An Ngo 2024, All rights reserved
			</div>
		</footer>
	);
};

export default LongFooter;