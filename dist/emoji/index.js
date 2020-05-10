// dist/emoji/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      isShow:false,
      emojis:[
       "😀","😁","😂","😃","😄","😅","😆","😉","😊","😋","😍","😘","😗","😙","😚", "☺","😇","😐","😑","😶","😏","😣","😥","😮","😯","😪","😫","😴","😌","😛", "😜","😝","😒","😓","😔","😕","😲","😷","😖","😞","😟","😤","😢","😭","😦","😧","😨","😬","😰","😱","😳","😵","😡","😠","😈","👿","👹","👺","💀","☠","👻","👽"
      ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ClickEmoji(e){
      let EmojiKey = e.currentTarget.dataset.key,
          emoji=this.data.emojis[EmojiKey];
      this.triggerEvent("seledEom", emoji)
    },

    emojimodel() {
      this.setData({ isShow: !this.data.isShow })
    },

    emojihide(){
      this.setData({ isShow: false })
    }
  }
})
