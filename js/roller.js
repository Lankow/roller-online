// Function to enable active pseudoclass on mobile
window.onload = function() {
    if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        document.body.addEventListener('touchstart', function() {}, false);
    }
}

$('.trigger').click(function(e) {
    $(this).siblings('.main-pick-menu').toggleClass('menu-active');
});

$('.trigger-about').click(function(e) {
    $('#modal-about').addClass('modal-active');
});

$('.trigger-close').click(function(e) {
    $('.modal').removeClass('modal-active');
});


$('.menu-option-delete').click(function(e) {
    if($('.main-pick').length>1){
        if($('.main-pick').length==5) $('.main-add').removeClass('main-add-inactive');
        $(this).parents('.main-pick').remove();
    }
});

$('#topbar-options-trigger').click(function(e) {
    $('.topbar-wrapper').toggleClass('topbar-wrapper-active');
    $('.topbar-options').toggleClass('topbar-options-active');
});

const pickTemplate = $(".main-pick").clone(true, true);

$('.main-add').click(function(e) {
    if($('.main-pick').length<5){
        $( ".main-pick" ).eq(-1).after(function() {
            const pick = pickTemplate.clone(true,true);
            return pick;
          });
    if($('.main-pick').length==5){
         $('.main-add').addClass('main-add-inactive');
    }
    }
});


