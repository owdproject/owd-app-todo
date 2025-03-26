<template>
  <li :class="{ editing: props.todo.editing, completed: props.todo.completed }">
    <div class="checkbox" @click="todoSetComplete">
      <Icon name="mdi:checkbox-blank-outline" v-if="!todo.completed"/>
      <Icon name="mdi:checkbox-marked-outline" v-else/>
    </div>

    <input
        v-if="props.todo.editing"
        v-model="props.todo.title"
        type="text"
        placeholder="empty"
        @keyup.esc="todoEdit"
        @keyup.enter="todoEdit"
        @dblclick="todoDblClickEdit"
    />
    <span v-else class="ellipse" @dblclick="todoEdit">{{ props.todo.title }}</span>

    <div class="btn-group">
      <div class="btn btn-edit" @click="todoEdit">
        <Icon name="mdi:pencil" v-if="!todo.editing"/>
        <Icon name="mdi:content-save" v-else/>
      </div>

      <div class="btn btn-remove" @click="todoRemove(props.todo)">
        <Icon name="mdi:window-close"/>
      </div>
    </div>
  </li>
</template>

<script setup>
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

function todoSetComplete() {
  props.todo.completed = !props.todo.completed;
}

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
  position: relative;
  height: 41px;
  line-height: 40px;
  font-size: 16px;
  border-radius: 2px;
  cursor: default;

  &:not(:last-child) {
  }

  .v-icon {
    color: #555;
  }

  &.completed div.checkbox .v-icon {
  }

  div.checkbox {
    display: inline-block;
    vertical-align: top;
    width: 42px;
    height: 40px;
    line-height: 36px;
    font-size: 24px;
    padding-left: 12px;
    color: #555;
    cursor: pointer;

    i {
      font-size: 28px;
    }
  }

  input[type="text"] {
    background: none;
    border: none;
    width: calc(100% - 125px);
    padding: 0 0 0 12px;
    height: 40px;
    font-size: 15px;
    color: #FFF;
  }

  > span {
    display: inline-block;
    vertical-align: top;
    width: calc(100% - 125px);
    padding-left: 12px;
    height: 100%;
    font-size: 15px;
  }

  .btn-group {
    display: none;

    .btn {
      position: absolute;
      top: 0;
      height: 100%;
      width: 40px;
      text-align: center;
      cursor: pointer;

      .v-icon {
      }

      &.btn-edit {
        right: 40px;

        .v-icon {
          font-size: 17px;
          vertical-align: -1px;
        }
      }

      &.btn-remove {
        right: 0;

        .v-icon {
          font-size: 21px;
          vertical-align: -3px;
        }
      }

      &:hover {
      }
    }
  }

  &:hover, &.editing {
    .btn-group {
      display: block;
    }
  }
}
</style>
