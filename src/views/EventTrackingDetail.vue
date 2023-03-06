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
            <!-- timeline1 -->
            <img src="../assets/1.jpg" class="w-full block mx-auto mt-5" alt="">

            <!-- timeline2 -->
            <div class="flex items-center mx-auto w-[80%] justify-around">
                <div class="line">
                    <div class="circle">✔️</div>
                    <div class="circle">✔️</div>
                    <div class="circle">✔️</div>
                    <div class="circle">✔️</div>
                    <div class="circle">✔️</div>
                    <div class="circle">✔️</div>
                    <div class="circle">✔️</div>
                </div>
                <div class="flex flex-col h-[1000px] justify-around items-center w-[90%]">
                    <div class="custom-content flex-col sm:flex-row">
                        <p class="text-[16px]"><span class="text-[#3c8dbc]">TRÊN ĐƯỜNG ĐẾN TEXAS UPS</span> đang chuyển kiện hàng tới kho của công ty ở Texas</p>
                        <span class="text-[12px] text-[#999]">📅</span>
                    </div>
                    <div class="custom-content flex-col sm:flex-row">
                        <p class="text-[16px]"><span class="text-[#3c8dbc]">TRÊN ĐƯỜNG ĐẾN TEXAS UPS</span> Texas</p>
                        <span class="text-[12px] text-[#999]">📅</span>
                    </div>
                    <div class="custom-content flex-col sm:flex-row">
                        <p class="text-[16px]"><span class="text-[#3c8dbc]">TRÊN ĐƯỜNG ĐẾN TEXAS UPS</span> Texas</p>
                        <span class="text-[12px] text-[#999]">📅</span>
                    </div>
                    <div class="custom-content flex-col sm:flex-row">
                        <p class="text-[16px]"><span class="text-[#3c8dbc]">TRÊN ĐƯỜNG ĐẾN TEXAS UPS</span> Texas</p>
                        <span class="text-[12px] text-[#999]">📅</span>
                    </div>
                    <div class="custom-content flex-col sm:flex-row">
                        <p class="text-[16px]"><span class="text-[#3c8dbc]">TRÊN ĐƯỜNG ĐẾN TEXAS UPS</span> đang chuyển kiện hàng tới kho của công ty ở Texas</p>
                        <span class="text-[12px] text-[#999]">📅</span>
                    </div>
                    <div class="custom-content flex-col sm:flex-row">
                        <p class="text-[16px]"><span class="text-[#3c8dbc]">TRÊN ĐƯỜNG ĐẾN TEXAS UPS</span> đang chuyển kiện hàng tới kho của công ty ở Texas</p>
                        <span class="text-[12px] text-[#999]">📅 2/21/2023 9:49:36 AM</span>
                    </div>
                    <div class="custom-content flex-col sm:flex-row">
                        <p class="text-[16px]"><span class="text-[#3c8dbc]">MỚI TẠO</span> Label đã tạo thành công, UPS chưa nhận được kiện hàng</p>
                        <span class="text-[12px] text-[#999]">📅 2/21/2023 9:49:36 AM</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    }
}
</script>
<style scoped>
.line {
    height: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-left: 5px solid #ddd;
}
.circle {
    width: 40px;
    height: 40px;
    clip-path: circle(50% at 50% 50%);
    background-color: #0073b7;
    transform: translateX(-60%);
    line-height: 40px;
    text-align: center;
}
.custom-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px rgb(190, 185, 185) solid;
}
</style>