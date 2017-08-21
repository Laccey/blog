<?php
    header("Content-type:application/json");
    $output = [];
    date_default_timezone_set('prc');
    @$username = $_GET['name'];
    @$comments = $_GET['comments'];
    @$start = $_REQUEST['start'];
    $count = 5;

    $conn = mysqli_connect('23.106.158.44','root','chouchoushigesichouchou','myblog');
    $sql = "SET NAMES utf8";
    mysqli_query($conn,$sql);
    $sql = "SELECT username,comments,time from comments order by time desc limit $start,$count";
    $result = mysqli_query($conn,$sql);
//    var_dump($result);
    while($row = mysqli_fetch_assoc($result)){
        $output[] = $row;
    }
    for($i=0;$i<count($output);$i++){
        $output[$i]["time"] = date('Y-m-d H:i:s',$output[$i]["time"]);
    }
    echo json_encode($output);
?>