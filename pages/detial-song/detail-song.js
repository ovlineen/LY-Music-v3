// pages/detial-song/detail-song.js
import recomendStore from "../../stores/recommendStore";
import rankingSotre from "../../stores/rankingSotre";
import rankingStore from "../../stores/rankingSotre";
import playStore from '../../stores/playStore'

Page({
  data: {
    title: "热歌榜",
    sonListData: [],
  },

  onLoad(options) {
    const type = options.type;
    const key = options.key;
    if (type == "recommend") {
      recomendStore.onState("recommendData", this.handleRecommend);
    } else {
      if (key == "soaringRanking") {
        rankingSotre.onState("soaringRankingData", this.handlesoaringRanking);
      } else if (key == "originalRanking") {
        rankingStore.onState("originalRankingData", this.handleoriginalRanking);
      } else if (key == "newSongRanking") {
        rankingStore.onState("newSongRankingData", this.handlenewSongRanking);
      }
    }

    wx.setNavigationBarTitle({
      title: this.data.title,
    });
  },

  handleRecommend(value) {
    this.setData({
      sonListData: value,
    });
  },

  handlesoaringRanking(value) {
    if (value && value.tracks) {
      this.setData({
        title: value.name,
        sonListData: value.tracks,
      });
    }
  },

  handleoriginalRanking(value) {
    if (value && value.tracks) {
      this.setData({
        title: value.name,
        sonListData: value.tracks,
      });
    }
  },
  handlenewSongRanking(value) {
    if (value && value.tracks) {
      this.setData({
        title: value.name,
        sonListData: value.tracks,
      });
    }
  },


  // 歌曲点击事件
  songListItemTouch(e) {
    const id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/detail-play/detail-play?id=${id}`,
    })

    playStore.setState('playListSongs', this.data.sonListData)
    playStore.setState('playSongIndex', e.currentTarget.dataset.index)
  }
});