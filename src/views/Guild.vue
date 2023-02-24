<template>
  <header-common></header-common>
  <div class="min-h-[100vh]">
    <div class="mx-auto w-[80%]">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(guild, index) in listGuild"
          :key="guild.id"
          :title="`${index + 1}/ ${guild.question}`"
          :text="guild.answer"
        >
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import service from "../services/guild";
export default {
  data() {
    return {
      listGuild: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      await service.getListGuild().then((res) => {
        this.listGuild = res.data.tutorials;
      });
    },
  },
};
</script>

<style>
</style>