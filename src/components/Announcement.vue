<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="isLogin">Hai, {{ this.user_nickname }}'s</div>
    <p>
      ah0 project is still on development, so there no feature available
    </p>
  </div>
</template>

<script>

export default {
  name: "Announcement",
  data() {
  	return {
  		user_nickname: 'error',
      isLogin: false
  	}
  },
  props: {
    msg: String
  },
  methods: {
  	renderData(lol) {
  		//console.log(lol);
		this.user_nickname = lol['data_auth']['data_user']['nickname']
  	},
  async lmao() {
    //console.log(this.isLogin);
    if (this.isLogin) {
  	const data_userx = await this.$auth.getInfoAuth(this.$auth.getAuthText())
  	this.renderData(data_userx);
    //console.log(data_userx);
    }
  }
},
        async beforeMount() {
            const lolz = await this.$auth.isLogin()
            this.isLogin = lolz['isLogin'];
            //console.log(lolz)
            this.lmao()
        }
};
</script>