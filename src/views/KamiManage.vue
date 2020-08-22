<template>
  <div class="user">
    <h1>kami</h1>
    <p>list of public kami, hey create ur own kami <router-link to="/kami/create">here</router-link></p>
    <div class="users-list" v-if="users">
      
      <table border="1" width="100%">
      	<tr>
      		<td>
      			title
      		</td>
      		<td>
      			description
      		</td>
      		<td>
      			status
      		</td>
      		<td>
      			action
      		</td>
      	</tr>
      	<tr v-for="(yox, index) in users" :key="index">
      		<td>
      			<router-link type="button"  :to="{ path: 'content', name: 'Content Show', params: { codeURL: yox.contentcode_url } }" @click.stop="click(index, $event)">
      			{{ yox.contenttitle }}
      			</router-link>
      		</td>
      		<td>
      			{{ yox.contentdescription }}
      		</td>
      		<td>
      			{{ yox.contentstatus }}
      		</td>
      		<td>
      			<router-link type="button"  :to="{ path: 'content/edit', name: 'Content Edit', params: { codeURL: yox.contentcode_url } }" @click.stop="click(index, $event)">
      				edit
      			</router-link>
  			</td>
      	</tr>
      </table>
    </div>
  </div> </template>

<script>
export default {
  data() {
    return {
      showModal: false,
      users: {}
    };
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
    const dataUser = await this.$dataContent.getAllKamiManage();
    //console.log(await this.$dataUser.getAllUsers())
    this.users = dataUser["data"]["rows"];
  }
};
</script>
