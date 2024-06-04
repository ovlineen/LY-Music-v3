import { HYEventStore } from "hy-event-store";
import { getPlayList } from "../services/music";

const recomendStore = new HYEventStore({
  state: {
    recommendData: [],
  },
  actions: {
    async feachRecommend(ctx) {
      const res = await getPlayList();
      ctx.recommendData = res.playlist.tracks.slice(0, 100);
    },
  },
});

export default recomendStore;
