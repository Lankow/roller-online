if($(window).width()>=800) $('.pict-thumb').attr('src',"img/Random.jpg");
else $('.pict-thumb').attr('src',"img/RandomThumb.jpg");

//Start of cookies Code
let summsNames = ['Summoner','Summoner','Summoner','Summoner','Summoner'];

function loadNames(){

}
function updateNames(){
    $('.main-pick-summ').each( function() {
        $(this).text(summsNames[$('.main-pick-summ').index(this)]);
    });
}

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

//Start of rolling Code
class Champion{
    constructor(name,thumb) {
        this.name = name;
        this.thumb = thumb;
        //thumb has '.png' format in its string picture on the other hand needs "_0.jpg"
        this.picture = thumb.substring(0, thumb.length-4)+"_0.jpg";
    }
}


// App needs to download info about latest LoL version and then download latest champion info json
var versionUrl = 'https://ddragon.leagueoflegends.com/realms/eune.json';
var championsArray = new Array();
var championsUrl;
var version;
var championsData;
var keys;

function loadChamps(){
    if(championsData){
        for(i=0;i<keys.length;i++){
            var name = championsData[keys[i]].name;
            var image = championsData[keys[i]].image.full;
            var champion = new Champion(name,image);
            championsArray.push(champion);
        }
    }
}

$.getJSON(versionUrl, function(data){
        version = data.n.item;
        championsUrl = 'https://ddragon.leagueoflegends.com/cdn/'+ version +'/data/en_US/champion.json';
        $.getJSON(championsUrl, function(data){
        championsData = data.data;
        //json obtained from riot uses champion names as keys
        keys = Object.keys(championsData);
        loadChamps();
    })
})


function rollChamp(){
    var randChamp = championsArray[Math.floor(Math.random()*championsArray.length)];
    $( ".main-pick-name" ).each( function( index, champion ) {
        let flag = 1;
        if( randChamp && $(champion).text() == randChamp.name)  rollChamp();
    });
    return randChamp;
    }

//End of rolling Code
function resizeMenus(){
    if($(window).width()>=800){
        let menus = $('.main-pick-menu');
        let corner = $('.main-pick-options');
        menus.css("width", corner.css("width"));
    }
}

function addInactive(){
        const pick = inactivePick.clone(true,true);
        $('.main-pick-inactive').last().after(pick);
}

function addInactives(){
    while($('.main-pick-inactive').length < (5 - $('.main-pick:not(.main-pick-inactive').length)) addInactive();
}
function removeInactives(){
    $('.main-pick-inactive').remove();
}

function inactiveToActive(index){
    const pick = pickTemplate.clone(true,true);
    $('.main-pick-inactive').eq(index).after(pick);
    $('.main-pick-inactive').eq(index).remove();
    resizeMenus();
}

function activeToInactive(index){
    console.log(index);
    const pick = inactivePick.clone(true,true);
    $('.main-pick').eq(index).after(pick);
    $('.main-pick').eq(index).remove();
}

function activateAll(){
    $( ".main-pick-inactive" ).each( function() {
        inactiveToActive(0);
    });
}

function toggleAdd(){
    if($(window).width()>=800){
        let champs = $('.main-pick');
        let add = $('.main-add');
        if(champs>4){
            add.css("display", "none");
        }else{
            add.css("display", "flex");
        }
    }
}

var editSumm;
var counter = 0;

window.onload = function() {
    if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        document.body.addEventListener('touchstart', function() {}, false);
    }
    if($(window).width()>800){
        addInactives();
    }else{
        removeInactives();
    }
    resizeMenus();
    updateNames();
}


$( window ).resize(function() {
    if($(window).width()>800){
        // addInactives();
    }else{
        removeInactives();
    }
    resizeMenus();
  });

$('.trigger').click(function(e) {
    $(this).siblings('.main-pick-menu').toggleClass('menu-active');
});

$('.trigger-about').click(function(e) {
    $('#modal-about').addClass('modal-active');
});

$('.trigger-summoners').click(function(e) {
    $('#modal-summoners .modal-content-header').text("Edit Summoners");
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
    if(editSumm!=null){
            $('.main-pick-summ').eq(editSumm).text($('.modal-content-input').val());
            editSumm = null;    
    }else{
    const newNames = $('.modal-content-input');
    let currSumms = $('.main-pick-summ');
    for(i=0;i<newNames.length;i++){
        let newName = newNames.eq(i).val();
        if(newName) currSumms.eq(i).text(newName);
    }
    }
    $('.modal').removeClass('modal-active');
});

$('.trigger-close').click(function(e) {
    $('.modal').removeClass('modal-active');
    editSumm = null;
});


$('.menu-option-delete').click(function(e) {
    if($('.main-pick').length>1 && $(window).width()<800){
        if($('.main-pick').length==5) $('.main-add').removeClass('main-add-inactive');
        $(this).parents('.main-pick').remove();
    }else{
        activeToInactive($(this).parents('.main-pick').index());
    }
});

$('.main-pick:not(.main-pick-inactive) .main-pick-roll').click(function(e) {
    let champion = rollChamp();
    let image = $(this).parents().siblings('.main-pick-pict').children('.pict-thumb');
    let name = $(this).parents().siblings('.main-pick-name')
    let loader = image.siblings('.pict-loader');
    let url =""
    if($(window).width()<800) url = "https://ddragon.leagueoflegends.com/cdn/" + version + "/img/champion/" + champion.thumb;
    else url = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champion.picture;
    image.attr("src", loadImage(url,loader));
    name.text(champion.name);
    counter++;
    resizeMenus();
});

$('.main-pick-inactive .main-pick-roll').click(function(e) {
inactiveToActive($('.main-pick-inactive .main-pick-roll').index(this));
});

function loadImage(srcUrl, loader){
    loader.addClass('modal-active');
    var downloadingImage = new Image();
    downloadingImage.onload = function(){
        loader.removeClass('modal-active');
    }; 
    downloadingImage.src = srcUrl;
    return srcUrl;
}

$('.trigger-roll-team').click(function(e) {
    activateAll();
    while($('.main-pick').length < 5) $('.main-add').click();
    $('.main-pick-roll').click();
});

$('.trigger-roll-active').click(function(e) {
    $('.main-pick:not(.main-pick-inactive) .main-pick-roll').each( function() {
        $(this).click();
    });
    
});


$('.menu-option-edit').click(function(e) {
    $('#modal-summoners .modal-content-header').text("Edit Summoner");
    let currSum = $(this).parents('.main-pick').children('.main-pick-summ');
    editSumm = currSum.index('.main-pick-summ');
    const input = $('.modal-content-input:first').clone(true,true);
    $('.modal-content-input').remove();
        input.val(currSum.text());
        $( ".trigger-save" ).before(function() {
            return input;
          });
    $('#modal-summoners').addClass('modal-active');
});

$('#topbar-options-trigger').click(function(e) {
    $('.topbar-wrapper').toggleClass('topbar-wrapper-active');
    $('.topbar-options').toggleClass('topbar-options-active');
});

const pickTemplate = $(".main-pick").eq(0).clone(true, true);
const inactivePick = $(".main-pick-inactive").eq(0).clone(true, true);

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


