if($(window).width()>=800) $('.pict-thumb').attr('src',"img/Random.jpg");
else $('.pict-thumb').attr('src',"img/RandomThumb.jpg");

//Start of cookies Code
let summsNames;

function loadSumms(){
    for(i=0;i<summsNames.length;i++){
        if (summsNames[i].toUpperCase() != ("Summoner").toUpperCase()){
            
            if($(window).width()>=800){
                if (i>0) inactiveToActive(0);
                $('.main-pick:not(.main-pick-inactive) .main-pick-summ').last().text(summsNames[i]);
            }else{
                if (i>0) $('.main-add').click();
                $('.main-pick-summ').last().text(summsNames[i]);   
            }
        } 
    }
    saveNames();
}
function saveNames(){
    $('.main-pick-summ').each( function() {
        summsNames[$('.main-pick-summ').index(this)] = $(this).text();
    });
}
function updateNames(){
    $('.main-pick-summ').each( function() {
        $(this).text(summsNames[$('.main-pick-summ').index(this)]);
    });
}

function createSummsCookie() {
        let summsString="";
        for(i=0;i<summsNames.length;i++){
            summsString+=summsNames[i];
            if(i<summsNames.length-1) summsString+="$";
        }
        setCookie("summs",summsString,7);
}

function getSummsCookie() {
    summsString = getCookie("summs");
    if(summsNames != ""){
        summsNames=summsString.split("$");
        for(i=0;i<5;i++){
            console.log(summsNames[i]);
            if(summsNames[i]=="" || !summsNames[i]==undefined) summsNames[i]="Summoner";
        }
    }
    } 

function removeOnMobile(index){
    let counter=0;
    for(i=0;i<summsNames.length;i++){
        if (summsNames[i].toUpperCase() != ("Summoner").toUpperCase()){
            if(counter == index){
                summsNames[i]="Summoner";
                return;
            }else counter++;
        }
    }
}

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    summCookie = cname + "=" + cvalue + ";" + expires + ";path=/"
    document.cookie = summCookie;
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
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
let versionUrl = 'https://ddragon.leagueoflegends.com/realms/eune.json';
let championsArray = new Array();
let championsUrl;
let version;
let championsData;
let keys;

function loadChamps(){
    if(championsData){
        for(i=0;i<keys.length;i++){
            let name = championsData[keys[i]].name;
            let image = championsData[keys[i]].image.full;
            let champion = new Champion(name,image);
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
    let randChamp = championsArray[Math.floor(Math.random()*championsArray.length)];
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
        if($('.main-pick-inactive').length == 0){
            $('.main-pick').last().after(pick);
        }else{
            $('.main-pick-inactive').last().after(pick);
        }
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

function editToActive(pickToReplace){
    const pick = pickTemplate.clone(true,true);
    pickToReplace.after(pick);
    pickToReplace.remove();
    resizeMenus();
}

function activeToInactive(index){
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

let editSumm;
let counter = 0;

window.onload = function() {
    if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        document.body.addEventListener('touchstart', function() {}, false);
    }
    if($(window).width()>800){
        addInactives();
    }else{
        removeInactives();
    }
    getSummsCookie();
    loadSumms();
    resizeMenus();
}

function swapDefaultImages(width){
    $('.pict-thumb').each( function() {
    if(width>=800 && $(this).attr('src') == "img/RandomThumb.jpg"){
        $(this).attr('src',"img/Random.jpg");
    }else if(width<800 && $(this).attr('src') == "img/Random.jpg"){
        $(this).attr('src',"img/RandomThumb.jpg");
    }else if($(this).attr('src') != "img/RandomThumb.jpg" && $(this).attr('src') != "img/Random.jpg"){
        let url;
        let champion;
        if(width>=800){
                champion = $(this).attr('src');
                if(champion.includes(".png")){
                    champion = champion.substring(champion.lastIndexOf("/")+1,champion.lastIndexOf("."))+"_0.jpg";
                    url = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champion;
                    $(this).attr("src", loadImage(url,$(this).siblings('.pict-loader')));
                }
        }else{
            champion = $(this).attr('src');
            if(champion.includes(".jpg")){
                champion = champion.substring(champion.lastIndexOf("/")+1,champion.lastIndexOf("_")) +".png";
                url = "https://ddragon.leagueoflegends.com/cdn/" + version + "/img/champion/" + champion;
                $(this).attr("src", loadImage(url,$(this).siblings('.pict-loader')));
            }
            
        }
    }
});
}

$( window ).resize(function() {
    if($(window).width()>800){
        if($('.main-pick-inactive').length == 0) addInactives();
    }else{
        removeInactives();
    }
    swapDefaultImages($(window).width());
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
        if(currSumms.eq(i).parents('.main-pick-inactive').length == 1 && newNames.eq(i).val().toUpperCase() != "Summoner".toUpperCase()){
            console.log(currSumms.eq(i).parents('.main-pick-inactive').index());
            editToActive(currSumms.eq(i).parent('.main-pick-inactive'));
        } 
        let newName = newNames.eq(i).val();
        if(newName) $('.main-pick-summ').eq(i).text(newName);
    }
    }
    $('.modal').removeClass('modal-active');
    saveNames();
    createSummsCookie();
});

$('.trigger-close').click(function(e) {
    $('.modal').removeClass('modal-active');
    editSumm = null;
});


$('.menu-option-delete').click(function(e) {
    if($('.main-pick').length>1 && $(window).width()<800){
        if($('.main-pick').length==5) $('.main-add').removeClass('main-add-inactive');
        removeOnMobile($(this).parents('.main-pick').index());
        $(this).parents('.main-pick').remove();
    }else{
        activeToInactive($(this).parents('.main-pick').index());
        summsNames[$(this).parents('.main-pick').index()]="Summoner";
    }
    saveNames();
    createSummsCookie();
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
    let downloadingImage = new Image();
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


