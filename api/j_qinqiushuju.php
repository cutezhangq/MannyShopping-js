<?php
    
    require('connect.php');
 
    $email = isset($_GET['email']) ? $_GET['email'] : null;
    // 查找数据库判断用户名是否存在
    $sql = "select * from login where username='$email'";

    $result = $conn->query($sql);
    // 获取数据（使用查询结果集）
    $res = $result->fetch_all(MYSQLI_ASSOC);
    
    echo json_encode($res,JSON_UNESCAPED_UNICODE);

?>