<template>
  <div class="user">
    <h1>{{ this.nickname }}'s profile</h1>
    <div class="center-cropped"><img v-bind:src="this.image_profile" /></div>
    <h4>@{{ this.username }}</h4>
    <div v-html="compiledMarkdown"></div>
    <div class="kami-list" v-if="users.length > 0">
      <h4>kami</h4>
      <router-link
        v-for="(value, index) in users"
        class="kami-one"
        :key="index"
        :to="{
          path: 'content',
          name: 'Content Show',
          params: { codeURL: value.content.code },
        }"
        @click.stop="click(index, $event)"
      >
        <h1>{{ value.content.title }}</h1>
        <p>by {{ value.user.nickname }}</p>
        <p>{{ value.content.description }}</p>
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
      if (this.about != null) {
        return this.$marked(this.about);
      } else {
        return null
      }
    },
  },

  async mounted() {
    const res = await this.$c0re.getFunction('user').getOneUserByUsername(this.$route.params.userId);
    this.username = res["result"]["username"];
    this.nickname = res["result"]["nickname"];
    this.about = res["result"]["about"];
    this.image_profile = res["result"]["image_profile"];
    this.image_banner = res["result"]["image_banner"];
    
	  const resKami = await this.$c0re.getFunction('content').getAllContentByUserID(res["result"]["id"], -1);
    this.users = resKami["result"]["rows"];
  },
};
</script>
