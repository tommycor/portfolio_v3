import Vue from 'vue';

import slideshow from '../../mixins/slideshow';

Vue.component('app-slideshow-home', {

	template: require('./template'),

	mixins: [slideshow],

	data: function(){
	    return {
	        mousePos: {
				x: window.innerWidth * .5,
				y: window.innerHeight * .5
			}
	    };
	},

	ready() {
		this.$on('resize', this.handleResize);

		this.isTransition = false;
	},

	methods: {
		handleResize() {
			this.halfWidth  = window.innerWidth * .5;
			this.halfHeight = window.innerHeight * .5;
		},
		onMouseMove: function( event ) {
			if( !this.isTransition ) {
				this.mousePos.x = event.pageX;
				this.mousePos.y = event.pageY;
			}
		},
		onClick: function( event ) {
			if( this.slides[ this.currentIndex ] == void 0 ) { return; };


			this.isTransition 	= true;
			this.mousePos.x 	= window.innerWidth * .5;
			this.mousePos.y 	= window.innerHeight * .5;
		
			setTimeout( ()=>{
				this.isTransition = false;
				this.$dispatch('nav', { component: 'my-album',  data: this.slides[ this.currentIndex ]} );
			}, 2000);

		}
	}

});