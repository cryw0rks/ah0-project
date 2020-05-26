<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    Hai {{ this.user_nickname }}'s
  </div>
</template>

<script>

export default {
  name: "Announcement",
  data() {
  	return {
  		user_nickname: 'error'
  	}
  },
  props: {
    msg: String
  },
  methods: {
  	renderData(lol) {
  		console.log(lol);
		this.user_nickname = lol['data_auth']['data_user']['nickname']
  	}
  },
  async mounted() {
  	const data_userx = await this.$auth.getInfoAuth(this.$auth.getAuthText())
  	this.renderData(data_userx);
  }
};
</script>