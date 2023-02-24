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
      <TrackingHeader></TrackingHeader>
      <button @click="resetList"
        class="ml-5 mt-5 rounded-sm text-white px-7 py-1 max-h-10 bg-green-600">
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
export default {
  setup() {
    const trackingStore = useTrackingStore()
    const searchState = trackingStore.searchData
    return { trackingStore, searchState }
  },
  components: {
    TrackingHeader,
  },
  data() {
    return {
      fields: Service.fields(),
      trackingList: [],
      tmpList: [],
      searchTracking: this.searchState
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      await Service.getListTracking()
        .then((res) => {
          this.trackingList = res.data.trackings;
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
        case 'canceled':
          return commonCss + ' bg-gray-500'
        default:
          return ''
      }
    },
    getSearchList(){
      this.tmpList = this.trackingList
      const tmpList = []
      if(this.searchTracking != null || this.searchTracking!= undefined){
        this.trackingList.filter(tracking => {
          if(tracking.bol_id.includes(this.searchTracking)){
            tmpList.push(tracking)
          }
        })
        this.trackingList = tmpList
      }
    },
    resetList(){
      this.trackingStore.setSearchData('')
      this.trackingList = this.tmpList
    }
  },
  watch: {
  }
};
</script>

<style scoped>
td {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>