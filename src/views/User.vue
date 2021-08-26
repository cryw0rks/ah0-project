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
    const dataUser = await this.$c0re.getFunction('user').getAllUser(-1);
    this.users = dataUser["result"]["rows"];
  }
};
</script>
