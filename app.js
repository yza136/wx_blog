App({
  data:{
    content:"",
    tempFilePaths:"",
    url: "http://127.0.0.1:3000"
  },
  onLaunch: function(e) {
   
  },
  uploadimg(data) {
    var that = this,
        i=data.i?data.i:0,
        imgUrl = data.path,
        success=data.success?data.success:0,
        fail = data.data ? data.data:0,
        openid = data.openid,
        content = data.content,
        flieLenght = data.flieLenght;

        /*全局属性data*/
        that.data.content = content;
        that.data.tempFilePaths = imgUrl;
        /*全局属性data*/

    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file', 
      formData:{
        openid: openid,
        content: content,
        flieLenght: flieLenght,
        i:i,
        imgUrl: JSON.stringify(data.path)

      },
      success:(res)=>{
        success++

      },
      fail:(err)=>{
        fail++
      },
      complete:()=>{
        i++;
        if (i == data.path.length || flieLenght==0){
            that.data.content = ""
            that.data.tempFilePaths = ""
           console.log("执行完成");
        }else{
          
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }
     
      }
    })

  }
})