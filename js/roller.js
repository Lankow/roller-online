        class Champion{
            constructor(name,thumb) {
                this.name = name;
                this.thumb = thumb;
                //thumb has '.png' format in its string picture on the other hand needs "_0.jpg"
                this.picture = thumb.substring(0, thumb.length-4)+"_0.jpg";
            }
        }
        
        var modal = document.getElementById('modal');
        var editWrapper = document.getElementById('edit-wrapper');
        var aboutWrapper = document.getElementById('about-wrapper');
        
        var aboutBtn = document.getElementById("aboutBtn");
        var editBtn = document.getElementById('editBtn')
        var updateBtn = document.getElementById('updateBtn');
        
        var aboutSpan = document.getElementsByClassName("close")[0];

        aboutBtn.onclick = function() {
            modal.style.display = "block";
            aboutWrapper.style.display = "block";
            editWrapper.style.display = "none";
        }
        
        editBtn.onclick = function() {
            modal
            editWrapper.style.display = "block";
            aboutWrapper.style.display = "none";
        }

        aboutSpan.onclick = function() {
            modal.style.display = "none";
        }
        
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
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
            modal.style.display = "none";
        }
        
        // App needs to download info about latest LoL version and then download latest champion info json
        var versionUrl = 'https://ddragon.leagueoflegends.com/realms/eune.json';
        var championsArray = new Array();
        var championsUrl;
        var version;
        var championsData;
        var keys;
        
        $.getJSON(versionUrl, function(data){
                version = data.n.item.substring(0, data.n.item.length-4);
                championsUrl = 'http://ddragon.leagueoflegends.com/cdn/'+ version +'/data/en_US/champion.json';
                $.getJSON(championsUrl, function(data){
                championsData = data.data;
                //json obtained from riot uses champion names as keys
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
            
             //On making a first pick app checks if array is empty in order to convert Json champion info to champion class objects
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
            
            //Function checks if currently randomized champion is unique - if not it recurently searches for another one
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
            
        
