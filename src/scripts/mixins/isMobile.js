module.exports = {
	data: function() {
		return {
			isMobile: (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (window.innerWidth < 768))
		};
	},
};