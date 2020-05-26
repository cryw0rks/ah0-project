<template>
  <div class="container" id="app">
    <header>
                <ul class="header-menu-top">
                    <li id="datetime">japan, tokyo 12/12/1212, 12:12:12 am</li>
                </ul>
                <div class="header-middle">
                    <img width="800" height="150" src="/asset/img/banner.gif">
                    <div class="header-middle-title">アホ project</div>
                </div>
                <ul class="header-menu-bottom">
                    <li><router-link to="/">home</router-link></li>
                    <li><router-link to="/user">user</router-link></li>
                    <li><router-link to="/kami">kami</router-link></li>
                    <li v-if="isLogin()"><router-link to="/setting">setting</router-link></li>
                    <li v-if="isLogin()"><a @click="handleLogout">logout</a></li>
                    <li v-if="!isLogin()"><router-link to="/login">login</router-link></li>
                    <li v-if="!isLogin()"><router-link to="/register">register</router-link></li>
                </ul>
            </header>

            <div class="content">
                <div class="content-left">
                  
                   <router-view />

                </div>
                <div class="content-right">
                
                  <img width="185" height="185" src="">
                </div>
            </div>
            <footer>
                <div class="footer-top">
                    <ul class="footer-select-lang">
                        <li><router-link to="/feedback">feedback</router-link> | </li>
                        <li><router-link to="/reportbug">report bug</router-link></li>
                    </ul>
                </div>
                <div class="footer-bottom">
                    <span>copyright &copy; 2019 ba-ka all right reserved</span>
                </div>
            </footer>
            <Modal ref="modalok"></Modal>
  </div>
  
</template>

<script>
    import Modal from './modal'
    export default {
        data(){
            return {
            }
        },

        components: { Modal },

        methods : {
            isLogin() {
                return this.$auth.isLogin();
            },
            handleLogout(e){
                e.preventDefault()
                this.$refs.modalok.show('loading')
                this.$auth.logout().then(response=>{
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
                                this.$router.go(this.$router.currentRoute)
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