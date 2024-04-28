<template>
  <form @submit.prevent="() => isEditMode ? handleUpdateTask() : handleNewTask()">
    <div class="gap-2 grid grid-cols-1 md:grid-cols-3 mb-4">
      <InputWrapper forInput="title" label="Title">
        <input v-model="taskPayload.title" type="text" name="title" id="title" class="form-input"
          placeholder="Learn clerk" />
      </InputWrapper>
      <InputWrapper forInput="due_date" label="Due date">
        <input v-model="taskPayload.due_date" type="date" name="due_date" id="due_date" class="form-input" />
        <span v-for="error in v$.due_date.$errors" :key="error.$uid">
            <ErrorIndicator  :error="error.$message"/>          </span>
      </InputWrapper>
      <InputWrapper forInput="status" label="Due date">
        <select class="form-input" v-model="taskPayload.status">
          <option value="pending">Pending</option>
          <option value="in progress">In progress</option>
          <option value="completed">Completed</option>
        </select>
      </InputWrapper>
    </div>
    <InputWrapper forInput="description" label="Description">
      <textarea v-model="taskPayload.description" rows="4" class="form-input" name="description" id="description"
        placeholder="In next week...">
    </textarea>
    </InputWrapper>
    <button type="submit"
      class="w-fit max-w-sm mx-auto block mt-6 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
      Save
    </button>
  </form>
</template>

<script lang="ts" setup>
import InputWrapper from "./InputWrapper.vue";
import {createTask, updateTask} from "../../api/tasks";
import router from "../../router";
import {defineProps, reactive, computed} from "vue";
import {helpers, minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core/dist/index";
import ErrorIndicator from "./ErrorIndicator.vue";

const {isEditMode, task} = defineProps<{isEditMode:boolean, task?:any}>()
const taskPayload = reactive({
  title: task.title || '',
  description: task.description || '',
  due_date: task.due_date || '',
  status: task.status || 'pending'
})
const rules = computed(()=>{
  return {
    title: {required, minLength: minLength(4)},
    due_date: {required, minValue: helpers.withMessage('Due date after today', (value:string) => {
        console.log({value})
        return new Date(value) > new Date()
      }),
    }
  }
});

const v$ = useVuelidate(rules, taskPayload)
async function handleNewTask() {
  const validatedForm = await v$.value.$validate();
  if(validatedForm){
    const created = await createTask({...taskPayload});
    if(created){
      router.back();
    }else{
      alert(`Oops! We couldn't created the task`);
    }
  }
}
async function handleUpdateTask() {
  const validatedForm = await v$.value.$validate();
  if(validatedForm){
    const updated = await updateTask({...taskPayload}, task.id);
    if(updated){
      router.back();
    }else{
      alert(`Oops! We couldn't update the task`);
    }
  }
}

</script>

<style scoped></style>