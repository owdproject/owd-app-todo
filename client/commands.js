export default ({ store }) => {
  return {
    'todo': function () {
      store.dispatch('core/windows/windowOpen', 'WindowTodo');
    },
  }
}
