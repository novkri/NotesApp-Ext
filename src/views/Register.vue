<template>
  <div class="container-auth">
    <div class="card auth">
      <form @submit.prevent="register" class="form-login col s12">
        <p class="form-header">Регистрация</p>

        <div class="input-field col s12">
          <label for="username" class="form-text">Имя пользователя</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Вася Пупкин"
            :class="{
              invalid:
                ($v.username.$invalid && !$v.username.required) ||
                ($v.username.$invalid && !$v.username.minLength) ||
                ($v.username.$invalid && !$v.username.maxLength)
            }"
            v-model.trim="username"
          />
          <span
            class="helper-text invalid"
            v-if="$v.username.$invalid && !$v.username.required"
          >
            Введите имя пользователя
          </span>
          <span
            class="helper-text invalid"
            v-if="$v.username.$invalid && !$v.username.minLength"
          >
            Имя пользователя долдно содержать минимум
            {{ $v.username.$params.minLength.min }} символов
          </span>
          <span
            class="helper-text invalid"
            v-if="$v.username.$invalid && !$v.username.maxLength"
          >
            Имя пользователя долдно содержать максимум
            {{ $v.username.$params.maxLength.max }} символов
          </span>
        </div>
        <div class="input-field col s12">
          <label for="email" class="form-text">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email@email.com"
            class="validate"
            :class="{
              invalid:
                ($v.email.$invalid && !$v.email.required) ||
                ($v.email.$invalid && !$v.email.email)
            }"
            v-model.trim="email"
          />
          <span
            class="helper-text invalid"
            v-if="$v.email.$invalid && !$v.email.required"
          >
            Введите email
          </span>
          <span
            class="helper-text invalid"
            v-if="$v.email.$invalid && !$v.email.email"
          >
            Введите корректный email
          </span>
        </div>
        <div class="input-field col s12">
          <label for="password" class="form-text">Пароль</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Пароль"
            :class="{
              invalid:
                ($v.password.$invalid && !$v.password.required) ||
                ($v.password.$invalid && !$v.password.minLength)
            }"
            v-model.trim="password"
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
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </form>

      <div class="sub-form">
        <p>
          Уже есть акканут?
          <router-link to="/login" class="goToLink">Войти</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  email,
  required,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

export default {
  name: "register",
  data: () => ({
    username: "",
    password: "",
    email: ""
  }),
  validations: {
    username: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(20)
    },
    email: {
      email,
      required
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
        case "auth/email-already-in-use":
          this.$toast.error("Такой email уже используется");
          break;
        default:
          this.$toast.error("Что-то пошло не так");
          break;
      }
    }
  },
  methods: {
    async register() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      await this.$store.dispatch("register", formData);
      this.$router.push("/");
    }
  }
};
</script>
<style></style>
