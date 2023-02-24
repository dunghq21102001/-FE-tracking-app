<template>
    <ul class="pagination">
        <li class="pagination-item">
            <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">
                First
            </button>
        </li>

        <li class="pagination-item">
            <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">
                🢀
            </button>
        </li>

        <!-- Visible Buttons Start -->

        <li class="pagination-item" v-for="page in pages" :key="page.name">
            <button type="button" :disabled="page.isDisabled" @click="onClickPage(page.name)"
                :class="{ active: isPageActive(page.name) }">
                {{ page.name }}
            </button>
        </li>

        <!-- Visible Buttons End -->

        <li class="pagination-item">
            <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
                🢂
            </button>
        </li>

        <li class="pagination-item">
            <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
                Last
            </button>
        </li>
    </ul>
</template>
  
<script>
export default {
    props: {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 3
        },
        totalPages: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    },
    computed: {
        startPage() {
            // When on the first page
            if (this.currentPage === 1) {
                return 1;
            }

            // When on the last page
            if (this.currentPage === this.totalPages) {
                const start = this.totalPages - (this.maxVisibleButtons - 1);
                if (start == 0) return 1
                else return start
            }

            // When in between
            return this.currentPage - 1;
        },
        pages() {
            const range = [];

            for (
                let i = this.startPage;
                i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
                i++
            ) {
                range.push({
                    name: i,
                    isDisabled: i === this.currentPage
                });
            }

            return range;
        },
        isInFirstPage() {
            return this.currentPage === 1;
        },
        isInLastPage() {
            return this.currentPage === this.totalPages;
        },
    },
    methods: {
        onClickFirstPage() {
            this.$emit('pagechanged', 1);
        },
        onClickPreviousPage() {
            this.$emit('pagechanged', this.currentPage - 1);
        },
        onClickPage(page) {
            this.$emit('pagechanged', page);
        },
        onClickNextPage() {
            this.$emit('pagechanged', this.currentPage + 1);
        },
        onClickLastPage() {
            this.$emit('pagechanged', this.totalPages);
        },
        isPageActive(page) {
            return this.currentPage == page;
        }
    }

};
</script>
<style>
.pagination {
    list-style-type: none;
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
    text-align: center;
}

.pagination-item {
    border: 1px solid;
    padding: 10px;
    border-radius: 8px;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
}

.active {
    background-color: #4AAE9B;
    color: #ffffff;
}
</style>