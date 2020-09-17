<template>
  <transition name="fade">
    <li :class="{ editing: todo.editing, completed: todo.completed }">
      <div class="checkbox" @click="todoComplete()">
        <v-icon v-if="!todo.completed">mdi-checkbox-blank-outline</v-icon>
        <v-icon v-else>mdi-checkbox-marked-outline</v-icon>
      </div>

      <input
        v-model="todo.title"
        v-focus
        v-if="todo.editing"
        type="text"
        placeholder="empty"
        @keyup.esc="todoEdit()"
        @keyup.enter="todoEdit()"
        @dblclick="todoDblClickEdit()"
      />
      <span v-if="!todo.editing" class="ellipse" @dblclick="todoEdit()">{{ todo.title }}</span>

      <div class="btn-group">
        <div class="btn btn-edit" @click="todoEdit()">
          <v-icon v-if="!todo.editing">mdi-pencil</v-icon>
          <v-icon v-if="todo.editing">mdi-content-save</v-icon>
        </div>

        <div class="btn btn-remove" @click="todoRemove(todo)">
          <v-icon>mdi-window-close</v-icon>
        </div>
      </div>
    </li>
  </transition>
</template>

<script>
  export default {
    name: "TodoList",
    props: {
      todo: Object
    },
    watch: {
      'todo.completed': function () {
        this.$emit('todo-save');
      },
      'todo.editing': function (val) {
        if (val === false) {
          if (this.todo.title.trim() === '') {
            // if edit confirmed but value is empty, set edit-mode again
            this.todoEdit();
            return;
          }

          this.$emit('todo-save');
        }
      }
    },
    directives: {
      // directive to focus after to-do insert
      focus: {
        inserted(el) {
          el.focus()
        }
      }
    },
    methods: {
      /**
       * Set to-do as completed
       */
      todoComplete: function () {
        this.todo.completed = !this.todo.completed;
      },

      /**
       * Edit to-do when double-click
       */
      todoDblClickEdit: function () {
        if (!this.todo.editing) {
          this.todoEdit();
        }
      },

      /**
       * Edit to-do
       */
      todoEdit: function () {
        this.todo.editing = !this.todo.editing;
      },

      /**
       * Remove to-do
       */
      todoRemove: function (todo) {
        if (confirm('Are you sure to remove this item?') !== true) return;
        this.$emit('todo-remove', todo)
      }
    }
  }
</script>

<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .15s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  li {
    position: relative;
    height: 41px;
    line-height: 40px;
    font-size: 16px;
    border-radius: 2px;
    color: #868686;
    cursor: default;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .v-icon {
      color: #555;
    }

    &.completed div.checkbox .v-icon {
      color: #1ba0c1;
    }

    div.checkbox {
      display: inline-block;
      vertical-align: top;
      width: 38px;
      height: 40px;
      line-height: 35px;
      font-size: 24px;
      padding-left: 12px;
      color: #555;
      cursor: pointer;
    }

    input[type="text"] {
      background: none;
      border: none;
      width: calc(100% - 125px);
      padding: 0 0 0 5px;
      height: 38px;
      line-height: 40px;
      font-size: 15px;
      color: #FFF;
    }

    > span {
      display: inline-block;
      vertical-align: top;
      width: calc(100% - 125px);
      padding: 0 0 0 5px;
      height: 38px;
      line-height: 38px;
      font-size: 15px;
    }

    .btn-group {
      display: none;

      .btn {
        position: absolute;
        top: 0;
        height: 38px;
        line-height: 40px;
        width: 40px;
        text-align: center;
        cursor: pointer;

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
          }
        }

        &:hover {
          background: rgba(0, 0, 0, 0.2);
        }
      }
    }

    &:hover, &.editing {
      background: rgba(0, 0, 0, 0.2);

      .btn-group {
        display: block;
      }
    }
  }
</style>
