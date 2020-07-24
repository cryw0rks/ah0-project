<template>
  <div class="container" id="app">
    <header>
      <ul class="header-menu-top">
        <li id="datetime">{{ today_datez }}</li>
      </ul>
      <div class="header-middle">
        <img width="800" height="150" src="/asset/img/banner.gif" />
        <div class="header-middle-title">アホ project</div>
      </div>
      <ul class="header-menu-bottom">
        <li><router-link to="/">home</router-link></li>
        <li><router-link to="/user">user</router-link></li>
        <li><router-link to="/kami">kami</router-link></li>
      </ul>
    </header>

    <div class="content">
      <div class="content-left">
        <router-view />
      </div>
      <div class="content-right">
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
    </div>
    <footer>
      <div class="footer-top">
        <ul class="footer-select-lang">
          <li><router-link to="/feedback">feedback</router-link> | </li>
          <li><router-link to="/reportbug">report bug</router-link> | </li>
          <li><router-link to="/discord">discord club</router-link></li>
        </ul>
      </div>
      <div class="footer-bottom">
        <span>copyright &copy; 2019 ba-ka all right reserved</span>
      </div>
    </footer>
    <Modal ref="modalok"></Modal>
  </div>
</template>

<script>
import Modal from "./modal";

export default {
  data() {
    return {
      isLogin: false,
      user_nickname: "error",
      user_username: "error",
      user_email: "error",
      user_about: "error",
      user_image_profile: "/asset/img/profile.jpg",
      user_image_banner: "error",
      today_datez: "japan, tokyo 12/12/1212, 12:12:12 am"
    };
  },

  components: { Modal },

  created() {
    this.updateClock();
    this.timer = setInterval(this.updateClock, 1000);
  },

  methods: {
    updateClock() {
      var currentDate = this.$moment(new Date());
      this.today_datez =
        "japan, tokyo " + currentDate.format("D/M/YYYY, h:mm:ss a");
    },
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
};
</script>
