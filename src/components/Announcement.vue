<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    hoi
  </div>
</template>

<script>
export default {
  name: "Announcement",
  props: {
    msg: String
  }
};
</script>