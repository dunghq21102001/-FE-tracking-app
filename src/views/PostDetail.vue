<template>
    <header-common></header-common>
    <div class="w-full min-h-[100vh] pt-4 bg-[#ecf0f5]">
        <div class="
                mx-auto
                w-[90%]
                lg:w-[80%]
                bg-white
                px-4
                border-t-[4px] border-blue-400 border-solid
            ">
            <h1 class="text-center text-[40px] text-[#004478] font-bold">
                {{ detailPost?.title }}
            </h1>
            <div class="text-gray-400 flex w-[60%] justify-around my-3">
                <span>{{ $t('Author') }}: {{ detailPost?.user.last_name }}</span>
                <span>{{ $t('Created Date') }}: {{ convertDate(detailPost?.created_at) }}</span>
                <span>{{ $t('View') }}:  {{ detailPost?.count }}</span>
            </div>
            <img class="mx-auto mt-4 my-4 max-h-[400px] max-w-[700px]" :src="filePath + detailPost?.images[0]?.file_path" alt="">
            <h1 class="text-[24px] indent-9 my-3">
                {{ detailPost?.description }}
            </h1>
            <img v-if="detailPost?.images[1]" class="mx-auto mt-4 my-4 max-h-[400px] max-w-[700px]" :src="filePath + detailPost?.images[1]?.file_path" alt="">
            <h1 class="text-[24px] indent-9 my-3">
                {{ detailPost?.content }}
            </h1>
            <h1 class="text-[24px] indent-9 my-3">
                {{ detailPost?.summary }}
            </h1>
            <img v-if="detailPost?.images[2]" class="mx-auto mt-4 my-4 max-h-[400px] max-w-[700px]" :src="filePath + detailPost?.images[2]?.file_path" alt="">
        </div>
    </div>
</template>
<script>
import service from '../services/post'
export default {
    data() {
        return {
            detailPost: null,
            filePath: serverPath
        }
    },
    created() {
        this.getDetailPost()
        this.increaseView()
    },
    methods: {
        async getDetailPost() {
            await service.detail(this.$route.params.id)
                .then(res => {
                    this.detailPost = res.data.posting
                })
                .catch(err => {
                    if (err.response.data.message
                        && err.response.data.message == 'You are not allowed') {
                        swal2.error(`${this.$t('You are not authorized to take action')}`)
                        this.$router.push({ name: "error" });
                    }
                })
        },
        async increaseView() {
            await service.increaseView(this.$route.params.id)
                // .then(res => console.log('successfully'))
                .catch(err => console.log(err))
        },
        convertDate(value) {
            return func.getLocalTime(value)
        }
    }
}
</script>