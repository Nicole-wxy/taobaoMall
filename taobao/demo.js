
var obj = {
    init: function () {
        this.value = $('.search-inp').find('input').val();
        this.getData();
    },
    getData: function () {
        var self = this;
        $('.search-inp').search({
            type: 'GET',
            url: 'https://suggest.taobao.com/sug',
            data: 'q=',
            count: '&count=7',
            dataType: 'jsonp',
            sucFn: self.addItem,
            text: '网红毛衣开衫外套加厚'
        });
    },
    addItem: function (data) {
        this.value = $('.search-inp').find('input').val();
        $('.btn input').attr('onclick','location="https://s.taobao.com/search?q='+ this.value + '"');
        console.log(data)
        var self = this;
        var dataList = data.result;
        var $searchList = $('.search-list');
        var str = '';
        $('.search-list > li').remove();
        if (dataList.length > 0) {
            dataList.forEach(function (ele, index) {  
                str += '<li>\
                            <a href="https://s.taobao.com/search?q='+ ele[0]+ '">\
                                <div>\
                                    <p>'+ ele[0]+ '</p>\
                                </div>\
                            </a>\
                        </li>';
            });
            $searchList.html($(str));
        }
    },

    // getImage: function (url){
    //     // 把现在的图片连接传进来，返回一个不受限制的路径
    //     if (url !== undefined) {
    //         // https://images.weserv.nl/?url=
    //         // https://                      img3.doubanio.com/view/subject/s/public/s3924386.jpg
    //         // https://images.weserv.nl/?url=img3.doubanio.com/view/subject/s/public/s3924386.jpg
    //         // return url.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
    //         var reg = /https:\/\//g;
    //         return url.replace(reg,'https://images.weserv.nl/?url=')
    //     }
    // }

}

obj.init();



// $('#inputWrap').search({
//     type: 'GET',
//     url: 'https://api.douban.com/v2/music/search',
//     data: 'q=',
//     count: '&count=7',
//     dataType: 'jsonp',
//     sucFn: addItem,
//     text: '唱片名、表演者、条码'
// })
// function addItem(data) {
//     console.log(data);
// }


