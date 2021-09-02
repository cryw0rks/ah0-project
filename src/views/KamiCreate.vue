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
          <textarea
            v-model="description"
            id="description"
            placeholder="this is story about young boy who stupid and ....."
          ></textarea>
        </td>
      </tr>
      <tr>
        <td><label>status</label></td>
        <td>:</td>
        <td>
          <select id="status" v-model="status">
            <option name="private">private</option>
            <option name="unlist">unlist</option>
            <option name="profile">profile</option>
            <option name="public">public</option>
          </select>
        </td>
      </tr>
      <tr>
        <td><label>content</label></td>
        <td>:</td>
        <td>
          <textarea
            @keyup.tab="mantapkun"
            placeholder="hey, this is my story ...."
            v-model="contentya"
          ></textarea>
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <button
            style="float: right"
            :disabled="!validData"
            type="submit"
            @click="handleSubmit"
          >
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
      contentya: "",
      enabled: true,
    };
  },

  components: { Modal },
  computed: {
    compiledMarkdown: function () {
	  if (this.contentya != null) {
        return this.$marked(this.contentya);
      } else {
        return null
      }
    },
    validData: function () {
      return this.title && this.description && this.status && this.contentya;
    },
  },

  methods: {
    mantapkun: function (e) {
      console.log("xx");
      if (e.keyCode == 27) {
        this.enabled = !this.enabled;
        return false;
      }

      // Enter Key?
      if (e.keyCode === 13 && this.enabled) {
        e.preventDefault();
        e.stopPropagation();
        // selection?
        if (this.selectionStart == this.selectionEnd) {
          // find start of the current line
          var sel = this.selectionStart;
          var textxx = this.contentya;
          while (sel > 0 && textxx[sel - 1] != "\n") sel--;

          var lineStart = sel;
          while (textxx[sel] == " " || textxx[sel] == "\t") sel++;

          if (sel > lineStart) {
            // Insert carriage return and indented text
            document.execCommand(
              "insertText",
              false,
              "\n" + textxx.substr(lineStart, sel - lineStart)
            );

            // Scroll caret visible
            this.blur();
            this.focus();
            return false;
          }
        }
      }

      // Tab key?
      if (e.keyCode === 9 && this.enabled) {
        // selection?
        if (this.selectionStart == this.selectionEnd) {
          // These single character operations are undoable
          if (!e.shiftKey) {
            document.execCommand("insertText", false, "\t");
          } else {
            var textxx3 = this.value;
            if (
              this.selectionStart > 0 &&
              textxx3[this.selectionStart - 1] == "\t"
            ) {
              document.execCommand("delete");
            }
          }
        } else {
          // Block indent/unindent trashes undo stack.
          // Select whole lines
          var selStart = this.selectionStart;
          var selEnd = this.selectionEnd;
          var textxx2 = this.contentya;
          while (selStart > 0 && textxx2[selStart - 1] != "\n") selStart--;
          while (
            selEnd > 0 &&
            textxx2[selEnd - 1] != "\n" &&
            selEnd < textxx2.length
          )
            selEnd++;

          // Get selected text
          var lines = textxx2.substr(selStart, selEnd - selStart).split("\n");

          // Insert tabs
          for (var i = 0; i < lines.length; i++) {
            // Don't indent last line if cursor at start of line
            if (i == lines.length - 1 && lines[i].length == 0) continue;

            // Tab or Shift+Tab?
            if (e.shiftKey) {
              if (lines[i].startsWith("\t")) lines[i] = lines[i].substr(1);
              else if (lines[i].startsWith("    "))
                lines[i] = lines[i].substr(4);
            } else lines[i] = "\t" + lines[i];
          }
          lines = lines.join("\n");

          // Update the text area
          this.value =
            textxx2.substr(0, selStart) + lines + textxx2.substr(selEnd);
          this.selectionStart = selStart;
          this.selectionEnd = selStart + lines.length;
        }

        return false;
      }

      this.enabled = true;
      return true;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.$refs.modalok.show("loading");
      this.$c0re
	  	.getFunction('content')
        .createKami(this.title, this.description, this.status, this.contentya)
        .then((response) => {
          if (response.success == false) {
            this.$refs.modalok.show("dialog", {
              title: "info",
              content: response.message,
              buttons: [
                {
                  title: "close",
                },
              ],
            });
          } else {
            this.$refs.modalok.show("dialog", {
              title: "info",
              content: response.message,
              buttons: [
                {
                  title: "close",
                  handler: () => {
                    this.$router.push(`/content/${response.result.code}`);
                  },
                },
              ],
            });
          }
        })
        .catch(function (error) {
          console.error(error.response);
        });
    },
  },
};
</script>
