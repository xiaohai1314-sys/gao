var rule = {
    title: '厂长资源',
    host: 'https://www.czzy77.com',
    url: '/fyclassfyfilter',
    filterable: 1,
    filter_url: '{{fl.area}}{{fl.class}}/page/fypage',
    filter: {
        "movie_bt": [
            {
                "key": "area",
                "name": "分类",
                "value": [
                    {"v": "", "n": "全部"},
                    {"v": "/movie_bt_series/zhanchangtuijian", "n": "站长推荐"},
                    {"v": "/movie_bt_series/dyy", "n": "电影"},
                    {"v": "/movie_bt_series/dianshiju", "n": "电视剧"},
                    {"v": "/movie_bt_series/dohua", "n": "动画"},
                    {"v": "/movie_bt_series/guochanju", "n": "国产剧"},
                    {"v": "/movie_bt_series/mj", "n": "美剧"},
                    {"v": "/movie_bt_series/rj", "n": "日剧"},
                    {"v": "/movie_bt_series/hj", "n": "韩剧"},
                    {"v": "/movie_bt_series/hwj", "n": "海外剧"},
                    {"v": "/movie_bt_series/huayudianying", "n": "华语电影"},
                    {"v": "/movie_bt_series/meiguodianying", "n": "欧美电影"},
                    {"v": "/movie_bt_series/ribendianying", "n": "日本电影"},
                    {"v": "/movie_bt_series/hanguodianying", "n": "韩国电影"},
                    {"v": "/movie_bt_series/yingguodianying", "n": "英国电影"},
                    {"v": "/movie_bt_series/faguodianying", "n": "法国电影"},
                    {"v": "/movie_bt_series/yindudianying", "n": "印度电影"},
                    {"v": "/movie_bt_series/eluosidianying", "n": "俄罗斯电影"},
                    {"v": "/movie_bt_series/jianadadianying", "n": "加拿大电影"},
                    {"v": "/movie_bt_series/huiyuanzhuanqu", "n": "会员专区"}
                ]
            },
            {
                "key": "class",
                "name": "类型",
                "value": [
                    {"v": "", "n": "全部"},
                    {"v": "/movie_bt_tags/chuanji", "n": "传记"},
                    {"v": "/movie_bt_tags/etet", "n": "儿童"},
                    {"v": "/movie_bt_tags/maoxian", "n": "冒险"},
                    {"v": "/movie_bt_tags/juqing", "n": "剧情"},
                    {"v": "/movie_bt_tags/dozuo", "n": "动作"},
                    {"v": "/movie_bt_tags/doman", "n": "动漫"},
                    {"v": "/movie_bt_tags/dhh", "n": "动画"},
                    {"v": "/movie_bt_tags/lishi", "n": "历史"},
                    {"v": "/movie_bt_tags/guzhuang", "n": "古装"},
                    {"v": "/movie_bt_tags/tongxing", "n": "同性"},
                    {"v": "/movie_bt_tags/xiju", "n": "喜剧"},
                    {"v": "/movie_bt_tags/qihuan", "n": "奇幻"},
                    {"v": "/movie_bt_tags/jiating", "n": "家庭"},
                    {"v": "/movie_bt_tags/kubu", "n": "恐怖"},
                    {"v": "/movie_bt_tags/xuanyi", "n": "悬疑"},
                    {"v": "/movie_bt_tags/qingse", "n": "情色"},
                    {"v": "/movie_bt_tags/kingsong", "n": "惊悚"},
                    {"v": "/movie_bt_tags/zhanzhen", "n": "战争"},
                    {"v": "/movie_bt_tags/gw", "n": "歌舞"},
                    {"v": "/movie_bt_tags/wuxia", "n": "武侠"},
                    {"v": "/movie_bt_tags/zainan", "n": "灾难"},
                    {"v": "/movie_bt_tags/aiqing", "n": "爱情"},
                    {"v": "/movie_bt_tags/fanzui", "n": "犯罪"},
                    {"v": "/movie_bt_tags/dp", "n": "短片"},
                    {"v": "/movie_bt_tags/kh", "n": "科幻"},
                    {"v": "/movie_bt_tags/jlpp", "n": "纪录片"},
                    {"v": "/movie_bt_tags/xb", "n": "西部"},
                    {"v": "/movie_bt_tags/yd", "n": "运动"},
                    {"v": "/movie_bt_tags/yy", "n": "音乐"}
                ]
            }
        ]
    },
    class_name: '全部&站长推荐&电影&电视剧&动画&国产剧&日剧&韩剧&美剧&海外剧&俄罗斯电影&加拿大电影&华语电影&印度电影&日本电影&欧美电影&法国电影&英国电影&韩国电影&纪录片',
    class_url: 'movie_bt&/movie_bt_series/zhanchangtuijian&/movie_bt_series/dyy&/movie_bt_series/dianshiju&/movie_bt_series/dohua&/movie_bt_series/guochanju&/movie_bt_series/rj&/movie_bt_series/hj&/movie_bt_series/mj&/movie_bt_series/hwj&/movie_bt_series/eluosidianying&/movie_bt_series/jianadadianying&/movie_bt_series/huayudianying&/movie_bt_series/yindudianying&/movie_bt_series/ribendianying&/movie_bt_series/meiguodianying&/movie_bt_series/faguodianying&/movie_bt_series/yingguodianying&/movie_bt_series/hanguodianying&/movie_bt_tags/jlpp',
    headers: {
        'User-Agent': 'MOBILE_UA',
        'Cookie': 'esc_search_captcha=1'
    },
    searchUrl: '/page/fypage?s=**',
    searchable: 2,
    推荐: '.bt_img;ul&&li;*;*;*;*',
    double: true,
    一级: '.bt_img&&ul&&li;h3.dytit&&Text;img.lazy&&data-original;.jidi&&Text;a&&href',
    二级: {
        "title": "h1&&Text;.moviedteail_list li&&a&&Text",
        "img": "div.dyimg img&&src",
        "desc": ".moviedteail_list li:eq(3) a&&Text;.moviedteail_list li:eq(2) a&&Text;.moviedteail_list li:eq(1) a&&Text;.moviedteail_list li:eq(7)&&Text;.moviedteail_list li:eq(5)&&Text",
        "content": ".yp_context&&Text",
        "tabs": ".mi_paly_box span",
        "lists": ".paly_list_btn:eq(#id) a"
    },
    play_parse: true,
    lazy: `js:
        var html = request(input);
        var url = pdfh(html, "iframe&&src");
        if (!url) {
            url = html.match(/<iframe[^>]+src=["']([^"']+)["']/)[1];
        }
        input = { jx: 0, url: url, parse: 0 }
    `,
    搜索: '.search_list&&ul&&li;h3&&Text;img.lazy&&data-original;.jidi&&Text;a&&href'
};
