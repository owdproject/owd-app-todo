<template>
  <input placeholder="Remember me to-do..." @keyup.enter="todoAdd" v-model="input" />
</template>

<script setup>
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
