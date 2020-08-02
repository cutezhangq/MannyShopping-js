require(['config'],function(){//require()函数接受两个参数。后面的是回调函数
require(['jquery','common','dl_zc'],function($){//使用require()函数，主模块依赖于这三个模块（相当于在这个js里面调用了这三个模块的js）
     $('#Footer').load('../html/footer.html');//用load方法加载公共部分footer

    var daimg=$(".daimg");
    daimg.click(function(){
        location.href="../index.html";
    })
    
    /*用数字+字母随机生成验证码*/
     var code=$(".yanzheng .yzm");/*定义变量表示验证码的码部分*/
     var zimu='qwertyuiopasdfghjklzxcvbnm1234567890';/*所有字母+数字*/
    yanzhengma1();/*登录0   code[0]*/
    yanzhengma2();/*注册1   code[1]*/
    function yanzhengma1(){
        var res='';/*定义res变量，先为空，之后放入随机生成的int类型*/
        for(var i=0;i<4;i++){
            res+=zimu[parseInt(Math.random()*36)];/*parseInt强转换为int类型*/
        }
        code[0].innerHTML=res;/*将res变量（即随机验证码字符串）插入到html的登录页面部分*/
    };	
    //code【0】，code【1】都是数组code里面的，将登录和注册的验证码res 一起放到res里面，用的时候各取需要部分使用
    function yanzhengma2(){
        var res='';
        for(var i=0;i<4;i++){//验证码由4位组成
            res+=zimu[parseInt(Math.random()*36)];
        }
        code[1].innerHTML=res;
    };
    
    code[0].onclick=function(){
        yanzhengma1();//调用上面生成的登录部分随机验证码
    };
    code[1].onclick=function(){
        yanzhengma2();//调用上面生成的注册部分随机验证码
    };

    var zt=location.search.slice(4);////得到get方式提交的查询字符串
     var dl=$(".dl");
     var zhuce=$(".zhuce");
     var tiao_zhuce=$(".dl .tiao_zhuce");/*跳转注册*/
     var qudenglu=$(".zhuce .qudenglu");/*跳转登录*/
     if(zt=="dl"){
        zhuce.hide();
        dl.show();
    };
    if(zt=="zc"){
        dl.hide();
        zhuce.show();
    }
    /*跳转注册*/
     tiao_zhuce.click(function(){
        dl.hide();
        zhuce.show();
     })
     /*跳转登录*/
     qudenglu.click(function(){
       zhuce.hide();
        dl.show();
     });
     
     /*定义变量*/
    var zc_passwordLeib=$(".zhuce .passwordLeib");
     var shoujihao=$(".zhuce .zhu .bo .username");
     var zc_pass1=$(".zhuce .password1");
     var zc_pass2=$(".zhuce .password2");
     var zc_btn=$(".zhuce .dl_btn");
     var dl_btn=$(".dl .dl_btn");
     var zc_yan=$(".zhuce .yan");
     var dl_yan=$(".dl .yan");
     var ts5=$(".zhuce .ts5");
     var ts6=$(".zhuce .ts6");
     var ts7=$(".zhuce .ts7");
     var ts8=$(".zhuce .ts8");
    var ts9=$(".zhuce .ts9");
     var ts1=$(".dl .ts1");
     var ts2=$(".dl .ts2");
     var ts3=$(".dl .ts3");
     var dl_shoujihao=$(".dl .bo .username");
     var dl_mima=$(".dl .password");
     
     dl_shoujihao.on("change",function(){//用on对change控件（动态的）绑定一个事件。   只有 on() 能成功的绑定到动态控件中，click不行。
        var _dl_shoujihao=dl_shoujihao.val();
        if(!(/^1[34578]\d{9}$/.test(_dl_shoujihao))){ 
            ts1.css({"visibility":"visible"});/*提示：该用户不存在  的部分显示出来，返回false*/
            return false;
        }else{
            ts1.css({"visibility":"hidden"});/*提示：该用户不存在  的部分隐藏，说明用户手机号填写成功*/
        };
        //denglu.php注册验证用户有效性
        $.ajax({    
            url:"../api/denglu.php",
            data:{username:_dl_shoujihao},//对应php中的username属性
            success:function(data){
                if(data=="no"){//在php中已经判断了输入手机号的长度是不是>0,  result->num_rows<=0
                    ts1.css({"visibility":"visible"});/*错误提示出现*/
                }else{
                    ts1.css({"visibility":"hidden"});
                }
            }
        });
     });
     dl_mima.on("change",function(){   //change起到开关的作用，即input发生变化就执行函数
        //将手机号和密码的值分别赋给变量
        var _dl_shoujihao=dl_shoujihao.val();
        var _dl_mima=dl_mima.val();
        $.ajax({
            url:"../api/denglu.php",
            data:{
                username:_dl_shoujihao,
                password:_dl_mima,
                type:"reg"	//Reg 即对注册表子项信息和注册表项值中的值执行添加、更改、导入、导出以及其他操作的命令
            },
            success:function(data){console.log(data)
                if(data=="fail"){
                    ts2.css({"visibility":"visible"});
                }else{
                    ts2.css({"visibility":"hidden"});
                }
            }
        });
     });
     //登录提示信息部分
     dl_btn.on("click",function(){
        var dl_ts=$(".dl .ts");
        if(dl_yan.val()!=code[0].innerHTML){
            ts3.css({"visibility":"visible"});
            return false;
        }else{
            ts3.css({"visibility":"hidden"});
        };
        if(dl_ts.css("visibility")=="visible"){
            return false;
        };
        alert("恭喜你登录成功！");
        location.href="../index.html";
    });
    
	/*注册手机号*/
     shoujihao.on("change",function(){
        var _shoujihao=shoujihao.val();
        if(!(/^1[34578]\d{9}$/.test(_shoujihao))){ 
            ts5.css({"visibility":"visible"});
            return false;
        }else{
            ts5.css({"visibility":"hidden"});
        };
        $.ajax({
            url:"../api/reg.php",
            data:{username:_shoujihao},
            success:function(data){
                if(data=="fail"){
                    ts5.css({"visibility":"visible"});
                    ts5.html("该用户已经被注册，你换一个吧");
                }else{
                    ts5.css({"visibility":"hidden"});
                }
            }
        });
     });
     
     /*注册密码及确认密码*/
     zc_pass1.on("change",function(){
        var _zc_pass1=zc_pass1.val();
        if(!/^[^\s]{6,20}$/.test(_zc_pass1)){
            ts6.css({"visibility":"visible"});
            return false;
        }else{
            ts6.css({"visibility":"hidden"});
        }
     });
     zc_pass2.on("change",function(){
        var _zc_pass2=zc_pass2.val();
        if(!/^[^\s]{6,20}$/.test(_zc_pass2)){
            ts7.css({"visibility":"visible"});
            return false;
        }else{
            ts7.css({"visibility":"hidden"});
        }
     });
	
	/*注册类别选择*/
	/*
	zc_passwordLeib.on("change",function(){
		var _zc_passwordLeib=zc_passwordLeib.valueOf();
		// console.log('a89987');
		if(_zc_passwordLeib.checked==false){
			 ts9.css({"visibility":"hidden"});
			 return 1;
		}else{
			if(_zc_passwordLeib.checked==false){
				ts9.css({"visibility":"hidden"});
				return 2;
			}else{
				ts9.css({"visibility":"visible"});
				return false;
			}
		}
	})
	*/
	
	/*提交注册的按钮*/
     zc_btn.on("click",function(){
        var zc_ts=$(".zhuce .ts");
        if(zc_yan.val()!=code[1].innerHTML){
            ts8.css({"visibility":"visible"});
            return false;
        }else{
            ts8.css({"visibility":"hidden"});
        };
        
        if(zc_ts.css("visibility")=="visible"){
            return false;
        }
        $.ajax({
            url:"../api/reg.php",
            data:{
                username:shoujihao.val(),
                password:zc_pass1.val(),
                type:"reg"
            },
            success:function(data){
                if(data=="success"){
                    alert("恭喜你注册成功！");
                    zhuce.hide();
                    dl.show();
                }else{
                    alert("恭喜注册成功！");
                }
            }
        });

     })
     
     
     
});
});

/*单选框不能不选*/