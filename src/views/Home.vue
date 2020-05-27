<template>
  <div class="home">
    <Announcement msg="home" />
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
