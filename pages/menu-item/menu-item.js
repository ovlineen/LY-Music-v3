// pages/menu-item/menu-item.js
import { getPlayList, getMenuDetail } from "../../services/music";
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
      menuList: res.playlist.tracks,
    });
  },

  async feachMenuDetail() {
    const res = await getMenuDetail(this.data.id);
    this.setData({
      menuDatil: res.playlist,
    });
  },
});
