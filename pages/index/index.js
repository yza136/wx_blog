var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Entryheight:"",
    isShow:false,
    datas:"",
    touch:0,
    loading:"",
    vid:"",
    url: app.data.url,
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
    
    this.emojis.emojihide()
  },//聚焦时 调整发送栏的高度为0  
  //
  confirm(e){
    this.HidePl(0)
  },


  /**
   * 点击发消息
  */
  elastic(e){
    let vid = e.currentTarget.dataset.vid;
    this.setData({
      isShow: !this.data.isShow,
      vid: vid
    });
    this.emojis = this.selectComponent("#emojis");
  },

  // 点击emojis  显示表情图库
  emojimodel(e) {
    this.emojis.emojimodel();
    this.setData({
        Entryheight: 0, 
      })
  },
  // 点击赞
  praise(e){
     let index = e.currentTarget.dataset.index,  //内容数组的下坐标
        article_id= e.currentTarget.dataset.vid, //内容的id
        openid = wx.getStorageSync('openid'),  //用户的openid
        _id=null,
        praise = this.data.datas[index].praise;  //点赞的praise数组

    if (praise.length==0){
      let status = { status: 'true'};
      this.data.datas[index].praise.push(status);
      ++this.data.datas[index].nub
    }else{
      this.data.datas[index].praise[0].status = !this.data.datas[index].praise[0].status;
      _id = e.currentTarget.dataset._id;
      let NubModify = this.data.datas[index].praise[0].status ? ++this.data.datas[index].nub : --this.data.datas[index].nub;
      console.log(this.data.datas)
    }

    this.setData({
     datas: this.data.datas
   })

    wx.request({
      url: app.data.url + '/praise',
      method:"POST",
      data:{
        openid: openid,
        uid: article_id,
        status: this.data.datas[index].praise[0].status,
        _id: _id,
        nub: this.data.datas[index].nub
      },
      success(res){
        console.log(res)
      }
    })

    console.log(e)
  },

  //隐藏输入框
  HidePl(e){
    var _that = this;
    wx.showTabBar({
     success(){
       _that.setData({
         Entryheight: 0,
         isShow: false
       })
     }
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _that=this
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    wx.checkSession({
      success(res){
        let openid = wx.getStorageSync("openid")
          wx.request({
          url: app.data.url + '/show',
          method:"POST",
          data:{
                openid:openid
           },
           success(res){
             _that.setData({
               datas: res.data.docs
             })
             console.log(res)
           }
         })
        console.log(openid)
       
        wx.hideLoading()
      },
      fail(err){
        wx.request({
          url: app.data.url + '/show',
          method: "POST",
          success(res) {
            _that.setData({
              datas: res.data.docs
            })
            console.log(res)
            wx.hideLoading()
          }
        })
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
    let _that = this,
      touch = _that.data.touch,
      loading = _that.data.loading,
      datas = _that.data.datas,
      openid = wx.getStorageSync("openid");
      ++touch;
    if (loading || touch==1){
      _that.setData({
        loading: true
      })
      wx.request({
        url: app.data.url+'/show',
        method: "post",
        data: {
          pages: touch,
          openid: openid
        },
        success: function (res) {
          datas.push(...res.data.docs)
          let isArr = res.data.length,
              ishow = true,
              PageNub = res.data.PageNub;
          console.log(datas)
          _that.setData({
            datas: datas,
            touch: touch,
            loading: (PageNub == touch) ? false: true
          })
        },
      })
   }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
   onPageScroll: function () {
     this.HidePl()
  },
})