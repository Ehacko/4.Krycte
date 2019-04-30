//declaration des variables.
//les varriables A1 à 10 et J1 à 10 contiennent les valeurs des pieces maitresses, tandis que celles de B1 à 10 et I1 à 10 contiennent les valeurs des autres pieces.
//A1(position sur damier) = ["wp"(equipe blanche), "hr"(tour horizontal), "whr"(tour horizontal blanche)]
var a, b, c, A = 1, B = 2, C = 3, D = 4, E = 5, F = 6, G = 7 ,H = 8, I = 9, J =10,
    L1 = "A", L2 = "B", L3 = "C", L4 = "D", L5 = "E", L6 = "F", L7 = "G", L8 = "H", L9 = "I", L10 = "J",
    A1 = ["bp", " hr", "bhr"], A2 = ["bp", " lb", "blb"], A3 = ["bp", " qk", "bqk"], A4 = ["bp", " cb", "bcb"], A5 = ["bp", " kg", "bkg"],
    A6 = ["bp", " qn", "bqn"], A7 = ["bp", " us", "bus"], A8 = ["bp", " kk", "bkk"], A9 = ["bp", " rb", "brb"], A10 = ["bp", " vr", "bvr"],
    B1 = B3 = B5 = B7 = B9 = ["bp", " ft", "bft"], B2 = B4 = B6 = B8 = B10 = ["bp", " ar", "bar"],
    J1 = ["wp", " vr", "wvr"], J2 = ["wp", " rb", "wrb"], J3 = ["wp", " kk", "wkk"], J4 = ["wp", " cb", "wcb"], J5 = ["wp", " kg", "wkg"],
    J6 = ["wp", " qn", "wqn"], J7 = ["wp", " us", "wus"], J8 = ["wp", " qk", "wqk"], J9 = ["wp", " lb", "wlb"], J10 = ["wp", " hr", "whr"],
    I1 = I3 = I5 = I7 = I9 = ["wp", " ft", "wft"], I2 = I4 = I6 = I8 = I10 = ["wp", " ar", "war"];

// recuperation de l'objet qui contiendra mon tableau
function game(start){
    a = document.getElementById("plateau");
    a.innerHTML = ""
// creation des ligne.
    for(i1 = 1; i1 <= 10; i1 ++) {
        a.innerHTML += "<div class='ligne' id='" + eval("L" + i1) + "' ></div>";
        b = document.getElementById(eval("L" + i1));
// creation des case et des pions
        for(i2 = 1; i2 <= 10; i2 ++){
            if (i1%2 == 0) { if (i2%2 == 0) c = ""; else c = "black";}
            else { if (i2%2 != 0) c = ""; else c = "black";}
            if (eval("L" + i1) == "A" || eval("L" + i1) == "B" || eval("L" + i1) == "I" || eval("L" + i1) == "J")
                b.innerHTML += "<div class='case " + c + "' id='" + eval("L" + i1) + i2 + "'><span class='index'>" + 
		eval("L" + i1) + i2 + "</span><div name='pion' class='" + 
                eval(eval("L" + i1) + i2 + "[0]") +
                eval(eval("L" + i1) + i2 + "[1]") + "' style='background-image: url(img/" + 
                eval(eval("L" + i1) + i2 + "[2]") + ".png)'></div></div>";
            else
                b.innerHTML += "<div class='case " + c + "' id='" + eval("L" + i1) + i2 + "'><span class='index'>" + eval("L" + i1) + i2 + "</span></div>";
        }
    }
    b = 0;
    c = document.getElementsByName('pion');
    if(start == "0") return;
    for (i = c.length - 1; 0 <= i; i--) { c[i].addEventListener("click", myturn); }
    turn();
}
// definie l'equipe quelle equipe jouera et leur attribut un eventListener. supprime celui de l'autre equipe si elle en avait un.
function turn(){
    if (b%2 == 0) {
        document.documentElement.style.setProperty('--rotation', 'rotate(0deg)');
        setTimeout(function(){ alert("white's turn"); }, 1750);

    } else if (b%2 == 1) {
        document.documentElement.style.setProperty('--rotation', 'rotate(180deg)');
        setTimeout(function(){ alert("black's turn"); }, 1750);

    } else alert('error');
}
function myturn(){
    c = event.currentTarget.className.split(' ');
    a = document.getElementsByClassName('mvt');
    for (i = 0; i < a.length - 1; i++){
        a[i].className.replace(' mvt', "");
    }
    a = document.getElementsByClassName('atk');
    for (i = 0; i < a.length - 1; i++){
        a[i].className.replace(' atk', "");
    }
    if(b%2 == 0 && c[0] == "wp") { c = event.currentTarget; move(c); }
    else if(b%2 == 0 && c[0] != "wp") alert("it's white's turn!!");
    else if(b%2 == 1 && c[0] == "bp") { c = event.currentTarget; move(c); }
    else if(b%2 == 1 && c[0] != "bp") alert("it's black's turn!!");
}
function nxtmvt(c){ let pion, c, pos, y, x;
    pion = event.currentTarget.className.split(' ');
    pos = event.currentTarget.parentElement.id;
    y = eval(pos.slice(0, 1)), x = Number(pos.slice(1));
    switch (pion[1]){
        case 'hr':
            for (i = x + 1; i <= 10; i++) {
                move = pos.slice(0, 1) + i;
                move = document.getElementById(move).children;
                if(c[0] == move[1]) return;
                else if (move[1]) document.getElementById(eval("L" + y) + i).className += ' atk';
                if (move[1] && c[0] != move[1]) return;
                else document.getElementById(eval("L" + y) + i).className += ' mvt';
            }
            for (i = x - 1; i >= 0; i--) {
                move = pos.slice(0, 1) + i;
                move = document.getElementById(move).children;
                if(c.className.split(' ')[0] == move[1]) return;
                else if (move[1]) document.getElementById(eval("L" + y) + i).className += ' atk';
                if (move[1] && c.className.split(' ')[0] != move[1]) return;
                else document.getElementById(eval("L" + y) + i).className += ' mvt';
            }
        break;

        case 'lb': break;

        case 'qk': break;

        case 'cb': break;

        case 'kg': break;

        case 'qn': break;

        case 'us': break;

        case 'kk': break;

        case 'rb': break;
    }
}
function next() { b++; turn(); }
//alert("you've played"); turn();
game(0);