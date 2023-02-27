<template>
  <header-common></header-common>
  <div class="bg-[#ecf0f5] w-full pt-4">
    <div class="
          mx-auto
          border-t-[3px] border-solid border-blue-400
          bg-white
          w-full
          lg:w-[80%]
          px-7
          py-3
        ">
      <span class="uppercase font-bold text-[#007199] text-xl">
        air shipping logistic
      </span>
      <ul class="text-[#007199] mb-6">
        <li>📧 Info@shipping</li>
        <li>☎️ 0-123-456-789</li>
        <li>☎️ 0-123-456-789</li>
        <li>📍 3311 Beltline Rd, Garland, TX – 75044</li>
      </ul>

      <div>
        <span class="uppercase font-bold text-[#007199] text-xl">
          GỬI CÂU HỎI
        </span>
        <form action="">
          <div>
            <label for="fullName">Họ và tên:<span class="text-red-500">*</span></label><br />
            <input v-model="formData.fullName" type="text" id="fullName" />
          </div>
          <div>
            <label for="email">Email:<span class="text-red-500">*</span></label><br />
            <input v-model="formData.email" type="email" id="email" />
          </div>
          <div>
            <label for="title">Chủ đề:<span class="text-red-500">*</span></label><br />
            <input v-model="formData.title" type="text" id="title" />
          </div>
          <div>
            <label for="question">Câu hỏi:<span class="text-red-500">*</span></label><br />
            <textarea v-model="formData.question" name="" id="question" cols="30" rows="10"></textarea>
          </div>
        </form>
        <button @click="createRequest" class="rounded-sm bg-[#3c8dbc] text-white px-7 py-1 hover:bg-blue-400">
          Gửi
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Service from '../services/request'
export default {
  data() {
    return {
      formData: {
        fullName: '',
        email: '',
        title: '',
        question: ''
      }
    }
  },
  methods: {
    async createRequest() {
      await Service.createRequest(this.formData)
        .then(res => {
          swal2.success('Tạo yêu cầu thành công, hãy chờ chúng tôi liên hệ với bạn qua email', 5000)
          this.formData = {
            fullName: '',
            email: '',
            title: '',
            question: ''
          }
        })
        .catch(err => swal2.error(err))
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

form>div {
  width: 100%;
  margin-bottom: 20px;
}

input,
textarea {
  border: 1px solid rgb(156, 155, 155);
  width: 100%;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}

input:focus,
textarea:focus {
  outline: none;
}

label {
  font-weight: bold;
}
</style>