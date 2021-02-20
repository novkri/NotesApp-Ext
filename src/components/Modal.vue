<template>
  <transition name="fade">
    <div id="modalAdd" class="modal" ref="modalCreate">
      <div class="modal-content">
        <div class="modal-header">
          <h4>Новая заметка</h4>

          <button
            type="button"
            class="btn-close btn-flat modal-close"
            @click="close"
          >
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
              <quill-editor
                class="editor"
                ref="myQuillEditor"
                v-model="description"
                placeholder="Введите описание"
              />
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="submit"
              class="modal-close waves-effect waves-light light-green btn"
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

import { quillEditor } from "vue-quill-editor";

export default {
  name: "modal",
  data: () => ({
    title: "",
    description: ""
  }),
  components: {
    quillEditor
  },
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
        createdAt: new Date().toString()
      };

      this.$emit("close");
      this.$emit("createNote", newNoteData);
      this.title = "";
      this.description = "";
      this.$v.$reset();
    },
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
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.ql-editor {
  min-height: 150px;
}
.ql-editor.ql-blank::before {
  content: "Введите текст заметки здесь..." !important;
}
</style>
