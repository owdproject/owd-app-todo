<template>
  <input class="v-input" placeholder="Add something and press enter" @keyup.enter="todoAdd" v-model="input" />
</template>

<script setup>
import {ref, defineEmits} from "vue";

const input = ref('')

const emit = defineEmits([
  'todo-add'
])

function todoAdd() {
  emit('todo-add', input.value);
  input.value = '';
}
</script>

<style scoped lang="scss">
  input {
    margin: 0 0 12px 0;
    min-height: 52px;
    width: 100%;
    box-sizing: border-box;
  }
</style>
