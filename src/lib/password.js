const bcrypt = require('bcryptjs');

module.exports = {
	async encrypt(password) {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		return hash;
	},

	async match(password, hash) {
		try {
			return await bcrypt.compare(password, hash);
		} catch (error) {
			console.log(error);
		}
	},
};
