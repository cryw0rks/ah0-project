<template>
      <div v-if="showModal">
      <div id="modal">
                    <div class="overlay" @click.self="isOpen = false;">
                        <div class="modal">
                            <h1>{{ modalTitle }}</h1>
                            <p>{{ modalContent }}</p>
                            <div
      class="vue-dialog-buttons"
      v-if="buttons">
      <button
        v-for="(button, index) in buttons"
        type="button"
        :key="index"
        v-html="button.title"
        @click.stop="click(index, $event)"
      >
        {{button.title}}
      </button>
    </div>
                        </div>
                    </div>
                    </div>
      </div>
    </template>

    <script>

 export default {

   data() {
     return {
      showModal: false,
      buttons: {}
     }
   },
   methods: {
     show(type, config) {
      this.showModal = false
      if (type == "loading") {
        this.modalTitle = "loading"
      this.modalContent = "please wait...."
      } else if (type == "dialog") {
      console.log(config);
      this.modalTitle = config.title
      this.modalContent = config.content
      this.buttons = config.buttons
      }
      this.showModal = true
     },
     hide(){
      this.showModal = false
     },
         click(buttonIndex, event, source = 'click') {
      const button = this.buttons[buttonIndex]
      if (button && typeof button.handler === 'function') {
        button.handler(buttonIndex, event, { source })
        this.showModal = false
      } else {
        this.showModal = false
      }
    },
   }
 }
</script>