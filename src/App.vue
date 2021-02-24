<template>
  <div>
    <!-- eslint --fix --ext .js,.vue src -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;700&display=swap");

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Ubuntu", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}


.card {
  width: 85% !important;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0px -1px 20px 6px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2) !important;
}

/* login + register */
.container-auth {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bcbcbc;
}

.card.auth {
  min-width: 200px;
  width: 30% !important;
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0px 4px 23px 11px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 4px 23px 11px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 4px 23px 11px rgba(34, 60, 80, 0.2);
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
}

@media (max-width: 986px) {
  .card.auth {
    width: 85% !important;
    padding: 20px;
  }
}
.form-login {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-header {
  margin: 0;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

input {
  margin: 10px 0 25px;
  padding: 10px;
}

.login-btn {
  align-self: center;
}

.sub-form {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

label.form-text {
  font-size: 1rem;
  margin-top: 20px;
  margin-bottom: 5px;
  position: static !important;
}

.helper-text {
  margin-bottom: 5px;
  display: flex;
  align-self: flex-start;
}

.helper-text.invalid {
  color: red !important;
}

.goToLink {
  color: #ff8f00;
  text-transform: uppercase;
  text-decoration: none;
  padding-left: 5px;

  &:hover {
    color: #ff6f00;
  }
}

// loader
.loader-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
