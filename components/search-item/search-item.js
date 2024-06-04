// components/search-item/search-item.js
import { getSearchAssociation } from "../../services/search";
import _ from "lodash";
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    searchValue: "",
    associationData: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 搜索框内容变化事件
    // 防止调用太频繁，使用节流处理
    onSearchChange: _.throttle(function (e) {
      const searchValue = e.detail;
      this.setData({
        searchValue,
      });
      this.feachSearchAssociation(searchValue);
    }, 1000),

    // 根据关键联想的发送请求
    async feachSearchAssociation(searchValue) {
      // 发送请求
      const res = await getSearchAssociation(searchValue);
      // 先判断服务器是否有数据
      // 如果有，则遍历出数据，为防止有些值为 undefined 用数组中的 filter 方法进行过滤。
      const associationData =
        res && res.result && res.result.allMatch
          ? res.result.allMatch.filter((item) => item !== undefined)
          : [];
      this.setData({
        associationData,
      });
    },

    // 监听关键词点击
    onKeywordTouch(e) {
      // 拿到关键可能用空格，用 trim 剔除
      const keyword = e._relatedInfo.anchorRelatedText.trim();
      wx.navigateTo({
        url: `/pages/main-search/main-search?keyword=${keyword}`,
      });
    },
  },
});
