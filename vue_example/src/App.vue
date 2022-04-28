<template>
  <div id="app" class="wrapper">
    <div class="content">
      <div class="content__logo">
        <img alt="Decimal logo" src="./assets/decimal-logo.svg" />
      </div>
      <div class="content__data">
        <MainForm />
      </div>
    </div>
  </div>
</template>

<script>
import MainForm from "@/components/MainForm";

export default {
  name: "App",
  components: {
    MainForm,
  },
};
</script>

<style lang="scss">
body {
  background-color: #212429;
}

.wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  padding: 10px;
  width: 60%;
}

.content {
  margin-left: auto;
  margin-right: auto;

  &__logo {
    text-align: center;
    padding: 15px 0;
  }
}

.flex {
  display: flex;
}

.space-between {
  display: flex;
  justify-content: space-between;
}
</style>
