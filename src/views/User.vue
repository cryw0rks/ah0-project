<template>
  <div class="user">
    <h1>user</h1>
    <div class="users-list" v-if="users">
      <router-link
        v-for="(yox, index) in users"
        type="button"
        :key="index"
        :to="{
          path: 'user',
          name: 'User Profile',
          params: { userId: yox.username }
        }"
        @click.stop="click(index, $event)"
      >
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <div class="center-cropped lmao-list">
                <img v-bind:src="yox.image_profile" />
              </div>
            </div>
            <div class="flip-card-back">
              <div class="center-cropped lmao-list2">
                <img v-bind:src="yox.image_profile" />
              </div>
              <h1>{{ yox.nickname }}</h1>
              <p>@{{ yox.username }}</p>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div> </template
>s

<script>
export default {
  data() {
    return {
      showModal: false,
      users: {}
    };
  },
  methods: {
    show(type, config) {
      //this.showModal = false
      if (type == "loading") {
        // this.modalTitle = "loading"
        //this.modalContent = "please wait...."
      } else if (type == "dialog") {
        console.log(config);
        //this.modalTitle = config.title
        //this.modalContent = config.content
        //this.buttons = config.buttons
      }
      // this.showModal = true
    },
    hide() {
      // this.showModal = false
    },
    click(buttonIndex, event, source = "click") {
      const button = this.buttons[buttonIndex];
      if (button && typeof button.handler === "function") {
        button.handler(buttonIndex, event, { source });
        this.showModal = false;
      } else {
        this.showModal = false;
      }
    }
  },
  async mounted() {
    const dataUser = await this.$dataUser.getAllUsers();
    //console.log(await this.$dataUser.getAllUsers())
    this.users = dataUser["data"]["rows"];
  }
};
</script>
