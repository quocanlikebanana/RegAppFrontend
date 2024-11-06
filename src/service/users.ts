import { authBackendService } from "./auth-backend";

export type UserInfo = {
	id: string;
	email: string;
	firstName: string;
}

export interface UserProfileInfo {
	email: string;
	firstName: string;
	lastName: string;
	joinedDate: string;
	location: string;
	bio: string;
}

class UserService {
	async getAll() {
		const data = await authBackendService.get<UserInfo[]>('/user/all');
		return data.data;
	}

	async getProfile() {
		const data = await authBackendService.get<UserProfileInfo>(`/user/profile`);
		return data.data;
	}
}

const userService = new UserService();
export default userService;