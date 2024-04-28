<template>
  <div class="container mx-auto max-w-2xl flex flex-col items-center justify-center p-12">
    <PlatformLogo />
    <RouterLink to="/tasks">Tasks</RouterLink>
    <AuthFormWrapper label="Sign in to your Account">
      <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-6">

        <InputWrapper forInput="email" label="Email" >
          <input v-model="loginPayload.email" type="email" name="email" id="email" class="form-input"
                  placeholder="yo@gmail.com">
          <span v-for="error in v$.email.$errors" :key="error.$uid">
            <ErrorIndicator  :error="error.$message"/>          </span>
        </InputWrapper>

        <InputWrapper forInput="password" label="Password" >
          <input v-model="loginPayload.password" type="password" name="password" id="password" placeholder="••••••••"
                 class="form-input">
          <span v-for="error in v$.password.$errors" :key="error.$uid">
            <ErrorIndicator  :error="error.$message"/>          </span>
        </InputWrapper>

        <button
            type="submit"
            class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Sign In
        </button>

        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          Don't have an account yet?
          <RouterLink
              to="/register"
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign Up
          </RouterLink>
        </p>
      </form>
    </AuthFormWrapper>

  </div>

</template>

<script setup lang="ts">
import {  reactive } from 'vue'
import useVuelidate from "@vuelidate/core";

import PlatformLogo from "../../components/layouts/PlatformLogo.vue";
import AuthFormWrapper from "../../components/partials/AuthFormWrapper.vue";
import ErrorIndicator from "../../components/partials/ErrorIndicator.vue";
import InputWrapper from "../../components/partials/InputWrapper.vue";

import axios from "../../lib/axios-config";
import {removeCookie, setCookie} from "../../lib/utils";
import router from "../../router";
import {loginRules} from "../../lib/validation-rules";
import {Login} from "../../api/auth";
import {toast} from "vue3-toastify";
import {AxiosError} from "axios";

const loginPayload = reactive({
  email: "",
  password: ""
})


const v$ = useVuelidate(loginRules, loginPayload)
const handleLogin = async()=>{
  try{
    const validatedForm = await v$.value.$validate();
    if(validatedForm){
      const success = await Login(loginPayload);
      success ? router.push("/tasks") : toast.error(`Invalid Credentials!`);
    }
  }catch (e){
    if(e instanceof AxiosError){
      toast.error(`${e.response.data.message}`)
    }
  }
}



</script>

<style scoped></style>