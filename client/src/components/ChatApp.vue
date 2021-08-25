<template>
	<el-card class="box-card">
		<template #header>
			<div class="card-header">
				<el-icon :size="25">
					<chat-round />
				</el-icon>
				<span class="chat-title">TALK TO US</span>
			</div>
		</template>
		<!-- <ChatForm v-if="!currUser" /> -->
		<div>
			<ChatBlock v-for="nodeInfo in chatArr" :nodeInfo="nodeInfo" :key="nodeInfo.id" :isShowItems="true" :currUser="currUser" />
		</div>
	</el-card>
</template>

<script>
	import { ChatRound } from '@element-plus/icons';
	import ChatBlock from './ChatBlock.vue';
	// import ChatForm from "./ChatForm.vue";
	import { mapGetters, useStore } from 'vuex';
	import { computed } from '@vue/reactivity';

	export default {
		components: { ChatBlock, ChatRound },
		setup() {
			const store = useStore();

			const currUser = computed(() => store.getters['chat/currUser']);

			const chatArr = computed(() => store.getters['chat/chatArr']);

			const getNewNode = (payload) => store.dispatch('chat/getNewNode', payload);

			return {
				currUser,
				chatArr,
				getNewNode,
			};
		},

		created() {
			this.getNewNode();
		},
		computed: {
			...mapGetters({
				chatArr: 'chat/chatArr',
			}),
		},
	};
</script>

<style>
	.box-card {
		position: absolute;
		bottom: 0;
		right: 20px;
		width: 400px;
		height: 90%;
	}

	.el-card__header {
		background-color: #1890ff;
		color: #fff;
	}

	.card-header {
		display: flex;
		align-items: center;
	}

	.el-card__body {
		overflow-y: auto;
		height: 90%;
	}

	.chat-title {
		margin-left: 10px;
	}

	/* Scroll 2 */
	.el-card__body::-webkit-scrollbar {
		width: 5px;
		height: 5px;
	}
	.el-card__body::-webkit-scrollbar-track {
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
	}
	.el-card__body::-webkit-scrollbar-thumb {
		background-color: #bae7ff;
		border-radius: 10px;
	}
</style>
