
var loop1, loop2, loop3, time = 30, i = 0, number;
var selector3 = document.getElementById('thirdDigit');
var selector2 = document.getElementById('secondDigit');
var selector1 = document.getElementById('firstDigit');

loop3 = setInterval(function () {
    "use strict";
    if (i > 40) {
        clearInterval(loop3);
        selector3.textContent = 4;
    }
}, time);
loop2 = setInterval(function () {
    "use strict";
    if (i > 80) {
        clearInterval(loop2);
        selector2.textContent = 0;
    }
}, time);
loop1 = setInterval(function () {
    "use strict";
    if (i > 100) {
        clearInterval(loop1);
        selector1.textContent = 4;
    }
}, time);