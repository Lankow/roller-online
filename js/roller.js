// const menuTrigger = document.querySelector('#topbar-options-trigger');
// const menu = document.querySelector('.topbar-wrapper');
// menuTrigger.addEventListener('click', handleClick);
// const handleClick = () => {
//     menu.classList.toggle('topbar-options-active');
//  }

$('.trigger').click(function(e) {
    $(this).siblings('.main-pick-menu').toggleClass('menu-active');
});

$('#topbar-options-trigger').click(function(e) {
    $('.topbar-wrapper').toggleClass('topbar-wrapper-active');
    $('.topbar-options').toggleClass('topbar-options-active');
});