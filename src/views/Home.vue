<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Announcement msg="Announcement" />
  </div>
</template>

<script>
// @ is an alias to /src
import Announcement from "@/components/Announcement.vue";

export default {
  name: "Home",
  components: {
    Announcement
  }
};
</script>
