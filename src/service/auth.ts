type UserInfo = {
	username: string;
	email: string;
}

class AuthService {
	getCurrentUser() {
		const userStr = localStorage.getItem('user');
		if (userStr) {
			const user: UserInfo = JSON.parse(userStr);
			return user;
		}
		return null;
	}

	setUser(user: UserInfo) {
		localStorage.setItem('user', JSON.stringify(user));
	}

	removeUser() {
		localStorage.removeItem('user');
	}

	isAuthenticated() {
		return this.getCurrentUser() != null;
	}
}

const authService = new AuthService();
export default authService;