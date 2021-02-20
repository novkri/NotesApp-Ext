<template>
  <transition name="fade">
    <div id="modalAdd" class="modal" ref="modalCreate">
      <div class="modal-content">
        <div class="modal-header">
          <h4>Новая заметка</h4>

          <button type="button" class="btn-close btn-flat" @click="close">
            <i class="material-icons">close</i>
          </button>
        </div>
      </div>

      <div class="form-wrapper">
        <form class="col s12" @submit.prevent="onSubmit()">
          <div class="row">
            <div class="input-field col s12">
              <input
                id="title"
                type="text"
                v-model.trim="title"
                :class="{ invalid: $v.title.$dirty && !$v.title.required }"
              />
              <label for="title">Название</label>

              <span
                class="helper-text invalid"
                v-if="$v.title.$dirty && !$v.title.required"
              >
                Введите название заметки
              </span>
            </div>
            <div class="input-field col s12">
              <ul v-if="isDecoratorsVisible" class="text-editor-list">
                <li class="text-editor-item" title="Strong <strong> Ctrl+B" @click="PasteText('b')"><button>B</button></li>
                <li class="text-editor-item" title="Emphasis <em> Ctrl+I" @click="PasteText('em')"><span>i</span></li>
                <li class="text-editor-item" title="Emphasis <em> Ctrl+I" @click="PasteText('blockquote')"><span>Цитата</span></li>
                <li class="text-editor-item" title="Emphasis <em> Ctrl+I" @click="PasteText('a')"><span>Ссылка</span></li>
              </ul>
              <textarea
                id="description"
                ref="description"
                type="text"
                class="materialize-textarea"
                @focus="isDecoratorsVisible = true"
                @blur="isDecoratorsVisible = false"
                v-model.trim="description"
              >
              </textarea>
              <label for="description">Описание</label>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="submit"
              class="modal-close waves-effect waves-yellow btn-flat"
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import M from "materialize-css";

export default {
  name: "modal",
  data: () => ({
    title: "",
    description: "",
    isDecoratorsVisible: false
  }),
  validations: {
    title: {
      required
    }
  },
  mounted() {
    M.Modal.init(this.$refs.modalCreate, {});
  },
  methods: {
    close() {
      this.$emit("close");

      this.title = "";
      this.description = "";
      this.$v.$reset();
    },
    onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const newNoteData = {
        title: this.title,
        description: this.description,
        // createdAt: new Date().toLocaleString("ru-RU")
        createdAt: new Date().toString()
      };

      this.$emit("close");
      this.$emit("createNote", newNoteData);
      this.title = "";
      this.description = "";
      this.$v.$reset();
    },
    PasteText(tag) {
      console.log(tag);
      this.$refs.description.value = `<${tag}>text</${tag}>`
      this.$refs.description.focus()
    }
  }
};
</script>

<style lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}

.modal-header {
  display: flex;
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
  align-items: center;
}

.btn-flat i {
  font-size: 1.9rem;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  text-align: center !important;
  margin-bottom: 20px;
}

.form-wrapper {
  width: 70%;
  margin: 0 auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
