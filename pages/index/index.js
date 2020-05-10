Page({

  /**
   * 页面的初始数据
   */
  data: {
    Entryheight:"",
    iShow:false,
  },

  Entryfocus(e) {
    let _that=this,
      Entryheight = e.detail.height
    wx.hideTabBar({
      success(){
        _that.setData({
          Entryheight: Entryheight,
        })
      }
    })
    console.log(e)
    
    // this.emojis.emojihide()
  },//聚焦时 调整发送栏的高度为0  

  Losefocus(e) {
   let _that = this;
    wx.showTabBar({
     success(){
       _that.setData({
         Entryheight: 0,
         isShow: false
       })
     }
   })
  },

  elastic(){
    console.log(222)
    this.setData({
      isShow: !this.data.isShow
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       wx.request({
         url: 'http://127.0.0.1:3000/ll',
         method:"POST",
   
         success(e){
            console.log(e)
         }
       })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})