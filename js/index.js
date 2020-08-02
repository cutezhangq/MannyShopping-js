require(['config'],function(){
require(['jquery','common','lunbo','index'],function($){
	//定义登录注册的变量
    var dl=$("#Header .box1 .denglu");
    var zc=$("#Header .box1 .zhuce");
    dl.click(function(){
    	//点击跳转相对路径，get方法
        location.href="./html/dl_zc.html?zt=dl";
    });
    zc.click(function(){
        location.href="./html/dl_zc.html?zt=zc";
    });
    //跳转购物车  先将$("")放到变量里面，然后再变量点出方法
    var gouwucar=$("#Header .qiangou ul li").eq(1);
    gouwucar.click(function(){//点击跳转页面
        location.href="./html/car.html";
    })
    //拿多条数据，红点，购物……定义变量
    var naduotiaoshuju = Cookie.get('naduotiaoshuju') || [];
    var hongdian=$("#Header .qiangou ul .hongdian");
    var hongdian2=$("#Header .box2 .you .hongdian");
    var t_gouwu=$("#Header .box2 .you");
    t_gouwu.click(function(){
        location.href="./html/car.html";
    })
    if(naduotiaoshuju.length==0){
        hongdian.hide();
        hongdian2.hide();
    }else{
        hongdian.show();
        hongdian2.show();
        //.parse()解析日期时间等字符串的
        hongdian.html(JSON.parse(naduotiaoshuju).length);
        hongdian2.html(JSON.parse(naduotiaoshuju).length);
    };
	//轮播.flexslider({XXX:XXX,XXX:XXX})
    $('.flexslider').flexslider({
        directionNav: true,//Boolean:  (true/false)是否显示左右控制按钮
        pauseOnAction: false,//鼠标放上去是否暂停
        slideshowSpeed: 3000//滑动速度，3000ms
    });
    /*
    var data=(function(){
        var jieshou;
        $.ajax({
            url:"./api/j_nashuju.php",
            async:false,//异步
            success:function(data){
                jieshou=JSON.parse(data);	//将接收到的json数据放到变量里面
            }
        });
        return jieshou;
    })();
    */
    var xiangou=$(".box5 .zuo");//限购
    var shangxing=$(".box5 .zuo");//上新
    var muying=$(".muying .you");//母婴
    
    xiangou.html("");
    
    for(var i=0;i<data.length;i++){
        if(data[i].leixing=="限购"){
            xiangou.append(`<li data-id="${data[i].id}" class="bj">
            		//图片渲染到页面 slice() 方法可从已有的数组中返回选定的元素。arrayObject.slice(start,end)
                    <img src="${data[i].imgurl.slice(1,)}" alt="" class="fl">
                    <div class="zi">
                        <p class="p1">蕴含耀眼的强大品质</p>
                        //pinming是api的data里面的json数据的一个属性
                        <p class="p2">${data[i].pinming}</p> 
                        <p class="p3"><span class="xianjia">￥${data[i].xianjia}</span> <del class="yuanjia">￥${data[i].yuanjia}</del></p>
                        <p class="xia">
                            <img src="./images/shengyu2.png" height="20" width="101" alt="" class="fl tu"><span class="liji fl">立即抢购</span>
                        </p>   
                    </div>   
                </li>`);
        }
    }
    
    /*猜你喜欢*/
    var cai=$(".cai ul");
    cai.html("");
    for(var j=0;j<4;j++){
        var suiji=randomNumber(1,20);
        cai.append(`<li data-id="${data[suiji].id}" class="bj"><img src="${data[suiji].imgurl.slice(1,)}" alt=""><p class="p1">${data[suiji].pinming}</p><p class="p2"><span class="xianjia">￥${data[suiji].xianjia}</span><del class="yuanjia">￥${data[suiji].yuanjia}</del><span class="pl fr">${suiji+6666}人评论</span></p></li>`);
    };
    function lei(ming,str){
        for(var q=0;q<data.length;q++){
            if(data[q].leixing==str){
                ming.push(data[q]);
            }
        };
    }
    var muying_data=[];
    lei(muying_data,"母婴");
    var meirong_data=[];
    lei(meirong_data,"洁面");
    var fushi_data=[];
    lei(fushi_data,"服饰");
    var jiaju_data=[];
    lei(jiaju_data,"家居");
    var yingyang_data=[];
    lei(yingyang_data,"保健品");
    var shuma_data=[];
    lei(shuma_data,"数码");
    var yundong_data=[];
    lei(yundong_data,"运动");

    meirong_data=meirong_data.slice(0,12);

    var fenlei=$(".muying .you .fen");
    var you1=$(".muying .you");
    //分类-母婴
    //刷新 （先清空，再append进数据）
    function shuaxing(fe,res){
        fe.html("");
        for(var k=0;k<res.length;k++){
            fe.append(`<li data-id="${res[k].id}" class="bj"><img src="${res[k].imgurl.slice(1,)}" alt="" class="fl"><p class="ct">${res[k].pinming}</p><p class="p3"><span class="xianjia">￥${res[k].xianjia}</span><del class="yuanjia">￥${res[k].yuanjia}</del></p></li>`);
        }
    }
    shuaxing(fenlei,muying_data);
    //index页面的母婴专区显示的 页码（每次显示4个）
    var gong=Math.ceil(muying_data.length/4);
    var yema=$("<div/>");
    yema.addClass("yema");
    yema.html("");
    for(var l=0;l<gong;l++){
        var span=$("<span/>");
        span.attr("data-id",l+1);
        // if(l==0){
        //     span.addClass("active");
        // };
        yema.append(span);
    };

	//定义其他专区的变量
    you1.append(yema);
    var meirong=$(".meirong .you .fen");
    var you2=$(".meirong .you");
    var fushi=$(".fushi .you .fen");
    var you3=$(".fushi .you");
    var jiaju=$(".jiaju .you .fen");
    var you4=$(".jiaju .you");
    var yingyang=$(".yingyang .you .fen");
    var you5=$(".yingyang .you");
    var shuma=$(".shuma .you .fen");
    var you6=$(".shuma .you");
    var yundong=$(".yundong .you .fen");
    var you7=$(".yundong .you");
	
	//定时器
    function dingshiqi(sps,ye,le,fe){
        sps=ye.children();
        //.filter()它用于把Array的某些元素过滤掉，然后返回剩下的元素。(此处相当于选定数组中的.active)
        var ye_id=$(ye).children().filter(".active").attr("data-id");
        var gaoliangde;
        if(ye_id){
             gaoliangde=ye_id;
        }else{
            gaoliangde=1;
        }
        $(sps[0]).addClass("active");
        var timer=setInterval(function(){ //定时器
            gaoliangde++;
             if(gaoliangde>3){
                gaoliangde=1;
             };
             if(gaoliangde==1){
               var page1=le.slice(0,4);
                shuaxing(fe,page1);
            };
            if(gaoliangde==2){
               var page2=le.slice(4,8);
                shuaxing(fe,page2);
            };
            if(gaoliangde==3){
               var page3=le.slice(8,);
                shuaxing(fe,page3);
            }
            $(sps[gaoliangde-1]).addClass("active").siblings().removeClass("active");
        },2000);
    };

    shuaxing(meirong,meirong_data);
    shuaxing(fushi,fushi_data);
    shuaxing(jiaju,jiaju_data);
    shuaxing(yingyang,yingyang_data);
    shuaxing(shuma,shuma_data);
    shuaxing(yundong,yundong_data);

    var yema2=yema.clone(true);
    var yema3=yema.clone(true);
    var yema4=yema.clone(true);
    var yema5=yema.clone(true);
    var yema6=yema.clone(true);
    var yema7=yema.clone(true);

    var sps;
    var sps2;
    var sps3;
    var sps4;
    var sps5;
    var sps6;
    var sps7;
    dingshiqi(sps,yema,muying_data,fenlei);
    dingshiqi(sps2,yema2,meirong_data,meirong);
    dingshiqi(sps3,yema3,fushi_data,fushi);
    dingshiqi(sps4,yema4,jiaju_data,jiaju);
    dingshiqi(sps5,yema5,yingyang_data,yingyang);
    dingshiqi(sps6,yema6,shuma_data,shuma);
    dingshiqi(sps7,yema7,yundong_data,yundong);

    you2.append(yema2);
    you3.append(yema3);
    you4.append(yema4);
    you5.append(yema5);
    you6.append(yema6);
    you7.append(yema7);
    yiru(yema,muying_data,fenlei);
    yiru(yema2,meirong_data,meirong);
    yiru(yema3,fushi_data,fushi);
    yiru(yema4,jiaju_data,jiaju);
    yiru(yema5,yingyang_data,yingyang);
    yiru(yema6,shuma_data,shuma);
    yiru(yema7,yundong_data,yundong);
    function yiru(ye,le,fe){
        ye.on("mousemove",function(e){
            if(e.target.tagName=="SPAN"){
                $(e.target).siblings().removeClass("active");
                $(e.target).addClass("active");
                var page=$(e.target).attr("data-id");
                if(page==1){
                   var page1=le.slice(0,4);
                    shuaxing(fe,page1);
                };
                if(page==2){
                   var page2=le.slice(4,8);
                    shuaxing(fe,page2);
                };
                if(page==3){
                   var page3=le.slice(8,);
                    shuaxing(fe,page3);
                }
            }
        });
    };
	//zuolan
    var jiachu=$(".zuolan .jiachu");
    var duozi=$(".zuolan .duozi p");
    var fanding=$("#Header .qiangou .fanding");
    fanding.click(function(){
        $("html,body").animate({scrollTop:0});
    });
    jiachu[0].onclick=function(){
        $("html,body").animate({scrollTop:811});
    };
    jiachu[1].onclick=function(){
        $("html,body").animate({scrollTop:1242});
    };
    duozi[0].onclick=function(){
        $("html,body").animate({scrollTop:1595});
    };
    duozi[1].onclick=function(){
        $("html,body").animate({scrollTop:2232});
    };
    duozi[2].onclick=function(){
        $("html,body").animate({scrollTop:2864});
    };
    duozi[3].onclick=function(){
        $("html,body").animate({scrollTop:3510});
    };
    duozi[4].onclick=function(){
        $("html,body").animate({scrollTop:4150});
    };
    duozi[5].onclick=function(){
        $("html,body").animate({scrollTop:4790});
    };
    duozi[6].onclick=function(){
        $("html,body").animate({scrollTop:5452});
    };


    //点击跳转
    var erli=$("#Header .erji .eli");
    erli.click(function(){
        var _leixing=this.title;
        var leixing=encodeURI(_leixing);
        location.href="./html/list.html?leixing="+leixing;
    });
    var sanji_a=$("Header .erji .sanji a");
    sanji_a.click(function(){
        location.href="./html/list.html";
    });
    var box4_img=$(".box4 img");
    box4_img.click(function(){
        location.href="./html/list.html";
    });
    var box7_img=$(".box7 li");
    box7_img.click(function(){
        location.href="./html/list.html";
    });
    var box5_you_img=$(".box5 .you img");
    box5_you_img.click(function(){
        var _leixing=$(this).parents().eq(2)[0].title;
        var leixing=encodeURI(_leixing);
        location.href="./html/list.html?leixing="+leixing;
    });
    var box8_tdz=$(".box8 .tdz");
    box8_tdz.click(function(){
        var _leixing=$(this).parents().eq(1)[0].title;
        var leixing=encodeURI(_leixing);
        location.href="./html/list.html?leixing="+leixing;
    });
    var box8_li=$(".box8 .zhong li");
    box8_li.click(function(){
        var _leixing=$(this).parents().eq(2)[0].title;
        var leixing=encodeURI(_leixing);
        location.href="./html/list.html?leixing="+leixing;
    });
    var box5_zuo_li=$(".box5 .zuo li");
    box5_zuo_li.click(function(e){
        var id=$(e.target).parents().filter(".bj").attr("data-id");
        location.href="./html/xiangqingye.html?id="+id;
    });
    var box8_fen=$(".box8 .fen");
    box8_fen.on("click",".bj",function(e){
        var id=$(this).attr("data-id");
        location.href="./html/xiangqingye.html?id="+id;
    });
    cai.on("click",".bj",function(e){
        var id=$(this).attr("data-id");
        location.href="./html/xiangqingye.html?id="+id;
    });

    //吸顶
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
        if(scrollTop >= 110){
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
        if(scrollTop >= 561){
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

/*index页面*//*修改*/
$(function(){
	/*个人中心 下拉菜单方法一：*/
	$(".grzhongxin").mouseenter(function(){
		$(".mcDropMenu").css("display","block");
	})
	$(".menuDiv").mouseleave(function(){			/*.menuDiv*/
		$(".mcDropMenu").css("display","none");
	})
	/*客户服务 下拉菜单*/
	$(".kehufuwu").mouseenter(function(){
		$(".khDropMenu").css("display","block");
	})
    $(".menuDiv").mouseleave(function(){
		$(".khDropMenu").css("display","none");
	})
	/*钱包 下拉菜单*/
	$(".qianbao").mouseenter(function(){
		$(".qbDropMenu").css("display","block");
	})
    $(".menuDiv").mouseleave(function(){
		$(".qbDropMenu").css("display","none");
	})

/*猜你喜欢 移动出现红框*/
	/*$('.cai .container ul li').mouseenter(function(){
		$("ul").find('this').css('color','red');
		
	})*/
	$(".cai .container ul li").each(function(){
		$(this).mouseleave(function(){
			$(this).css('border','0','!important');
		})
		$(this).mouseenter(function(){
			$(this).css('border','2px solid red','!important');
		})
	})
	
/*四张图 移动出现红框*/
	$(".box4 .container li").each(function(){
		$(this).mouseenter(function(){
			$(this).css('border','2px solid red','!important');
		})
		$(this).mouseleave(function(){
			$(this).css('border','0','!important');
		})
	})
/*轮播图响应式*/




	
})
