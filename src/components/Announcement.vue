<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="isLogin">hai, {{ this.user_nickname }}'s</div>
    <p>
      ah0 project is still on development.</p>
    <p>
      we are make something unique.
    </p><p>there are none analytics. but hosting might do this lol.</p><p>but in the future maybe you can add ur own analytics.
    </p><p>every content don't have like button and views.</p>
    <p>so if you wish u will become famous or trending.
    </p>
    <p>hmmm. no, you can't.</p>
    <p>but idk about magic or lucky xd. enjoy the site.
    </p>
    <p>if you register or login</p>
    <p>ah0 will get ur <strong>ip</strong> and <strong>email</strong></p>
    <p>but tbh you can use <strong>fake email</strong></p>
    <p>because there are still no feature where</p>
    <p>we need <strong>email</strong> (might soon)</p>
  </div>
</template>

<script>
export default {
  name: "Announcement",
  data() {
    return {
      user_nickname: "error",
      isLogin: false
    };
  },
  props: {
    msg: String
  },
  methods: {
    renderData(lol) {
      //console.log(lol);
      this.user_nickname = lol["data_auth"]["data_user"]["nickname"];
    },
    async lmao() {
      //console.log(this.isLogin);
      if (this.isLogin) {
        const data_userx = await this.$auth.getInfoAuth(
          this.$auth.getAuthText()
        );
        this.renderData(data_userx);
        //console.log(data_userx);
      }
    }
  },
  async beforeMount() {
    const lolz = await this.$auth.isLogin();
    this.isLogin = lolz["isLogin"];
    //console.log(lolz)
    this.lmao();
  }
};
</script>
