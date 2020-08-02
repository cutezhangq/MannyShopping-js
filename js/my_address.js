$(function(){
	/*全选*/
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
	/*待付款*/
	$(".daifu").click(function(){
		if($(this).prop('checked')){
	      $(".f-l").each(function () {
          	$(this).prop('checked', true);
			})
	   	}
	   	else{
	   	$(".f-l").each(function () {
          	$(this).prop('checked', false);
			})
	   	}	
	})
	/*待发货*/
	$(".all_daifa").click(function(){
		if($(this).prop('checked')){
	      $(".f-2").each(function () {
          	$(this).prop('checked', true);
			})
	   	}
	   	else{
	   	$(".f-2").each(function () {
          	$(this).prop('checked', false);
			})
	   	}	
	})
	/*待收货*/
	$(".all_daishou").click(function(){
		if($(this).prop('checked')){
	      $(".f-3").each(function () {
          	$(this).prop('checked', true);
			})
	   	}
	   	else{
	   	$(".f-3").each(function () {
          	$(this).prop('checked', false);
			})
	   	}	
	})
	/*待评价*/
	$(".all_daiping").click(function(){
		if($(this).prop('checked')){
	      $(".f-4").each(function () {
          	$(this).prop('checked', true);
			})
	   	}
	   	else{
	   	$(".f-4").each(function () {
          	$(this).prop('checked', false);
			})
	   	}	
	})
	/*全选2*/
	$(".quanxuan2").click(function(){
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
	
	/*下单成功，出现图片提示*/
	$(".xiadancg").click(function(){
		$("#oimg").css("display","block");
	})
	
	
	
})