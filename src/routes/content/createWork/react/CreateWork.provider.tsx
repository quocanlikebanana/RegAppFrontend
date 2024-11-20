import { ReactNode, useState } from "react";
import CreateWorkContext, { RightBodyComponentType } from "./CreateWork.context";


export const CreateWorkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [rightBodyComponentType, setRightBodyComponentType] = useState<RightBodyComponentType>("InsertTaskCanvas");

	return (
		<CreateWorkContext.Provider value={{ rightBodyComponentType, setRightBodyComponentType }}>
			{children}
		</CreateWorkContext.Provider>
	);
};