import { getTopicInfo } from '../../utils/api.js';

Page({
  data: {
    title: '分类',
    topics: [],
    hidden: false
  },
  goToDetail(event) {
    const id = event.currentTarget.id;
    const title = event.currentTarget.dataset.title;
    const url = '../detail/detail?id=' + id + '&title=' + title;
    wx.navigateTo({
      url: url,
    })
  },
  fetchData(id) {
    const that = this;
    wx.request({
      url: getTopicInfo({node_id: id}),
      success(res) {
        that.setData({
          topics: res.data
        })
        setTimeout(() => {
          that.setData({ hidden: true });
        }, 300)
      }
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    });
    this.fetchData(options.id);
  },
})