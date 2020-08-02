require(['config'],function(){
require(['jquery','common','car'],function($){
     $('#Header').load('../html/header.html');
     $('#Footer').load('../html/footer.html');

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
    var kykul=$(".kykul");
    kykul.html("");
    for(var j=0;j<6;j++){
        var suiji=randomNumber(0,90);
        $(kykul[0]).append(`<li><img src="${data[suiji].imgurl}" alt=""><p class="p1">${data[suiji].pinming}</p><p class="p2"><span class="xianjia">￥${data[suiji].xianjia}</span><del class="yuanjia">￥${data[suiji].yuanjia}</del><br><span class="pl">${suiji*666}人评论</span></p></li>`);
    }
    for(var l=0;l<6;l++){
        var suiji=randomNumber(0,90);
        $(kykul[1]).append(`<li data-id="${data[suiji].id}" class="bj"><img src="${data[suiji].imgurl}" alt=""><p class="p1">${data[suiji].pinming}</p><p class="p2"><span class="xianjia">￥${data[suiji].xianjia}</span><del class="yuanjia">￥${data[suiji].yuanjia}</del><br><span class="pl">${suiji*666}人评论</span></p></li>`);
    }
    for(var z=0;z<6;z++){
        var suiji=randomNumber(0,90);
        $(kykul[2]).append(`<li data-id="${data[suiji].id}" class="bj"><img src="${data[suiji].imgurl}" alt=""><p class="p1">${data[suiji].pinming}</p><p class="p2"><span class="xianjia">￥${data[suiji].xianjia}</span><del class="yuanjia">￥${data[suiji].yuanjia}</del><br><span class="pl">${suiji*666}人评论</span></p></li>`);
    }

     var j_s=$(".j_s");
     var sp=$(".sp");console.log()
     xixia();
    function xixia(){
        var scrollTop = window.scrollY;
        var shanggao=282+sp[0].offsetHeight;
        // 吸顶菜单
        if(scrollTop <= 592){
            j_s.addClass("xixia");
        };
        if(scrollTop >= shanggao-592){
            j_s.removeClass("xixia");
        };
    }
    window.onscroll = function(){
        xixia();
    }

     var naduotiaoshuju = Cookie.get('naduotiaoshuju') || [];
    if(typeof naduotiaoshuju === 'string'){
        naduotiaoshuju = JSON.parse(naduotiaoshuju);
    };
    
    var car_ul=$("#car_main .sp .zhong_sp");
    
    car_ul.html("");
    console.log(car_ul)
    var jisuan_youhui=0;
    var jisuan_zongjia=0;
    for(var i=0;i<naduotiaoshuju.length;i++){
        car_ul.append(`<li data-id="${naduotiaoshuju[i].id}">
                        <input type="checkbox" class="danxuan fl" checked="">
                        <img src="${naduotiaoshuju[i].imgurl}" alt="" class="tu fl">
                        <div class="neirong fl">
                            ${naduotiaoshuju[i].pinming}
                            <p><img src="../images/77.png" alt="">支持7天无忧退货</p>
                        </div>
                        <div class="jiner fl">
                            <del class="yuanjia">${(naduotiaoshuju[i].yuanjia*1).toFixed(2)}</del>
                            <div class="xianjia">${(naduotiaoshuju[i].xianjia*1).toFixed(2)}</div>
                        </div>
                        <div class="jj fl">
                            <div class="jian fl">-</div>
                            <input type="number" value="${naduotiaoshuju[i].qty}" class="num fl">
                            <div class="jia fl">+</div>
                        </div>
                        <div class="xi fl">
                            <p class="xiaoji">${(naduotiaoshuju[i].xianjia*naduotiaoshuju[i].qty*1).toFixed(2)}</p>
                            <p class="sui"><i class="fa fa-question-circle-o" aria-hidden="true"></i>预计税费：￥0.00</p>
                        </div>
                        <div class="sch">
                            <p class="shanchu">删除</p>
                            <p class="yiru">移入我的收藏</p>
                        </div>
                    </li>`);
        jisuan_youhui+=naduotiaoshuju[i].yuanjia*1*naduotiaoshuju[i].qty-naduotiaoshuju[i].xianjia*1*naduotiaoshuju[i].qty;
        jisuan_zongjia+=naduotiaoshuju[i].xianjia*naduotiaoshuju[i].qty*1;
    };
    var youhui=$("#car_main .sp .houji .youhui");
    var zhongji=$("#car_main .sp .houji .zhongji");
    var shuliang=$("#car_main .j_s .fansi .shu");
    var zongjia=$("#car_main .j_s .fansi .zongjia");
    var shu=$("#car_main .j_s .fansi .shu");
    var youhui2=$("#car_main .j_s .fansi .zaifan .youhui");
    var zhongji2=$("#car_main .j_s .fansi .zaifan .zhongji");

    var danxuans=$("#car_main .sp .zhong_sp .danxuan");
    var quanxuan=$("#car_main .j_s .quanxuan");
    shu.html(naduotiaoshuju.length);
    youhui.html(jisuan_youhui.toFixed(2));
    youhui2.html(jisuan_youhui.toFixed(2));
    zhongji.html(jisuan_zongjia.toFixed(2));
    zhongji2.html(jisuan_zongjia.toFixed(2));
    zongjia.html(jisuan_zongjia.toFixed(2));
    car_ul.on("click",function(e){
        if($(e.target).hasClass("jian")){
            var shu=$(e.target).next();
            shu[0].value--;
            if(shu[0].value<=0){
                $(e.target).parents().eq(1).remove();
                shan();
            }
            jisuan();
        };
        if($(e.target).hasClass("jia")){
            var shu=$(e.target).prev();
            shu[0].value++;
            jisuan();
        };
        if($(e.target).hasClass("shanchu")){
            $(e.target).parents().eq(1).remove();
            shan();
        }
        function jisuan(){
            var id=$(e.target).parents().eq(1).attr("data-id");
            var na_xianjia=$(e.target).parents().eq(0).prev().children().eq(1);
            var na_xiaoji=$(e.target).parents().eq(0).next().children().eq(0);
            
            na_xiaoji.html((na_xianjia.html()*shu[0].value).toFixed(2));
            for(var i=0;i<naduotiaoshuju.length;i++){
                if(naduotiaoshuju[i].id==id){
                    naduotiaoshuju[i].qty=shu[0].value;
                    Cookie.set("naduotiaoshuju",JSON.stringify(naduotiaoshuju),{path:"/"});
                }
            };
            var gou=$(e.target).parents().eq(1).children()[0];
            var bugoujia=$(e.target).parents().eq(1).children().eq(5).children()[0].innerHTML*1;
            if(gou.checked){
                var xiaos=$("#car_main .sp .zhong_sp .xiaoji");
                var ji_xiaos=0;
                for(var j=0;j<xiaos.length;j++){
                    ji_xiaos+=xiaos.eq(j).html()*1;
                };
                zhongji.html(ji_xiaos.toFixed(2));
                zongjia.html(ji_xiaos.toFixed(2));
                zhongji2.html(ji_xiaos.toFixed(2));
                shuliang.html(xiaos.length);
                var naduotiaoshuju2 = Cookie.get('naduotiaoshuju') || [];
                if(typeof naduotiaoshuju2 === 'string'){
                    naduotiaoshuju2 = JSON.parse(naduotiaoshuju2);
                };
                // console.log(naduotiaoshuju2);
                var z_youhui=0;
                for(var k=0;k<naduotiaoshuju2.length;k++){
                    z_youhui+=naduotiaoshuju2[k].yuanjia*naduotiaoshuju2[k].qty-naduotiaoshuju2[k].xianjia*naduotiaoshuju2[k].qty;
                };
                youhui.html(z_youhui.toFixed(2));
                youhui2.html(z_youhui.toFixed(2));
            }
        };
        function shan(){
            var id=$(e.target).parents().eq(1).attr("data-id");
            for(var i=0;i<naduotiaoshuju.length;i++){
                if(naduotiaoshuju[i].id==id){
                    naduotiaoshuju.splice(i,1);
                    Cookie.set("naduotiaoshuju",JSON.stringify(naduotiaoshuju),{path:"/"});
                }
            }
        }
    });
    var num=$("#car_main .sp .zhong_sp .num");
    for(var j=0;j<num.length;j++){
        num[j].oninput=function(e){
            var shu=$(e.target).val();
            if(shu<0){console.log(666)
                // $(e.target).parents().eq(1).remove();
                e.target.value=1;
                // var id=$(e.target).parents().eq(1).attr("data-id");
                // for(var i=0;i<naduotiaoshuju.length;i++){
                //     if(naduotiaoshuju[i].id==id){
                //         naduotiaoshuju.splice(i,1);
                //         Cookie.set("naduotiaoshuju",JSON.stringify(naduotiaoshuju),{path:"/"});
                //     }
                // }
            }
            var id=$(e.target).parents().eq(1).attr("data-id");
            var na_xianjia=$(e.target).parents().eq(0).prev().children().eq(1);
            var na_xiaoji=$(e.target).parents().eq(0).next().children().eq(0);
            
            na_xiaoji.html((na_xianjia.html()*this.value).toFixed(2));
            for(var i=0;i<naduotiaoshuju.length;i++){
                if(naduotiaoshuju[i].id==id){
                    naduotiaoshuju[i].qty=this.value;
                    Cookie.set("naduotiaoshuju",JSON.stringify(naduotiaoshuju),{path:"/"});
                }
            };
            var xiaos=$("#car_main .sp .zhong_sp .xiaoji");
            var gou=$(e.target).parents().eq(1).children()[0];
            if(gou.checked){
            var ji_xiaos=0;
            for(var j=0;j<xiaos.length;j++){
                ji_xiaos+=xiaos.eq(j).html()*1;
            };
            zhongji.html(ji_xiaos.toFixed(2));
            zongjia.html(ji_xiaos.toFixed(2));
            zhongji2.html(ji_xiaos.toFixed(2));
            shuliang.html(xiaos.length);
            var naduotiaoshuju2 = Cookie.get('naduotiaoshuju') || [];
            if(typeof naduotiaoshuju2 === 'string'){
                naduotiaoshuju2 = JSON.parse(naduotiaoshuju2);
            };
            // console.log(naduotiaoshuju2);
            var z_youhui=0;
            for(var k=0;k<naduotiaoshuju2.length;k++){
                z_youhui+=naduotiaoshuju2[k].yuanjia*naduotiaoshuju2[k].qty-naduotiaoshuju2[k].xianjia*naduotiaoshuju2[k].qty;
            };
            youhui.html(z_youhui.toFixed(2));
            youhui2.html(z_youhui.toFixed(2));
            }
        };
    }

    //勾选计算价格
    
    var tou_quanxuan=$(".yqx .quanxuan");
    danxuans.click(function(e){
        if(!this.checked){
            // console.log(this.parents().children().eq(5)children().eq(0))
            zongjia[0].innerHTML=zongjia[0].innerHTML*1-$(this).parent().children().eq(5).children().eq(0).html()*1;
            shu[0].innerHTML=danxuans.filter(":checked").length;
        }else{
            zongjia[0].innerHTML=zongjia[0].innerHTML*1+$(this).parent().children().eq(5).children().eq(0).html()*1;
            shu[0].innerHTML=danxuans.filter(":checked").length;
        };
        if(danxuans.filter(":checked").length==danxuans.length){
            quanxuan.prop("checked",true);
            tou_quanxuan.prop("checked",true);
        }else{
            quanxuan.prop("checked",false);
            tou_quanxuan.prop("checked",false);
        }
    });
   
    quanxuan.click(function(){
        danxuans.prop("checked",quanxuan.prop("checked"));
        if(!this.checked){
            zongjia.html("0");
            shu[0].innerHTML=danxuans.filter(":checked").length;
            shu[0].innerHTML=danxuans.filter(":checked").length;
        }else{
            var xiaos=$("#car_main .sp .zhong_sp .xiaoji");
            var suan_xiaos=0;
            for(var i=0;i<xiaos.length;i++){
                suan_xiaos+=xiaos[i].innerHTML*1;
            }
            zongjia.html(suan_xiaos.toFixed(2));
            shu[0].innerHTML=danxuans.filter(":checked").length;
        }
    });
    tou_quanxuan.click(function(){
        danxuans.prop("checked",tou_quanxuan.prop("checked"));
        quanxuan.prop("checked",tou_quanxuan.prop("checked"));
        if(!this.checked){
            zongjia.html("0");
            shu[0].innerHTML=danxuans.filter(":checked").length;
            shu[0].innerHTML=danxuans.filter(":checked").length;
        }else{
            var xiaos=$("#car_main .sp .zhong_sp .xiaoji");
            var suan_xiaos=0;
            for(var i=0;i<xiaos.length;i++){
                suan_xiaos+=xiaos[i].innerHTML*1;
            }
            zongjia.html(suan_xiaos.toFixed(2));
            shu[0].innerHTML=danxuans.filter(":checked").length;
        }
    })

    $(document).ready(function(){
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

/*car页面 修改*/
$(function(){
	$(".quanxuan").click(function(){
		if($(this).prop('checked')){
	      $("input[type=checkbox]").each(function () {
          	$(this).prop('checked', true);
			})
	   	}
	   	else{
	   	$("input[type=checkbox]").each(function () {
          	$(this).prop('checked', false);
			})
	   	}
	})
	/*
    $(".zhong_sp").find("input[type=checkbox]").click(function () {
        if ($(this).prop('checked')==false) {
            $(".quanxuan").each(function () {
                $(this).prop('checked',false)
            })
        }
    })
    */  
});
