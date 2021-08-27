<template>
  <div class="user">
    <h1>setting - info</h1>
    <label>username</label>
    <input
      id="username"
      v-model="user_username"
      type="text"
      placeholder="Kirito"
    /><br />
    <label>e-mail</label>
    <input
      id="email"
      v-model="user_email"
      type="text"
      placeholder="kirito@sao.com"
    /><br />
    <label>nickname</label>
    <input
      id="nickname"
      v-model="user_nickname"
      type="text"
      placeholder="nickname"
    /><br />
    <label>about</label>
    <textarea v-model="user_about" placeholder="about uuu"></textarea>
    <br />
    <button type="submit" @click="handleSubmit">update info</button>
    <br />
    <br />
    <h1>setting - password</h1>
    <label>old password</label>
    <input
      id="password_ori"
      v-model="password_ori"
      type="password"
      placeholder="old password"
    /><br />
    <label>new password</label>
    <input
      id="password_new"
      v-model="password_new"
      type="password"
      placeholder="new password"
    /><br />
    <label>retype new password</label>
    <input
      id="password_new_retype"
      v-model="password_new_retype"
      type="password"
      placeholder="retype new password"
    />
    <br />
    <button type="submit" :disabled="!validDataPW" @click="handleSubmitPW">
      update password
    </button>
    <br />
    <br />
    <h1>setting - image profile</h1>
    <div class="center-cropped"><img v-bind:src="user_image_profile" /></div>
    <br />
    <input type="file" ref="image_profile_file" @change="selectFile" /><br />
    <button
      type="submit"
      :disabled="!image_profile_file"
      @click="handleSubmitImageProfile"
    >
      update image profile
    </button>
    <Modal ref="modalok"></Modal>
  </div>
</template>

<script>
import Modal from "../modal";
export default {
  name: "Setting",
  data() {
    return {
      user_nickname: "error",
      user_username: "error",
      user_email: "error",
      user_about: "error",
      user_image_profile: "/asset/img/profile.jpg",
      user_image_banner: "error",
      password_ori: null,
      password_new: null,
      password_new_retype: null,
      image_profile_file: null
    };
  },
  components: { Modal },
  props: {
    msg: String
  },
  methods: {
    renderData(dataUser) {
      this.user_nickname = dataUser["nickname"];
      this.user_username = dataUser["username"];
      this.user_email = dataUser["email"];
      this.user_about = dataUser["about"];
      this.user_image_profile = dataUser["image_profile"];
      this.user_image_banner = dataUser["image_banner"];
    },
    handleSubmit(e) {
      e.preventDefault();
      this.$refs.modalok.show("loading");
      this.$c0re
        .getFunction('account')
        .updateInfo(
          this.user_username,
          this.user_email,
          this.user_nickname,
          this.user_about
        )
        .then(response => {
          this.$refs.modalok.show("dialog", {
            title: "info",
            content: response.message,
            buttons: [
              {
                title: "close"
              }
            ]
          });
        })
        .catch(function(error) {
          console.error(error.response);
        });
    },
    handleSubmitPW(e) {
      e.preventDefault();
      this.$refs.modalok.show("loading");
      this.$c0re
        .getFunction('account')
        .updatePassword(
          this.password_ori,
          this.password_new,
          this.password_new_retype
        )
        .then(response => {
          this.$refs.modalok.show("dialog", {
            title: "info",
            content: response.message,
            buttons: [
              {
                title: "close"
              }
            ]
          });
          if (response.error == false) {
            this.password_ori = null;
            this.password_new = null;
            this.password_new_retype = null;
          }
        })
        .catch(function(error) {
          console.error(error.response);
        });
    },
    selectFile() {
      this.image_profile_file = this.$refs.image_profile_file.files;
    },
    async handleSubmitImageProfile(e) {
      e.preventDefault();
      this.$refs.modalok.show("loading");
      this.$c0re
        .getFunction('account')
        .updateAvatar(this.image_profile_file)
        .then(response => {
          this.$refs.modalok.show("dialog", {
            title: "info",
            content: response.message,
            buttons: [
              {
                title: "close"
              }
            ]
          });
          if (response.success == true) {
            this.user_image_profile = response['result']['image_url'];
            this.$refs.image_profile_file.value = null;
          }
        })
        .catch(function(error) {
          console.error(error.response);
        });
    }
  },
  computed: {
    validDataPW: function() {
      return (
        this.password_ori &&
        this.password_new &&
        this.password_new_retype &&
        this.password_new == this.password_new_retype
      );
    }
  },
  async mounted() {
    var data_auth = await this.$c0re.getFunction("auth").isLogin(true);
    if (data_auth != false) {
      if (data_auth['result']['expired'] == false) {
        this.isLogin = true;
        this.renderData(data_auth['result']['user']);
      }
    }
  }
};
</script>
