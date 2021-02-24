<template>
  <div class="row row--notes">
    <h2 class="header">Список заметок</h2>

    <div class="empty" v-if="notes.length === 0">
      <p class="center empty-list">
        Пока ничего нет... <span>Создайте заметку!</span>
      </p>
    </div>

    <div class="card horizontal" v-for="note in notes" :key="note.id">
      <div class="card-stacked">
        <div class="card-content">
          <div class="title">
            <span
              class="card-title"
              @click="
                setEditing($event, true, false, {
                  id: note.id,
                  data: note.title
                })
              "
              v-if="!isEditingTitle || currentId !== note.id"
              >{{ note.title }}</span
            >
            <!-- v-else-if="isEditingTitle && currentId === note.id" -->
            <input
              class="card-title editing"
              type="text"
              v-else
              v-model.trim="note.title"
              @blur="setEditing($event, false, false, note)"
              @keyup.enter="$event.target.blur()"
            />

            <a
              class="card-title waves-effect waves-red btn-flat"
              @click="deleteNote(note.id)"
              ><i class="material-icons">delete</i></a
            >
          </div>

          <p
            class="card-description"
            @click="
              setEditing($event, false, true, {
                id: note.id,
                data: note.description
              })
            "
            v-if="!isEditingDescription || currentId !== note.id"
          >
            <span v-html="note.description"></span>
            <span class="card-description--empty" v-if="!note.description"
              >Добавить описание...</span
            >
          </p>

<!-- v-else-if="isEditingDescription && currentId === note.id" -->
          <quill-editor
            class="editor card-description editing"
            v-else
            v-model.trim="note.description"
            @blur="setEditing($event, false, false, note)"
            @keyup.enter="$event.target.blur()"
          />
          <button
            class="waves-effect waves-light light-green darken-1 btn-small"
            @click="setEditing($event, false, false, note)"
            v-show="isEditingDescription && currentId === note.id"
          >
            Сохранить
          </button>
        </div>
        <div class="card-action card-info">
          <span class="card-date"
            >Дата создания: {{note.createdAt}}
            {{ new Date(note.createdAt).toLocaleDateString("ru-RU") }},
            {{ new Date(note.createdAt).toLocaleTimeString("ru-RU") }}</span
          >
          <span class="card-date"
            >{{ getYearsMonthsDays(note.createdAt) }} назад</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment-timezone";
import { quillEditor } from "vue-quill-editor";

export default {
  props: {
    notes: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    date: new Date(),
    time: new Date(),
    interval: null,
    isEditingTitle: false,
    isEditingDescription: false,
    currentData: "",
    currentId: ""
  }),
  components: {
    quillEditor
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },

  methods: {
    getYearsMonthsDays(date) {
      let fromTime = moment(new Date(date)).diff(moment(), "milliseconds");
      let duration = moment.duration(fromTime);
      let years = duration.years() / -1;
      let months = duration.months() / -1;
      let days = duration.days() / -1;

      let hours = duration.hours() / -1;
      let minutes = duration.minutes() / -1;
      let seconds = duration.seconds() / -1;

      if (years > 0) {
        let Ys = years + " г. и ";
        let Ms = months + " меc.";
        return Ys + Ms;
      } else {
        return months > 0
          ? months + " мес."
          : days > 0
          ? days + " д."
          : hours > 0
          ? hours + " ч. "
          : minutes > 0
          ? minutes + " мин. " + seconds + " сек."
          : seconds + " сек.";
      }
    },

    deleteNote(noteId) {
      this.$emit("deleteNote", noteId);
    },

    setEditing(event, editingTitle, editingDescription, data) {
      [this.isEditingTitle, this.isEditingDescription] = [
        editingTitle,
        editingDescription
      ];

      if (editingTitle || editingDescription) {
        this.currentId = data.id;
        this.currentData = data.data;
      } else {
        this.$emit("updateNote", data);
      }
    }
  }
};
</script>

<style lang="scss">
.row--notes {
  margin: 0 !important;
  background-color: #eeeeee;
  height: fit-content;
  min-height: 100%;
}
.empty {
  height: 54vh;
}

.empty-list {
  font-size: 1.5rem;

  span {
    color: #64dd17;
    display: block;
    font-weight: bold;
  }
}

.card .card-content .card-title {
  margin-bottom: 15px;
}

a.card-title {
  color: #434343;
}

.title {
  display: flex;
  justify-content: space-between;
}

.card-description p {
  word-break: break-all;
  width: 70%;
  margin: auto;
}

.card-description ol {
  padding-left: 15px;
}

.card-description--empty {
  font-style: italic;
  color: #949494;
}

.card-date,
.card-time {
  font-size: 0.9rem;
}

.card {
  width: 90%;
}

.card.horizontal {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 45px auto;
}

.card-info {
  display: flex;
  justify-content: space-between;
}

@media only screen and (max-width: 992px) {
  .card-info {
    flex-direction: column;
  }

  .card .card-action {
    padding: 15px 5px 5px;
  }

  .card-date {
    margin-bottom: 10px;
  }
}
</style>
