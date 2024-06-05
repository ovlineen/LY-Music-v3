// pages/main-music/main-music.js
import { getBannerCarousel, getSonglist } from "../../services/music";
import recommendStore from "../../stores/recommendStore";
import rankingStore from "../../stores/rankingSotre";
Page({
  data: {
    banners: [],
    recommendData: {},
    hotPlaylistData: [],
    MandarinPopData: [],
    soaringRankingData: {},
    originalRankingData: {},
    newSongRankingData: {},
    soaringRankingDataTracks: [],
    originalRankingDataTracks: [],
    newSongRankingDataTracks: [],
  },

  onLoad() {
    this.feachBannerCarousel();
    this.feachSongList();

    // 状态管理
    recommendStore.onState("recommendData", this.handleRcommend);
    rankingStore.onState("soaringRankingData", this.handlesoaringRanking);
    rankingStore.onState("originalRankingData", this.handleoriginalRanking);
    rankingStore.onState("newSongRankingData", this.handlenewSongRanking);
    recommendStore.dispatch("feachRecommend");
    rankingStore.dispatch("feachsoaringRanking");
    rankingStore.dispatch("feachoriginalRankingData");
    rankingStore.dispatch("feachnewSongRankingData");
  },

  // 轮播图请求
  async feachBannerCarousel() {
    const res = await getBannerCarousel();
    this.setData({
      banners: res.banners,
    });
  },

  async feachSongList() {
    const hotRes = await getSonglist();
    const MandarinRes = await getSonglist("华语");
    this.setData({
      hotPlaylistData: hotRes,
      MandarinPopData: MandarinRes,
    });
  },

  // 从状态管理库中拿数据
  handleRcommend(value) {
    this.setData({
      recommendData: value.slice(0, 6),
    });
  },

  handlesoaringRanking(value) {
    if (value && value.tracks) {
      this.setData({
        soaringRankingData: value,
        soaringRankingDataTracks: value.tracks.slice(0, 3),
      });
    }
  },
  handleoriginalRanking(value) {
    if (value && value.tracks) {
      this.setData({
        originalRankingData: value,
        originalRankingDataTracks: value.tracks.slice(0, 3),
      });
    }
  },
  handlenewSongRanking(value) {
    if (value && value.tracks) {
      this.setData({
        newSongRankingData: value,
        newSongRankingDataTracks: value.tracks.slice(0, 3),
      });
    }
  },

  // 搜索触摸事件
  onSearchTouch() {
    wx.navigateTo({
      url: "/pages/detail-search/detail-search",
    });
  },

  // 热门推荐更多事件
  onRecommendMoreTouch() {
    wx.navigateTo({
      url: `/pages/detial-song/detail-song?type=recommend`,
    });
  },

  // 热门歌单数据
  onSonglistMoreTouch() {
    wx.navigateTo({
      url: "/pages/detail-menu/detail-menu",
    });
  },

  // 排行榜触摸
  onRankingSoarTouch() {
    wx.navigateTo({
      url: "/pages/detial-song/detail-song?type=ranking&key=soaringRanking",
    });
  },

  onRankingOrigTouch() {
    wx.navigateTo({
      url: "/pages/detial-song/detail-song?type=ranking&key=originalRanking",
    });
  },

  onRankingNewTouch() {
    wx.navigateTo({
      url: "/pages/detial-song/detail-song?type=ranking&key=newSongRanking",
    });
  },
});
