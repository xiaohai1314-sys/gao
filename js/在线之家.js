
// 在线之家地址发布页 https://www.zxzjys.com

muban.首图2.二级.desc = '.data:eq(3)&&Text;;;.data:eq(1)&&Text;.data:eq(2)&&Text';
var rule = {
  title: '在线之家',
  模板: '首图2',
  host: 'https://www.zxzjys.com',
  hostJs: '',
  url: '/vodshow/fyclassfyfilter.html',
  filterable: 1,
  filter_url: '-{{fl.area}}-{{fl.by}}-{{fl.class}}-----fypage---{{fl.year}}',
  filter: {
    "1": [
      { "key": "class", "name": "剧情", "value": [{ "n": "全部", "v": "" }, { "n": "喜剧", "v": "喜剧" }, { "n": "爱情", "v": "爱情" }, { "n": "恐怖", "v": "恐怖" }, { "n": "动作", "v": "动作" }, { "n": "科幻", "v": "科幻" }, { "n": "剧情", "v": "剧情" }, { "n": "战争", "v": "战争" }, { "n": "警匪", "v": "警匪" }, { "n": "犯罪", "v": "犯罪" }, { "n": "动画", "v": "动画" }, { "n": "奇幻", "v": "奇幻" }, { "n": "冒险", "v": "冒险" }] },
      { "key": "area", "name": "地区", "value": [{ "n": "全部", "v": "" }, { "n": "大陆", "v": "大陆" }, { "n": "香港", "v": "香港" }, { "n": "台湾", "v": "台湾" }, { "n": "欧美", "v": "欧美" }, { "n": "韩国", "v": "韩国" }, { "n": "日本", "v": "日本" }, { "n": "泰国", "v": "泰国" }, { "n": "印度", "v": "印度" }, { "n": "俄罗斯", "v": "俄罗斯" }, { "n": "其他", "v": "其他" }] },
      { "key": "year", "name": "年份", "value": [{ "n": "全部", "v": "" }, { "n": "2023", "v": "2023" }, { "n": "2022", "v": "2022" }, { "n": "2021", "v": "2021" }, { "n": "2020", "v": "2020" }, { "n": "2019", "v": "2019" }, { "n": "2018", "v": "2018" }, { "n": "2017", "v": "2017" }, { "n": "2016", "v": "2016" }, { "n": "2015", "v": "2015" }, { "n": "2014", "v": "2014" }, { "n": "2013", "v": "2013" }, { "n": "2012", "v": "2012" }, { "n": "2011", "v": "2011" }] },
      { "key": "by", "name": "排序", "value": [{ "n": "时间", "v": "time" }, { "n": "人气", "v": "hits" }, { "n": "评分", "v": "score" }] }
    ]
  },
  tab_exclude: '夸克网盘|迅雷云盘|百度网盘',
  搜索: 'ul.stui-vodlist&&li;a&&title;.lazyload&&data-original;.pic-text&&Text;a&&href',
  图片来源: '@Referer=https://api.douban.com/@User-Agent=Mozilla/5.0%20(Windows%20NT%2010.0;%20Win64;%20x64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/113.0.0.0%20Safari/537.36',

  lazy: `js:
    var res = request(input, { headers: { "Referer": HOST, "User-Agent": PC_UA } });
    print(res);
    var json = res.match(/var player_aaaa=(.*?)</);
    if (json) {
      var html = JSON.parse(json[1]);
      var url = html.url;
      var from = html.from;
      if (html.encrypt == '1') {
        url = unescape(url);
      } else if (html.encrypt == '2') {
        url = unescape(base64Decode(url));
      }
      if (/m3u8|mp4/.test(url)) {
        input = url;
      } else if (/line3|line5/.test(from)) {
        var ifrwy = request(url, {
          headers: {
            "User-Agent": MOBILE_UA,
            "Referer": HOST,
            'Sec-Fetch-Dest': 'iframe',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-Mode': 'navigate'
          }
        });
        let code = '';
        if (/Cloud/.test(url)) {
          code = ifrwy.match(/var url = '(.*?)'/)[1].split('').reverse().join('');
        } else if (/player-v2/.test(url)) {
          code = ifrwy.match(/data":"(.*?)"/)[1].split('').reverse().join('');
        }
        let temp = '';
        for (let i = 0; i < code.length; i += 2) {
          temp += String.fromCharCode(parseInt(code[i] + code[i + 1], 16));
        }
        input = temp.substring(0, (temp.length - 7) / 2) + temp.substring((temp.length - 7) / 2 + 7);
      } else {
        input = url;
      }
    } else {
      input;
    }
  `
};
