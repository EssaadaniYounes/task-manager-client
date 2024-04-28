<template>
  <div class="w-full bg-gray-200 p-3 px-5 flex items-center justify-between">
    <RouterLink to="/tasks" class="flex items-center space-x-2">
      <img src="../../assets/logo.png" alt="logo" class="w-6 h-6" />
      <h2 class="text-1xl font-semibold text-gray-700">Task Manager</h2>
    </RouterLink>

    <button
        @click="handleLogout"
        class="blue-btn w-24"
    >
      Logout
    </button>
  </div>
</template>

<script>
import {removeCookie} from "../../lib/utils.ts";
import router from "../../router/index.ts";

export default {
  name: "NavBar",
  methods:{
    async handleLogout(){
      await removeCookie("auth_token");
      await router.push("/");
    }
  }
}
</script>

<style scoped></style>