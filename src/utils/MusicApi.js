export default {
  /**
   * 获取歌词并解析
   * @param _this
   * @param id
   * @returns {Promise<[]>}
   */
  async getLyricById(_this, id) {
    let data = await _this.$request({
      url: "/lyric?id=" + id,
      method: 'get'
    })
    let lyrics = data.lrc.lyric;
    // 对获取到的歌词进行处理
    let arr = lyrics.split("\n");
    let array = [];
    // let obj = {};
    let time = "";
    let value = "";
    let result = [];

    //去除空行
    arr.forEach((item) => {
      if (item !== "") {
        array.push(item);
      }
    });
    arr = array;
    arr.forEach((item) => {
      time = item.split("]")[0];
      value = item.split("]")[1];
      //去掉时间里的中括号得到xx:xx.xx
      var t = time.slice(1).split(":");
      //将结果压入最终数组
      result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
    });
    return result;
  },

  /**
   * 获取歌曲播放url
   * @param _this
   * @param id
   * @returns {Promise<[]>}
   */
  async getMusicUrlById(_this, id) {
    // let data = await _this.$request({
    //   url: "/song/url?id=" + id,
    //   method: 'get'
    // })
    let data = null;
    let response = null;
    switch (String(id)) {
      case "108914":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E6%B1%9F%E5%8D%97%20%E6%9E%97%E4%BF%8A%E6%9D%B0.flac";
        break;
      case "1877526024":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E5%BF%99%E3%81%97%E3%81%84%E7%94%9F%E6%B4%BB%E3%80%8C%E4%BA%BA%E5%B1%B1%E4%BA%BA%E6%B5%B7%E3%80%8D%E6%97%B6%E7%A9%BA%E5%82%A8%E8%93%84%E7%BD%90.flac";
        break;
      case "5249178":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E5%90%BB%E5%BE%97%E5%A4%AA%E9%80%BC%E7%9C%9F%20%E5%BC%A0%E6%95%AC%E8%BD%A9.flac";
        break;
      case "287719":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E5%BC%80%E5%A7%8B%E6%87%82%E4%BA%86%20%E5%AD%99%E7%87%95%E5%A7%BF.flac";
        break;
      case "187797":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E9%A3%8E%E9%9B%A8%E6%97%A0%E9%98%BB%20%E5%91%A8%E5%8D%8E%E5%81%A5.flac";
        break;
      case "2025530716":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E6%9C%80%E4%BD%B3%E7%9B%9F%E5%8F%8B%20%E9%AD%8F%E5%90%8C%E5%AD%A6%26%E7%AD%94%E8%BE%A3TaRa%26%E6%98%AF%E4%BB%80%E4%B9%88%E5%9B%A2.flac";
        break;
      case "156374":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E7%AA%81%E7%84%B6%E7%9A%84%E8%87%AA%E6%88%91%20%E4%BC%8D%E4%BD%B0%20%26%20China%20Blue.flac";
        break;
      case "108886":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E4%B8%80%E5%8D%83%E5%B9%B4%E4%BB%A5%E5%90%8E%20%E6%9E%97%E4%BF%8A%E6%9D%B0.flac";
        break;
      case "385781":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E7%AA%81%E7%84%B6%E5%A5%BD%E6%83%B3%E4%BD%A0%20%E4%BA%94%E6%9C%88%E5%A4%A9.flac";
        break;
      case "63876":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E7%A6%BB%E4%B8%8D%E5%BC%80%E4%BD%A0%20%E9%99%88%E5%B0%8F%E6%98%A5.flac";
        break;
      case "85491":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E7%AB%A5%E8%AF%9D%20%E5%85%89%E8%89%AF.flac";
        break;
      case "185937":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E7%88%B1%E7%9A%84%E5%88%9D%E4%BD%93%E9%AA%8C%20%E5%BC%A0%E9%9C%87%E5%B2%B3.flac";
        break;
      case "110207":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E8%92%99%E5%A8%9C%E4%B8%BD%E8%8E%8E%E7%9A%84%E7%9C%BC%E6%B3%AA%20%E6%9E%97%E5%BF%97%E7%82%AB.flac";
        break;
      case "307478":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E5%90%BB%20%E8%90%A7%E4%BA%9A%E8%BD%A9.flac";
        break;
      case "94646":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E5%B0%8F%E8%96%87%20%E9%BB%84%E5%93%81%E6%BA%90.flac";
        break;
      case "60274":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E6%92%95%E5%A4%9C%20%E9%98%BF%E6%9D%9C.flac";
        break;
      case "112908":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E6%9D%A5%E7%94%9F%E7%BC%98%20%E5%88%98%E5%BE%B7%E5%8D%8E.flac";
        break;
      case "255907":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E8%83%86%E5%B0%8F%E9%AC%BC%20%E6%A2%81%E5%92%8F%E7%90%AA.flac";
        break;
      case "85621":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E7%AC%AC%E4%B8%80%E6%AC%A1%20%E5%85%89%E8%89%AF.flac";
        break;
      case "254485":
        data = "http://rsohtkfim.hn-bkt.clouddn.com/%E6%A2%81%E9%9D%99%E8%8C%B9%20-%20%E5%8B%87%E6%B0%94.flac";
        break;
      default:
        // TODO 需要做容错处理以及收费歌曲、没版权歌曲
        response = await _this.$request({
          url: "/song/url?id=" + id,
          method: 'get'
        });
        data = response.data[0].url + "?refreshID=" + new Date().getTime();
        break
    }
    return data;
  },

  /**
   * 搜素（暂时只搜索歌曲）
   * @param _this
   * @param keywords 关键字
   * @returns {Promise<[]>}
   */
  async cloudSearch(_this, keywords) {
    let data = await _this.$request({
      url: "/cloudsearch?keywords=" + keywords + "&limit=50",
      method: 'get'
    })
    let searchResult = data.result.songs;
    return searchResult;
  }
}

