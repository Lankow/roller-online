const pickTemplate = "<div class='main-pick'>" + $(".main-pick").eq(0).html() + "</div>";

window.onload = function() {
    if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        document.body.addEventListener('touchstart', function() {}, false);
    }
}

$('.trigger').click(function(e) {
    $(this).siblings('.main-pick-menu').toggleClass('menu-active');
});

$('#topbar-options-trigger').click(function(e) {
    $('.topbar-wrapper').toggleClass('topbar-wrapper-active');
    $('.topbar-options').toggleClass('topbar-options-active');
});

$('.main-add').click(function(e) {
    if($('.main-pick').length<5){
        $( ".main-pick" ).eq(-1).after(function() {
            return pickTemplate;
            
          });
    if($('.main-pick').length==5){
         $('.main-add').toggleClass('main-add-inactive');
    }
    }else{}
});


