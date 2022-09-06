import axios from "axios";
export default {

  // 通过接口获取数据
  apiPost: function (url, method, data, params, callback) {
    //线上
    var baseURL = 'http://king.rong298.cn'
    //本地-韦家园域名
     //var baseURL = 'http://www.dai3h.io'
    //本地
    // var baseURL = 'http://192.168.1.17:81'
    axios.request({
      method: method || 'post',
      url: baseURL + url,
      data: data,
      params: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      timeout: 10000,
    }).then(response => {
      switch (response.data.code) {
        case 0:
          callback(true, response.data.code, response.data);
          break;
        case 401:
          callback(false, response.data.code, response.data)
          window.sessionStorage.setItem('isLogin', 'false');
          break;
        default:
          callback(false, response.data.code, response.data)
      }
    })
      .catch((error) => {
        console.log(error)
      })
  },
  //导出数据API
  export(data) {
    window.open(
      "http://king.rong298.cn/order/export" + data
      //"http://192.168.1.17:81/order/export" + data
    );
  }

}