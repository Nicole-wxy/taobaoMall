(function () {

    // var imgWidth = $('.wrapper ul li').width();
    // var nowIndex = 0;
    // var imgNum = $('.wrapper ul li').length - 1;
    // var key = false;
    // var timer = null;
    function Init(options) {
        this.parent = options.parent;
        this.images = options.images;
        this.direction = options.direction || 'next';
        this.width = options.width || $(this.parent).width();
        this.height = options.height || $(this.parent).height();
        this.autoTime = options.autoTime || 2000;
        this.nowIndex = options.nowIndex || 0;
        this.key = false;
        this.timer = null;
        this.imgNum = options.images.length;
        this.createDom();
        this.addCss();
        this.bindEvent();
        this.autoMove();
        this.changeIndex();
    }
    Init.prototype.createDom = function () {
        var imgContent = $('<ul class = "imgContent"></ul>');
        var pointer = $('<div class =  "pointer"></div>');
        for (var i = 0; i < this.imgNum; i++) {
            $('<li><img src="' + this.images[i] + '"/></li>').appendTo(imgContent);
            $('<div></div>').appendTo(pointer);
        }
        imgContent.append($('<li><img src="' + this.images[0] + '"/></li>'));
        $(this.parent).append(imgContent)
            .append($('<div class="btn left-btn">&lt</div>'))
            .append($('<div class="btn right-btn">&gt</div>'))
            .append(pointer);
    }
    Init.prototype.addCss = function () {
        $('.imgContent', this.parent).css({
            width: this.width * (this.imgNum + 1),
            fontSize: '0px',
            position: 'absolute',
            left: 0
        });
        $('.imgContent > li', this.parent).css({
            width: this.width,
            height: this.height,
            display: 'inline-block'
        });
        $('.imgContent > li > img', this.parent).css({
            width: '100 %',
            height: '100 %'
        });
        //可以用户自定义
        $('.btn',this.parent).css({
            // width: 50,
            // height: 50,
            // background:' #fff',
            // lineHeight: '50px',
            // textAlign: 'center',
            // position: 'absolute',
            // top: '50%',
            // marginTop: -25,
            // fontSize: 24,
            // cursor: 'pointer',
            // opacity: 0.5,
            // display: 'none',
            position: 'absolute',
            top: '50%',
            marginTop: -20,
            width: 25,
            height: 30,
            color: '#fff',
            backgroundColor: '#000',
            textAlign: 'center',
            fontSize: 18,
            lineHeight: '30px',
            opacity: 0.3,
            cursor: 'pointer',
            display: 'none'
        });
        $('.btn.left-btn',this.parent).css({
            // left:0
            borderTopRightRadius: 15,
	        borderBottomRightRadius: 15,
	        backgroundClip: 'padding-box',
	        left: -14,
	        marginLeft: 8
        });
        $('.btn.right-btn',this.parent).css({
            // 
            borderTopLeftRadius: 15,
	        borderBottomLeftRadius: 15,
	        backgroundClip: 'padding-box',
	        right: -14,
	        marginRight: 8      
        });
        $('.pointer',this.parent).css({
            // width: '100%',
            // position: 'absolute',
            // bottom: '10px',
            // textAlign: 'center'
            position: 'absolute',
            top: 0,
            height: 3,
            lineHeight: '0px',
            width: 520,
            fontSize: 0
        });
        $('.pointer > div',this.parent).css({
            // display: 'inline-block',
            // width: 6,
            // height: 6,
            // margin: '0 5px',
            // borderRadius: '50%',
            // background: '#fff',
            // cursor: 'pointer'
            display: 'inline-block',
            width: 86.6,
            height: 3,
            background:' #ff1648',
            overflow: 'hidden',
            margin: 0,
            lineHeight: 0,
            fontSize: 0,
            cursor: 'pointer'
        })
    }
    Init.prototype.bindEvent = function () {
        var self = this;
        $(this.parent).hover(function () {
            $('.btn',self.parent).fadeIn();
            clearInterval(self.timer);
        }, function () {
            $('.btn',self.parent).fadeOut();
            self.autoMove();
        });
        $(this.parent).on('click', '.btn', function (e) {
            if ($(this).hasClass('left-btn')) {
                self.move('prev');
            } else if ($(this).hasClass('right-btn')) {
                self.move('next');
            }
        });
        $('.pointer',self.parent).on('click', 'div', function (e) {
            // console.log($(this).index());
            self.move($(this).index());
        });
    }
    Init.prototype.move = function (dir) {
        if (this.key) {
            return false;
        }
        this.key = true;
        var self = this;
        if (dir == 'prev') {
            if (this.nowIndex == 0) {
                this.nowIndex = this.imgNum;
                $('ul',this.parent).css('left', -this.nowIndex * this.width);
            }
            this.nowIndex--;
            self.changeIndex();
            $('ul',this.parent).animate({
                'left': -this.nowIndex * this.width
            }, 1000, function () {
                self.key = false;
            });
        } else if (dir == 'next') {
            if (this.nowIndex == this.imgNum) {
                this.nowIndex = 0;
                $('ul',this.parent).css('left', -this.nowIndex * this.width);
            }
            this.nowIndex++;
            self.changeIndex();
            $('ul',this.parent).animate({
                'left': -this.nowIndex * this.width
            }, 1000, function () {
                self.key = false;
            });
        } else if (typeof dir == 'number') {
            this.nowIndex = dir;
            self.changeIndex();
            $('.wrapper ul.imgContent').animate({
                'left': -this.nowIndex * this.width
            }, 1000, function () {
                self.key = false;
            });
        }
    }
    Init.prototype.changeIndex = function () {
        $('.pointer  div',this.parent).css('background', '#ff1648');
        if (this.nowIndex == this.imgNum) {
            $('.pointer  div',this.parent).eq(0).css('background', '#000');
            $(this.parent).prev().children().eq(2).children().text(1).css({
                fontStyle: 'normal',
                color: '#ff1648'
            });
        } else {
            $('.pointer div',this.parent).eq(this.nowIndex).css('background', '#000');
            $(this.parent).prev().children().eq(2).children().text(this.nowIndex+1).css({
                fontStyle: 'normal',
                color: '#ff1648'
            });
        }
    }
    Init.prototype.autoMove = function () {
        var self = this;
        this.timer = setInterval(function () {
            self.move('next');
        }, this.autoTime);
    }

    $.fn.extend({
        swiper: function (options) {
            options.parent = this;
            new Init(options);
        }
    });
}());