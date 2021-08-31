const sumRecorder = document.querySelector(".sum-recorder");
const sumInput = document.querySelector(".sum-input");
const boardKey = document.querySelectorAll(".key");

let opt1 = undefined;
let opt2 = undefined;
let opr = undefined;

const clearVal = (el) => {
    el.value = '';
}

const calc = (n1, s, n2) => {
    switch(s){
        case '+':
            return n1 + n2;
            break;
        case '-':
            return n1 - n2;
            break;
        case '*':
            return n1 * n2;
            break;
        case '/':
            return n1 / n2;
            break;
    }
}

boardKey.forEach((item) => {
    const text = item.querySelector('p').textContent;
    
    //if text is a number only then add this listener
    if(text != '=' && text != 'C' && text != '+' && text != '-' && text != '/' && text != '*' && text != 'CE'){
        item.addEventListener('click', () => {
            sumInput.value += text;
        });
    }else{
        item.addEventListener('click', () => {
            let sol = undefined;

            if(text != 'C' && text != '=' && text != 'CE'){
                if(opt1 === undefined){
                    opt1 = +sumInput.value;
                    opr = text;

                    sumRecorder.textContent += opt1 + opr;

                }else{
                    opt2 = +sumInput.value;
                    
                    sumRecorder.textContent += opt2 + text;

                    sol = calc(opt1, opr, opt2);

                    opr = text;
                    opt1 = opt2;
                }
            }else{
                if(text == 'C'){
                    sumRecorder.textContent = '';
                }
            }

            if(text == '='){
                if(opt1){
                    sumInput.value = calc(opt1, opr, +sumInput.value);
                    sumRecorder.textContent = '';
                }
            }else if(text == 'CE'){
                sumInput.value = sumInput.value.substring(0, sumInput.value.length-1);
            }else{
                clearVal(sumInput);
            }
            if(sol !== undefined){
                sumInput.value = sol;
            }
        });
    }
})