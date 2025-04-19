import {defineStore} from "pinia"
import {ref} from "@vue/reactivity"

export const useTodoStore = defineStore('owd/todo', () => {
    const filter = ref<string>('all')
    const list = ref<string[]>([])

    return {
        filter,
        list,
    }
})