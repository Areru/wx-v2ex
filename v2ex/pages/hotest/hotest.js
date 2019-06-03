import { getHotestInfo } from '../../utils/api.js';

Page({
  data: {
    title: "最热话题",
    latest: [],
    hidden: false
  },
  fetchData(cb) {
    var that = this;
    that.setData({
      hidden: false
    })
    wx.request({
      url: getHotestInfo({ page: 1 }),
      success(res) {
        that.setData({
          latest: res.data
        })
        setTimeout(() => {
          that.setData({ hidden: true })
          cb();
        }, 300)
      }
    })
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: "热门话题"
    });
    this.fetchData(() => (console.log()));
  },
  onPullDownRefresh() {
    this.fetchData(function () {
      wx.stopPullDownRefresh();
    });
  },
  goToDetail(event) {
    const id = event.currentTarget.id;
    const title = event.currentTarget.dataset.title;
    const url = '../detail/detail?id=' + id + '&title=' + title;
    wx.navigateTo({
      url: url,
    })
  }
})