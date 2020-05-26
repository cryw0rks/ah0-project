<template>
  <div class="user">
    <h1>login</h1>
    <label>username/e-mail</label>
    <input required id="username" v-model="username" type="text" placeholder="Kirito"><br>
    <label>password</label>
    <input required id="password" v-model="password" type="password" placeholder="Password">
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
                				this.$router.push("/")
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