require(['config'],function(){
require(['jquery','common','xiding','fdj','xiangqingye'],function($){
    $('#Header').load('../html/header.html');
    $('#Footer').load('../html/footer.html');

    //用放大镜
    var magnifierConfig = {
        magnifier : "#magnifier1",//最外层的大容器
        width : 400,//承载容器宽
        height : 400,//承载容器高
        moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
        zoom : 2//缩放比例
    };

    var _magnifier = magnifier(magnifierConfig);

    var data=(function(){
        var jieshou;
        $.ajax({
            url:"../api/j_nashuju.php",
            async:false,
            success:function(data){
                jieshou=JSON.parse(data);
            }
        });
        return jieshou;
    })();

    var tuijian=$(".tuijian");
    var kykul=$(".kykul");
    tuijian.html("");
    kykul.html("");
    for(var j=0;j<6;j++){
        var suiji=randomNumber(0,90);
        tuijian.append(`<li><img src="${data[suiji].imgurl}" alt=""><p class="p1">${data[suiji].pinming}</p><p class="p2"><span class="xianjia">￥${data[suiji].xianjia}</span><del class="yuanjia">￥${data[suiji].yuanjia}</del><br><span class="pl">${suiji*666}人评论</span></p></li>`);
    }
    for(var l=0;l<6;l++){
        var suiji=randomNumber(0,90);
        kykul.append(`<li data-id="${data[suiji].id}" class="bj"><img src="${data[suiji].imgurl}" alt=""><p class="p1">${data[suiji].pinming}</p><p class="p2"><span class="xianjia">￥${data[suiji].xianjia}</span><del class="yuanjia">￥${data[suiji].yuanjia}</del><br><span class="pl">${suiji*666}人评论</span></p></li>`);
    }

    $(document).ready(function(){
        var naduotiaoshuju = Cookie.get('naduotiaoshuju') || [];
        var hongdian=$("#Header .qiangou ul .hongdian");
        var hongdian2=$("#Header .box2 .you .hongdian");
        var t_gouwu=$("#Header .box2 .you");
        t_gouwu.click(function(){
            location.href="../html/car.html";
        });
        if(naduotiaoshuju.length==0){
            hongdian.hide();
            hongdian2.hide();
        }else{
            hongdian.show();
            hongdian2.show();
            hongdian.html(JSON.parse(naduotiaoshuju).length);
            hongdian2.html(JSON.parse(naduotiaoshuju).length);
        };
    });

    var id=location.search.slice(4);

    var natiaoshuju={};
    for(var i=0;i<data.length;i++){
        if(data[i].id==id){
            natiaoshuju=data[i];
        }
    };

    var content=$(".da .nr .content");
    var xianjia=$(".da .nr .jia .xianjia");
    var yuanjia=$(".da .nr .jia .yuanjia");
    var pinpai=$(".xiangping .hezi2 ul li").first().find("p").first();
    var changuo=$(".xiangping .hezi2 ul li").eq(1).find("p").first();
    var pinming=$(".xiangping .hezi2 ul li").eq(2).find("p").first();
    pinpai.html("商品品牌："+natiaoshuju.pinpai);
    changuo.html("产国："+natiaoshuju.changuo);
    pinming.html("品名："+natiaoshuju.pinming);
    content.html(natiaoshuju.pinming);
    xianjia.html("￥"+(natiaoshuju.xianjia*1).toFixed(2));
    yuanjia.html("参考价￥"+(natiaoshuju.yuanjia*1).toFixed(2));

    var jiajia=$(".da .nr .p5 .jiajia");
    var jian=$(".da .nr .p5 .jian");
    var shuliang=$(".da .nr .p5 .shuliang");

    var toubu=$(".da .nr .tou");
    toubu.html("");
    toubu.html(` <i class="fa fa-flag fa-2x qi" aria-hidden="true"></i>${natiaoshuju.changuo} | ${natiaoshuju.pinpai} <img src="../images/zijing.png" class="fr" alt="" />`);

    jiajia.click(function(){
        shuliang[0].value++;
    });
    jian.click(function(){
        shuliang[0].value--;
        if(shuliang[0].value<=1){
            shuliang[0].value=1;
        }
    });
    $(document).ready(function(){
        var qiangou=$("#Header .qiangou");
        var da_img=$(".da .fdj .images-cover img");
        var fangda_img=$(".da .fdj .magnifier-view img");
        var xiao_img=$(".da .fdj .magnifier-line .small-img img");
        da_img[0].src=natiaoshuju.imgurl;
        fangda_img[0].src=natiaoshuju.imgurl;
        xiao_img[0].src=natiaoshuju.imgurl;
        var jiacar=$(".da .nr .maijia .jiacar");
        var gouwucar=$("#Header .qiangou ul li").eq(1);
        gouwucar.click(function(){
            location.href="../html/car.html";
        })
        jiacar.click(function(){
            var img=$("<img/>");
            img[0].src=natiaoshuju.imgurl;
            img.css({
                position:"absolute",
                width:100,
                zIndex:1000,
                top:jiacar.position().top-30,
                left:jiacar.position().left+33
            });
            $(document.body).append(img);
            img.animate({left:gouwucar.offset().left,top:gouwucar.offset().top,width:30},1000,function(){
                img.remove();
                var naduotiaoshuju = Cookie.get('naduotiaoshuju') || [];
                var hongdian=$("#Header .qiangou ul .hongdian");
                var hongdian2=$("#Header .box2 .you .hongdian");

                var fanding=$("#Header .qiangou .fanding");
                fanding.click(function(){
                    $("html,body").animate({scrollTop:0});
                });
                if(naduotiaoshuju.length==0){
                    hongdian.hide();
                    hongdian2.hide();
                }else{
                    hongdian.show();
                    hongdian2.show();
                    hongdian.html(JSON.parse(naduotiaoshuju).length);
                    hongdian2.html(JSON.parse(naduotiaoshuju).length);
                };
            });

            natiaoshuju.qty=shuliang.val();
            // console.log(natiaoshuju);
            var naduotiaoshuju = Cookie.get('naduotiaoshuju') || [];
            if(typeof naduotiaoshuju === 'string'){
                    naduotiaoshuju = JSON.parse(naduotiaoshuju);
                };
            var idx;
            var has = naduotiaoshuju.some(function(g,i){
                idx = i;
                return g.id === id;
            });
            if(has){
                naduotiaoshuju[idx].qty=(naduotiaoshuju[idx].qty)*1+shuliang.val()*1;
            }else{
                naduotiaoshuju.push(natiaoshuju);
            }
            Cookie.set("naduotiaoshuju",JSON.stringify(naduotiaoshuju),{path:"/"});
        });
        
        var dl=$("#Header .box1 .denglu");
        var zc=$("#Header .box1 .zhuce");
        var shouye=$("#Header .nav .dh2")[0];
        shouye.onclick=function(){
            location.href="../index.html";
        };
        dl.click(function(){
            location.href="../html/dl_zc.html?zt=dl";
        });
        zc.click(function(){
            location.href="../html/dl_zc.html?zt=zc";
        });

        var erli=$("#Header .erji .eli");
        erli.click(function(){
            var _leixing=this.title;
            var leixing=encodeURI(_leixing);
            location.href="../html/list.html?leixing="+leixing;
        });
        var sanji_a=$("Header .erji .sanji a");
        sanji_a.click(function(){
            location.href="../html/list.html";
        });
    });
});
});
//点击下单跳转页面
/*
$(function(){
    		$(".jiacar fl").click(function(){
    			window.open('my_address.html');
    		})
    	})*/