import Vue from 'vue';

import slideshow from '../../mixins/slideshow';

Vue.component('app-slideshow-album', {

	template: require('./template'),

	mixins: [slideshow],

	data: function(){
	    return {
	        mousePos: {
				x: window.innerWidth * .5,
				y: window.innerHeight * .5,
			}
	    };
	},

	methods: {
		onMouseMove: function( event ) {
			this.mousePos.x = event.pageX;
			this.mousePos.y = event.pageY;
		},
		onClick: function( event ) {
			if( this.slides[ this.currentIndex ] == void 0 ) { return; };

			let currentSlide = this.slides[ this.currentIndex ];

			this.$dispatch('nav', { component: 'my-album',  data: currentSlide} );
		}
	}

});