<template>
  <header-common></header-common>
  <div class="w-full min-h-[100vh] pt-4 bg-[#ecf0f5]">
    <div class="
        mx-auto
        w-[90%]
        lg:w-[80%]
        bg-white
        border-t-[4px] border-blue-400 border-solid
      ">
      <TrackingHeader @searchBOL="searchBOL"></TrackingHeader>
      <button @click="resetList" class="ml-5 mt-5 rounded-sm text-white px-7 py-1 max-h-10 bg-green-600">
        Đặt lại danh sách
      </button>
      <div class="w-full overflow-x-scroll">
        <table class="w-full my-12">
          <thead>
            <tr class="text-center">
              <th class="font-bold" v-for="(field, index) in fields" :key="index" :title="field.title">
                {{ field.name }}
              </th>
              <th class="font-bold">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="trackingList.length == 0">
              <td class="text-center" colspan="8">No data available</td>
            </tr>
            <tr v-for="(t, i) in trackingList" :key="t.id" :class="i % 2 == 0 ? 'bg-gray-200' : ''">
              <td>
                <div class="w-[150px]">{{ t.bol_id }}</div>
              </td>
              <td>
                <div class="w-[150px]">{{ t.delivery_note }}</div>
              </td>
              <td>
                <div class="w-[150px] uppercase text-center cursor-pointer" :class="getStatusColor(t.status)">
                  <span>{{ t.status }}</span>
                </div>
              </td>
              <td>
                <div class="w-[150px]">{{ t.receiver.last_name }}</div>
              </td>
              <td>
                <div class="w-[150px]">{{ t.receiver.phone1 }}</div>
              </td>
              <td>
                <div class="w-[500px]">{{ t.receiver.address }}</div>
              </td>
              <td>
                <div class="w-[350px]">{{ t.created_at }}</div>
              </td>
              <td>
                <div class="w-[150px]">{{ t.note }}</div>
              </td>
              <td>
                <div class="w-[200px] flex justify-around">
                  <button @click="trackingActions('update', t.id, t.status)"
                    class="rounded-sm text-white px-7 py-1 max-h-10 bg-green-600">
                    Sửa
                  </button>
                  <button @click="trackingActions('delete', t.id, t.status)"
                    class="rounded-sm text-white px-7 py-1 max-h-10 bg-red-600">
                    Huỷ
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <paginate v-model="page" :page-count="totalPage" :page-range="3" :margin-pages="2" :click-handler="changePage"
        :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'">
      </paginate>

      <div class="
          w-full
          bg-[#00c0ef]
          text-white
          border-l-[4px] border-solid border-[#0097bc]
          py-6
          px-2
          mt-6
                ">
        ⚠️ Để Xem chi tiết Trạng Thái Tracking. Quý Khách hãy click vào ô Trạng
        Thái của mỗi dòng Tracking Number bên trên!
      </div>
    </div>
  </div>
</template>

<script>
import TrackingHeader from "../components/TrackingHeader.vue";
import Service from "../services/trackingNumber";
import { useTrackingStore } from "../store/tracking";
import Paginate from 'vuejs-paginate-next';
export default {
  setup() {
    const trackingStore = useTrackingStore()
    const searchState = trackingStore.searchData
    return { trackingStore, searchState }
  },
  components: {
    TrackingHeader,
    paginate: Paginate,
  },
  data() {
    return {
      fields: Service.fields(),
      trackingList: [],
      tmpList: [],
      tmpTotalPage: 0,
      searchTracking: this.searchState,
      page: 1,
      // perPage: '',
      totalPage: 0,
      fromDate: null,
      toDate: null
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      await Service.getListTracking()
        .then((res) => {
          this.trackingList = res.data.data;
          this.totalPage = res.data.last_page
        })
        .catch(err => swal2.error(err))

      this.getSearchList()
    },
    trackingActions(type, id, status) {
      if (status != 'new')
        return swal2.error('Chỉ có thể sửa / huỷ tracking ở trạng thái mới(new) !')
      if (type == 'update') {
        this.$router.push({ name: 'tracking-number-update', params: { id: id } })
      } else {
        swal2.confirm("delete").then((result) => {
          if (result.value) {
            Service.cancelTracking(id)
              .then(res => {
                swal2.success('Huỷ Tracking thành công')
                this.getList()
              })
          }
        });
      }
    },
    getStatusColor(status) {
      const commonCss = 'rounded-lg px-1 py-2 text-white'
      switch (status) {
        case 'new':
          return commonCss + ' bg-orange-600'
        case 'received':
          return commonCss + ' bg-green-500'  
        case 'canceled':
          return commonCss + ' bg-gray-500'
        default:
          return ''
      }
    },
    async changePage(pageNum) {
      await axios.get(API.tracking + `?page=${pageNum}`)
        .then(res => this.trackingList = res.data.data)
    },
    async getSearchList() {
      this.tmpList = this.trackingList
      this.tmpTotalPage = this.totalPage
      let tmpList = []
      if (this.searchTracking != null
        && this.searchTracking != ''
        || (this.fromDate != null && this.toDate != null) ) {
        await axios.get(API.tracking + '/search',
          {
            params: {
              searchData: this.searchTracking,
              fromDate: this.fromDate,
              toDate: this.toDate
            }
          })
          .then(res => {
            tmpList = res.data.data
            this.totalPage = res.data.last_page
            this.page = 1
          })
        this.trackingList = tmpList
      }
    },
    resetList() {
      this.trackingStore.setSearchData(null)
      this.searchTracking = null
      // this.trackingList = this.tmpList
      // this.totalPage = this.tmpTotalPage
      this.fromDate = null
      this.fromDate = null
      this.getList()
      this.page = 1
    },
    searchBOL(dataSearch) {
      this.fromDate = dataSearch.from_date
      this.toDate = dataSearch.to_date
      this.searchTracking = dataSearch.bol_code
      // this.getList()
      this.getSearchList()
    }
  },
  watch: {
    // 'searchTracking'(){
    //   this.getList()
    // }
  }
};
</script>

<style scoped>
td {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
}

.pagination {
  justify-content: flex-end;
  margin-top: 20px;
}
</style>