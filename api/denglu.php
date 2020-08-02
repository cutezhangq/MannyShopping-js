<?php
    /*
        注册验证用户有效性
     */
    
    require('connect.php'); //主模块依赖于connect.php模块
 
    $username = isset($_GET['username']) ? $_GET['username'] : null;
    $password = isset($_GET['password']) ? $_GET['password'] : null;
    $type = isset($_GET['type']) ? $_GET['type'] : null;
    // 查找数据库判断用户名是否存在
    $sql = "select username from login where username='$username'";

    $result = $conn->query($sql);
    if($result->num_rows<=0){
        echo "no";		//php中输出语句echo
    }else{
        if($type =="reg"){
            // 加密密码
            // md5()
            $password = md5($password);

            // 注册（保存到数据库）
            $sql = "select * from login where username='$username' and password='$password'";

            // 执行sql语句
            $res = $conn->query($sql);

            if($res->num_rows>0){
                echo "success";
            }else{
                echo "fail";
            }
        }else{
            echo "yes";
        }
    }

?>