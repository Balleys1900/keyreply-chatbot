<template>
	<div class="chat-loading">
		<span>.</span>
		<span>.</span>
		<span>.</span>
	</div>
</template>

<script>
	export default {};
</script>

<style lang="scss">
	.chat-loading {
		text-align: left;
		font-size: 3rem;

		span {
			animation: textWave 1.5s ease-in-out infinite;
			display: inline-block;
			color: #69c0ff;

			&:nth-of-type(1) {
				animation-delay: 0s;
			}

			&:nth-of-type(2) {
				animation-delay: 0.2s;
			}

			&:nth-of-type(3) {
				animation-delay: 0.4s;
			}
		}

		@keyframes textWave {
			0% {
				transform: translateY(0);
			}

			50% {
				transform: translateY(-15px);
			}

			100% {
				transform: translateY(0);
			}
		}
	}
</style>
