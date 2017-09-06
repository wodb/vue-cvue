<template>
	<div class="article">
		<baseHead headerText="详情"/>
	</div>
</template>
<script>
	import baseHead from './../Common/Common'
	export default {
		components:{
			baseHead
		},
		created() {
			console.log(this.$router)
		},
		mounted() {
			console.log(this.$route)
		}
	}
</script>