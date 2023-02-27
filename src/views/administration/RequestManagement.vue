<template>
    <div class="w-full">
        <div class="bg-[#289ae7] text-center text-2xl text-white pb-4 pt-11 md:py-4">Request Management</div>

        <div class="w-full overflow-y-scroll h-[75vh]">
            <table class="w-full">
                <thead>
                    <tr class="text-center">
                        <th :title="field.title" v-for="(field, i) in fields" :key="i">
                            {{ field.name }}
                        </th>
                        <th>Hành Động</th>
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
                .catch(err => swal2.error(err))
        },
        deleteRequest(id) {

            swal2.confirm("delete").then((result) => {
                if (result.value) {
                    Service.deleteRequest(id)
                        .then(res => {
                            this.getList()
                            swal2.success('Xoá yêu cầu thành công')
                        })
                        .catch(err => swal2.error(err))
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
</style>