let mida, midaAnterior;
let grupPlataformes, parets;
let bubSprite, imgBub01, imgBubBoca;
let chanSprite, animChan, grupChans;
let midaPerson = 0.0009;
let bolaSprite, bolaAnim, tretAnim;
let grupTrets;
let animconill, conilldead;
let velBob = 0.3;
let animacioinici;
let animaciofinal;
let animacioguanyar;
let fase = 0 //0 => pantalla inici, 1=>joc, 2=>final, 3=>guanyar


function preload() {
    imgBub01 = loadImage("img/sprite1.png");
    imgBubBoca = loadImage("img/sprite1.png");
    animChan = loadAnimation("img/wolf1.png", "img/wolf8.png");
    animconill = loadAnimation("img/sprite1.png", "img/sprite6.png");
    conilldead = loadAnimation("img/ship1.png", "img/ship7.png")

    animacioinici = loadAnimation("img/Recurso1.png", "img/Recurso3.png");
    animaciofinal = loadAnimation("img/final1.png", "img/final3.png");
    animacioguanyar = loadAnimation("img/guanyado1.png", "img/guanyado3.png");

    let ssBola = loadSpriteSheet("img/tyriansupercarrot.png", 90, 120, 4);
    bolaAnim = loadAnimation(ssBola);

    let ssTret = loadSpriteSheet("img/tretFoc.png", 16, 16, 6);
    tretAnim = loadAnimation(ssTret);
}
var x = 100;
var y = 100;

function setup() {
    //Creem el canvas quadrat de la mida que toqui
    mida = midaFinestra();
    createCanvas(mida, mida);
    inicialitzaSprites();

}

function inicialitzaSprites() {
    
    grupPlataformes = new Group();
    parets = new Group();
    creaPlataformes();

    grupTrets = new Group();
    grupChans = new Group();


    //Creem sprite jugador
    bubSprite = createSprite(x, y, 7, 7);
    bubSprite.addImage('quiet', imgBub01);
    bubSprite.addImage('boca', imgBubBoca);
    bubSprite.addAnimation('caminant', animconill);
    bubSprite.addAnimation('morti', conilldead);
    bubSprite.scale = width * midaPerson;
    bubSprite.friction = 0.06;
    animacioinici.frameDelay = 8;
    animaciofinal.frameDelay = 9;
    animacioguanyar.frameDelay = 9;


    bubSprite.debug = false;
    bubSprite.setCollider("rectangle", 3, 3, 50, 105);


  creaChan();
    creaChan();
    creaChan();
    creaChan();
    creaChan();
    creaChan();

    //Creem sprite de bola de foc
    setTimeout(creaBolaFoc, random(3000, 6000));

}

function draw() {

    if (fase == 0) {
        inici();
    } else if (fase == 1) {
        joc();
    } else if (fase == 2) {
        final();
    }else if(fase == 3){
        guanyar();
    }
}


function inici() {
    animation(animacioinici, width / 2, height / 2);
    if (keyIsDown(13)) {
        fase = 1;
    }
}

function guanyar() {
    animation(animacioguanyar, width / 2, height / 2);
    if (keyIsDown(13)) {
        
        inicialitzaSprites();
        fase = 0;
    }
}

function joc() {
    background('#baffc0');

    //Comprovem tecles / moviment
    let bubMovent = false;

    if (keyIsPressed) {
        //console.log(key);
        if (keyIsDown(RIGHT_ARROW)) {
            bubSprite.changeAnimation('caminant');
            bubSprite.mirrorX(1);
            bubSprite.addSpeed(velBob, 0);
            //        } else if (keyCode === DOWN_ARROW) {
            //            bobSprite.changeAnimation('caminant');
            //            bobSprite.addSpeed(velBob, 90);
        }
        if (keyIsDown(LEFT_ARROW)) {
            bubSprite.changeAnimation('caminant');
            bubSprite.mirrorX(-1);
            bubSprite.addSpeed(velBob, 180);
        }
        if (keyIsDown(UP_ARROW)) {
            velGravetat = 0;
            bubSprite.changeAnimation('caminant');
            bubSprite.setSpeed(velBob * 5, 270);
        }
        if (keyIsDown(DOWN_ARROW)) {
            velGravetat = 0;
            bubSprite.changeAnimation('caminant');
            bubSprite.setSpeed(velBob * 5, 90);
        }
        if (keyIsDown(32)) { //tecla ESPAI


            if (bubSprite.potDisparar) {
               // console.log('hola');
                bubSprite.potDisparar = true;

                bubSprite.addAnimation('caminant');

                setTimeout(function () {
                    bubSprite.addAnimation('caminant')
                }, 300);

                setTimeout(function () {
                    bubSprite.potDisparar = true;
                }, 400);

                if (bubSprite.dispara) {
                    let tretFocSprite = createSprite(bubSprite.position.x,
                        bubSprite.position.y, 16, 16);
                    let tretFocAnim = tretFocSprite.addAnimation('tret', tretAnim);
                    tretFocSprite.scale = width * midaPerson;
                    tretFocSprite.life = 60;


                    if (bubSprite.mirrorX() == -1) {
                        tretFocSprite.setSpeed(10, 180);
                    } else {
                        tretFocSprite.setSpeed(10, 0);
                    }

                    grupTrets.add(tretFocSprite);
                }
                //                    let tretFocSprite = createSprite(bubSprite.position.x, bubSprite.position.y, 16, 16);
                //                    let tretFocSpAnim = tretFocSprite.addAnimation('surtTretFoc', tretFocAnim);
                //                    tretFocSpAnim.frameDelay = 8;
                //                    tretFocSprite.scale = mida / midaBob;
                //                    tretFocSprite.mirrorX(bubSprite.mirrorX());
                //                    tretFocSprite.setCollider("rectangle");
                //                    tretFocSprite.life=200;
                //                    tretFocSprite.debug = true;
                //                    if (bubSprite.mirrorX() > 0) {
                //                        tretFocSprite.setSpeed(10, 180);
                //                    } else {
                //                        tretFocSprite.setSpeed(10, 0);
                //                    }
                //                    grupTrets.add(tretFocSprite);
            }

        }


    } else {
        bubSprite.changeAnimation('quiet');
        if (!bubMovent) {
            bubSprite.setSpeed(0, 0);
        }
    }


    bubSprite.collide(parets);
    bubSprite.collide(grupPlataformes);
    bubSprite.overlap(grupChans, mataBub);

    if (bolaSprite) {
        bubSprite.overlap(bolaSprite, agafaBolaFoc);
    }

    grupChans.collide(parets, reboteChan);
    grupChans.collide(grupPlataformes, reboteChan);

    grupTrets.overlap(grupChans, mataChan);



    drawSprites();
}

