//declaration des variables.
//les varriables A1 � 10 et J1 � 10 contiennent les valeurs des pieces maitresses, tandis que celles de B1 � 10 et I1 � 10 contiennent les valeurs des autres pieces.
//A1(position sur damier) = ["white"(equipe blanche), "hr"(tour horizontal), "whr"(tour horizontal blanche)]
var a, b, c, A = 1, B = 2, C = 3, D = 4, E = 5, F = 6, G = 7 ,H = 8, I = 9, J =10,
    L1 = "A", L2 = "B", L3 = "C", L4 = "D", L5 = "E", L6 = "F", L7 = "G", L8 = "H", L9 = "I", L10 = "J",
    A1 = ["black", " hr", "bhr"], A2 = ["black", " lb", "blb"], A3 = ["black", " qk", "bqk"], A4 = ["black", " cb", "bcb"], A5 = ["black", " kg", "bkg"],
    A6 = ["black", " qn", "bqn"], A7 = ["black", " us", "bus"], A8 = ["black", " kk", "bkk"], A9 = ["black", " rb", "brb"], A10 = ["black", " vr", "bvr"],
    B1 = B3 = B5 = B7 = B9 = ["black", " ft", "bft"], B2 = B4 = B6 = B8 = B10 = ["black", " ar", "bar"],
    J1 = ["white", " vr", "wvr"], J2 = ["white", " rb", "wrb"], J3 = ["white", " kk", "wkk"], J4 = ["white", " cb", "wcb"], J5 = ["white", " kg", "wkg"],
    J6 = ["white", " qn", "wqn"], J7 = ["white", " us", "wus"], J8 = ["white", " qk", "wqk"], J9 = ["white", " lb", "wlb"], J10 = ["white", " hr", "whr"],
    I1 = I3 = I5 = I7 = I9 = ["white", " ft", "wft"], I2 = I4 = I6 = I8 = I10 = ["white", " ar", "war"];

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
            if (i1%2 == 0) { if (i2%2 == 0) c = ""; else c = " blk";}
            else { if (i2%2 != 0) c = ""; else c = " blk";}
            if (eval("L" + i1) == "A" || eval("L" + i1) == "B" || eval("L" + i1) == "I" || eval("L" + i1) == "J")
                b.innerHTML += "<div class='case" + c + "' id='" + eval("L" + i1) + i2 + "'><span class='index'>" + eval("L" + i1) + i2 + "</span><div name='pion' class='" + eval(eval("L" + i1) + i2 + "[0]") + eval(eval("L" + i1) + i2 + "[1]") + "' style='background-image: url(img/" + eval(eval("L" + i1) + i2 + "[2]") + ".png)'></div></div>";
            else
                b.innerHTML += "<div class='case" + c + "' id='" + eval("L" + i1) + i2 + "'><span class='index'>" + eval("L" + i1) + i2 + "</span></div>";
        }
    }
    c = document.getElementsByClassName('case');
    if(start == "0") return;
    for(i=0; i < c.length - 1; i++) c[i].addEventListener('clic', turn);
    a = 1
    turn();
}
function turn(){
    if (event.currentTarget.children.length > 1){
        a = event.currentTarget.children[1].className.split(' ')[0]
        if (b == a) play();
        else if (b != a) alert("its" + b +"'s turn");
        else alert('error');
    }
    if (a == 1){
        if (b == "white") {
            b = "black";
            document.documentElement.style.setProperty('--rotation', 'rotate(180deg)');
        }
        else {
            b = "white";
            document.documentElement.style.setProperty('--rotation', 'rotate(0deg)');
        }
        setTimeout(function(){ alert( b + "'s turn"); }, 1750);
        
    }
}
function play(){}
game(0);