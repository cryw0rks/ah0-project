<template>
  <div class="user">
    <h1>register</h1>
    <table>
        <tr><td><label>username</label></td><td>:</td><td><input style="width: 200px;" required id="username" v-model="username" type="text" placeholder="Kirito"></td></tr>
        <tr><td><label>e-mail</label></td><td>:</td><td><input style="width: 200px;" required id="email" v-model="email" type="text" placeholder="kirito@sao.com"></td></tr>
        <tr><td><label>password</label></td><td>:</td><td><input style="width: 200px;" required id="password" v-model="password" type="password" placeholder="Password"></td></tr>
        <tr><td><label>retype-password</label></td><td>:</td><td><input style="width: 200px;" required id="password2" v-model="password2" type="password" placeholder="Retype-Password"></td></tr>
        <tr><td colspan="3">already have acc? <router-link to="/login">login now</router-link> <button style="float: right;" type="submit" @click="handleSubmit">register</button></td></tr>
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
                email : "",
                password : "",
                password2 : ""
            }
        },

        components: { Modal},

        methods : {
        	
	        handleSubmit(e){
                e.preventDefault()
                this.$refs.modalok.show('loading')
                this.$auth.register(this.username, this.email, this.password, this.password2).then(response=>{
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
                				this.$router.push("/login")
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