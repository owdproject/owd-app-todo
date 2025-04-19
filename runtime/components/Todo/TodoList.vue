<template>
  <li :class="{ editing: props.todo.editing, completed: props.todo.completed }">
    <div class="todo-list__checkbox flex items-center">
      <Checkbox binary v-model="todo.completed"/>
    </div>

    <div clasS="todo-list__input">

      <InputText
          v-if="props.todo.editing"
          v-model="props.todo.title"
          placeholder="empty"
          @keyup.esc="todoEdit"
          @keyup.enter="todoEdit"
          @dblclick="todoDblClickEdit"
      />
      <span v-else class="ellipse pl-1" @dblclick="todoEdit">{{ props.todo.title }}</span>

    </div>

    <div class="todo-list__actions flex items-center">

      <ButtonGroup>
        <Button class="btn-edit" @click="todoEdit">
          <Icon name="mdi:pencil" v-if="!todo.editing"/>
          <Icon name="mdi:content-save" v-else/>
        </Button>

        <Button class="btn-remove" @click="todoRemove(props.todo)">
          <Icon name="mdi:window-close"/>
        </Button>
      </ButtonGroup>

    </div>
  </li>
</template>

<script setup>
import {watch, nextTick} from "vue"

const emit = defineEmits([
  'todo-remove'
])

const props = defineProps({
  todo: Object
})

watch(() => props.todo.editing, (val) => {
  if (val === false) {
    if (props.todo.title.trim() === '') {
      // if edit confirmed but value is empty, set edit-mode again
      todoEdit();
      return;
    }
  }
})

/**
 * Edit to-do on double-click
 */
function todoDblClickEdit(e) {
  if (!props.todo.editing) {
    todoEdit(e);
  }

  // focus input
  //e.target.closest('li').querySelector('input').focus()
}

/**
 * Edit to-do
 */
function todoEdit(e) {
  props.todo.editing = !props.todo.editing;

  if (props.todo.editing) {
    const liElement = e.target.closest('li')

    // focus input
    nextTick(() => liElement.querySelector('input').focus())
  }
}

/**
 * Remove to-do
 */
function todoRemove(todo) {
  if (confirm('Are you sure to remove this item?') !== true) return;
  emit('todo-remove', todo)
}
</script>

<style scoped lang="scss">
li {
  display: flex;
  flex-direction: row;
  margin: 8px 0;

  .todo-list__checkbox {
    height: auto;
  }

  .todo-list__input {
    flex: 1;
    align-content: center;
  }
}
</style>
