let sounds = document.querySelector("#effects");
let music = document.createElement("AUDIO");
music.setAttribute("src", "sounds/music.mp3");
music.setAttribute("loop", "");
music.currentTime = 50;
sounds.appendChild(music);
let ogreScream = document.createElement("AUDIO");
ogreScream.setAttribute("src", "sounds/ogreScream.mp3");
sounds.appendChild(ogreScream);
let ogreLaugh = document.createElement("AUDIO");
ogreLaugh.setAttribute("src", "sounds/ogreLaugh.mp3");
sounds.appendChild(ogreLaugh);
ogreLaugh.play();
let deathSound = document.createElement("AUDIO");
deathSound.setAttribute("src", "sounds/death.mp3");
sounds.appendChild(deathSound);
let movement = document.createElement("AUDIO");
movement.setAttribute("src", "sounds/movement.mp3");
sounds.appendChild(movement);
let shotSound = document.createElement("AUDIO");
shotSound.setAttribute("src", "sounds/shot.mp3");
sounds.appendChild(shotSound);
let reloadSound = document.createElement("AUDIO");
reloadSound.setAttribute("src", "sounds/reload.mp3");
sounds.appendChild(reloadSound);
let pingSound = document.createElement("AUDIO");
pingSound.setAttribute("src", "sounds/ping.mp3");
sounds.appendChild(pingSound);
let controlsInfo =
`Bienvenido a Ogre's Attack! 
En este juego deberas evitar que los Ogros destruyan el arma y capturen tu base, necesitas tres disparos para matar un ogro.
No te preocupes por la municion. Esta es infinita! 
Pero ten cuidado, a veces el arma no se recarga bien...
Te recomendamos que no recargues y dispares muy rapido, esto hara que el cañon pierda su potencia y el ogro no morira.

Tienes 3 vidas, cada vez q un Ogro llegue a tu arma perderas una vida.
Si te quedas sin vidas pierdes, y podras guardar tu puntaje con un nombre que elegiras.
Para ganar debes matar 50 Ogros...
Buenas Suerte!

Controles:
D = Disparar. 
R = Recargar. 
Flecha hacia arriba = Subir arma. 
Flecha hacia abajo = Bajar arma. 
M = Activar Musica.
N = Silenciar Musica.
C = Controles.
F5 = Reiniciar.
Esc = Salir del juego.`;
alert(controlsInfo);
let gun = document.querySelector("#gun");
let ammo = document.querySelector("#ammo");
let monster = document.querySelector("#monster");
let monsterEyeL = document.querySelector("#eye-L");
let monsterEyeR = document.querySelector("#eye-R");
let monsterMouth = document.querySelector("#mouth");
let shotOne = document.querySelector("#shotOne");
let kills = document.querySelector("#kills");
let killsCount = kills.textContent;
killsCount = parseInt(killsCount);
let score = document.querySelector("#score");
let scoreCount = score.textContent;
scoreCount = parseInt(scoreCount);
let lives = document.querySelector("#lives");
let livesCount = lives.textContent;
livesCount = parseInt(livesCount);
let scoresNames = [];
let numbershot = [0];
const saveScores =()=>{
    let decide = prompt(`Kills: ${killsCount}. Puntuacion: ${scoreCount}. Quieres guardar estos datos? S-Si N-No`);
    let scoreTableDiv = document.querySelector(".score-table-container");
    let scoreKeptQuantity = scoreTableDiv.children;
    scoreKeptQuantity = scoreKeptQuantity.length;     
    if (decide == "S" && scoreKeptQuantity < 5) {
        let name = prompt("Que nombre le pondras a este puntaje?");
        scoresNames.push(name);
        name = document.createTextNode(name);
        let scoreKept = document.createElement("DIV");
        let scoreName = document.createElement("H2");
        scoreName.setAttribute("id", "score-name" + (scoreKeptQuantity + 1));
        scoreName.setAttribute("class", "score-name");
        scoreName.appendChild(name);
        let scoreTable = document.createElement("TABLE");
        let thead = document.createElement("THEAD");
        let thK = document.createElement("TH");
        let thS = document.createElement("TH");
        let thKT = document.createTextNode("Kills");
        let thST = document.createTextNode("Score");
        thK.appendChild(thKT);
        thS.appendChild(thST);
        thead.appendChild(thK);
        thead.appendChild(thS);
        let tr = document.createElement("TR");
        let tdK = document.createElement("TD");
        let tdS = document.createElement("TD");
        let tdKT = document.createTextNode(killsCount);
        let tdST = document.createTextNode(scoreCount);
        tdK.setAttribute("id", "score-kills" + (scoreKeptQuantity + 1));
        tdS.setAttribute("id", "score-quantity" + (scoreKeptQuantity + 1));
        tdK.appendChild(tdKT);
        tdS.appendChild(tdST);
        tr.appendChild(tdK);
        tr.appendChild(tdS);
        scoreTable.appendChild(thead);
        scoreTable.appendChild(tr);
        scoreTable.setAttribute("class", "score-table");
        scoreKept.appendChild(scoreName);
        scoreKept.appendChild(scoreTable);
        scoreKept.setAttribute("class", "score-kept");
        scoreTableDiv.appendChild(scoreKept);
    } else if(decide == "S" && scoreKeptQuantity == 5){
        function rewriting() {
            alert("Ya tienes 5 puntajes guardados, debes sobreescribir uno para continuar");
            let rewrite = prompt(`A cual quieres eliminar? 1- ${scoresNames[0]} 2- ${scoresNames[1]} 3- ${scoresNames[2]} 4- ${scoresNames[3]} 5- ${scoresNames[4]}`);
            rewrite = parseInt(rewrite);
            if (rewrite != NaN && rewrite != undefined) {
                let newName  = prompt("Que nombre le pondras?");
                let lastName = document.querySelector(`#score-name${rewrite}`);
                lastName.innerHTML = newName;
                let lastKills = document.querySelector(`#score-kills${rewrite}`);
                lastKills.innerHTML = killsCount;
                let lastScore = document.querySelector(`#score-quantity${rewrite}`);
                lastScore.innerHTML = scoreCount;
            } else{
                alert("Debes decidir entre las opciones q te di");
                let decide = prompt("Quieres Intentarlo de nuevo? S-Si N-NO");
                if (decide == "S") {
                    rewriting();
                } else{
                    alert("OK");
                };
            };
        }
        rewriting();
    } else{
        alert("OK");
    };
    restart();
};
const monsterAttack = () =>{
    monster.style.transition = "none";
    monster.style.right = "10px";
    monster.style.transition = "right 3s linear";
    monster.style.right = "800px";
    setTimeout(() => {   
        let monsterPosition = monster.getBoundingClientRect();
        let XMonster = monsterPosition.right;
        if (XMonster <= 650) {
            livesCount -= 1;
            lives.innerHTML = livesCount;
            if (livesCount === 0){
                livesCount = 0;
                lives.innerHTML = livesCount;
                gun.style.top = "1000px";         
                setTimeout(() => {
                    gun.style.display ="none"; 
                }, 500);  
                music.pause();
                ogreLaugh.play();
                monster.style.right = "1060px";
                monster.style.top = "100px";
                setTimeout(() => {
                    saveScores();
                }, 3010);
            } else if (livesCount === 1) {
                gun.style.backgroundColor = "#444"; 
                monster.style.transition = "none";
                monster.style.right = "0px";
                setTimeout(() => {
                    monsterAttack();
                }, 100);
            } else if(livesCount === 2){    
                gun.style.backgroundColor = "#aaa";      
                monster.style.transition = "none";
                monster.style.right = "0px";
                setTimeout(() => {
                    monsterAttack();
                }, 100);
            } else if(livesCount === 3){
                monster.style.transition = "none";
                monster.style.right = "0px";
                setTimeout(() => {
                    monsterAttack();
                }, 100);
            };  
        };
    }, 3000);
};
const setTop = () =>{
    let randomTop = Math.random();
    randomTop = Math.round(randomTop);
    if (randomTop === 1) {
        monster.style.top = "10%";
        monster.style.right = "0px";
    } else if (randomTop === 0){
        monster.style.top = "55%";
        monster.style.right = "0px";
    };
    setTimeout(() => {
        monsterAttack();
    }, 100);
};
setTop();
const anotherOne =() =>{
    monster.style.transition ="none";
    monster.style.display = "block";
    monster.style.width = "200px";
    monster.style.height = "180px";
    monster.style.backgroundColor = "#070";
    monster.style.borderTop = "50px solid #020";
    monster.style.borderBottom = "10px solid #020";
    monster.style.borderRadius = "0% 0% 30% 30%";
    setTimeout(() => {
        monsterEyeL.style.display = "inline-block";
        monsterEyeL.style.backgroundColor = "#000";
        monsterEyeL.style.borderTop = "5px solid #aaa"; 
        monsterEyeR.style.display = "inline-block";
        monsterEyeR.style.backgroundColor = "#000";
        monsterEyeR.style.borderTop = "5px solid #aaa";  
        monsterMouth.style.display ="inline-block";  
        monsterMouth.style.backgroundColor = "#700";
        monsterMouth.style.borderRadius = "0% 0% 50% 50%";
    }, 110);
    ogreScream.play();
    setTop();
};
const restart = () =>{   
    gun.style.transition = "none";
    monster.style.transition ="none";
    gun.style.top = "10%";
    gun.style.display = "block";
    gun.style.backgroundColor = "#fff"; 
    monster.style.transition ="none";
    monster.style.display = "block";
    monster.style.position = "absolute";
    monster.style.width = "200px";
    monster.style.height = "180px";
    monster.style.backgroundColor = "#070";
    monster.style.borderTop = "50px solid #020";
    monster.style.borderBottom = "10px solid #020";
    monster.style.top = "10%";
    monster.style.right = "10px";
    monster.style.borderRadius = "0% 0% 30% 30%";
    monsterEyeL.style.display = "inline-block";
    monsterEyeL.style.backgroundColor = "#000";
    monsterEyeL.style.borderTop = "5px solid #aaa";
    monsterEyeR.style.display = "inline-block";
    monsterEyeR.style.backgroundColor = "#000";
    monsterEyeR.style.borderTop = "5px solid #aaa";
    monsterMouth.style.display ="inline-block";  
    monsterMouth.style.backgroundColor = "#700";
    monsterMouth.style.borderRadius = "0% 0% 50% 50%";
    gun.style.transition = "top .1s linear";
    killsCount = 0;
    kills.innerHTML = killsCount;
    scoreCount = 0;
    score.innerHTML = scoreCount;
    livesCount = 3;
    lives.innerHTML = livesCount;
    setTimeout(() => {
        monsterAttack();
    }, 1000);
};
const killMonster = (time) =>{
    let gunPosition = gun.getBoundingClientRect();
    let monsterPosition = monster.getBoundingClientRect();
    let topGun = gunPosition.top;
    let topMonster = monsterPosition.top;
    let XMonster = monsterPosition.right;
    if(topGun == topMonster && time == 1){    
        monster.style.right = `${1440 - XMonster}px`;
        ogreScream.currentTime = .5;
        ogreScream.play();
        if (topMonster === 82) {
            monster.style.top = "55%";
        } else if (topMonster === 284.5){
            monster.style.top = "10%";
        };
        monster.style.backgroundColor = "#660";
        monster.style.borderBottom = "10px solid #aaa";
        monster.style.borderTop="50px solid #000";
        monster.style.borderRadius ="0% 0% 30% 30%";
        monsterMouth.style.borderRadius = "0% 0% 0% 0%";
        monsterMouth.style.backgroundColor = "#400";
        monsterEyeL.style.backgroundColor="#000";
        monsterEyeR.style.backgroundColor="#000";
        monsterAttack();
    } else if(topGun == topMonster && time == 2){        
        monster.style.right = `${1440 - XMonster}px`; 
        ogreScream.currentTime = .5;
        ogreScream.play();
        if (topMonster === 82) {
            monster.style.top = "55%";
        } else if (topMonster === 284.5){
            monster.style.top = "10%";
        };
        monster.style.backgroundColor = "#600";
        monster.style.borderBottom = "10px solid #333";
        monster.style.borderTop="50px solid #444";
        monster.style.borderRadius ="0% 0% 30% 30%";
        monsterMouth.style.borderRadius = "50% 50% 0% 0%";
        monsterMouth.style.backgroundColor = "#100";
        monsterEyeL.style.backgroundColor="#000";
        monsterEyeR.style.backgroundColor="#000";
        monsterAttack();
    } else if(topGun == topMonster && time == 3){
        monster.style.right = `${1440 - XMonster}px`;
        deathSound.play();
        monster.style.backgroundColor = "#fff";
        monster.style.borderRadius = "50% 50% 0% 0%";
        monster.style.borderBottom = "none";
        monster.style.borderTop = "none";
        monsterMouth.style.borderRadius = "50% 50% 0% 0%";
        monsterMouth.style.height ="25px";
        monsterMouth.style.backgroundColor = "#aaa";
        monsterEyeL.style.backgroundColor="#aaa";
        monsterEyeR.style.backgroundColor="#aaa";
        monster.style.transition = "right 1s linear, top 1s linear, width 1s linear, height 1s linear";    
        setTimeout(() => {
            monster.style.top = "450px";
            monster.style.right = "640px";
            monster.style.width = "100px";
            monster.style.height = "40px";
            monsterEyeL.style.display = "none";
            monsterEyeR.style.display = "none";
            monsterMouth.style.display ="none";  
        }, 1000);
        setTimeout(() => {
            monster.style.display ="none";
            pingSound.play();
            killsCount += 1;
            kills.innerHTML = killsCount;
            if(killsCount === 50){    
                scoreCount += 500;
                score.innerHTML = scoreCount;
                let decide = prompt("Ganaste!!! Quieres jugar otra vez? S-Si N-No");
                if (decide == "S"){
                    alert("Esta bien!");
                    saveValues();
                }else{
                    alert("Esta bien! Hasta la proxima!");
                    alert("Saliendo del juego...");
                };
            } else if(killsCount >= 40){
                scoreCount += 500;
                score.innerHTML = scoreCount;
            } else if (killsCount >= 20 && killsCount < 30){
                scoreCount += 400;
                score.innerHTML = scoreCount;
            } else if (killsCount >= 10 && killsCount < 20){
                scoreCount += 300;
                score.innerHTML = scoreCount;
            } else if (killsCount >= 0 && killsCount < 10){
                scoreCount += 200;
                score.innerHTML = scoreCount;
            } else{
                scoreCount += 100;
                score.innerHTML = scoreCount;
            };
            numbershot.splice(0, 3);
            anotherOne();
        }, 2000);
    };
};
const shot = (time) =>{
    let gunPosition = gun.getBoundingClientRect();
    let monsterPosition = monster.getBoundingClientRect();
    let topGun = gunPosition.top;
    let topMonster = monsterPosition.top;
    let visible = ammo.getAttribute("hidden");
    if(visible === null){
        shotSound.currentTime = .1;
        shotSound.play();
        ammo.style.width = "150%";
        ammo.style.height = "100%";
        ammo.style.left ="1100px";
        ammo.style.transition ="width .2s linear, height .2s linear, left .5s ease-out";   
        setTimeout(() => {
            ammo.setAttribute("hidden", "");
        }, 510);
        if (topGun == topMonster){
            let i = numbershot[0];
            i++;
            numbershot.unshift(i);
            time = i;        
            killMonster(time);
        };
    } else{
        movement.currentTime = .1;
        movement.play();
        shotOne.style.backgroundColor = "#000";
        shotOne.style.border = "1px solid #fff";
        shotOne.style.color = "#eee";
    };
};
const reload =() =>{
    reloadSound.currentTime = .2;
    reloadSound.play();
    shotOne.style.backgroundColor = "#fff";
    shotOne.style.border = "1px solid #000";
    shotOne.style.color = "#000";
    ammo.style.transition ="none";
    ammo.style.width = "50%";
    ammo.style.height = "50%";
    ammo.style.left ="0%";
    ammo.removeAttribute("hidden");
};
const controls = (event, position) =>{
    let dir = event.which || event.keyCode;
    if(dir === 27){
        alert("Saliendo");
    }; 
    if(dir === 67){
        alert(controlsInfo);
    };
    if(dir === 77){
        music.play(); 
    }else if(dir === 78){
        music.pause();
    };
    if(dir === 68){
        shot();
    } else if (dir === 82){
        reload();
    };
    if(dir === 40){
        position += 25; 
        gun.style.top = `${position}%`;
        movement.currentTime = .4;
        movement.play();
    } else if (dir === 38){
        position -= 20;
        gun.style.top = `${position}%`;
        movement.currentTime = .4;
        movement.play();
    };
}; 
