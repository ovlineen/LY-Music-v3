import { BASE_URL } from "./config";

class LYRequest {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  request(optinos) {
    const { url } = optinos;
    return new Promise((resolve, reject) => {
      wx.request({
        ...optinos,
        url: this.baseURL + url,
        success(res) {
          resolve(res.data);
        },
        fail(err) {
          reject(err);
        },
      });
    });
  }

  get(options) {
    return this.request({
      ...options,
      methon: "GET",
    });
  }

  post(options) {
    return this.request({
      ...options,
      methon: "POST",
    });
  }
}

export const lyrequest = new LYRequest(BASE_URL);
