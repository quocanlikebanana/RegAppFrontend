import { createContext } from "react";

type RightBodyComponentType =
	'InsertTaskCanvas' |
	'NewTaskTypeForm';

interface RightBodyComponentContextProps {
	rightBodyComponentType: RightBodyComponentType;
	setRightBodyComponentType: (type: RightBodyComponentType) => void;
}

const CreateWorkContext = createContext<RightBodyComponentContextProps | undefined>(undefined);

export type { RightBodyComponentType };
export default CreateWorkContext;