<template>
  <div class="wrapper">
    <Navbar @showModal="showModal" @dateFilter="dateFilter" />

    <Loader v-if="isLoading" />
     
    <div v-else class="col s12 m7 notes-container">
      <HomeNotes :notes="notes" :key="notes.length" @deleteNote="deleteNote" />
    </div>

    <Modal
      v-show="isModalVisible"
      @close="closeModal"
      @createNote="createNewNote"
    />

    <div class="fixed-action-btn" ref="floatBtn">
      <a class="btn-floating btn-large red" @click="showModal">
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
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
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

    async dateFilter(choosenDate) {
      this.notes = await this.$store.dispatch("fetchNotes");

      const today = moment().format("DD.MM.YYYY");
      const yesterday = moment()
        .add(-1, "days")
        .format("DD.MM.YYYY");
      // const all = moment().add(-2, "days").format("DD.MM.YYYY");
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
          // this.notes = this.notes.filter(note => {
          //   return moment(note.createdAt).format("DD.MM.YYYY") <= all;
          // });
          this.notes;
          break;
      }
    }
  }
};
</script>

<style lang="scss">
.header {
  margin-top: 0;
  padding: 30px;
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
