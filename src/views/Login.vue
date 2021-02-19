<template>
  <div class="container-auth">
    <div class="card auth">
      <form class="form-login col s12" @submit.prevent="login">
        <p class="form-header">Авторизация</p>

        <div class="input-field col s12">
          <label for="email" class="form-text">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Вася Пупкин"
            v-model.trim="email"
            :class="{
              invalid:
                ($v.email.$invalid && !$v.email.required) ||
                ($v.email.$invalid && !$v.email.minLength) ||
                ($v.email.$invalid && !$v.email.maxLength)
            }"
          />
          <span
            class="helper-text invalid"
            v-if="$v.email.$invalid && !$v.email.required"
          >
            Введите имя пользователя
          </span>
          <span
            class="helper-text invalid"
            v-if="$v.email.$invalid && !$v.email.minLength"
          >
            Имя пользователя долдно содержать минимум
            {{ $v.email.$params.minLength.min }} символов
          </span>
          <span
            class="helper-text invalid"
            v-if="$v.email.$invalid && !$v.email.maxLength"
          >
            Имя пользователя долдно содержать максимум
            {{ $v.email.$params.maxLength.max }} символов
          </span>
        </div>

        <div class="input-field col s12">
          <label for="password" class="form-text">Пароль</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Пароль"
            v-model.trim="password"
            :class="{
              invalid:
                ($v.password.$invalid && !$v.password.required) ||
                ($v.password.$invalid && !$v.password.minLength)
            }"
          />
          <span
            class="helper-text invalid"
            v-if="$v.password.$invalid && !$v.password.required"
          >
            Введите пароль
          </span>
          <span
            class="helper-text invalid"
            v-if="$v.password.$invalid && !$v.password.minLength"
          >
            Пароль должен содержать минимум
            {{ $v.password.$params.minLength.min }} символов
          </span>
        </div>

        <button
          type="submit"
          class="login-btn waves-effect waves-light btn lime accent-2 black-text"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </form>

      <div class="sub-form">
        <p>
          Нет аккаунта?
          <router-link to="/register" class="goToLink"
            >Зарегистрироваться</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "login",
  data: () => ({
    email: "",
    password: ""
  }),
  validations: {
    email: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(20)
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(fbError) {
      switch (fbError.code) {
        case "auth/wrong-password":
          this.$toast.error("Неверный пароль");
          break;
        case "auth/user-not-found":
          this.$toast.error("Такого пользователя не существует");
          break;
        default:
          this.$toast.error("Что-то пошло не так");
          break;
      }
    }
  },
  methods: {
    async login() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password
      };

      await this.$store.dispatch("login", formData);
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
