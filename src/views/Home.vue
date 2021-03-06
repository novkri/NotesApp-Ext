<template>
  <div class="wrapper">
    <Navbar @dateFilter="dateFilter" :notes="notes"
        :key="notes.length" />

    <Loader v-if="isLoading" />

    <div v-else class="col s12 m7 notes-container">
      <HomeNotes
        :notes="notes"
        :key="notes.length"
        @deleteNote="deleteNote"
        @updateNote="updateNote"
      />
    </div>

    <Modal
      v-show="isModalVisible"
      @close="isModalVisible = false"
      @createNote="createNewNote"
    />

    <div class="fixed-action-btn" ref="floatBtn">
      <a
        class="btn-floating btn-large red modal-trigger"
        href="#modalAdd"
        @click="isModalVisible = true"
      >
        <i class="large material-icons">mode_edit</i>
      </a>
      <ul></ul>
    </div>
  </div>
</template>

<script>
import moment from "moment-timezone";

import Navbar from "@/components/Navbar";
import HomeNotes from "@/components/Home/MyNotes";
import Modal from "@/components/Modal";

import M from "materialize-css";

export default {
  name: "home",
  data: () => ({
    isLoading: true,
    isModalVisible: false,

    notes: []
  }),
  async mounted() {
    M.FloatingActionButton.init(this.$refs.floatBtn, {
      hoverEnabled: false
    });

    if (!this.$store.getters.info.length) {
      await this.$store.dispatch("fetchInfo");
    }

    this.notes = await this.$store.dispatch("fetchNotes");
    this.isLoading = false;
  },
  components: {
    Navbar,
    HomeNotes,
    Modal
  },
  methods: {
    async dateFilter(choosenDate) {
      const today = moment().format("DD.MM.YYYY");
      const yesterday = moment()
        .add(-1, "days")
        .format("DD.MM.YYYY");
      switch (choosenDate) {
        case "today":
          this.notes = this.notes.filter(note => {
            return moment(note.createdAt).format("DD.MM.YYYY") === today;
          });
          break;
        case "yesterday":
          this.notes = this.notes.filter(note => {
            return moment(note.createdAt).format("DD.MM.YYYY") === yesterday;
          });
          break;
        case "all":
          this.notes;
          break;
      }
    },

    createNewNote(data) {
      this.$store.dispatch("createNote", data).then(() => {
        this.notes.push(data);
        this.$toast.success("Заметка успешно добавлена! :)");
      });
    },

    deleteNote(data) {
      this.$store.dispatch("deleteNote", data).then(() => {
        this.notes = this.notes.filter(note => note.id !== data);
        this.$toast.success("Заметка удалена! :)");
      });
    },
    
    updateNote(data) {
      this.$store.dispatch("updateNote", data);
      this.notes.filter(note => note.id === data.id)[0].createdAt = new Date().toString()
    },
  }
};
</script>

<style lang="scss">
.header {
  margin-top: 0;
  padding: 30px;
  display: flex;
  justify-content: center;
  text-align: center;
}

.notes-container {
  height: 91vh;
}

.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}
</style>
