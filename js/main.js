(function(doc,win){
    var calculateHeight = function(){
        var winWidth = doc.documentElement.clientWidth;
        if((winWidth>768 && winWidth<991) || winWidth>991){
            // console.log(winWidth);
            var cw = $('.col1-1').width();
            $('.col1-1').css({
                'height': Math.round(cw / 5 * 7) + 'px'
            });
            var cw = $('.col1-1').height();
            $('.col2-2').css({
                'height': cw + 'px',
                'margin-bottom':'0'
            });
        }else if(winWidth<755){
            var cw = $('.col1-1').width();
            $('.col1-1').css({
                'height': cw / 5 * 7 + 'px'
            });
            $('.col2-2').css({
                'height': 'auto',
                'margin-bottom':'15px'
            });
        }
    };
    doc.addEventListener('DOMContentLoaded',calculateHeight,false);
    win.onresize = function () {
        calculateHeight();
    };
})(document,window)

$(function () {
    $('#menu-button').click(function (e) {
        e.preventDefault();
        $('body').toggleClass('pushed-left');
    });
    $('body').click(function (e) {
        var $body = $(this);
        var $target = $(e.target);
        if (($body.hasClass('pushed-left')) && $target.closest('#main-nav').length === 0 && $target.closest('#menu-button').length === 0) {
            e.preventDefault();
            $body.removeClass('pushed-left');
        }
    });
    // $('#options li a').bind("click",function () {
    //     $('a[class=selected]').removeClass('selected');
    //     $(this).addClass('selected');
    // })
    // function Ajax() {
    //     var xhr = null;
    //     if(window.ActiveXObject){
    //         xhr = new ActiveXObject("Microsoft.XMLHTTP");
    //     }else if(window.XMLHttpRequest){
    //         xhr = new XMLHttpRequest();
    //     }
    //     return xhr;
    // }
    function Praise() {
        // $('#praise i').attr("color","red");
        console.log("kosjf");
        return false;
    }
    // $('#praise').click(function () {
    //     $('#praise i').attr("color","red");
    // })
    var dataList = [];
    $.get("data/search.php?start=0",function (data) {
        for(var i=0;i<data.length;i++){
            var time = data[i].time;
            var username = data[i].username;
            var comments = data[i].comments;
            var $comment = $("<div class='comment'></div>");
            $comment.insertBefore($("hr"));
            var txtHtml = "<div class='comment-avatar lf'><img src='img/about02.jpg'></div><div class='comment-content lf'><p class='time'>"+time+"</p><h5 class='header'>"+username+"</h5><p class='text-justify'>"+comments+"</p><div class='comment-reply'><i class='glyphicon glyphicon-comment'></i><span>回复</span></div>";
            $comment.html(txtHtml);
            dataList[dataList.length] = data[i];
        }
        // return i;
    },"json");
    $("#form").submit(function () {
        // var data = {
        //     "username":$("#username").val(),
        //     "comments":$("#comments").val(),
        // }
        var data = $("#form").serialize();
        $.post("data/post.php",data,function (data) {
            console.log(data);
            $('.comment').remove();
            for(var i=0;i<data.length;i++){
                var time = data[i].time;
                var username = data[i].username;
                var comments = data[i].comments;
                var $comment = $("<div class='comment'></div>");
                $comment.insertBefore($("hr"));
                var txtHtml = "<div class='comment-avatar lf'><img src='img/about02.jpg'></div><div class='comment-content lf'><p class='time'>"+time+"</p><h5 class='header'>"+username+"</h5><p class='text-justify'>"+comments+"</p><div class='comment-reply'><i class='glyphicon glyphicon-comment'></i><span>回复</span></div>";
                $comment.html(txtHtml);
                dataList[dataList.length] = data[i];
                // dataList.unshift(data[i]);
            }
            console.log(dataList);
        },"json");
        return false;
    });
    $('#btn_next').click(function () {
        if($("#comment").children("div.comment").length<5){
            $('#btn_next').attr("disabled", true);
            alert('没有更多数据了！');
        }else{
            $('#btn_next').attr("disabled", false);
            console.log(dataList.length);
            $.get("data/show.php?start="+dataList.length,function (data) {
                // console.log(data);
                $('.comment').remove();
                // dataList = [];
                for (var i = 0; i < data.length; i++) {
                    var time = data[i].time;
                    var username = data[i].username;
                    var comments = data[i].comments;
                    var $comment = $("<div class='comment'></div>");
                    $comment.insertBefore($("hr"));
                    var txtHtml = "<div class='comment-avatar lf'><img src='img/about02.jpg'></div><div class='comment-content lf'><p class='time'>" + time + "</p><h5 class='header'>" + username + "</h5><p class='text-justify'>" + comments + "</p><div class='comment-reply'><i class='glyphicon glyphicon-comment'></i><span>回复</span></div>";
                    $comment.html(txtHtml);
                    dataList[dataList.length] = data[i];
                }
                console.log(dataList.length);
            })
        }
    })
    $('#btn_before').click(function () {
        // if($("#comment").children("div.comment").length<5){
        //     $('#btn_next').attr("disabled", true);
        //     alert('没有更多数据了！');
        // }else{
        $('#btn_next').attr("disabled", false);
        var len = $("#comment").children("div.comment").length;
        if(len<5){
            var start_val = dataList.length-len-5;
            for(var i=1;i<=len;i++){
                dataList.pop();
            }
            console.log(dataList.length);
        }else{
            console.log(dataList.length);

                if(dataList.length > 5){
                    for(var i=1;i<=5;i++){
                        dataList.pop();
                    }
                    start_val = dataList.length-5;
                }else {
                    start_val =  0;

                }
            // dataList.length != 0 ? start_val = dataList.length-5 : start_val =  0;
            console.log(start_val);
            console.log(dataList.length);
        }
        $.get("data/show.php?start="+start_val,function (data) {
            $('.comment').remove();
            for (var i = 0; i < data.length; i++) {
                var time = data[i].time;
                var username = data[i].username;
                var comments = data[i].comments;
                var $comment = $("<div class='comment'></div>");
                $comment.insertBefore($("hr"));
                var txtHtml = "<div class='comment-avatar lf'><img src='img/about02.jpg'></div><div class='comment-content lf'><p class='time'>" + time + "</p><h5 class='header'>" + username + "</h5><p class='text-justify'>" + comments + "</p><div class='comment-reply'><i class='glyphicon glyphicon-comment'></i><span>回复</span></div>";
                $comment.html(txtHtml);
                // var last = dataList.pop();
                // dataList[dataList.length] = data[i];
            }
            // for(var i=1;i<=len+5;i++){
            //     dataList.pop();
            // }
            // console.log(dataList.length);
        })
        // }
    })
})