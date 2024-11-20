import { useContext } from "react";
import CreateWorkContext, { RightBodyComponentType } from "./CreateWork.context";
import InsertTaskCanvas from "../components/InsertTaskCanvas.rbody";
import NewTaskTypeForm from "../components/NewTaskTypeForm.rbody";

function getRightBodyComponent(rightBodyComponentType: RightBodyComponentType): JSX.Element | null {
	switch (rightBodyComponentType) {
		case 'InsertTaskCanvas':
			return <InsertTaskCanvas />;
		case 'NewTaskTypeForm':
			return <NewTaskTypeForm />;
		default:
			return null;
	}
}

const useRightBodyComponent = () => {
	const context = useContext(CreateWorkContext);
	if (!context) {
		throw new Error('useRightBodyComponent must be used within a RightBodyComponentProvider');
	}
	const { rightBodyComponentType, setRightBodyComponentType } = context;
	const rightBodyComponent = getRightBodyComponent(rightBodyComponentType);
	return { rightBodyComponent, setRightBodyComponentType };
};

export default useRightBodyComponent;