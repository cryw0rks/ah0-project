<template>
	<div class="my-profile">
    <div class="center-cropped profile-e">
      <img v-bind:src="user_image_profile" />
    </div>
    <h4 v-if="isLogin">
      <router-link
      :to="{
        path: 'user',
        name: 'User Profile',
        params: { userId: user_username }
      }"
      >{{ user_nickname }}</router-link
      >
    </h4>
    <ul class="content-right-menu">
      <li v-if="isLogin"><router-link to="/content">content</router-link></li>
      <li v-if="isLogin">
        <router-link to="/setting">setting</router-link>
      </li>
      <li v-if="isLogin"><a @click="handleLogout">logout</a></li>
      <li v-if="!isLogin"><router-link to="/login">login</router-link></li>
      <li v-if="!isLogin">
        <router-link to="/register">register</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      user_nickname: "error",
      user_username: "error",
      user_email: "error",
      user_about: "error",
      user_image_profile: "/asset/img/profile.jpg",
      user_image_banner: "error"
    }
  },

  methods: {
    renderData(lol) {
      //console.log(lol);
      this.user_nickname = lol["data_auth"]["data_user"]["nickname"];
      this.user_username = lol["data_auth"]["data_user"]["username"];
      this.user_email = lol["data_auth"]["data_user"]["email"];
      this.user_about = lol["data_auth"]["data_user"]["about"];
      this.user_image_profile = lol["data_auth"]["data_user"]["image_profile"];
      this.user_image_banner = lol["data_auth"]["data_user"]["image_banner"];
    },
    handleLogout(e) {
      e.preventDefault();
      this.$refs.modalok.show("loading");
      this.$auth
        .logout()
        .then(response => {
          if (response.error) {
            this.$refs.modalok.show("dialog", {
              title: "info",
              content: response.message,
              buttons: [
              {
                title: "close"
              }
              ]
            });
          } else {
            this.$refs.modalok.show("dialog", {
              title: "info",
              content: response.message,
              buttons: [
              {
                title: "close",
                handler: () => {
                  this.$router.go(this.$router.currentRoute);
                }
              }
              ]
            });
          }
        })
        .catch(function(error) {
          console.error(error.response);
        });
      }
  },
  async beforeMount() {
    const lolz = await this.$auth.isLogin();
    this.isLogin = lolz["isLogin"];
    if (this.isLogin) {
      const data_userx = await this.$auth.getInfoAuth(this.$auth.getAuthText());
      this.renderData(data_userx);
    }
  }
}
</script>