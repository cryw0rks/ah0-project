<template>
  <div class="user">
    <h1>register</h1>
    <label>username</label>
    <input required id="username" v-model="username" type="text" placeholder="Kirito"><br>
    <label>e-mail</label>
    <input required id="email" v-model="email" type="text" placeholder="kirito@sao.com"><br>
    <label>password</label>
    <input required id="password" v-model="password" type="password" placeholder="Password"><br>
    <label>retype-password</label>
    <input required id="password2" v-model="password2" type="password" placeholder="Retype-Password">
    <br>
    <button type="submit" @click="handleSubmit">login</button>
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