import Vue from 'vue';

import slide from '../../mixins/slide';

Vue.component('app-slide-up', {

	template: require('./template'),

	mixins: [slide],

	props: {
		content: 	{ type: Object, default: {} },
	},
});