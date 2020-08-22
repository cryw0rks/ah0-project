<template>
  <div class="user">
    <h1>{{ this.nickname }}'s profile</h1>
    <div class="center-cropped"><img v-bind:src="this.image_profile" /></div>
    <h4>@{{ this.username }}</h4>
    <div v-html="compiledMarkdown"></div>
    <h4>kami</h4>
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
      username: null,
      nickname: null,
      about: null,
      image_profile: null,
      image_banner: null,
      users: {}
    };
  },
  computed: {
        compiledMarkdown: function() {
            return this.$marked(this.about, { sanitize: true });
          }
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
    const dataUser = await this.$dataUser.getOneUser(this.$route.params.userId);
    this.username = dataUser["data"]["username"];
    this.nickname = dataUser["data"]["nickname"];
    this.about = dataUser["data"]["about"];
    this.image_profile = dataUser["data"]["image_profile"];
    this.image_banner = dataUser["data"]["image_banner"];
    if (dataUser) {
    const dataUserz = await this.$dataContent.getAllContents(dataUser["data"]["id"]);
    //console.log(await this.$dataUser.getAllUsers())
    this.users = dataUserz["data"]["rows"];
    }
  }
};
</script>
