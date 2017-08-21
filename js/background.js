$(function () {
    $('.g-sd>li>a').click(function () {
        var $this = $(this);
        var checkElement = $this.next();
        if(checkElement.is('.g-ssd') && checkElement.is(':visible')){
            checkElement.slideUp(300);
            checkElement.parent().removeClass('z-crt');
        }else if(!checkElement.is(':visible')){
            $this.parent().parent().find('.g-ssd').slideUp(300);
            checkElement.slideDown(300);
            $('a[class=z-crt]').removeClass('z-crt');
            $this.addClass('z-crt');
        }
    })
})
