// pages/home/home.js

import {
  GetMuilidata,
  GetHomeGoods
} from "../../api/home.js"
const TOP_DISTANCE = 2000
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    recommendList: [],
    tabList: ["流行", "新款", "精选"],
    currentIndex: 0,
    currentType: "pop",
    goods: {
      pop: {
        page: 0,
        list: []
      },
      new: {
        page: 0,
        list: []
      },
      sell: {
        page: 0,
        list: []
      }
    },
    isShowBackTop: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMuilidata()
    this.getHomeGoods("pop")
    this.getHomeGoods("new")
    this.getHomeGoods("sell")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getHomeGoods(this.data.currentType)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //监听页面滚动
  onPageScroll(options) {
    const scrollTop = options.scrollTop
    const flag = scrollTop >= TOP_DISTANCE
    //防止频繁使用setDate函数更新页面
    if (flag !== this.data.isShowBackTop) {
      this.setData({
        isShowBackTop: scrollTop >= TOP_DISTANCE
      })
    }
  },
  //-------------------------网络请求函数---------------------------
  getMuilidata() {
    //1.发送网络请求，接受轮播图等数据
    GetMuilidata()
      .then((response) => {
        //请求的数据保存到页面实例data中
        this.setData({
          swiperList: response.data.data.banner.list,
          recommendList: response.data.data.recommend.list
        })
      })
  },
  getHomeGoods(type) {
    //2.发送网络请求，请求商品列表数据
    //请求下一页数据
    let page = this.data.goods[type].page + 1
    GetHomeGoods(type, page).then((res) => {
      const tempList = this.data.goods[type].list
      tempList.push(...res.data.data.list)
      let list_key = `goods.${type}.list`
      let page_key = `goods.${type}.page`
      this.setData({
        [list_key]: tempList,
        [page_key]: page
      })
    })
  },
  //-------------------------事件监听函数---------------------------
  handleTabClick(event) {
    let type = ["pop", "new", "sell"]
    this.setData({
      currentIndex: event.detail.index,
      currentType: type[event.detail.index]
    })
  }
})