<template>
    <div class="w-full">
        <div class="bg-[#289ae7] text-center text-2xl text-white pb-4 pt-11 md:py-4">{{$t('X Management', [$t('Request')])}}</div>

        <div class="w-full overflow-y-scroll h-[70vh]">
            <table class="w-full">
                <thead class="sticky top-0 left-0 bg-[#f37070]">
                    <tr class="text-center">
                        <th :title="field.title" v-for="(field, i) in fields" :key="i">
                            {{ $t(field.name) }}
                        </th>
                        <th>{{ $t('Action') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :class="i % 2 == 0 ? 'bg-[#eeeef3]' : ''" class="text-center" v-for="(re, i) in listRequest"
                        :key="re.id">
                        <td>
                            <div class="w-[150px]">#{{ i + 1 }}</div>
                        </td>
                        <td>
                            <div class="w-[150px]">{{ re.full_name }}</div>
                        </td>
                        <td>
                            <div class="w-[150px]">{{ re.email }}</div>
                        </td>
                        <td>
                            <div class="w-[150px]">{{ re.title }}</div>
                        </td>
                        <td>
                            <div class="w-[500px]">{{ re.question }}</div>
                        </td>
                        <td>
                            <div class="w-[150px] py-3">
                                <button @click="deleteRequest(re.id)"
                                    class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#ffa09e]">
                                    ❌
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <paginate v-model="page" :page-count="totalPage" :page-range="3" :margin-pages="2" :click-handler="clickCallback"
            :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'">
        </paginate>
    </div>
</template>
<script>
import Paginate from 'vuejs-paginate-next';
import Service from '../../services/request'
export default {
    components: {
        paginate: Paginate,
    },
    data() {
        return {
            fields: Service.fields(),
            listRequest: [],
            page: 1,
            totalPage: 0,
        }
    },
    created() {
        this.getList()
    },
    methods: {
        async getList() {
            await Service.getListRequest()
                .then(res => {
                    this.listRequest = res.data.data
                    this.totalPage = res.data.last_page
                })
                .catch(err => {
                    if(err.response.data.message 
                    && err.response.data.message == 'You are not allowed'){
                        swal2.error(`${this.$t('You are not authorized to take action')}`)
                        this.$router.push({ name: "error" });
                    }
                })
        },
        deleteRequest(id) {

            swal2.confirm(`${this.$t('Delete')}`, `${this.$t('Are you sure you want to')}`).then((result) => {
                if (result.value) {
                    Service.deleteRequest(id)
                        .then(res => {
                            this.getList()
                            this.page = 1
                            swal2.success(`${this.$t('Delete')} ${this.$t('Successfully')}`)
                        })
                        .catch(err => {
                            if(err.response.data.message 
                            && err.response.data.message == 'You are not allowed'){
                                swal2.error(`${this.$t('You are not authorized to take action')}`)
                                this.$router.push({ name: "error" });
                            }
                        })
                }
            });
        },
        async clickCallback(pageNum) {
            await axios.get(API.request + `?page=${pageNum}`)
                .then(res => this.listRequest = res.data.data)
        },
    }
}
</script>
<style scoped>
.pagination {
    justify-content: space-around;
}
th {
    padding: 5px 0;
}
</style>