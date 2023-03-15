<template>
    <div class="w-[90%] lg:w-[80%] mx-auto pt-3">
        <span class="text-2xl text-[#007199] uppercase font-bold">
            {{ $t('Post') }}
        </span>
        <div class="flex flex-col">
            <div v-for="post in list5Posts" :key="post.id"
                class="flex items-center my-2 w-full h-[150px] post-custom">
                <div v-if="post.images[0]" class="h-[150px] w-[150px] overflow-hidden flex justify-center items-center">
                    <router-link :to="{ name: 'post-detail', params: { id: post.id } }">
                        <img class="h-full cursor-pointer" v-lazy="filePath + post?.images[0]?.file_path" />
                    </router-link>
                </div>
                <div class="ml-4 flex flex-col justify-around h-full w-[80%]">
                    <router-link :to="{ name: 'post-detail', params: { id: post.id } }">
                        <h1 :title="post.title" class="text-[30px]">{{ post.title }}</h1>
                    </router-link>
                    <p :title="post.description" class="text-[20px]"> {{ post.description }}</p>
                    <span>{{ getLocalTime(post.created_at) }}</span>
                    <span>{{ $t('Author') }}: {{ post.user.last_name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import service from '../services/post'
export default {
    data() {
        return {
            list5Posts: [],
            filePath: serverPath
        }
    },
    created() {
        this.getList()
    },
    methods: {
        async getList() {
            await service.getTop()
                .then(res => {
                    this.list5Posts = res.data.postings
                })
                .catch(err => {
                    if (err.response.data.message
                        && err.response.data.message == 'You are not allowed') {
                        swal2.error(`${this.$t('You are not authorized to take action')}`)
                        this.$router.push({ name: "error" });
                    }
                })
        },
        getLocalTime(time) {
            return func.getLocalTime(time)
        }
    }
}
</script>
<style scoped>
.post-custom:hover h1 {
    color: red;
}

.post-custom {
    background-color: #e2dae9;
    padding: 10px;
    overflow: hidden;
    border-radius: 15px;
}
h1 {
    cursor: pointer;
}
p,
h1 {
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    /* resize: horizontal; */
}</style>