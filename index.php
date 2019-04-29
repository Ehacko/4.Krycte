<head>
	<title>Krycte</title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<div id='F9'><button onclick='test()' class='first second third'>start</button></div>
<div id="plateau"></div>
<script>
    var
        a, b, c, A = 1, B = 2, C = 3, D = 4, E = 5, F = 6, G = 7 ,H = 8, I = 9, J =10,
        L1 = "A", L2 = "B", L3 = "C", L4 = "D", L5 = "E", L6 = "F", L7 = "G", L8 = "H", L9 = "I", L10 = "J",
        A1 = ["wp", " hr", "whr"], A2 = ["wp", " lb", "wlb"], A3 = ["wp", " qk", "wqk"], A4 = ["wp", " cb", "wcb"], A5 = ["wp", " kg", "wkg"],
        A6 = ["wp", " qn", "wqn"], A7 = ["wp", " us", "wus"], A8 = ["wp", " kk", "wkk"], A9 = ["wp", " rb", "wrb"], A10 = ["wp", " vr", "wvr"],
        B1 = B3 = B5 = B7 = B9 = ["wp", " ft", "wft"], B2 = B4 = B6 = B8 = B10 = ["wp", " ar", "war"],
        J1 = ["bp", " vr", "bvr"], J2 = ["bp", " rb", "brb"], J3 = ["bp", " kk", "bkk"], J4 = ["bp", " cb", "bcb"], J5 = ["bp", " kg", "bkg"],
        J6 = ["bp", " qn", "bqn"], J7 = ["bp", " us", "bus"], J8 = ["bp", " qk", "bqk"], J9 = ["bp", " lb", "blb"], J10 = ["bp", " hr", "bhr"],
        I1 = I3 = I5 = I7 = I9 = ["bp", " ft", "bft"], I2 = I4 = I6 = I8 = I10 = ["bp", " ar", "bar"];
    a = document.getElementById("plateau");
    a.innerHTML = ""
    for(i1 = 1; i1 <= 10; i1 ++) {
        a.innerHTML += "<div class='ligne' id='" + eval("L" + i1) + "' ></div>";
        b = document.getElementById(eval("L" + i1));
        for(i2 = 1; i2 <= 10; i2 ++){
            if (i1%2 == 0) { if (i2%2 == 0) c = ""; else c = "black";}
            else { if (i2%2 != 0) c = ""; else c = "black";}
            if (eval("L" + i1) == "A" || eval("L" + i1) == "B" || eval("L" + i1) == "I" || eval("L" + i1) == "J")
                b.innerHTML += "<div class='case " + c + "' id='" + eval("L" + i1) + i2 + "'><span class='index'>" + 
		eval("L" + i1) + i2 + "</span><div class='" + 
                eval(eval("L" + i1) + i2 + "[0]") +
                eval(eval("L" + i1) + i2 + "[1]") + "' style='background-image: url(img/" + 
                eval(eval("L" + i1) + i2 + "[2]") + ".png)'></div></div>";
            else
                b.innerHTML += "<div class='case " + c + "' id='" + eval("L" + i1) + i2 + "'><span class='index'>" + eval("L" + i1) + i2 + "</span></div>";
        }
    }
</script>