<template>
  <div class="user">
    <h1>login</h1>
    <table>
        <tr><td><label>username/e-mail</label></td><td>:</td><td><input style="width: 200px;" required id="username" v-model="username" type="text" placeholder="Kirito"></td></tr>
        <tr><td><label>password</label></td><td>:</td><td><input style="width: 200px;" required id="password" v-model="password" type="password" placeholder="Password"></td></tr>
        <tr><td colspan="3">don't have acc? <router-link to="/register">register now</router-link> <button style="float: right;" type="submit" @click="handleSubmit">login</button></td></tr>
    </table>
   <Modal ref="modalok"></Modal>
  </div>
</template>

<script>
	import Modal from '../modal'
    export default {
        data(){
            return {
                username : "",
                password : ""
            }
        },

        components: { Modal},

        methods : {

	        handleSubmit(e){
                e.preventDefault()
                this.$refs.modalok.show('loading')
                this.$auth.login(this.username, this.password).then(response=>{
                	if (response.error) {
                	this.$refs.modalok.show('dialog', 
                	{
                		title: "info",
                		content: response.message,
                		buttons: [ 
                		{ 
                			title: "close"
                		} ]
                	})
                } else {
                	this.$refs.modalok.show('dialog', 
                	{
                		title: "info",
                		content: response.message,
                		buttons: [ 
                		{ 
                			title: "close", 
                			handler: () => {
                				this.$router.go("/")
                			}
                		} ]
                	})
                	}
                }).catch(function (error) {
                    console.error(error.response);
                });
            }
        }
    }
</script>