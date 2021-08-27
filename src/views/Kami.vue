<template>
  <div class="user">
    <h1>kami</h1>
    <p>list of public kami, hey create ur own kami <router-link to="/kami/create">here</router-link></p>
    <div class="kami-list" v-if="users">
      <router-link
        v-for="(value, index) in users" class="kami-one" :key="index" :to="{ path: 'content', name: 'Content Show', params: { codeURL: value.content.code } }" @click.stop="click(index, $event)">
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
      users: {}
    };
  },
  async mounted() {
    const res = await this.$c0re.getFunction('content').getAllContent(-1);
    this.users = res["result"]["rows"];
  }
};
</script>
