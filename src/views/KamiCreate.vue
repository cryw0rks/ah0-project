<template>
  <div class="user">
    <h1>kami create</h1>
    <table class="fit-form">
      <tr>
        <td width="130"><label>title</label></td>
        <td>:</td>
        <td>
          <input
            required
            id="title"
            v-model="title"
            type="text"
            placeholder="my story about love"
          />
        </td>
      </tr>
      <tr>
        <td><label>description</label></td>
        <td>:</td>
        <td>
        	<textarea v-model="description" id="description" placeholder="this is story about young boy who stupid and ....."></textarea>
        </td>
      </tr>
      <tr>
        <td><label>status</label></td>
        <td>:</td>
        <td>
        	<select id="status" v-model="status">
        		<option name="private">private</option>
        		<option name="unlist">unlist</option>
        		<option name="profile">only on profile</option>
        		<option name="public">public</option>
        	</select>
        </td>
      </tr>
      <tr>
        <td><label>content</label></td>
        <td>:</td>
        <td>
          <textarea v-model="contentya"></textarea>
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <button style="float: right;" type="submit" @click="handleSubmit">
            post ye
          </button>
        </td>
      </tr>
    </table>

    <h3>preview</h3>
    <div v-html="compiledMarkdown"></div>

    <Modal ref="modalok"></Modal>
  </div>
</template>

<script>
import Modal from "../modal";
export default {
  data() {
    return {
      title: "",
      description: "",
      status: "",
      contentya: "# hello"
    };
  },

  components: { Modal },
	computed: {
        compiledMarkdown: function() {
            return this.$marked(this.contentya, { sanitize: true });
          }
    },

  methods: {
  	handleSubmit(e) {
      e.preventDefault();
      this.$refs.modalok.show("loading");
      this.$auth
        .createkami(this.title, this.description, this.status, this.contentya)
        .then(response => {
          if (response.error) {
            this.$refs.modalok.show("dialog", {
              title: "info",
              content: response.message,
              buttons: [
                {
                  title: "close"
                }
              ]
            });
          } else {
            this.$refs.modalok.show("dialog", {
              title: "info",
              content: response.message,
              buttons: [
                {
                  title: "close",
                  handler: () => {
                    this.$router.push(response.codeurl);
                  }
                }
              ]
            });
          }
        })
        .catch(function(error) {
          console.error(error.response);
        });
    }
  }
};
</script>
