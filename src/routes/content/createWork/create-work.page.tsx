import React from 'react';
import { CreateWorkProvider } from './react/CreateWork.provider';
import CreateWork from './components/CreateWork.main';

const CreateWorkPage: React.FC = () => {
	return (
		<CreateWorkProvider>
			<CreateWork />
		</CreateWorkProvider>
	);
};

export default CreateWorkPage;
