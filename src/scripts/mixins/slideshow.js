import isMobile from './isMobile';

module.exports = {

	mixins: [isMobile],

	props: {
		slides: 		{ type: Array, 		default: [] },
		isScrollEnable: { type: Boolean, 	default: true },
		duration: 		{ type: Number, 	default: 1700 },
		mobileSwipe: 	{ type: Number, 	default: 100 },
		isFirefox: 		{ type: Boolean, 	default: navigator.userAgent.toLowerCase().indexOf('firefox') > -1 },
	},

	data: function() {
		return {
			currentIndex: 0,
			isAnimating: false,
			nbrSlides: 0
		};
	},

	compiled: function() {
		this.mobileDown = false;
		this.mobileDelta = 0;
	},

	ready: function() {
		if( !this.isScrollEnable ) return;

		if( !this.isFirefox ) {
			document.addEventListener('mousewheel', this.onMouseWheel);
		}
		else if( this.isFirefox ) {
			document.addEventListener('DOMMouseScroll', this.onMouseWheel);
		}
	},

	beforeDestroy: function() {
		if( !this.isScrollEnable ) return;

		if( !this.isFirefox ) {
			document.removeEventListener('mousewheel');
		}
		else if( this.isFirefox ) {
			document.removeEventListener('DOMMouseScroll');
		}
	},

	methods: {

		onMouseWheel: function(event) {
			event.preventDefault();

			if (this.isAnimating) {
				return;
			}
			else {
				let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

				if (delta > 0) {
					this.onPrev();
				}
				else if (delta < 0) {
					this.onNext();
				}
			}
		},

		onTouchStart: function(event) {
			this.mobileDown = true;
			this.mobileDelta = event.pageY;
		},

		onTouchEnd: function(event) {
			if( !this.mobileDown ) return;

			alert('NEED DEBUG MOBILE')

			this.mobileDelta = event.pageY - this.mobileDelta;

			if( this.mobileDelta > this.mobileSwipe ) {
				this.onNext();
			}
			else if( this.mobileDelta < this.mobileSwipe ) {
				this.onPrev();
			}
		},

		registerSlide: function(event) {
			if( event != void 0 ) {
				this.nbrSlides++;
			}
		},

		deleterSlide: function(index) {
			console.log('unmount slide');
			this.nbrSlides--;
		},

		onNext: function() {
			this.currentIndex = (this.nbrSlides - 1) - this.currentIndex <= 0 ? 0 : ++this.currentIndex;
			this.isAnimating  = true;

			setTimeout( ()=>{
				this.isAnimating = false;
			}, this.duration);
		},

		onPrev: function() {
			this.currentIndex = this.currentIndex == 0 ? (this.nbrSlides-1) : --this.currentIndex;
			this.isAnimating  = true ;

			setTimeout( ()=>{
					this.isAnimating = false
			}, this.duration);
		},
	},
};
