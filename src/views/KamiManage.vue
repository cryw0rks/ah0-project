<template>
  <div class="user">
    <h1>kami</h1>
    <p>list of public kami, hey create ur own kami <router-link to="/kami/create">here</router-link></p>
    <div class="users-list" v-if="kami">
      
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
      	<tr v-for="(value, index) in kami" :key="index">
      		<td>
      			<router-link type="button"  :to="{ path: 'content', name: 'Content Show', params: { codeURL: value.content.code} }" @click.stop="click(index, $event)">
      			{{ value.content.title }}
      			</router-link>
      		</td>
      		<td>
      			{{ value.content.description }}
      		</td>
      		<td>
      			{{ value.content.status }}
      		</td>
      		<td>
      			<router-link type="button"  :to="{ path: 'content/edit', name: 'Content Edit', params: { codeURL: value.content.code } }" @click.stop="click(index, $event)">
      				edit
      			</router-link>
  			</td>
      	</tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      kami: {}
    };
  },
  async mounted() {
    var data_auth = await this.$c0re.getFunction("auth").isLogin(true);
    if (data_auth != false) {
      if (data_auth['result']['expired'] == false) {
        const dataKami = await this.$c0re.getFunction('content').getAllContentByUserID(data_auth['result']['user']['id'], -1);
        this.kami = dataKami["result"]["rows"];
      }
    }
  }
};
</script>
