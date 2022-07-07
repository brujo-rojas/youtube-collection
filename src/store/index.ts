import Vue from "vue";
import Vuex from "vuex";
import video from "@/types/video";
import axios from "axios";
import { db } from "@/plugins/firebase";
import {
  doc,
  query,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videos: [] as video[],
    API_KEY: "AIzaSyASgdUa2EcTgXgsOz6eZguzLs1v9r-MujA",
  },
  getters: {
    videos: (state) => state.videos,
  },
  mutations: {
    setVideos(state, payload) {
      state.videos = payload;
    },
  },
  actions: {
    async getVideosFromDb({ commit }): Promise<video[]> {
      const videos = [] as video[];
      try {
        const querySnapshot = await getDocs(query(collection(db, "videos")));
        querySnapshot.forEach((doc) => {
          const video = doc.data() as video;
          video.uid = doc.id;
          videos.push(video);
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
      commit("setVideos", videos);
      return videos;
    },

    async addVideoToDb({ state }, video: video) {
      try {
        const docSnap = await addDoc(collection(db, "videos"), video);
        video.uid = docSnap.id;
        state.videos.unshift(video);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async removeVideoToDb({ state }, video: video) {
      if (video.uid) {
        try {
          await deleteDoc(doc(db, "videos", video.uid));
          state.videos = state.videos.filter((v) => v !== video);
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
    },

    async getDataVideo({ state }, videoId: string): Promise<video> {
      let response = null;
      try {
        const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${state.API_KEY}&part=snippet`;
        response = await axios.get(url);
      } catch (error) {
        console.error(error);
        throw error;
      }

      const videoData = response.data.items[0];
      const videoSnippet = videoData.snippet;

      return {
        id: videoData.id,
        title: videoSnippet.title,
        description: videoSnippet.description,
        thumbnail: videoSnippet.thumbnails.standard,
      };
    },
  },
});
