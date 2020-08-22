<template>
  <div class="user">
    <h1 style="margin-bottom: 0;">{{ this.contentTitle }}</h1>
    <h4 style="margin-top: 0;">kami by  <router-link type="button"
        :key="index"
        :to="{
          path: 'user',
          name: 'User Profile',
          params: { userId: this.userName }
        }"
      >{{ this.userNickname }}</router-link></h4>
    <div v-html="compiledMarkdown"></div>
  </div> </template
>

<script>
export default {
  data() {
    return {
      showModal: false,
      userName: null,
      userNickname: null,
      userAbout: null,
      userImage_profile: null,
      userImage_banner: null,
      contentTitle: null,
      contentDesc: null,
      contentYa: null
    };
  },
  computed: {
        compiledMarkdown: function() {
            return this.$marked(this.contentYa, { sanitize: true });
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
    const dataAll = await this.$dataContent.getOneContent(this.$route.params.codeURL);
    var dataUser = dataAll["author"]
    var dataDetail = dataAll["detail"]
    var dataContent = dataAll["content"]
    this.userName = dataUser["username"];
    this.userNickname = dataUser["nickname"];
    this.userAbout = dataUser["about"];
    this.userImage_profile = dataUser["image_profile"];
    this.userImage_banner = dataUser["image_banner"];
    this.contentYa = dataDetail["content"]
    this.contentDesc = dataContent["description"]
    this.contentTitle = dataContent["title"]
  }
};
</script>