function final() {
    animation(animaciofinal, width / 2, height / 2);
    if (keyIsDown(13)) {
        inicialitzaSprites();
        fase = 0;
    } }

    function creaChan() {
        chanSprite = createSprite(random(20, width - 10), random(50, height - 50), 30, 10);
        let chAn = chanSprite.addAnimation('caminant', animChan);
        chAn.frameDelay = 6;
        chanSprite.scale = width * midaPerson * 2;
        chanSprite.setSpeed(0.9, random(380));
        grupChans.add(chanSprite);
        chanSprite.debug = false; //area de coalisió
        chanSprite.setCollider("rectangle", 0, 6, 40, 30);

        if (mouseX > chanSprite.position.x) {
            //el raton es a la derecha del personaje
            bubSprite.mirrorX(1);

        } else {
            bubSprite.mirrorX(-1);

        }
    }

    function reboteChan(quinChan, quinaParet) {
        let = direccio = quinChan.getDirection();
        quinChan.setSpeed(1.4, direccio + 170 + random(-60, 60));
    }


    function creaPlataformes() {

        grupPlataformes.removeSprites();
        parets.removeSprites();

        let altPlat = width / 80;

        //Paret d'avall de tot
        let avall = createSprite(width / 2, height - (altPlat / 3), width, altPlat);
        avall.shapeColor = color('#8bb3ad');
        grupPlataformes.add(avall);

        //Paret esquerra
        let esquerra = createSprite(altPlat / 2, height / 2, altPlat, height);
        esquerra.shapeColor = color('#8bb3ad');
        parets.add(esquerra);

        //Paret dreta
        let dreta = createSprite(width - (altPlat / 2), height / 2, altPlat, height);
        dreta.shapeColor = color('#8bb3ad');
        parets.add(dreta);

        //Paret d'adalt de tot
        let adalt = createSprite(width / 2, altPlat / 2, width, altPlat);
        adalt.shapeColor = color('#8bb3ad');
        parets.add(adalt);

        //plataforma a 2/3
        let dosTers = createSprite(width / 1, height * 0.80, width * 0.7, altPlat);
        dosTers.shapeColor = color('#8bb3ad');
        grupPlataformes.add(dosTers);

        let tresTers = createSprite(width / 5, height * 0.6, width * 0.9, altPlat);
        tresTers.shapeColor = color('#8bb3ad');
        grupPlataformes.add(tresTers);

        let quatreTers = createSprite(width / 1.5, height * 0.4, width * 0.7, altPlat);
        quatreTers.shapeColor = color('#8bb3ad');
        grupPlataformes.add(quatreTers);

        let cincTers = createSprite(width / 4.2, height * 0.20, width * 0.5, altPlat);
        cincTers.shapeColor = color('#8bb3ad');
        grupPlataformes.add(cincTers);

    }


    function creaBolaFoc() {
        bolaSprite = createSprite(random(50, width - 50), random(50, height - 50), 16, 16);
        bolaSprite.addAnimation('normal', bolaAnim);
        bolaSprite.scale = width * midaPerson;

    }

    function agafaBolaFoc() {
        bolaSprite.remove();
        bubSprite.dispara = true;
        bubSprite.potDisparar = true;
//        textSize(32);
//text('press enter', 10, 30);
//fill(0, 102, 153);
    }


    function mataChan(foc, chanAMorir) {
        chanAMorir.remove();
        foc.remove();
        
        if(grupChans.length == 0){
            fase = 3;
        }
    }

    function mataBub(conilldead) {
        bubSprite.changeAnimation('morti', conilldead);
        bubSprite.remove();
        
        grupChans.removeSprites();
        if (bolaSprite !=undefined){
            bolaSprite.remove();
        }
        setTimeout(function(){
            fase = 2;},500);
    }

//function eliminaSprites() {
//    
//    grupChans.remove;
//    grupPlataformes.remove;
//    bolaSprite.remove;
//}

    function midaFinestra() {
        let midaFinal;
        if (window.innerWidth >= window.innerHeight) {
            midaFinal = window.innerHeight;
        } else {
            midaFinal = window.innerWidth;
        }
        return midaFinal;
    }

    function windowResized() {
        
        midaAnterior = mida;
        mida = midaFinestra();
        resizeCanvas(mida, mida);
        this.camera.position.x = width / 2;
        this.camera.position.y = height / 2;
        creaPlataformes();
    }