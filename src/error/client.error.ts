export default class ClientError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ClientError';
	}

	get displayMessage() {
		return 'Client Error: ' + this.message;
	}
}