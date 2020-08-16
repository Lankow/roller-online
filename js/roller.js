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

$('.trigger-summoners').click(function(e) {
    const inputTemplate = $('.modal-content-input:first').clone(true,true);
    $('.modal-content-input').remove();
    let currSumms = $('.main-pick-summ');
    for(i=0;i<currSumms.length;i++){
        let input = inputTemplate.clone(true,true);
        input.val(currSumms.eq(i).text());
        $( ".trigger-save" ).before(function() {
            return input;
          });
    }
    $('#modal-summoners').addClass('modal-active');
});

$('.trigger-save').click(function(e) {
    const newNames = $('.modal-content-input');
    let currSumms = $('.main-pick-summ');
    for(i=0;i<newNames.length;i++){
        let newName = newNames.eq(i).val();
        if(newName) currSumms.eq(i).text(newName);
    }
    $('.modal').removeClass('modal-active');
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


