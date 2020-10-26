import {Module} from '@owd-client/core'

export default class TodoModule extends Module {
  constructor(context) {
    super(context)
  }

  loadCommands({store}) {
    return {
      'todo': function () {
        store.dispatch('core/windows/windowOpen', 'WindowTodo');
      }
    }
  }
}