Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "../image/index.png",
      selectedIconPath: "../image/index2.png",
      text: "发现"
    }, {
      pagePath: "/pages/edit/index",
      iconPath: "../image/edit.png",
      selectedIconPath: "../image/edit2.png",
      text: "发布"
      }, {
        pagePath: "/pages/user/index",
        iconPath: "../image/user.png",
        selectedIconPath: "../image/user2.png",
        text: "我的"
      }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})