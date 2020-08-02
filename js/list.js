require(['config'],function(){
require(['jquery','common','xiding','list'],function($){
     $('#Header').load('../html/header.html');  //抽出head和footer部分
     $('#Footer').load('../html/footer.html');
     $(document).ready(function(){
        var naduotiaoshuju = Cookie.get('naduotiaoshuju') || [];
        var hongdian=$("#Header .qiangou ul .hongdian");
        var hongdian2=$("#Header .box2 .you .hongdian");
        var t_gouwu=$("#Header .box2 .you");
        
        var fanding=$("#Header .qiangou .fanding");
        fanding.click(function(){
            $("html,body").animate({scrollTop:0});
        });
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

        var dl=$("#Header .box1 .denglu");
        var zc=$("#Header .box1 .zhuce");
        var shouye=$("#Header .nav .dh2")[0];
        var gouwucar=$("#Header .qiangou ul li").eq(1);
        gouwucar.click(function(){
            location.href="../html/car.html";
        })
        shouye.onclick=function(){
            location.href="../index.html";
        };
        dl.click(function(){
            location.href="../html/dl_zc.html?zt=dl";
        });
        zc.click(function(){
            location.href="../html/dl_zc.html?zt=zc";
        });
    });
    
    //head部分的下拉菜单
    	var grzx=$("#Header .grzhongxin");
    	var mcD=$("#Header .mcDropMenu");
    
     $("#Header .grzhongxin").mouseenter(function(){
		$("#Header .mcDropMenu").css("display","block");
	})
	$("#Header .menuDiv").mouseleave(function(){			/*.menuDiv*/
		$("#Header .mcDropMenu").css("display","none");
	})
	/*客户服务 下拉菜单*/
	$("#Header .kehufuwu").mouseenter(function(){
		$(".khDropMenu").css("display","block");
	})
    $("#Header .menuDiv").mouseleave(function(){
		$(".khDropMenu").css("display","none");
	})
	/*钱包 下拉菜单*/
	$("#Header .qianbao").mouseenter(function(){
		$(".qbDropMenu").css("display","block");
	})
    $("#Header .menuDiv").mouseleave(function(){
		$(".qbDropMenu").css("display","none");
	})
    
    //请求得到全部数据
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
    var cai_ul=$(".cai ul").first();
    var cai_ul2=$(".cai ul").eq(1);
    cai_ul.html("");
    cai_ul2.html("");
    for(var j=0;j<5;j++){
        var suiji=randomNumber(0,90);
        cai_ul.append(`<li data-id="${data[suiji].id}" class="bj"><img src="${data[suiji].imgurl}" alt=""><p class="p1">${data[suiji].pinming}</p><p class="p2"><span class="xianjia">￥${data[suiji].xianjia}</span><del class="yuanjia">￥${data[suiji].yuanjia}</del><span class="pl fr">${suiji*666}人评论</span></p></li>`);
    }
    for(var l=0;l<5;l++){
        var suiji=randomNumber(0,90);
        cai_ul2.append(`<li data-id="${data[suiji].id}" class="bj"><img src="${data[suiji].imgurl}" alt=""><p class="p1">${data[suiji].pinming}</p><p class="p2"><span class="xianjia">￥${data[suiji].xianjia}</span><del class="yuanjia">￥${data[suiji].yuanjia}</del><span class="pl fr">${suiji*666}人评论</span></p></li>`);
    };

    var leixing= decodeURI(location.search.slice(9));

    var da_ul=$("#Main .list");
    function shuaxing(len){
        da_ul.html("");
        for(var n=0;n<len.length;n++){
            if(len[n].leixing==leixing){
                da_ul.append(`<li data-id="${len[n].id}" class="bj">
                            <img src="${len[n].imgurl}" alt="">
                            <div class="hezi">
                            <p class="p1">
                                <span class="xianjia">￥${len[n].xianjia}</span>
                                <del class="yuanjia">￥${len[n].yuanjia}</del>
                            </p>
                            <p class="p2">${len[n].pinming}</p>
                            <p class="p3"><span class="ziying">自营</span><span class="mj">2件减30</span><span class="mj">赠</span></p>
                            <p class="p4"><i class="fa fa-commenting fa-lg" aria-hidden="true" style="color:#999;margin-right:4px;"></i> ${(3315+n)*(n+1)} <span class="fr" style="color:#999;">${len[n].changuo}</span></p>
                            <p class="p5" style="color:#999;">曼尼易购自营</p>
                            </div>
                        </li>`);
            }
        }
        for(var i=0;i<len.length;i++){
            // var suiji=randomNumber(0,90);
            da_ul.append(`<li data-id="${len[i].id}" class="bj">
                            <img src="${len[i].imgurl}" alt="">
                            <div class="hezi">
                            <p class="p1">
                                <span class="xianjia">￥${len[i].xianjia}</span>
                                <del class="yuanjia">￥${len[i].yuanjia}</del>
                            </p>
                            <p class="p2">${len[i].pinming}</p>
                            <p class="p3"><span class="ziying">自营</span><span class="mj">2件减30</span><span class="mj">赠</span></p>
                            <p class="p4"><i class="fa fa-commenting fa-lg" aria-hidden="true" style="color:#999;margin-right:4px;"></i> ${(3315+i)*(i+1)} <span class="fr" style="color:#999;">${len[i].changuo}</span></p>
                            <p class="p5" style="color:#999;">曼尼易购自营</p>
                            </div>
                        </li>`);
        }
    }
    shuaxing(data);

    var jia_pai=$(".box3 .zh li").eq(3);
    var jian=$(".box3 .zh li .jian");console.log(jian)
        var a=1;
    jia_pai.click(function(){
        jia_pai.css({
            color:'#e31436',
            border:'1px solid #e31436',
            padding:'0 10px;',
            lineHeight:"32px"
         });
        jian.css({
            display:'inline-block'
        })
        if(a==1){console.log(999)
            for(var i=0;i<data.length;i++){
                for(var j=i+1;j<data.length;j++){
                    if(data[i].xianjia*1>data[j].xianjia*1){
                        var res=data[i];
                        data[i]=data[j];
                        data[j]=res;
                    }
                    
                }
            };
            jian[0].src='../images/shangjian.png';
            shuaxing(data);
            return a=0;
        };
        if(a==0){console.log(666)
            for(var i=0;i<data.length;i++){
                for(var j=i+1;j<data.length;j++){
                    if(data[i].xianjia*1<data[j].xianjia*1){
                        var res=data[i];
                        data[i]=data[j];
                        data[j]=res;
                    }
                    
                }
            };
            jian[0].src='../images/xiajian.png';
            shuaxing(data);
            return a=1;
        }
    })
    
    var cai_lis=$("#Main .cai li");
    var yemali=$("#Main .yema .yemali");
    da_ul.on("click",".bj",function(e){
        var id=$(this).attr("data-id");
        location.href="../html/xiangqingye.html?id="+id;
    });
    cai_lis.click(function(e){
        var id=$(e.target).parents().filter(".bj").attr("data-id");
        location.href="../html/xiangqingye.html?id="+id;
    });
    var lis=$("#Main .list li");
    var yeshu=Math.floor(lis.length/20);
    yemali.html("");
    for(var m=0;m<yeshu;m++){
        var span=$("<span/>");
        span.addClass("ac");
        span.html(m+1);
        if(m==0){
            span.addClass("active");
        }
        yemali.append(span);
    }
    yemali.on("click",".ac",function(e){
        $(e.target).siblings().removeClass("active");
        $(e.target).addClass("active");
        var span_num=$(e.target).html();
        var data2=data.slice((span_num-1)*20,);
        shuaxing(data2);
    });
    var syiye=$(".yema .syiye");
    var xyiye=$(".yema .xyiye");
    syiye.click(function(){
        var liangde=yemali.children().filter(".active").html();
        if(liangde!=1){
            yemali.children().filter(".active").prev().addClass("active").siblings().removeClass("active");
            var data2=data.slice((liangde-2)*20,);
            shuaxing(data2);
        }
    });
    xyiye.click(function(){
        var liangde=yemali.children().filter(".active").html();
        if(liangde!=yemali.children().length){
            yemali.children().filter(".active").next().addClass("active").siblings().removeClass("active");
            var data2=data.slice((liangde)*20,);
            shuaxing(data2);
        }
    });
});
});


