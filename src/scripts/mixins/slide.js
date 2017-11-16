module.exports = {

	props: {
		currentIndex: 	{ type: Number, default: -1 },
		index: 			{ type: Number, default: -1 }
	},

	data: function() {
		return {
			status: '',
			register: function(){},
			deleter: function(){}
		};
	},

	computed: {
		status: function() {
			return this.index < this.currentIndex ? 'prev' : this.index > this.currentIndex ? 'next' : 'current';
		}
	},

	compiled: function() {
		this.$emit('slide:register', this.index);
	},

	beforeDestroy: function() {
		this.$emit('slide:deleter', this.index);
	},
};