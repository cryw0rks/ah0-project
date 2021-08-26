<template>
  <div class="user">
    <h1>{{ this.nickname }}'s profile</h1>
    <div class="center-cropped"><img v-bind:src="this.image_profile" /></div>
    <h4>@{{ this.username }}</h4>
    <div v-html="compiledMarkdown"></div>
    <h4>kami</h4>
    <div class="kami-list" v-if="users">
      <router-link
        v-for="(yox, index) in users"
        class="kami-one"
        :key="index"
        :to="{
          path: 'content',
          name: 'Content Show',
          params: { codeURL: yox.contentcode_url },
        }"
        @click.stop="click(index, $event)"
      >
        <h1>{{ yox.contenttitle }}</h1>
        <p>by {{ yox.usernickname }}</p>
        <p>{{ yox.contentdescription }}</p>
      </router-link>
    </div>
  </div>
</template>

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
      users: {},
    };
  },
  
  computed: {
    compiledMarkdown: function () {
      return this.$marked(this.about, { sanitize: true });
    },
  },

  async mounted() {
    const res = await this.$c0re.getFunction('user').getOneUserByUsername(this.$route.params.userId);
    this.username = res["result"]["username"];
    this.nickname = res["result"]["nickname"];
    this.about = res["result"]["about"];
    this.image_profile = res["result"]["image_profile"];
    this.image_banner = res["result"]["image_banner"];
    
	const resKami = await this.$dataContent.getAllContents(res["result"]["id"]);
    this.users = resKami["data"]["rows"];
  },
};
</script>
