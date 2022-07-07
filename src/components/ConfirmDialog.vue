<template>
  <Transition>
    <div class="backdrop" v-show="isOpenDialog" @click="cancel()">
      <div class="dialog" @click.stop="">
        <button class="close-btn" @click="close()">
          <mdi-icon :icon="icons.close" :size="32" />
        </button>
        <div class="dialog-container">
          <h2>¿Seguro que quieres eliminar este video?</h2>
        </div>
        <div class="dialog-actions">
          <button class="btn outlined" @click="cancel()">Cancelar</button>
          <button class="btn" @click="confirm">Eliminar</button>
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
      resolve: null as any | null,
      reject: null as any | null,
      icons: {
        close: mdiClose,
        play: mdiPlay,
      },
    };
  },
  methods: {
    open() {
      return new Promise((resolve, reject) => {
        this.isOpenDialog = true;
        this.resolve = resolve;
        this.reject = reject;
      });
    },

    confirm() {
      if (this.resolve) {
        this.isOpenDialog = false;
        this.resolve(true);
      }
    },

    cancel() {
      if (this.resolve) {
        this.isOpenDialog = false;
        this.resolve(false);
      }
    },
  },
});
</script>

<style></style>
