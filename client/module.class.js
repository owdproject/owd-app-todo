import {ModuleApp} from "@owd-client/core";

export default class TodoModule extends ModuleApp {
  constructor(context) {
    super(context)
  }

  loadCommands({store}) {
    return {
      'todo': function () {
        store.dispatch('core/window/windowOpen', 'WindowTodo');
      }
    }
  }
}