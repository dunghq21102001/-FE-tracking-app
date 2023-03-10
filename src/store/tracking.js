import { defineStore } from 'pinia'
export const useTrackingStore = defineStore('tracking', {
    state: () => ({
        searchData: null,
    }),
    getters: {
        getSearchValue: state => {
            return state.searchData;
        }
    },
    actions: {
        setSearchData(value) {
            this.searchData = value
        }

    },
})