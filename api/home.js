//导入请求方法
import request from "../utils/request.js"

export function GetMuilidata() {
  //return 将promise对象导出
  return request({
    url: "/home/multidata"
  })
}

export function GetHomeGoods(type, page) {
  return request({
    url: "/home/data",
    data: {
      type,
      page
    }
  });
}