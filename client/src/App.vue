<template>
	<div id="app2">
		<master-layout v-loading.fullscreen.lock="isFullscreenLoading" />
	</div>
</template>

<script>
	import { computed } from '@vue/reactivity';
	import { useStore } from 'vuex';
	import MasterLayout from './layouts/MasterLayout.vue';

	export default {
		name: 'App',
		components: { MasterLayout },
		setup() {
			const store = useStore();
			return {
				// Actions
				checkLogin: () => store.dispatch('chat/checkLogin'),
				// Getters
				isFullscreenLoading: computed(() => store.getters['chat/isFullscreenLoading']),
				// Mutations
				setLoading: (payload) => store.commit('chat/SET_LOADING', payload),
			};
		},
		created() {
			this.checkLogin();
		},
	};
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	#app2 {
		height: 100vh;
		font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
	}
</style>
