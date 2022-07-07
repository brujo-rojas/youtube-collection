<template>
  <Transition>
    <div class="backdrop" v-show="isOpenDialog" @click="close()">
      <div class="dialog" @click.stop="" v-if="video">
        <button class="close-btn" @click="close()">
          <mdi-icon :icon="icons.close" :size="32" />
        </button>
        <div class="dialog-container">
          <div class="thumbnail-container" v-if="video.thumbnail">
            <div class="thumbnail">
              <div class="thumbnail-backdrop" @click="play(video)">
                <button class="play-btn">
                  <mdi-icon :icon="icons.play" />
                </button>
              </div>
              <img :src="video.thumbnail.url" :alt="video.title" />
            </div>
          </div>
          <div class="description-container">
            <div class="description">
              <h3>{{ video.title }}</h3>
              <p>{{ video.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import Vue from "vue";
import { mdiClose, mdiPlay } from "@mdi/js";
import mdiIcon from "@/components/mdiIcon.vue";
import video from "@/types/video";

export default Vue.extend({
  name: "DetailDialog",
  components: {
    mdiIcon,
  },
  data() {
    return {
      isOpenDialog: false,
      video: null as video | null,
      icons: {
        close: mdiClose,
        play: mdiPlay,
      },
    };
  },
  methods: {
    open(video: video) {
      this.video = video;
      this.isOpenDialog = true;
    },
    close() {
      this.isOpenDialog = false;
    },
    play(video: video) {
      this.$emit("play", video);
    },
  },
});
</script>

<style></style>
