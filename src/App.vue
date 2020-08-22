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
        <Profile />
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
import Profile from "./components/Profile.vue";

export default {
  data() {
    return {
      today_datez: "japan, tokyo 12/12/1212, 12:12:12 am"
    };
  },

  components: {
    Modal,
    Profile
  },

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
  }
};
</script>
