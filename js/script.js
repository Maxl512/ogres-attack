let windowSize = window.screen;
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
let theTopMonster = [];
let theTopGun = [1];
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
    monster.style.right = "0vw";
    monster.style.transition = "right 3s linear";
    monster.style.right = "57vw";
    setTimeout(() => { 
        monsterPosition = monster.getBoundingClientRect();
        XMonster = monsterPosition.right;
        let destiny =  (windowSize.width - XMonster) * 0.1;
        setTimeout(() => {
            if(windowSize.width > 1000 && windowSize.width <= 2000){
                if (destiny > 56 && destiny <= 115) {
                    livesCount -= 1;
                    lives.innerHTML = livesCount;
                    if (livesCount === 0){
                        livesCount = 0;
                        lives.innerHTML = livesCount;
                        gun.style.top = "130vh";         
                        setTimeout(() => {
                            gun.style.display ="none"; 
                        }, 500);  
                        music.pause();
                        ogreLaugh.play();
                        monster.style.right = "75vw";
                        monster.style.top = "20vh";
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
                        monster.style.right = "0vw";
                        setTimeout(() => {
                            monsterAttack();
                        }, 100);
                    } else if(livesCount === 3){
                        monster.style.transition = "none";
                        monster.style.right = "0vw";
                        setTimeout(() => {
                            monsterAttack();
                        }, 100);
                    };  
                };
            }else if (windowSize.width >= 700 && windowSize.width <= 1000) {
                if (destiny >= 39 && destiny <= 57) {
                    livesCount -= 1;
                    lives.innerHTML = livesCount;
                    if (livesCount === 0){
                        livesCount = 0;
                        lives.innerHTML = livesCount;
                        gun.style.top = "130vh";         
                        setTimeout(() => {
                            gun.style.display ="none"; 
                        }, 500);  
                        music.pause();
                        ogreLaugh.play();
                        monster.style.right = "75vw";
                        monster.style.top = "20vh";
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
                        monster.style.right = "0vw";
                        setTimeout(() => {
                            monsterAttack();
                        }, 100);
                    } else if(livesCount === 3){
                        monster.style.transition = "none";
                        monster.style.right = "0vw";
                        setTimeout(() => {
                            monsterAttack();
                        }, 100);
                    };  
                };
            } else if (windowSize.width < 700){
                if (destiny >= 20 && destiny < 40) {
                    livesCount -= 1;
                    lives.innerHTML = livesCount;
                    if (livesCount === 0){
                        livesCount = 0;
                        lives.innerHTML = livesCount;
                        gun.style.top = "130vh";         
                        setTimeout(() => {
                            gun.style.display ="none"; 
                        }, 500);  
                        music.pause();
                        ogreLaugh.play();
                        monster.style.right = "75vw";
                        monster.style.top = "20vh";
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
                        monster.style.right = "0vw";
                        setTimeout(() => {
                            monsterAttack();
                        }, 100);
                    } else if(livesCount === 3){
                        monster.style.transition = "none";
                        monster.style.right = "0vw";
                        setTimeout(() => {
                            monsterAttack();
                        }, 100);
                    };  
                };
            };
        }, 100);
    }, 3000);
};
const setTop = () =>{
    let randomTop = Math.random();
    randomTop = Math.round(randomTop);
    if (randomTop === 1) {
        monster.style.top = "10%";
        monster.style.right = "0vw";
        theTopMonster.unshift(1);
    } else if (randomTop === 0){
        monster.style.top = "55%";
        monster.style.right = "0vw";
        theTopMonster.unshift(0);
    };
    setTimeout(() => {
        monsterAttack();
    }, 100);
};
setTop();
const anotherOne =() =>{
    monster.style.right ="0vw";
    monster.style.transition ="none";
    monster.style.display = "block";
    monster.style.width = "14vw";
    monster.style.height = "23vh";
    monster.style.backgroundColor = "#070";
    monster.style.borderTop = "5vh solid #020";
    monster.style.borderBottom = "1vh solid #020";
    monster.style.borderRadius = "0% 0% 30% 30%";
    setTimeout(() => {
        monsterEyeL.style.display = "inline-block";
        monsterEyeL.style.backgroundColor = "#000";
        monsterEyeL.style.borderTop = ".5vh solid #aaa"; 
        monsterEyeR.style.display = "inline-block";
        monsterEyeR.style.backgroundColor = "#000";
        monsterEyeR.style.borderTop = ".5vh solid #aaa";  
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
    monster.style.width = "14vw";
    monster.style.height = "23vh";
    monster.style.backgroundColor = "#070";
    monster.style.borderTop = "5vh solid #020";
    monster.style.borderBottom = "1vh solid #020";
    monster.style.top = "10%";
    monster.style.right = "10px";
    monster.style.borderRadius = "0% 0% 30% 30%";
    monsterEyeL.style.display = "inline-block";
    monsterEyeL.style.backgroundColor = "#000";
    monsterEyeL.style.borderTop = ".5vh solid #aaa";
    monsterEyeR.style.display = "inline-block";
    monsterEyeR.style.backgroundColor = "#000";
    monsterEyeR.style.borderTop = ".5vh solid #aaa";
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
    let killsPos = kills.getBoundingClientRect();
    let killtop = killsPos.top;
    let killright = killsPos.right;
    let topGun = gunPosition.top;
    let topMonster = monsterPosition.top;
    let XMonster = monsterPosition.right;
    let ranTop = theTopMonster[0];
    if(topGun == topMonster && time == 1){    
        monster.style.right = `${(windowSize.width - XMonster) * 0.1}vw`; 
        ogreScream.currentTime = .5;
        ogreScream.play();
        if (ranTop == 0) {
            monster.style.top = "10%";
            theTopMonster.unshift(1);
        } else if (ranTop == 1){
            monster.style.top = "55%";
            theTopMonster.unshift(0);
        }; 
        monster.style.backgroundColor = "#660";
        monster.style.borderBottom = "1vh solid #aaa";
        monster.style.borderTop="5vh solid #000";
        monster.style.borderRadius ="0% 0% 30% 30%";
        monsterMouth.style.borderRadius = "0% 0% 0% 0%";
        monsterMouth.style.backgroundColor = "#400";
        monsterEyeL.style.backgroundColor="#000";
        monsterEyeR.style.backgroundColor="#000";
        monsterAttack();
    } else if(topGun == topMonster && time == 2){        
        monster.style.right = `${(windowSize.width - XMonster) * 0.1}vw`; 
        ogreScream.currentTime = .5;
        ogreScream.play();
        if (ranTop == 0) {
            monster.style.top = "10%";
        } else if (ranTop == 1){
            monster.style.top = "55%";
        };
        monster.style.backgroundColor = "#600";
        monster.style.borderBottom = "1vh solid #333";
        monster.style.borderTop="5vh solid #444";
        monster.style.borderRadius ="0% 0% 30% 30%";
        monsterMouth.style.borderRadius = "50% 50% 0% 0%";
        monsterMouth.style.backgroundColor = "#100";
        monsterEyeL.style.backgroundColor="#000";
        monsterEyeR.style.backgroundColor="#000";
        monsterAttack();
    } else if(topGun == topMonster && time == 3){
        monster.style.transition="none";
        monster.style.right = `0vw`; 
        deathSound.play();
        monster.style.backgroundColor = "#fff";
        monster.style.borderRadius = "50% 50% 0% 0%";
        monster.style.borderBottom = "none";
        monster.style.borderTop = "none";
        monsterMouth.style.borderRadius = "50% 50% 0% 0%";
        monsterMouth.style.height ="3vh";
        monsterMouth.style.backgroundColor = "#aaa";
        monsterEyeL.style.backgroundColor="#aaa";
        monsterEyeR.style.backgroundColor="#aaa";
        monster.style.transition = "right 1s linear, top 1s linear, width 1s linear, height 1s linear";    
        setTimeout(() => {  
            monster.style.top = `${killtop - 40}px`;
            monster.style.right = `${killright - 100}px`;
            monster.style.width = "5vw";
            monster.style.height = "2vh";
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
            } else if(killsCount == 50){
                scoreCount += 500;
                score.innerHTML = scoreCount;
            } else if (killsCount >= 30 && killsCount < 40){
                scoreCount += 400;
                score.innerHTML = scoreCount;
            } else if (killsCount >= 20 && killsCount < 30){
                scoreCount += 300;
                score.innerHTML = scoreCount;
            } else if (killsCount >= 10 && killsCount < 20){
                scoreCount += 200;
                score.innerHTML = scoreCount;
            } else{
                scoreCount += 100;
                score.innerHTML = scoreCount;
            };
            numbershot.splice(0, 3);
            theTopMonster.splice(0, 1);
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
        ammo.style.left ="110vw";
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
        shotOne.style.border = ".1vw solid #fff";
        shotOne.style.color = "#eee";
    };
};
const reload =() =>{
    reloadSound.currentTime = .2;
    reloadSound.play();
    shotOne.style.backgroundColor = "#fff";
    shotOne.style.border = ".1vw solid #000";
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
        window.close();
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
const moveGun = () => {
    let gunPos = theTopGun[0];
    if (gunPos == 0) {
        gun.style.top = "10%";
        theTopGun.unshift(1);
        theTopGun.pop();
        console.log(theTopGun);
    } else if (gunPos == 1){
        gun.style.top = "55%";
        theTopGun.unshift(0);
        theTopGun.pop();
        console.log(theTopGun);
    }; 
};