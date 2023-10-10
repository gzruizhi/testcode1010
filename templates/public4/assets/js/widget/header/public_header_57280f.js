$(function(){
 var $icon_con = $(".tem57-header .header57 .icon");//点击小图标
    $icon_con.find(".Languag_one").click(function(e){
        $icon_con.find(".language").stop().slideToggle();
        e.stopPropagation();
    });
    $icon_con.find(".fangda").click(function(e){
        e.stopPropagation();
        $icon_con.find(".search2_form").toggle();
    });
    $icon_con.find(".search2_form").click(function(e){
        e.stopPropagation();
    });
    $icon_con.find(".search2_form .searchbox").click(function(e){
        e.stopPropagation();
        $(this).parent().css("display","none");
    });
    $icon_con.on("click",".people-login",function(e){
        e.stopPropagation();
        $icon_con.find(".person").stop().slideToggle();        
    });
    $icon_con.find(".language").click(function(e){
        e.stopPropagation();
    });
    $icon_con.find(".person").click(function(e){
        e.stopPropagation();
    });
    var nav_div_w = 0;//记录导航数量宽度
    function jisuanw57(){
        var nav_div_w2=0;
        var nav_div_h=0;
        $(".tem57-header .navigation>div").each(function(){//计算导航实际宽度
            nav_div_w2+=$(this).width();
            nav_div_w=nav_div_w2;

            nav_div_h+=$(this).height();
        }); 
        if ($(window).width()<992) {
            if (nav_div_h>400) {
                $(".tem57-header .navhidd").css("overflow-y","scroll");
            }
            else {
                $(".tem57-header .navhidd").css("overflow-y","hidden");
            }
        }
        if ($(window).width()>992) {
            var tem_header_nav = $(".tem57-header .navigation_0").parent().width() - $(".tem57-header .header57 .logo").outerWidth() - $(".tem57-header .header57 .icon").outerWidth()-50;
            $(".tem57-header .navigation_0").css("max-width",tem_header_nav);
            $(".tem57-header .navigation_0").css("width",nav_div_w);
            if (nav_div_w<=tem_header_nav) {$(".tem57-header .navigation_0 .right").css("display","none");$(".tem57-header .navhidd").css("overflow","initial")}
            else{$(".tem57-header .navhidd").css("overflow","hidden")}//判断需不需要箭头
        }
    }
    $('.tem57-header .header57 .icon .add-jia section').keyup(function() {
        jisuanw57();
    });
    jisuanw57();//打开网页的时候判断是否需要箭头
    setInterval(jisuanw57,1000); // 每秒计算

 var $navigation = $(".tem57-header .navigation .ul_xu")// 点击事件导航
    $navigation.click(function(e){
        e.stopPropagation();
        $(this).parent().find(">.ul_xu").not($(this)).find("ul").stop().slideUp();//关闭其他同级以及其子级的导航
        $(this).find(">ul").stop().slideToggle("swing",function(){
            jisuanw57(); 
        });
    });
    var bol = true;
    $(window).resize(function(){
        if ($(window).width()>992){
            $(".tem57-header .navigation_0").css("display","block");
            $(".navigation_0 .right").css("display","block");
            $(".tem57-header .navhidd").css("height","50px");
            jisuanw57();//计算导航实际宽度 判断需不需要箭头
        }else {
            $(".tem57-header .navigation_0").css("display","none");
            $(".navigation_0 .right").css("display","none");
            $(".navigation_0 .left").css("display","none");
            $(".tem57-header .navhidd").css("height","auto");
        }
        $(".tem57-header .navigation").css("left",0);
        $(".tem57-header .navigation_0 .left").css("display","none");
        $navigation.find(">ul").css("display","none");
        $icon_con.find(".language").css("display","none");
        $(".tem57-header .header57 .switch").removeClass("bg-color");
    });
    $(".tem57-header .header57 .switch").click(function(){//小屏的时候显示导航按钮
        if(!bol){return}
        bol = false;
        $(this).toggleClass("bg-color");
        if ($(".tem57-header .navigation_0").css("display")=="none") {
            $(this).css({"border-width":"0"});
                $(".tem57-header .navigation_0").css({
                    display:"block",
                    "max-width":"100%"
                });
                bol = true;
                jisuanw57();
        }else{
            $(this).css({"border-width":"1"});
            $(".tem57-header .navigation_0").animate({
                left:"-100%"
            },300,function(){
                $(".tem57-header .navigation_0").css({"display":"none","left":"0"});
                bol = true;
            });
        }
    });

    $(document).click(function(){
        $icon_con.find(".language").css("display","none");//关闭语言选择
        $navigation.find(">ul").css("display","none");//关闭导航选择
        $icon_con.find(".person").css("display","none");//关闭用户标签
        $icon_con.find(".search2_form").css("display","none");//关闭搜索
    });

    
    var navdoing = 150;//每次点击移动多少
    var navleft = 0;//记录导航位置
    $(".tem57-header .navigation_0 .left").click(function(){
        $(".tem57-header .navigation_0 .right").css("display","block");
        navleft = $(".tem57-header .navigation").position().left+navdoing;
        $(".tem57-header .navigation").css({
            left:navleft
        });
        if (navleft>=0) {
            $(".tem57-header .navigation").css({
                left:0
            });
            $(this).css("display","none");}
    });
    $(".tem57-header .navigation_0 .right").click(function(){
        $(".tem57-header .navigation_0 .left").css("display","block");
        navleft = $(".tem57-header .navigation").position().left-navdoing;
        $(".tem57-header .navigation").css({
            left:navleft
        });
        if (navleft<=$(".tem57-header .navhidd").width()-nav_div_w-100) {$(this).css("display","none");}
    });

    $(".tem57-header .navigation .ul_xu").hover(function(){//移动到导航展开
        var wid = $(window).width();
        if (wid<=992) {return}
        $(this).find(">ul").css("display","block");
     if ($(this).is(".active")) {return}
        $(this).addClass("bg-color");
    },function(){
        var wid = $(window).width();
        if (wid<=992) {return}
        $(this).find(">ul").css("display","none");
    if ($(this).is(".active")) {return}
        $(this).removeClass("bg-color");
    });
    $(".tem57-header .navigation").hover(function(){//移动到导航增加高度
        var wid = $(window).width();
        if (wid<=992) {return}
        $(".tem57-header .navhidd").css("height","600px");
    },function(){
        var wid = $(window).width();
        if (wid<=992) {return}
        $(".tem57-header .navhidd").css("height","50px");
    });

    $(window).scroll(function(){
        if ($(window).width()<=992) {
            $(".tem57-header .header57").removeClass("tem57-header-donghua");
        }else {
            var wind_top = 300;
            var winSt = $(window).scrollTop();
            if (winSt>wind_top) {
                $(".tem57-header .header57").addClass("tem57-header-donghua");
            }else {
                $(".tem57-header .header57").removeClass("tem57-header-donghua");
            }
        }
    });
    $(".tem57-header .header57").removeClass("tem57-header-donghua");
    
    /*头部搜索下拉框*/
    relate_search($('.tem57-header input[name="searchname"]'));
    
    //判断已登录--动态的内容“静态化”
    if (get_siteInfo(['member','status']) == 'OPEN') {
        $.ajax({
            url: "/member/islogin",
            type: 'GET',
            dataType: "json",
            success: function(json){
                if(json.status == 1){
                    //把已登录内容替换进来
                    $("#login-static").html("<span class='icon-people2'></span><span class='people-login'><?= $this->l('member_home'); ?></span><ul class='person'><li><a href='/member/index'>"+json.data.username+"</a></li></ul>");
                }
            }
        });
    }
});