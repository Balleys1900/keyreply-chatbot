<template>
	<div class="form-container">
		<el-form class="form-register" :rules="rules" :model="formData" ref="myForm">
			<el-row>
				<img src="@/assets/images/welcome.png" alt="" class="form-image" />
				<el-col :span="24">
					<el-form-item prop="username">
						<el-input placeholder="Insert your name to begin" v-model="formData.username"></el-input>
					</el-form-item>
				</el-col>
				<el-button @click="submitForm('myForm')" type="primary" style="width: 100%; margin: 10px 0">Start</el-button>
				<el-col :span="24"> </el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script>
	import { reactive } from '@vue/reactivity';
	import { useStore } from 'vuex';
	export default {
		name: 'chat-form',
		setup() {
			const formData = reactive({
				username: '',
			});

			const rules = {
				username: [
					{ required: true, message: 'Please input your name.', trigger: 'blur' },
					{
						min: 2,
						max: 10,
						message: 'Length of 2 to 10 characters',
						trigger: 'blur',
					},
				],
			};

			const store = useStore();

			const register = () => store.dispatch('chat/register', { username: formData.username });

			return {
				// State
				formData,
				rules,
				// Methods
				// Actions
				register,
				// Getters
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.register();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		},
	};
</script>

<style scoped>
	.form-container {
		position: relative;
		height: 100%;
	}

	.form-image {
		max-width: 100%;
	}

	.form-register {
		width: 80%;
		position: absolute;
		left: 50%;
		top: 40%;
		transform: translate(-50%, -50%);
	}
</style>
