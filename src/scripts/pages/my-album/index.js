import Vue from 'vue';

Vue.component('my-album', {

	template: require('./template'),

	props: {
		datas: 		{ type: Object, default: null },
		pictures: 	{ type: Array,  default: null }
	},

	ready() {
		// console.log(this.pictures);
	}

});