// pages/detail-menu/detail-menu.js
import { add } from "lodash";
import { getSonglist, getMenuSort } from "../../services/music";
Page({
  data: {
    menuData: [],
  },

  onLoad() {
    this.feachMenuSort();
  },

  async feachMenuSort() {
    const tagRes = await getMenuSort();
    const tags = tagRes.tags;

    let allPromise = [];
    for (const tag of tags) {
      const promise = getSonglist(tag.name);
      allPromise.push(promise);
    }

    Promise.all(allPromise).then((res) => {
      this.setData({
        menuData: res,
      });
    });
  },
});
