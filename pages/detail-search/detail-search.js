// pages/detail-search/detail-search.js
import { getSearchHot } from "../../services/search";

Page({
  data: {
    searchValue: "",
    hotSearchData: [],
    associationData: [],
  },

  onLoad() {
    this.feachSearchHot();
  },

  async feachSearchHot() {
    const res = await getSearchHot();
    this.setData({
      hotSearchData: res.result.hots,
    });
  },
});
