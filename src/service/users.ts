import { backendService } from "./backend";

export type UserInfo = {
	id: string;
	username: string;
	email: string;
}

class UserService {
	async getAll() {
		const data = await backendService.get<UserInfo[]>('/user');
		return data.data;
	}
}

const userService = new UserService();
export default userService;