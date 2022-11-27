//declaration des variables.
//les varriables A1 � 10 et J1 � 10 contiennent les valeurs des pieces maitresses, tandis que celles de B1 � 10 et I1 � 10 contiennent les valeurs des autres pieces.
//A1(position sur damier) = ["white"(equipe blanche), "hr"(tour horizontal), "whr"(tour horizontal blanche)]
const A = 0, B = 1, C = 2, D = 3, E = 4, F = 5, G = 6 ,H = 7, I = 8, J = 9,
    L0 = "A", L1 = "B", L2 = "C", L3 = "D", L4 = "E", L5 = "F", L6 = "G", L7 = "H", L8 = "I", L9 = "J",
    A1 = ["black", " hr", "bhr"], A2 = ["black", " lb", "blb"], A3 = ["black", " qk", "bqk"], A4 = ["black", " cb", "bcb"], A5 = ["black", " kg", "bkg"],
    A6 = ["black", " qn", "bqn"], A7 = ["black", " us", "bus"], A8 = ["black", " kk", "bkk"], A9 = ["black", " rb", "brb"], A10 = ["black", " vr", "bvr"],
    B1 = B3 = B5 = B7 = B9 = ["black", " ft", "bft"], B2 = B4 = B6 = B8 = B10 = ["black", " ar", "bar"],
    J1 = ["white", " vr", "wvr"], J2 = ["white", " rb", "wrb"], J3 = ["white", " kk", "wkk"], J4 = ["white", " cb", "wcb"], J5 = ["white", " kg", "wkg"],
    J6 = ["white", " qn", "wqn"], J7 = ["white", " us", "wus"], J8 = ["white", " qk", "wqk"], J9 = ["white", " lb", "wlb"], J10 = ["white", " hr", "whr"],
    I1 = I3 = I5 = I7 = I9 = ["white", " ft", "wft"], I2 = I4 = I6 = I8 = I10 = ["white", " ar", "war"],
    move_pattern = { linear(n){ return n }, L(n2){ return (n) => n*2 + n2(n) }},
    pawnMoves = {
        // horizontal rook
        hr: {
            move: move_pattern.linear,
            direction: ["E","W"],
            multi: true
        },
        // left bishop
        lb: {
            move: move_pattern.linear,
            direction: ["SW","NW"],
            multi: true
        },
        // queen knight
        qk: {
            move: [move_pattern.L((n)=> Math.abs(n) == 10 ? 1 : 10), move_pattern.L((n)=> Math.abs(n) == 10 ? -1 : -10)],
            direction: ["NE","SE","SW","NW"],
            multi: false
        },
        // concubine
        cb: {
            move: move_pattern.linear,
            direction: ["NE","SE","SW","NW"],
            multi: true
        },
        // king
        kg: {
            move: move_pattern.linear,
            direction: ["N","E","S","W"],
            multi: false
        },
        // queen
        qn: {
            move: move_pattern.linear,
            direction: ["N","E","S","W"],
            multi: true
        },
        // understudy
        us: {
            move: move_pattern.linear,
            direction: ["NE","SE","SW","NW"],
            multi: false
        },
        // king knight
        kk: {
            move: [move_pattern.L((n)=> Math.abs(n) == 11 ? 9 : 11), move_pattern.L((n)=> Math.abs(n) == 11 ? -9 : -11)],
            direction: ["N","E","S","W"],
            multi: false
        },
        // right bishop
        rb: {
            move: move_pattern.linear,
            direction: ["NE","SE"],
            multi: true
        },
        // vertical root
        vr: {
            move: move_pattern.linear,
            direction: ["N","S"],
            multi: true
        },
    };

let cases, a, b, c;
// recuperation de l'objet qui contiendra mon tableau
function game(start){
    a = document.getElementById("plateau");
    a.innerHTML = ""
// creation des ligne.
    for(i1 = 0; i1 < 10; i1 ++) {
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
    cases = document.getElementsByClassName('case');
    if(start == "0") return;
    for(i=0; i < cases.length - 1; i++) cases[i].addEventListener('click', turn);
    a = 1
    turn();
}
function turn(){
    if (event.currentTarget.children.length > 1){
        a = event.currentTarget.children[1].className.split(' ')[0]
        if (b == a) play(event.currentTarget.children[1]);
        else if (b != a) alert("its " + b +"'s turn");
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
function play(pawn){
    const [row, col] = pawn.parentElement.id
    let current_pos, pawn_pos=(10 * eval(row))+Number(col);
    function pattern(moves, directions, multi){
        function validation(current_case){
            // current_case.children.length == 2 ? checkpawn(current_case.children[1]): checkcase()
            return current_case.children.length == 1 && "range"
        }
        function move(pattern, n){
            const change = pattern(n);
            current_pos = current_pos+change
            return cases[current_pos]
        }

        function direction(cardinal){
            function get_inc(){
                switch (cardinal) {
                    case "N"    : return  -10
                    case "NE"   : return  -9
                    case "E"    : return  1
                    case "SE"   : return  11
                    case "S"    : return  10
                    case "SW"   : return  9
                    case "W"    : return  -1
                    case "NW"   : return  -11
    
                    default: throw "unknown direction";
                }
            }
            let valid, pos_save=current_pos;
            moves.forEach(pattern => {
                current_pos = pos_save
                const current_case = move(pattern, get_inc())
                current_case?.classList.add(valid = validation(current_case))
            })
            return valid;
        }
        directions.forEach(cardinal => {
            current_pos = pawn_pos;
            do {} while (direction(cardinal) == "range" && multi);
        });
    }
    const { move,direction,multi } = pawnMoves[pawn.classList[1]]
    pattern(move,direction,multi)

}
game(0);
