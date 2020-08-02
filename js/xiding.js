require(['config'],function(){
require(['jquery','common'],function($){
    
    var box2=$("#Header .box2");
    var box1=$("#Header .box1");
    var box4=$("#Header .box4");
    var qiangou=$("#Header .qiangou");
    var zuolan=$(".zuolan");
    var you=$("#Header .box2 .you");
    var jy=$("#Header .box2 .jy");
    // var box1top=box1[0].offsetHeight;
    // var touHeight=$("#Header")[0].offsetHeight+44;console.log(touHeight)
    xd();
    function xd(){
        var scrollTop = window.scrollY;
        // 吸顶菜单
        if(scrollTop >= 30){
            box2.addClass("t_xiding");
            box2[0].style.height="50px";
            box2[0].style.padding="8px";
            you[0].style.display="none";
            jy[0].style.display="none";
        }else{
            box2.removeClass("t_xiding");
            you[0].style.display="block";
            jy[0].style.display="block";
            box2[0].style.height="";
            box2[0].style.padding="";
        };
        if(scrollTop >= 216){
            // qiangou.addClass("xiding");
            // zuolan.addClass("xiding");
            qiangou.css({position:"fixed",top:"80px",zIndex:1000});
            zuolan.css({position:"fixed",top:"80px",zIndex:1000});
        }else{
            // qiangou.removeClass("xiding");
            // zuolan.removeClass("xiding");
            qiangou.css({position:"",top:"",zIndex:""});
            zuolan.css({position:"",top:"",zIndex:""});
        }
    }
    window.onscroll = function(){
        xd();
    }
});
});