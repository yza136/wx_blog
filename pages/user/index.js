// pages/user/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    nickName: "",
    state: true
  },

  bindGetUserInfo(e) {
    var that = this
    let rawData = e.detail.rawData,
        signature = e.detail.signature;
    wx.login({
      success(res){
        let code = res.code
        wx.request({
          url: app.data.url+'/login',
          data: {
            code: code,
            rawData: rawData,
            signature: signature
          },
          success(res) {
            let openid = res.data.openid,
              nickName = res.data.rawData.nickName,
              avatarUrl = res.data.rawData.avatarUrl;
            
            that.setData({
              avatarUrl: avatarUrl,
              nickName: nickName,
              state: false
            })

            wx.setStorageSync("openid", openid)
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.checkSession({
      success(res) {
        console.log('session未过期')
        wx.getSetting({
          success(res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                withCredentials:true,
                success(res) {
                  let nickName = res.userInfo.nickName,
                    avatarUrl = res.userInfo.avatarUrl;
                  //  console.log(res)
                  that.setData({
                    avatarUrl: avatarUrl,
                    nickName: nickName,
                    state: false
                  })
                }
              })
            }
          }
        })

      },
      fail(err) {
        wx.removeStorage({
          key: 'toke',
          success(res) {
            console.log(res)
            that.setData({
              state: true
            })
          }
        })
        console.log('session过期')
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
