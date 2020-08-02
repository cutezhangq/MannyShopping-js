<?php
    /*
        注册验证用户有效性
     */
    
    require('connect.php');
 
    $nicheng = isset($_GET['nicheng']) ? $_GET['nicheng'] : null;
    $img = isset($_GET['img']) ? $_GET['img'] : null;
    $email = isset($_GET['email']) ? $_GET['email'] : null;
    // 查找数据库判断用户名是否存在
    $sql = "update login set nicheng ='$nicheng',img='$img' where username='$email'";

    $result = $conn->query($sql);
    if($result){
        echo "ok";
    }else{
        echo "no";
    }
?>