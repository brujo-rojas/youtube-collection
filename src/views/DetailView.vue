<template>
  <div class="container">
    <div class="top-bar">
      <button class="outlined btn" @click="goBack()">
        <mdi-icon :icon="icons.back" />
        Volver
      </button>
    </div>
    <div class="detail-video">
      <div class="video-embed">
        <iframe
          v-if="video"
          id="player"
          type="text/html"
          :src="`http://www.youtube.com/embed/${video.id}`"
          frameborder="0"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import mdiIcon from "@/components/mdiIcon.vue";
import { mdiArrowLeft } from "@mdi/js";
import { mapActions } from "vuex";
import video from "@/types/video";

export default Vue.extend({
  name: "DetailView",
  components: {
    mdiIcon,
  },

  data: () => {
    return {
      video: null as video | null,
      icons: {
        back: mdiArrowLeft,
      },
    };
  },
  async mounted() {
    if (this.$route.params.id) {
      this.video = await this.getDataVideo(this.$route.params.id);
    }
  },
  methods: {
    ...mapActions(["getDataVideo"]),
    goBack() {
      this.$router.go(-1);
    },
  },
});
</script>

<style></style>
