export const useTodoStore = defineStore("owd/todo", () => {
    const list = ref([])
    const filter = ref()

    return {
        list,
        filter
    }
})