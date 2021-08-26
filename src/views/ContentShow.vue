<template>
	<div class="user">
		<h1 style="margin-bottom: 0;">{{ this.c_title }}</h1>
		<h4 style="margin-top: 0;">kami by <router-link type="button"
				:to="{
					path: 'user',
					name: 'User Profile',
					params: { userId: this.u_username }
				}"
			>{{ this.u_username }}</router-link></h4>
		<div v-html="compiledMarkdown"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showModal: false,
			c_title: "loading..",
			c_main: "loading..",
			u_username: "loading.."
		};
	},
	computed: {
		compiledMarkdown: function() {
			return this.$marked(this.c_main);
		}
	},
	async beforeCreate() {
		const res =  await this.$c0re.getFunction('content').getOneContent(this.$route.params.codeURL);
		this.c_title = res['result']['content']['title'];
		this.c_main = res['result']['content']['main'];
		this.u_username = res['result']['user']['username'];
	}
};
</script>
