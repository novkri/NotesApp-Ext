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
          <span class="card-title">{{ note.title }}</span>
          <p class="card-description">
            {{ note.description }}
          </p>
        </div>
        <div class="card-action card-info">
          <span class="card-date"
            >Дата создания:
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

  }),
  beforeDestroy() {
    clearInterval(this.interval);
  },

  methods: {
    getYearsMonthsDays(date) {
      let fromTime = moment(date).diff(moment(), "milliseconds");
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
    }
  }
};
</script>

<style lang="scss">
.row--notes {
  margin: 0 !important;
  background-color: #eeeeee;
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
.card-description p {
  word-break: break-all;
  width: 70%;
  margin: auto;
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
