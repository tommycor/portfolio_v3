
module.exports = {
	props: {
		isReady: { type: Boolean, default: false }
	},

	ready: function() {
		this.isReady = true;
	}
};
