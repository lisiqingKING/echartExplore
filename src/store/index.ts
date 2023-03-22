import { defineStore } from "pinia";

export const useEditContent = defineStore('editContent', {
    state(){
        type StoreState = {
            form: Record<string, string>,
            key: string,
        }
        const state: StoreState = {
            form: {},
            key: '',
        }
        return state
    },

    getters: {
        content(state) {
            const { form, key } = state
            return form[key]
        }
    },

    actions: {
        setContent(obj: { target: CommonObject, key: string}) {
          
            const { target, key } = obj
            console.log('@actions: setContent', target, key)
            this.form = target
            this.key = key
        },
        setOrign(v: string) {
            this.form[this.key] = v
        }
    }
    
})