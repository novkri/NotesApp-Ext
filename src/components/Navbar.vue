<template>
  <div>
    <!-- Дропдаун фильтрации -->
    <ul id="dropdown1" class="dropdown-content">
      <li @click.prevent="$emit('dateFilter', 'today')">
        <a class="black-text">
          Сегодня
        </a>
      </li>
      <li @click.prevent="$emit('dateFilter', 'yesterday')">
        <a class="black-text">
          Вчера
        </a>
      </li>
      <li @click.prevent="$emit('dateFilter', 'all')">
        <a class="black-text">
          Все
        </a>
      </li>
    </ul>

    <!-- навбар -->
    <nav class="grey darken-3">
      <div class="nav-wrapper">
        <span class="user-profile">
          {{ username }}
        </span>

        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <a
              class="dropdown-trigger"
              href="#!"
              data-target="dropdown1"
              ref="filters"
              v-show="notes.length"
            >
              Фильтровать по дате
              <i class="material-icons right">arrow_drop_down</i>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="logout" class="logout-link">
              <i class="material-icons">assignment_return</i>
              Выйти
            </a>
          </li>
        </ul>

        <!-- бургер меню -->
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"
          ><i class="material-icons">menu</i></a
        >
      </div>
    </nav>

    <!-- сайдбар по клику на бургер -->
    <ul class="sidenav" id="mobile-demo" ref="mobileMenu">
      <li>
        <ul class="" ref="filtersSidebar">
          <li v-show="notes.length">
            <div class="">
              Фильтровать по дате:
            </div>
            <div class="">
              <form action="#">
                <p>
                  <label class="sidenav-close">
                    <input
                      name="group1"
                      type="radio"
                      @change="$emit('dateFilter', 'today')"
                    />
                    <span>Сегодня</span>
                  </label>
                </p>
                <p>
                  <label class="sidenav-close">
                    <input
                      name="group1"
                      type="radio"
                      @change="$emit('dateFilter', 'yesterday')"
                    />
                    <span>Вчера</span>
                  </label>
                </p>
                <p>
                  <label class="sidenav-close">
                    <input
                      name="group1"
                      type="radio"
                      @change="$emit('dateFilter', 'all')"
                    />
                    <span>Все</span>
                  </label>
                </p>
              </form>
            </div>
          </li>
        </ul>
      </li>
      <li>
        <a href="#" @click.prevent="logout" class="logout-link">
          Выйти
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import M from "materialize-css";

export default {
  name: "navbar",
  props: {
    notes: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    date: new Date(),
    interval: null
  }),
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);

    M.Dropdown.init(this.$refs.user, {
      constrainWidth: false
    });
    M.Dropdown.init(this.$refs.filters, {});

    M.Collapsible.init(this.$refs.filtersSidebar, {});

    M.Sidenav.init(this.$refs.mobileMenu, {
      edge: "right"
    });
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  computed: {
    username() {
      return this.$store.getters.info.username;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
      this.$toast("Вы вышли из системы");
    }
  }
};
</script>

<style lang="scss">
.sidenav {
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}

.nav-wrapper {
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
}

.user-profile {
  font-size: 1.2rem;
}

.tools {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
}

.filters {
  margin-right: 40px;
}

.logout-link {
  display: flex;

  i {
    margin-right: 5px;
  }
}

#mobile-demo ul {
  display: flex;
  justify-content: center;
}

</style>
