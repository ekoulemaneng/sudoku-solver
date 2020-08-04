let table = document.querySelector('#table');
let form = document.querySelector('form');
let textarea = document.querySelector('textarea');
let notice = document.querySelector('.error-msg');

document.addEventListener('DOMContentLoaded', generateTable);
form.addEventListener('reset', () => {
    textarea.innerHTML = '';
    notice.innerHTML = '';
}); 

function generateTable() {

    function id(l,c) {
        return l * 9 + c;
    }
    
    function cl(l,c) {
    
        let cl;
    
        switch(l) {
            case 0:
                cl = 'full-top';
                break;
            case 2: case 5:
                cl = 'half-bottom';
                break;
            case 3: case 6:
                cl = 'half-top';
                break;
            case 8:
                cl = 'full-bottom';
                break;
            default:
                cl = '';
        } 
    
        switch(c) {
            case 0:
                cl = cl === '' ? 'full-left': cl + ' full-left';
                break;
            case 2: case 5:
                cl = cl === '' ? 'half-right': cl + ' half-right';
                break;
            case 3: case 6:
                cl = cl === '' ? 'half-left': cl + ' half-left';
                break;
            case 8:
                cl = cl === '' ? 'full-right': cl + ' full-right';
                break;
            default:
                cl += '';
        } 
    
        if (cl === '') cl = 'alone';
    
        return cl;
        
    }
    
    let content = '';
    
    content = '<tbody>';
    
    for (let i = 0; i < 9; i++) {
        content += '<tr>';
        for (let j = 0; j < 9; j++) {
            content += "<td class='" + cl(i,j) + "'><input type='text' maxlength='1' size='1' pattern='[0-9]' class='box' id='" + id(i,j) + "'></td>";
        } 
        content += '</tr>';
    }
    
    content += '</tbody>';

    table.innerHTML = content;

    let inputs = document.querySelectorAll('.box');

    function getGridInput() {
        let values = [];
        let isOK = true;

        let n = inputs.length;

        for (let i = 0; i < n; i++) {
            let input = inputs[i];
            if (!['1', '2', '3', '4', '5', '6', '7', '8', '9', ''].includes(input.value)) {
                isOK = false;
                notice.innerHTML = 'The grid contains at least one invalid character.';
                break;
            }
            else if (input.value == '') {
                notice.innerHTML = '';
                values.push('.');
            }
            else {
                notice.innerHTML = '';
                values.push(input.value);
            }
        }

        if (isOK) textarea.innerHTML = values.join('');
    }

    function getTextareaInput() {
        let gridString = textarea.value;
        let n = gridString.length;
        if (n !== 81) notice.innerHTML = 'Error: Expected puzzle to be 81 characters long.';
        else {
            if (!isValidString(gridString)) notice.innerHTML = 'The grid contains at least one invalid character.';
            else {
                notice.innerHTML = '';
                strToGrid(gridString);
            }
        }
    }

    function submitGrid() {

        let str = textarea.value;

        if (str.length !== 81) notice.innerHTML = 'Error: Expected puzzle to be 81 characters long.';
        else if (!isValidString(str)) notice.innerHTML = 'The grid contains at least one invalid character.';
        else {
            let data = new URLSearchParams();
            data.append('grid', str);
            fetch('/api/solve?' + data.toString(), {method: 'GET'}).then(res => res.json()).then(result => {
                let output = result.output.join('');
                textarea.value = output;
                strToGrid(output);
            });
        }

    }

    function strToGrid(str) {
        let n = str.length;
        for (let i = 0; i < n; i++) {
            if (str[i] === '.') inputs[i].value = '';
            else inputs[i].value = str[i]; 
        }
    }

    inputs.forEach(input => input.addEventListener('input', getGridInput));
    textarea.addEventListener('input', getTextareaInput);
    //---
    form.addEventListener('submit', event => {
        event.preventDefault();
        submitGrid();
    });
    
}

function isValidString(str) {
    let n = str.length;
    for (let i = 0; i < n; i++) {
        if (!['1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(str[i])) return false;
    }
    return true;
}
