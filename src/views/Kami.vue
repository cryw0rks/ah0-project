<template>
  <div class="user">
    <h1>kami</h1>
    <p>list of public kami, hey create ur own kami <router-link to="/kami/create">here</router-link></p>
    <div class="kami-list" v-if="users">
      <router-link
        v-for="(yox, index) in users" class="kami-one" :key="index" :to="{ path: 'content', name: 'Content Show', params: { codeURL: yox.contentcode_url } }" @click.stop="click(index, $event)">
        <h1>{{ yox.contenttitle }}</h1>
        <p>by {{ yox.usernickname }}</p>
        <p>{{ yox.contentdescription }}</p>
      </router-link>
    </div>
  </div> </template>

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
    const dataUser = await this.$dataContent.getAllContents();
    //console.log(await this.$dataUser.getAllUsers())
    this.users = dataUser["data"]["rows"];
  }
};
</script>
