var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Entryheight :"",
    content: "",
    tempFilePaths: ""
  },


//聚焦时 调整发送栏的高度为0  
  Entryfocus(e) {
    this.setData({
      Entryheight: e.detail.height
    });
    this.emojis.emojihide()
  },


//当失去聚焦时 调整发送栏的高度为0 
  Losefocus(e){
     this.setData({
       Entryheight:0
     })
  },


//当键盘输入时， 返回textarea上的值
  Content(e){
      let text = e.detail.value
      this.setData({
        content: text
      })
  },

//触发发送按钮
  send(res){
    let _that= this
    wx.checkSession({
      success(res){
        let openid = wx.getStorageSync('openid'), //本地存储取出openid
            content=_that.data.content, //获取输入的文本
            filePath = _that.data.tempFilePaths,  //上传的图片路径（数组）
            flieLenght = _that.data.tempFilePaths.length  //上传图片Url（数组）的数量
        _that.uploadimg({
          url: 'http://127.0.0.1:3000/AcceptText', 
          path: filePath,
          content: content,
          openid: openid,
          flieLenght: flieLenght
        }) //调用上传的函数
        
        console.log(content)
      },
      fail(err){
          console.log("请登录")  //Session会话过期
      }
    })
   
  },

//上传图片接口
  uploadimg(data) {
    var that = this,
      i = data.i ? data.i : 0,
      imgUrl = data.path,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0,
      openid = data.openid,
      content = data.content,
      flieLenght = data.flieLenght;

    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file',
      formData: {
        openid: openid,
        content: content,
        flieLenght: flieLenght,
        i: i,
        imgUrl: JSON.stringify(data.path)
      },

      success: (res) => {
        success++
      },

      fail: (err) => {
        fail++
      },

      complete: () => {
        i++;
        if (i == data.path.length || flieLenght == 0) {
          that.setData({
            content:"",
            tempFilePaths:""
          })
          console.log("执行完成");
        } else {
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    })

  },

// 文本输入框  内容与表情的处理
  seledEom(e){
    let content = this.data.content,
        emoji = e.detail;
    this.setData({
      content:content+emoji
    })
    console.log(e.detail)
  },
  


// 点击emojis  显示表情图库
  emojimodel(e){
    var _this = this;
    _this.emojis.emojimodel();
  },


//上传图片
  UpdaloadPic(){
    let _that=this
    wx.chooseImage({
      count:3,
      success: function(res) {
        console.log(res)
        _that.setData({
           tempFilePaths: res.tempFilePaths
         })
      },
    })
  },


//预览图片
  previewImage: function (e) {
    let callImg = this.data.tempFilePaths,   //图片的数组链接
        key = e.currentTarget.dataset.key,  //键
        currentUrl = callImg[key];   //获取当前的链接
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接  
      urls: callImg // 需要预览的图片http链接列表  
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    _this.emojis = _this.selectComponent("#emojis");
    //console.log("emojis组件实例", _this.emojis)
  },

})
