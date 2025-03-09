var rule = {
    title:'TG搜',
    host:'https://t.me',
    url:'/s/fyclass',
    searchUrl:'/',
    searchable:2,
    quickSearch:0,
    filterable:0,
    headers:{
        'User-Agent':'MOBILE_UA'
    },
    timeout:5000,
    class_name:'全部&tgsearchers&guaguale115&Channel_Shares_115&vip115hot&Quark_Movies&ucquark&ucpanpan&ydypzyfx&clouddriveresources&NewQuark&dianyingshare&XiangxiuNB&yunpanpan&kuakeyun&zaihuayun&yunpanshare&shareAliyun&alyp_1&quanziyuanshe&alyp_TV&alyp_4K_Movies&ucwangpan&yydf_hzl&Aliyun_4K_Movies&Oscar_4Kmovies&panhuohuo&leoziyuan&hao115&alyp_JLP&alyp_Animation&SharePanFilms&kduanju&share925173&MCPH860&longzbija&djfxkk&MCPH01&Resourcesharing&baicaoZY&MCPH608&MCPH086',
    class_url:'^all^&tgsearchers&guaguale115&Channel_Shares_115&vip115hot&Quark_Movies&ucquark&ucpanpan&ydypzyfx&clouddriveresources&NewQuark&dianyingshare&XiangxiuNB&yunpanpan&kuakeyun&zaihuayun&yunpanshare&shareAliyun&alyp_1&quanziyuanshe&alyp_TV&alyp_4K_Movies&ucwangpan&yydf_hzl&Aliyun_4K_Movies&Oscar_4Kmovies&panhuohuo&leoziyuan&hao115&alyp_JLP&alyp_Animation&SharePanFilms&kduanju&share925173&MCPH860&longzbija&djfxkk&MCPH01&Resourcesharing&baicaoZY&MCPH608&MCPH086',
    play_parse:true,
    lazy:`js:
    input = panPlay(input,playObj.flag)
    `,
    limit:6,
    推荐:`js:
        let d = [];
        pdfh = jsp.pdfh;
        pdfa = jsp.pdfa;
        pd = jsp.pd;
        var c = rule.params;
        var myUrl = input + '/s/' + c;
        let html = request(myUrl);
        let list = pdfa(html, 'div.tgme_widget_message_bubble');
        
        list.reverse().forEach(it => {
            let text = pdfh(it, '.tgme_widget_message_text&&Html');
            let textArray = [];
            try {
                textArray = text.split('<br>');
                textArray = textArray.filter(item => item.trim());
                textArray = textArray.map(item => item.replace(/<[^>]+>/g, ""));
            }catch(e){
                console.log('提取图片错误:', e.message);
            }

            let title = '';
            let desc = '';
            let content = '';
            
            try {
                textArray.forEach(item => {
                    let match = item.match(/^(.*?)[:：]\s*(.*)/);
                    if (match) {
                        let field = match[1].trim(); // 字段名
                        var value = match[2].trim(); // 字段值
                        value = value.replace(/<[^>]+>/g, '');
                        // 判断字段名并赋值
                        if (field.includes('名') || field.includes('标题')) {
                            title = value; // 赋值 title
                        } else if (field.includes('简介') || field.includes('描述')) {
                            content = value; // 赋值 content
                        } else if (field.includes('时间') || field.includes('标签') || field.includes('评分')) {
                            desc = value; // 赋值 desc
                        }
                    }
                });
                if (!title && textArray.length > 0) {
                    let firstNonLink = textArray.find(item => !/^http/.test(item));
                    if (firstNonLink) {
                        title = firstNonLink.trim();
                    } else {
                        title = textArray[0].trim();
                    }
                }
                var myTitle = title.replace(/\s*[\(（\[【].*$/, "").trim();
                if (myTitle.length > 0) {
                    title = myTitle;
                }
                // 提取图片 - 直接使用style的值作为图片url
                let img = '';
                try{
                    img = pdfh(it, '.tgme_widget_message_photo_wrap&&style').trim();
                    // 如果获取到的是带引号的字符串，去掉引号
                    if(img.startsWith("'") && img.endsWith("'")){
                        img = img.slice(1,-1);
                    }
                }catch(e){
                    console.log('提取图片错误:', e.message);
                }
                
                // 修改链接提取部分
                let url = '';
                try {
                    // 获取所有链接
                    let links = pdfa(it, '.js-message_text a');
                    let urls = [];
                    // 遍历所有链接元素
                    links.forEach(link => {
                        let href = pd(link, 'a&&href', HOST);
                        if(href.includes('115.com') || href.includes('anxia.com') || href.includes('115cdn.com')) {
                            href = href.split('#')[0];
                        }
                        if(href && isNetPan(href)) urls.push(href);
                    });
                    // 用逗号连接所有链接
                    url = urls.join(',');
                } catch(e) {
                    log('提取链接错误:' + e.message);
                }
                
                // 如果有链接才添加到结果中
                if(url){
                    d.push({
                        title: title,
                        desc: desc,
                        content: content,
                        pic_url: img,
                        url: url
                    });
                }
            } catch(e) {
                log('处理消息出错:'+e.message);
            }
        });
        setResult(d);
    `,
    double:false,
    一级:`js:
        let d = [];
        pdfh = jsp.pdfh;
        pdfa = jsp.pdfa;
        pd = jsp.pd;
        // var aurl = input + rule.params;
        var aurl = input.replace('^all^', rule.params);
        let before = _sparams[MY_PAGE];
        if (before){
            aurl = aurl + '?before=' + before;
        }
        let html = request(aurl);
        let list = pdfa(html, 'div.tgme_widget_message_bubble');
        try {
            let lastMsg = list[0];
            let dateLink = pdfh(lastMsg, '.tgme_widget_message_date&&href');
            let lastId = dateLink.split('/').pop();
            _sparams[MY_PAGE+1] = lastId;
        } catch(e) {
            log('获取失败' + e.message);
        }
        list.reverse().forEach(it => {
            let text = pdfh(it, '.tgme_widget_message_text&&Html');
            let textArray = [];
            try {
                textArray = text.split('<br>');
                textArray = textArray.filter(item => item.trim());
                textArray = textArray.map(item => item.replace(/<[^>]+>/g, ""));
            }catch(e){
                console.log('提取图片错误:', e.message);
            }

            let title = '';
            let desc = '';
            let content = '';
            
            try {
                textArray.forEach(item => {
                    let match = item.match(/^(.*?)[:：]\s*(.*)/);
                    if (match) {
                        let field = match[1].trim(); // 字段名
                        var value = match[2].trim(); // 字段值
                        value = value.replace(/<[^>]+>/g, '');
                        // 判断字段名并赋值
                        if (field.includes('名') || field.includes('标题')) {
                            title = value; // 赋值 title
                        } else if (field.includes('简介') || field.includes('描述')) {
                            content = value; // 赋值 content
                        } else if (field.includes('时间') || field.includes('标签') || field.includes('评分')) {
                            desc = value; // 赋值 desc
                        }
                    }
                });
                if (!title && textArray.length > 0) {
                    let firstNonLink = textArray.find(item => !/^http/.test(item));
                    if (firstNonLink) {
                        title = firstNonLink.trim();
                    } else {
                        title = textArray[0].trim();
                    }
                }
                var myTitle = title.replace(/\s*[\(（\[【].*$/, "").trim();
                if (myTitle.length > 0) {
                    title = myTitle;
                }
                // 提取图片 - 直接使用style的值作为图片url
                let img = '';
                try{
                    img = pdfh(it, '.tgme_widget_message_photo_wrap&&style').trim();
                    // 如果获取到的是带引号的字符串，去掉引号
                    if(img.startsWith("'") && img.endsWith("'")){
                        img = img.slice(1,-1);
                    }
                }catch(e){
                    console.log('提取图片错误:', e.message);
                }
                
                // 修改链接提取部分
                let url = '';
                try {
                    // 获取所有链接
                    let links = pdfa(it, '.js-message_text a');
                    let urls = [];
                    // 遍历所有链接元素
                    links.forEach(link => {
                        let href = pd(link, 'a&&href', HOST);
                        if(href.includes('115.com') || href.includes('anxia.com') || href.includes('115cdn.com')) {
                            href = href.split('#')[0];
                        }
                        if(href && isNetPan(href)) urls.push(href);
                    });
                    // 用逗号连接所有链接
                    url = urls.join(',');
                } catch(e) {
                    log('提取链接错误:' + e.message);
                }
                
                // 如果有链接才添加到结果中
                if(url){
                    d.push({
                        title: title,
                        desc: desc,
                        content: content,
                        pic_url: img,
                        url: url
                    });
                }
            } catch(e) {
                log('处理消息出错:'+e.message);
            }
        });
        setResult(d);
    `,
    二级:`js:
        let id=input;
        let urls = input.split(','); // 拆分多个URL
        let title="";
        let pic="";
        let typeName="";
        let dec="";
        let remark="";
        let vod={vod_id:id,vod_name:title,vod_pic:pic,type_name:typeName,vod_remarks:remark,vod_content:dec};
        
        initPan();
        let panVod = panDetailContent(vod ,urls);
        TABS = panVod.tabs
        LISTS = panVod.lists
        detailError = panVod.error
        vod["vod_play_from"]=panVod.tabs.join("$$$");

        for (var i in LISTS) {
            if (LISTS.hasOwnProperty(i)) {
              // print(i);
              try {
                LISTS[i] = LISTS[i].map(function (it) {
                  return it.split('$').slice(0, 2).join('$');
                });
              } catch (e) {
                print('格式化LISTS发生错误:' + e.message);
              }
            }
        }
        vod_play_url = LISTS.map(function (it) {
            return it.join('#');
        }).join("$$$");
        vod["vod_play_url"]=vod_play_url;
        VOD=vod;
    `,
    搜索:`js:
        let d = [];
        pdfh = jsp.pdfh;
        pdfa = jsp.pdfa;
        pd = jsp.pd;
        var aurl = input + 's/' + rule.params + '?q=' + KEY;
        let html = request(aurl);
        let list = pdfa(html, 'div.tgme_widget_message_bubble');
        
        list.reverse().forEach(it => {
            let text = pdfh(it, '.tgme_widget_message_text&&Html');
            let textArray = [];
            try {
                textArray = text.split('<br>');
                textArray = textArray.filter(item => item.trim());
                textArray = textArray.map(item => item.replace(/<[^>]+>/g, ""));
            }catch(e){
                console.log('提取图片错误:', e.message);
            }

            let title = '';
            let desc = '';
            let content = '';
            
            try {
                textArray.forEach(item => {
                    let match = item.match(/^(.*?)[:：]\s*(.*)/);
                    if (match) {
                        let field = match[1].trim(); // 字段名
                        var value = match[2].trim(); // 字段值
                        value = value.replace(/<[^>]+>/g, '');
                        // 判断字段名并赋值
                        if (field.includes('名') || field.includes('标题')) {
                            title = value; // 赋值 title
                        } else if (field.includes('简介') || field.includes('描述')) {
                            content = value; // 赋值 content
                        } else if (field.includes('时间') || field.includes('标签') || field.includes('评分')) {
                            desc = value; // 赋值 desc
                        }
                    }
                });
                if (!title && textArray.length > 0) {
                    let firstNonLink = textArray.find(item => !/^http/.test(item));
                    if (firstNonLink) {
                        title = firstNonLink.trim();
                    } else {
                        title = textArray[0].trim();
                    }
                }
                var myTitle = title.replace(/\s*[\(（\[【].*$/, "").trim();
                if (myTitle.length > 0) {
                    title = myTitle;
                }
                // 提取图片 - 直接使用style的值作为图片url
                let img = '';
                try{
                    img = pdfh(it, '.tgme_widget_message_photo_wrap&&style').trim();
                    // 如果获取到的是带引号的字符串，去掉引号
                    if(img.startsWith("'") && img.endsWith("'")){
                        img = img.slice(1,-1);
                    }
                }catch(e){
                    console.log('提取图片错误:', e.message);
                }
                
                // 修改链接提取部分
                let url = '';
                try {
                    // 获取所有链接
                    let links = pdfa(it, '.js-message_text a');
                    let urls = [];
                    // 遍历所有链接元素
                    links.forEach(link => {
                        let href = pd(link, 'a&&href', HOST);
                        if(href.includes('115.com') || href.includes('anxia.com') || href.includes('115cdn.com')) {
                            href = href.split('#')[0];
                        }
                        if(href && isNetPan(href)) urls.push(href);
                    });
                    // 用逗号连接所有链接
                    url = urls.join(',');
                } catch(e) {
                    log('提取链接错误:' + e.message);
                }
                
                // 如果有链接才添加到结果中
                if(url){
                    d.push({
                        title: title,
                        desc: desc,
                        content: content,
                        pic_url: img,
                        url: url
                    });
                }
            } catch(e) {
                log('处理消息出错:'+e.message);
            }
        });
        setResult(d);
    `,
}
