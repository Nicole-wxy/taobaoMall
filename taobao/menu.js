$(function () {

    // console.log($($('#item1')).offset().top - 70);

    // console.log($($('#item2')).offset().top - 70);

    // console.log($($('#item3')).offset().top - 70);

    // console.log($($('#item4')).offset().top - 70);

    // console.log($($('#item5')).offset().top - 70);
// //-70
// menu.js:7 2072
// menu.js:9 2920
// menu.js:11 3698
// menu.js:13 4931
// //


    var subNav_active = $(".on");

    var subNav_scroll = function (target) {

        subNav_active.removeClass("on");

        target.addClass('on');

        subNav_active = target;

    };


    $(".fixedtool a").click = function () {

        subNav_scroll($(this));

        var target = $(this).attr("href");

        var targetScroll = $(target).offset().top - 70;

        $("html,body").animate({ scrollTop: targetScroll }, 300);

    };

    //页面跳转时定位

    if (window.location.hash) {

        var targetScroll = $(window.location.hash).offset().top - 70;

        $("html,body").animate({ scrollTop: targetScroll }, 300)

    }

    //页面滚动时定位

    $(window).scroll(function () {

        var targetTop = $(this).scrollTop();



        if (targetTop >= 296) {

            $(".fixedtool").css({
                top:'75px'
            });

        } else {

            $(".fixedtool").css({
                top:'478px'
            });
        }

        if (targetTop <2062) {

            subNav_scroll($(".fixedtool-1"));

        } else if (targetTop >2072 && targetTop < 2920) {

            subNav_scroll($(".fixedtool-3"));

        } else if (targetTop > 2920 && targetTop < 3698) {

            subNav_scroll($(".fixedtool-4"));

        } else if (targetTop > 3698 && targetTop < 4931) {

            subNav_scroll($(".fixedtool-5"));

        } else if (targetTop > 4931) {

            subNav_scroll($(".fixedtool-6"));

        }

    });

}());
