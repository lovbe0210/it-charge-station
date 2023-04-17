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
   * @returns {Promise<string>}
   */
  async getMusicUrlById(_this, id) {
    // TODO 需要做容错处理以及收费歌曲、没版权歌曲
    let response = await _this.$request({
      url: "/song/url?id=" + id,
      method: 'get'
    });
    let data = response.data[0].url + "?refreshID=" + new Date().getTime();
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
    if (data.result === undefined || data.result === null || data.result.songs === undefined) {
      return [];
    }
    let searchResult = data.result.songs;
    return searchResult;
  }
}

