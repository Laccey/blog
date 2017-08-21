<?php
//    header("Content-type:text/html;charset=utf-8");
    header("Content-type:application/json");
    $username = $_POST['name'];
    $comments = $_POST['comments'];
    date_default_timezone_set('prc');//php环境默认时差与北京时间相差8小时
    $t = date('Y-m-d H:i:s',time());
    $tt = strtotime($t);
    $start = 0;
    $count = 5;
    $output = [];

    $conn = mysqli_connect('23.106.158.44','root','chouchoushigesichouchou','myblog');
    $sql = "SET NAMES utf8";
    mysqli_query($conn,$sql);
    $sql = "INSERT INTO comments VALUES('$username','$comments','$tt');SELECT username,comments,time from comments order by time desc limit $start,$count";
    $sql_e = explode(";",$sql);
//    var_dump(count($sql_e));
    for($i=0;$i<count($sql_e);$i++){
        $result = mysqli_query($conn,$sql_e[$i]);
    }
    while($row = mysqli_fetch_assoc($result)){
        $output[] = $row;
    }
    for($i=0;$i<count($output);$i++){
        $output[$i]["time"] = date('Y-m-d H:i:s',$output[$i]["time"]);
    }
    $arr = [];
    if($result){
        $arr['msg'] = '发布成功';
    }else{
        $arr['msg'] = '发布失败';
        $arr['reason'] = "SQL语句执行失败：$sql";
    }
//    echo "{ \"username\" : \"$username\",\"comments\" : \"$comments\",\"time\" : \"$t\"}";
    echo json_encode($output);

?>