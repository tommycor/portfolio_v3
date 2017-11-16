import Vue from 'vue';

import slide from '../../mixins/slide';

Vue.component('app-slide-picture', {

	template: require('./template'),

	mixins: [slide],

	props: {
		content: 	{ type: Object, default: {} },
		mousePos: 	{ type: Object, default: {x: window.innerWidth * .5 , y: window.innerHeight * .5}}
	},

	data: function() {
		return {
			winWidth: window.innerWidth,
			winHeight: window.innerHeight,
			winCenter: {
				x: window.innerWidth * .5,
				y: window.innerHeight * .5
			},
		};
	},

	compiled: function() {
	    this.picture = null;
	    this.rot = {x: 0, y: 0};
	    this.currentRot = {x: 0, y: 0};
	    this.pos = {x: 0, y: 0};
	    this.currentPos = {x: 0, y: 0};
	},

	ready: function() {
		this.$on('resize', this.handleResize);

		this.update();
	},

	methods: {

		handleResize: function( event ) {
			this.winWidth = window.innerWidth;
			this.winHeight = window.innerHeight;
			this.winCenter = {
				x: window.innerWidth * .5,
				y: window.innerHeight * .5,
			};
		},

		update: function() {

			if( this.status === 'current' )  {

				let distX = this.mousePos.x - this.winCenter.x;
				let distY = this.mousePos.y - this.winCenter.y;
				let dist = Math.sqrt(distX * distX + distY * distY);

				let maxR = .0000003;

				this.rot.x = -maxR * distX * dist ;
				this.rot.y = maxR * distY * dist * 1.5;

				this.currentRot.x += ( this.rot.x - this.currentRot.x) * .05;
				this.currentRot.y += ( this.rot.y - this.currentRot.y) * .05;

				this.pos.x = -distX * .03;
				this.pos.y = -distY * .03;

				this.currentPos.x += ( this.pos.x - this.currentPos.x) * 0.03;
				this.currentPos.y += ( this.pos.y - this.currentPos.y) * 0.03;

				this.$els.picture.style.transform = 'rotateX('+this.currentRot.y+'rad) rotateY('+this.currentRot.x+'rad) translateX('+this.currentPos.x+'px) translateY('+this.currentPos.y+'px) translateZ(0)'	;		
			}

			requestAnimationFrame( this.update );
		},
	}

});