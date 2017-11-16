import Vue from 'vue';

import stateInitializer from './mixins/stateInitializer';

new Vue({
	el: '#my-app',
	data: function() {
		return {
			states: {
				":": {
					"componentId": "page-home",
					"datas": {},
					"route":"/",
				},
				":slug": {
					"componentId": "page-album",
					"datas": { 
						slug: ''
					},
					"route":"/slug",
				},
			},
			albums: [{
					id: 1,
					picture: './assets/medias/TEMP/01.jpg',
					title: 'By the ocean'
				},{
					id: 2,
					picture: './assets/medias/TEMP/02.jpg',
					title: 'Dolorem ipsum sit amet'
				},{
					id: 3,
					picture: './assets/medias/TEMP/03.jpg',
					title: "Malo's days"
				},{
					id: 3,
					picture: './assets/medias/TEMP/04.jpg',
					title: 'Day dreaming'
				}
			],
			fakeAlbumsDatas: [{
					id: 1,
					picture: './assets/medias/TEMP/02.jpg',
				},{
					id: 2,
					picture: './assets/medias/TEMP/06.jpg',
				},{
					id: 3,
					picture: './assets/medias/TEMP/07.jpg',
				},{
					id: 3,
					picture: './assets/medias/TEMP/08.jpg',
				}
			],
		};
	},
	mixins: [stateInitializer],
	props: {
		isAlbum: 		{ type: Boolean, default: false },
		isShowAlbum: 	{ type: Boolean, default: false },
		albumData: 		{ type: Object,  default: null },
	},
	ready() {

		window.addEventListener('resize', ()=> {
			this.$broadcast('resize');
		});

		this.$on('nav', this.changeNav);
	},
	beforeDestroy() {
		window.removeEventListener('resize');
	},
	methods: {
		changeNav( event ) {

			if( event.component == 'my-album' ) {
				this.isAlbum 		= true;
				this.albumData 		= event.data;
				this.isShowAlbum	= true;
			}

		}
	}
});

// $on() - allows you to declare a listener on your Vue instance with which to listen to events
// $emit() - allows you to trigger events on the same instance (self)
// $dispatch() - send an event upward along the parent chain
// $broadcast() - send an event downward along the descendants chain