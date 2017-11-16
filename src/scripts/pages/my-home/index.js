import Vue from 'vue';

Vue.component('my-home', {

	template: require('./template'),

	props: {
		datas: 			{ type: Array,	default: [] },
		isShowAlbum: 	{ type: Boolean,default: false }
	},

	watch: {
		isShowAlbum: function() {
			console.log('new value', this.isShowAlbum);
		}
	}

});