<template>
  <form @submit.prevent="() => isEditMode ? handleUpdateTask() : handleNewTask()">
    <div class="gap-2 grid grid-cols-1 md:grid-cols-3 mb-4">
      <InputWrapper forInput="title" label="Title">
        <input v-model="taskPayload.title"
               type="text"
               name="title"
               id="title"
               class="form-input"
               placeholder="Learn clerk"
        />
        <span v-for="error in v$.title.$errors" :key="error.$uid">
            <ErrorIndicator  :error="error.$message"/>
        </span>
      </InputWrapper>
      <InputWrapper forInput="due_date" label="Due date">
        <input v-model="taskPayload.due_date"
               type="date"
               name="due_date"
               id="due_date"
               class="form-input"
        />
        <span v-for="error in v$.due_date.$errors" :key="error.$uid">
            <ErrorIndicator  :error="error.$message"/>
        </span>
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
      <textarea
          v-model="taskPayload.description"
          rows="4"
          class="form-input"
          name="description"
          id="description"
          placeholder="In next week..."
      >
      </textarea>
    </InputWrapper>
    <button type="submit"
      class="blue-btn block mx-auto max-w-[120px] mt-8">
      Save
    </button>
  </form>
</template>

<script lang="ts" setup>
import InputWrapper from "../../partials/InputWrapper.vue";
import {createTask, updateTask} from "../../../api/tasks";
import router from "../../../router";
import {defineProps, reactive, computed} from "vue";
import useVuelidate from "@vuelidate/core/dist/index";
import ErrorIndicator from "../../partials/ErrorIndicator.vue";
import {toast} from "vue3-toastify";
import {taskRules} from "../../../lib/validation-rules";

const {isEditMode, task} = defineProps<{isEditMode:boolean, task?:any}>()
const taskPayload = reactive({
  title: task.title || '',
  description: task.description || '',
  due_date: task.due_date || '',
  status: task.status || 'pending'
})


const v$ = useVuelidate(taskRules, taskPayload)
async function handleNewTask() {
  const validatedForm = await v$.value.$validate();
  if(validatedForm){
    const created = await createTask({...taskPayload});
    if(created){
      toast.success(`Task created!`, {
        position:"top-center"
      })
      router.back();
    }else{
      toast.error(`Couldn't created the task!`,{
        position:"top-center"
      });
    }
  }
}
async function handleUpdateTask() {
  const validatedForm = await v$.value.$validate();
  if(validatedForm){
    const {updated, message} = await updateTask({...taskPayload}, task.id);
    if(updated){
      toast.success(message, {
        position:"top-center"
      })
      router.back();
    }else{
      toast.error(message,{
        position:"top-center"
      });
    }
  }
}

</script>

<style scoped></style>