/*list页面修改*/
$(function(){
	/*鼠标滑过选图*/
	$("#Main .list li").each(function(){
		$(this).mouseenter(function(){
			$(this).css('border','1px solid red','!important');
		})
		$(this).mouseleave(function(){
			$(this).css('border','0','!important');
		})
	})
	
	/*猜你喜欢 移动出现红框*/
	/*$('.cai .container ul li').mouseenter(function(){
		$("ul").find('this').css('color','red');
		
	})*/
	$(".cai .container p img").each(function(){
		$(this).mouseleave(function(){
			$(this).css('border','0','!important');
		})
		$(this).mouseenter(function(){
			$(this).css('border','1px solid red','!important');
		})
	})
	
	/*点击第一个li链接要页面*/
	/*$("#Main .container .list #muyulu").click(function(){
		console.log("123");
		$.ajax({
			type:"get",
			url:"html/xiangqingye.html",
			async:false,
			success:function(data){
					location.href="html/xiangqingye.html";
					//console.log("1234");
				}
		})
	})*/
	$(".muyulu").click(function(){
		window.open("xiangqingye.html");
	})
	
	
	
})

/*footer放大右移的问题
function setBodyWidth(){
	var barWidthHelper=document.createElement('footer');
	barWidthHelper.style.cssText="overflow:scroll; width:100px; height:100px;";
	document.body.appendChild(barWidthHelper);
	var barWidth=barWidthHelper.offsetWidth-barWidthHelper.clientWidth;
	document.body.removeChild(barWidthHelper);
	var bodyWidth=window.screen.availWidth-barWidth;
	return bodyWidth;
}
			
$(document).ready(
	function(){
		var bodyWidth=setBodyWidth()+"px";
		//document.body.style.width=bodyWidth;
		$("body").css("width",bodyWidth);
	}
);
*/