// pages/menu-item/menu-item.js
import {
  getPlayList,
  getMenuDetail
} from "../../services/music";
import playStore from "../../stores/playStore";

import palyStore from '../../stores/playStore'

Page({
  data: {
    id: 0,
    menuList: [],
    menuDatil: [],
  },

  onLoad(options) {
    const id = options.id;
    this.setData({
      id,
    });

    this.feachPlayList();
    this.feachMenuDetail();
  },

  async feachPlayList() {
    const res = await getPlayList(this.data.id);
    this.setData({
      menuList: res.playlist,
    });
  },

  async feachMenuDetail() {
    const res = await getMenuDetail(this.data.id);
    this.setData({
      menuDatil: res.playlist,
    });
  },

  onSongsTouch(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail-play/detail-play?id=${id}`,
    });

    palyStore.setState('playListSongs', this.data.menuList.tracks)
    playStore.setState("playSongIndex", e.currentTarget.dataset.index)
  },
});