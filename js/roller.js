        class Champion{
            constructor(name,thumb) {
                this.name = name;
                this.thumb = thumb;
                this.picture = thumb.substring(0, thumb.length-4)+"_0.jpg";
            }
        }
        
        var aboutModal = document.getElementById('aboutModal');
        var editWrapper = document.getElementById('edit-wrapper');
        var aboutWrapper = document.getElementById('about-wrapper');
        
        var aboutBtn = document.getElementById("aboutBtn");
        var editBtn = document.getElementById('editBtn')
        var updateBtn = document.getElementById('updateBtn');
        
        var aboutSpan = document.getElementsByClassName("close")[0];

        aboutBtn.onclick = function() {
            aboutModal.style.display = "block";
            aboutWrapper.style.display = "block";
            editWrapper.style.display = "none";
        }
        
        editBtn.onclick = function() {
            aboutModal.style.display = "block";
            editWrapper.style.display = "block";
            aboutWrapper.style.display = "none";
        }

        aboutSpan.onclick = function() {
            aboutModal.style.display = "none";
        }
        
        window.onclick = function(event) {
            if (event.target == aboutModal) {
                aboutModal.style.display = "none";
            }
        }
        
        
        var teamBtn = document.getElementById("roll-team-btn");
        var content = document.getElementById("board");
        
        teamBtn.onclick = function() {
            teamBtn.style.display = "none";
            content.classList.add('fade-in');
            content.style.display = "grid";
        }
        
        updateBtn.onclick = function() {
            var summs = document.getElementsByClassName('summ-name');
            var editSumms = document.getElementsByName('summ-edit');
            for(i=0;i<5;i++){
                if(editSumms[i].value){
                    summs[i].innerHTML = editSumms[i].value;
                }
            }
            aboutModal.style.display = "none";
        }
        
      
       
        // Download current LoL version
        var versionUrl = 'https://ddragon.leagueoflegends.com/realms/eune.json';
        // Using current version generate link for champion data JSON
        var championsUrl;
        var version;
        var championsData;
        var championsArray = new Array();
        var keys
        
        $.getJSON(versionUrl, function(data){
                version = data.n.item.substring(0, data.n.item.length-4);
                championsUrl = 'http://ddragon.leagueoflegends.com/cdn/'+ version +'/data/en_US/champion.json';
                $.getJSON(championsUrl, function(data){
                championsData = data.data;
                keys = Object.keys(championsData);
            })
        })
       
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
        
            function makeAPick(number){
                if(championsArray.length==0) loadChamps();
                var pick = document.getElementById("champ"+number);
                var pickImg = document.getElementById("champPic"+number);
                var pickThumb = document.getElementById("champThumb"+number);
                randChamp = rollChamp(number);
                pick.innerHTML = randChamp.name;
                pickImg.src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + randChamp.picture;
                pickThumb.src = "http://ddragon.leagueoflegends.com/cdn/10.10.3208608/img/champion/" + randChamp.thumb;
            }
            
            function rollChamp(number){
            var randChamp = championsArray[Math.floor(Math.random()*championsArray.length)];
            for(i=1;i<6;i++){
            var otherPick = document.getElementById("champ"+i);
            if(otherPick == randChamp.name){
                rollChamp(number);
            }
            }
            return randChamp;
            }
            
        
