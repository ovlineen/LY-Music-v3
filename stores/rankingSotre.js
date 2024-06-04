import { HYEventStore } from "hy-event-store";
import { getPlayList } from "../services/music";

const rankingStore = new HYEventStore({
  state: {
    soaringRankingData: {},
    originalRankingData: {},
    newSongRankingData: {},
  },
  actions: {
    async feachsoaringRanking(ctx) {
      const res = await getPlayList(19723756);
      ctx.soaringRankingData = res.playlist;
    },
    async feachoriginalRankingData(ctx) {
      const res = await getPlayList(2884035);
      ctx.originalRankingData = res.playlist;
    },
    async feachnewSongRankingData(ctx) {
      const res = await getPlayList(3779629);
      ctx.newSongRankingData = res.playlist;
    },
  },
});

export default rankingStore;
