<template>
  <div class="container">
    <div class="progress-bar" :class="{ 'hide-progress': !loading }"></div>
    <confirm-dialog ref="ConfirmDialog"></confirm-dialog>
    <detail-dialog
      ref="DetailDialog"
      @play="toDetailView($event)"
    ></detail-dialog>
    <div class="jumbo">
      <div class="title">
        <h2>Añadir nuevo video</h2>
      </div>
      <div class="input-container">
        <input
          id=""
          :disabled="loading"
          type="text"
          name="newUrl"
          v-model="newUrl"
          placeholder="Añadir"
          @keyup.enter="addVideo()"
        />
        <button
          :disabled="loading || !isValid"
          class="add-btn btn"
          @click="addVideo()"
        >
          Añadir
        </button>
      </div>
    </div>
    <div class="videos">
      <div
        class="video-container"
        v-for="(video, index) in videos"
        :key="index"
      >
        <div class="video">
          <div
            class="clickeable-section"
            @click="showDetailDialog(video)"
          ></div>
          <button class="delete-btn" @click.stop="deleteVideo(video)">
            <mdi-icon :icon="icons.close" :size="24" />
          </button>
          <img :src="video.thumbnail.url" :alt="video.title" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DetailDialog from "@/components/DetailDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { mdiClose } from "@mdi/js";
import mdiIcon from "@/components/mdiIcon.vue";
import video from "@/types/video";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "VideosView",
  components: {
    mdiIcon,
    DetailDialog,
    ConfirmDialog,
  },
  data: () => {
    return {
      newUrl: "",
      loading: false,
      icons: {
        close: mdiClose,
      },
    };
  },
  computed: {
    videos(): video[] {
      return this.$store.getters.videos;
    },
    isValid(): boolean {
      return Boolean(this.getVideoIdByUrl(this.newUrl));
    },
  },
  async mounted() {
    this.loading = true;
    await this.getVideosFromDb();
    this.loading = false;
  },
  methods: {
    ...mapActions([
      "getDataVideo",
      "addVideoToDb",
      "getVideosFromDb",
      "removeVideoToDb",
    ]),

    async addVideo() {
      this.loading = true;
      let videoId = this.getVideoIdByUrl(this.newUrl);
      let video = await this.getDataVideo(videoId);
      await this.addVideoToDb(video);
      this.newUrl = "";
      this.loading = false;
    },

    async deleteVideo(video: video) {
      if (await (this.$refs.ConfirmDialog as any).open()) {
        this.loading = true;
        await this.removeVideoToDb(video);
        this.loading = false;
      }
    },

    showDetailDialog(video: video) {
      (this.$refs.DetailDialog as any).open(video);
    },

    toDetailView(video: video) {
      this.$router.push({ name: "detail", params: { id: video.id } });
    },

    getVideoIdByUrl(url: string): string | null {
      const p =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      const match = url.match(p);
      if (match && match.length > 0) {
        return match[1];
      }
      return null;
    },
  },
});
</script>
<style lang="scss"></style>
