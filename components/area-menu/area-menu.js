// components/area-menu/area-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    menuData: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onMenuItemTouch(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/menu-item/menu-item?id=${id}`,
      });
    },
  },
});
