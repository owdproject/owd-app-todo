<template>
  <input placeholder="Add something and press enter" @keyup.enter="todoAdd" />
</template>

<script>
  export default {
    name: "TodoInput",
    props: {
      value: String
    },
    methods: {
      todoAdd: function (event) {
        this.$emit('todo-add', event.target.value);
        event.target.value = '';
      }
    }
  }
</script>

<style scoped lang="scss">
  input {
    background: #141414;
    border: 1px solid #252525;
    border-radius: 2px;
    color: #CCC;
    margin: 0 0 12px 0;
    padding: 15px;
    width: 100%;
    box-sizing: border-box;
  }
</style>
