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
            <v-timeline side="end" align="start">
                <v-timeline-item dot-color="pink" size="small">
                    <div class="d-flex">
                        <strong class="me-4">5pm</strong>
                        <div>
                            <strong>New Icon</strong>
                        </div>
                    </div>
                </v-timeline-item>

                <v-timeline-item dot-color="teal-lighten-3" size="small">
                    <div class="d-flex">
                        <strong class="me-4">3-4pm</strong>
                        <div>
                            <strong>Design Stand Up</strong>
                        </div>
                    </div>
                </v-timeline-item>
                <v-timeline-item dot-color="teal-lighten-3" size="small">
                    <div class="d-flex">
                        <strong class="me-4">9-11am</strong>
                        <div>
                            <strong>Finish Home Screen</strong>
                            <!-- <div class="text-caption">
                                Web App
                            </div> -->
                        </div>
                    </div>
                </v-timeline-item>
                <v-timeline-item dot-color="pink" size="small">
                    <div class="d-flex">
                        <strong class="me-4">5pm</strong>
                        <div>
                            <strong>New Icon</strong>
                        </div>
                    </div>
                </v-timeline-item>
                <v-timeline-item dot-color="teal-lighten-3" size="small">
                    <div class="d-flex">
                        <strong class="me-4">3-4pm</strong>
                        <div>
                            <strong>Design Stand Up</strong>
                        </div>
                    </div>
                </v-timeline-item>
                <v-timeline-item dot-color="teal-lighten-3" size="small">
                    <div class="d-flex">
                        <strong class="me-4">9-11am</strong>
                        <div>
                            <strong>Finish Home Screen</strong>
                            <!-- <div class="text-caption">
                                Web App
                            </div> -->
                        </div>
                    </div>
                </v-timeline-item>
                <v-timeline-item dot-color="pink" size="small">
                    <div class="d-flex">
                        <strong class="me-4">5pm</strong>
                        <div>
                            <strong>New Icon</strong>
                        </div>
                    </div>
                </v-timeline-item>

                <v-timeline-item dot-color="teal-lighten-3" size="small">
                    <div class="d-flex">
                        <strong class="me-4">3-4pm</strong>
                        <div>
                            <strong>Design Stand Up</strong>
                        </div>
                    </div>
                </v-timeline-item>
                <v-timeline-item dot-color="teal-lighten-3" size="small">
                    <div class="d-flex">
                        <strong class="me-4">9-11am</strong>
                        <div>
                            <strong>Finish Home Screen</strong>
                            <!-- <div class="text-caption">
                                Web App
                            </div> -->
                        </div>
                    </div>
                </v-timeline-item>
            </v-timeline>
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