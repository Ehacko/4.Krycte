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
            range: Infinity,
            twin: "vr"
        },
        // left bishop
        lb: {
            move: move_pattern.linear,
            direction: ["BL","TL"],
            range: Infinity,
            twin: 'rb'
        },
        // queen knight
        qk: {
            move: [move_pattern.L((n)=> Math.abs(n) == 11 ? 9 : 11), move_pattern.L((n)=> Math.abs(n) == 11 ? -9 : -11)],
            direction: ["NE","SE","SW","NW"],
            range: 1,
            twin: "kk"
        },
        // concubine
        cb: {
            move: move_pattern.linear,
            direction: ["NE","SE","SW","NW"],
            range: Infinity,
            twin: "qn"
        },
        // king
        kg: {
            move: move_pattern.linear,
            direction: ["N","E","S","W"],
            range: 1,
            twin: "us"
        },
        // queen
        qn: {
            move: move_pattern.linear,
            direction: ["N","E","S","W"],
            range: Infinity,
            twin: "cb"
        },
        // understudy
        us: {
            move: move_pattern.linear,
            direction: ["NE","SE","SW","NW"],
            range: 1,
            twin: "kg"
        },
        // king knight
        kk: {
            move: [move_pattern.L((n)=> Math.abs(n) == 10 ? 1 : 10), move_pattern.L((n)=> Math.abs(n) == 10 ? -1 : -10)],
            direction: ["N","E","S","W"],
            range: 1,
            twin: "qk"
        },
        // right bishop
        rb: {
            move: move_pattern.linear,
            direction: ["BR","TR"],
            range: Infinity,
            twin: "lb"
        },
        // vertical root
        vr: {
            move: move_pattern.linear,
            direction: ["N","S"],
            range: Infinity,
            twin: "hr"
        },
        ft: {
            move: move_pattern.linear,
            direction: ["front"],
            range: 2,
        },
        ar: {
            move: move_pattern.linear,
            direction: ["front"],
            range: 1
        }
    };

let cases, a, b, c, s;
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
    next_turn();
}
function next_turn(){
    if (b == "white") {
        b = "black";
        document.documentElement.style.setProperty('--rotation', 'rotate(180deg)');
    }
    else {
        b = "white";
        document.documentElement.style.setProperty('--rotation', 'rotate(0deg)');
    }
    // setTimeout(function(){ alert( b + "'s turn"); }, 1750);
}
function turn(){
    switch (true) {
        case (["range","attack","switch"].some(str=>event.currentTarget.classList.contains(str))):
            if(event.currentTarget.classList.contains("attack")) event.currentTarget.removeChild(event.currentTarget.children[1]);
            if(event.currentTarget.classList.contains("switch")) s.parentElement.append(event.currentTarget.children[1]);
            event.currentTarget.append(s)
            refresh()
            next_turn()
            break;
    
        
        case (event.currentTarget.children.length > 1):
            a = event.currentTarget.children[1].className.split(' ')[0]
            if (b == a) play(event.currentTarget);
            else if (b != a) alert("its " + b +"'s turn");
            else alert('error');
            break;
    
        default:
            break;
    }
}
function refresh() {
    [...document.querySelectorAll('.range,.attack,.switch')].forEach(elem => elem.classList.remove("range","attack","switch"))
}
function play(s_case){
    s = s_case.children[1]
    const [row, col] = s_case.id
    let current_pos, pawn_pos=(10 * eval(row))+Number(col)-1;
    function pattern(moves, directions, range){
        refresh()
        function validation(current_case, n){
            let cur_col = current_pos%10
            switch (true) {
                case n < 0 ? cur_col == 9: cur_col == 0: return;
                case current_case.children.length == 1: return "range";
                case !current_case.children[1].classList.contains(s.classList[0]): return "attack";
            }
        }
        function move(pattern, n){
            const change = pattern(n);
            current_pos = current_pos+change
            return cases[current_pos]
        }

        function direction(cardinal){
            function get_inc(){
                switch (true) {
                    case (cardinal == "N"   || cardinal == "front" && b=="white")    : return  -10
                    case (cardinal == "NE"  || cardinal == "BR" && b=="white" || cardinal == "TL" && b=="black")   : return  -10 + 1
                    case (cardinal == "E")    : return  1
                    case (cardinal == "SE"  || cardinal == "TR" && b=="white" || cardinal == "BL" && b=="black")   : return  10 + 1
                    case (cardinal == "S"   || cardinal == "front" && b=="black")    : return  10
                    case (cardinal == "SW"  || cardinal == "TL" && b=="white" || cardinal == "BR" && b=="black")   : return  10 + -1
                    case (cardinal == "W")    : return  -1
                    case (cardinal == "NW"  || cardinal == "BL" && b=="white" || cardinal == "TR" && b=="black")   : return  -10 + -1
    
                    default: throw "unknown direction";
                }
            }
            let valid, pos_save=current_pos;
            (Array.isArray(moves) ? moves : [moves]).forEach(pattern => {
                current_pos = pos_save
                let inc = get_inc()
                const current_case = move(pattern, inc)
                current_case?.classList.add(valid = validation(current_case, inc))
            })
            return valid;
        }
        directions.forEach(cardinal => {
            current_pos = pawn_pos;
            let moves_left=range
            do {} while (moves_left-- && direction(cardinal) == "range");
        });

    }
    const { move,direction,range,twin } = pawnMoves[s.classList[1]]
    pattern(move,direction,range)
    document.querySelector(`.${b}.${twin}`).parentElement.classList.add("switch")

}
game(0);
