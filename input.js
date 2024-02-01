(function ($) {
    // console.log('input')
    var obj = {
        init: function (options) {
            this.opt = options || {};
            this.createDom();
            this.bindEvent();
        },
        createDom: function () {
            var htmlStr = ' <div class="inp">\
            <input type="text" class="text" placeholder="">\
            </div>';
            this.opt.father.html(htmlStr);
            $('.inp input').attr('placeholder', this.opt.text);
        },
        bindEvent: function () {
            var self = this;
            $('.inp input').on('input', function (e) {
                // e.preventDefault();
                // console.log(e.preventDefault());
                var value = $(this).val();
                self.getData(value);
            });
            $('.inp input').on('keydown', function (e) {
                // var val = $(this).val();
                if (e.keyCode === 13) {
                    $('.btn input').trigger('click');
                }
            });
            $('.btn input').on('click', function (e) {
                var val = $('.inp input').val();
                    self.getData(val);
            });
        },
        getData: function (val) {
            var self = this;
            var opt = self.opt;
            // console.log(val)
            $.ajax({
                type: opt.type,
                url: opt.url,
                // data: 'q=' + value + '&count=7',
                data: opt.data + val + opt.count + '&code=utf-8',
                dataType: opt.dataType,
                success: function (data) {
                    opt.sucFn(data);
                },
            });
        },

    }
    $.fn.extend({
        search: function (options) {
            options.father = this || $('body');
            obj.init(options);
        }
    })
})(jQuery)
