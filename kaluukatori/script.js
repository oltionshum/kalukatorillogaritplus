let usageCount = parseInt(localStorage.getItem('usageCount')) || 0;

function checkUserRegistration() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('register').style.display = 'none';
        document.getElementById('calculator').style.display = 'block';
    } else {
        document.getElementById('register').style.display = 'block';
    }
}

function registerUser() {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username);
        document.getElementById('register').style.display = 'none';
        document.getElementById('calculator').style.display = 'block';
        alert('Regjistrimi u krye me sukses! Emri juaj është: ' + username);
    } else {
        alert('Ju lutem shkruani një emër përdoruesi të vlefshëm!');
    }
}

function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;
    const username = localStorage.getItem('username');
    let result;

    if (!isNaN(num1) && !isNaN(num2)) {
        switch (operation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num2 !== 0 ? (num1 / num2) : 'Nuk mund të pjestoni me zero!';
                break;
            default:
                result = 'Operacion i pavlefshëm!';
        }

        document.getElementById('result').textContent = 'Rezultati: ' + result;

        const userCalculations = JSON.parse(localStorage.getItem(`calculations_${username}`)) || [];
        userCalculations.push({ num1, num2, operation, result });
        localStorage.setItem(`calculations_${username}`, JSON.stringify(userCalculations));

        usageCount++;
        localStorage.setItem('usageCount', usageCount);
        if (usageCount >= 5) {
            document.getElementById('rating').style.display = 'block';
        }
    } else {
        alert('Ju lutem shkruani numra të vlefshëm!');
    }
}

function rate(stars) {
    alert('Faleminderit për vlerësimin tuaj prej ' + stars + ' yjesh!');
    localStorage.setItem('rating', stars);
    document.getElementById('rating').style.display = 'none';
}
