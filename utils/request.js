export default function request(params) {
  //1.返回promise便于链式调用
  return new Promise((resolve, reject) => {
    //2.设定基础url
    const baseURL = "http://152.136.185.210:8000/api/h8";
    let url = baseURL + params.url
    //3.调用网络请求API
    wx.request({
      url: url,
      method: params.method || "get",
      data: params.data || {},
      success: resolve,
      fail: reject
    })
  })
}