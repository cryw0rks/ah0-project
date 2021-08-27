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

    <Modal ref="modalok"></Modal>
  </div>
</template>

<script>
import Modal from "../modal";
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

  components: { Modal },

  methods: {
    renderData(dataUser) {
      this.user_nickname = dataUser["nickname"];
      this.user_username = dataUser["username"];
      this.user_email = dataUser["email"];
      this.user_about = dataUser["about"];
      this.user_image_profile = dataUser["image_profile"];
      this.user_image_banner = dataUser["image_banner"];
    },
    handleLogout(e) {
      e.preventDefault();
      this.$refs.modalok.show("loading");
      this.$c0re
        .getFunction('auth')
        .logout()
        .then(response => {
          if (response.success == false) {
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
    var data_auth = await this.$c0re.getFunction("auth").isLogin(true);
    if (data_auth != false) {
      if (data_auth['result']['expired'] == false) {
        this.isLogin = true;
        this.renderData(data_auth['result']['user']);
      }
    }
  }
}
</script>