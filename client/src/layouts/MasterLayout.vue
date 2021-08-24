<template>
  <div>
    <app-header />
    <app-main />
    <app-footer />
  </div>
</template>

<script>
import { AppMain, AppHeader, AppFooter } from "./components";
export default {
  components: {
    AppMain,
    AppHeader,
    AppFooter,
  },
};
</script>

<style>
</style>