export const useTodoStore = defineStore('owd/todo', () => {
    const list = ref([])

    return {
        list
    }
})