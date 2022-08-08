var record = {
    setRecord: function(newRecord){
        localStorage.setItem("record", JSON.stringify(newRecord))
    },
    getRecord: function(){
        return JSON.parse(localStorage.getItem('record'));
     },
    removeRecord: function(){
        localStorage.removeItem('record')
    }
};


let transaction = document.getElementById('transaction'),
    logs = document.querySelectorAll('#logs div h5'),
    currBal = document.querySelector('#card h1'),
    sum, sumArr = [], exp, expArr = [], data, dataArr = []

for(let i = 0; i < record.getRecord().length; i++){
    if(record.getRecord()[i].type === 'green'){
        sum =+ record.getRecord()[i].amount;

        sumArr = sumArr.concat(sum);
    }else{
        exp =+ record.getRecord()[i].amount;

        expArr = expArr.concat(exp);
    }
    data = record.getRecord()[i].amount;
    dataArr.push(data)
}


logs[0].innerHTML = sumArr.reduce((prevValue, currValue) =>  prevValue + currValue, 0);

logs[3].innerHTML = expArr.reduce((prevValue, currValue) =>  prevValue + currValue, 0);

logs[2].innerHTML = eval(parseInt(logs[0].innerHTML) - parseInt(logs[3].innerHTML));

logs[1].innerHTML = 0.03 * logs[2].innerHTML;

currBal.innerHTML = eval(logs[2].innerHTML + logs[1].innerHTML);


const ctx = document.getElementById('myChart').getContext('2d');

let date = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',];

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: date,
        datasets: [{
            label: 'Amounts',
            data: dataArr.reverse(),
            backgroundColor: '#C1DEFE',
            borderColor: 'rgb(44, 100, 156)' ,
            borderWidth: 1.5,
            tension: 0.4,  
            fill: true
        }]
    },

    options: { 
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
});

// fetch('/transaction.html').then(res => res.text())
// .then(data => {
//     transaction.innerHTML = data;

//     let income = transaction.querySelector('#inputs #income h4'); 
//     logs[0].innerHTML = income.innerHTML;

//     let bal = transaction.querySelector('#bal h1'); 
//     logs[2].innerHTML = bal.innerHTML;

//     logs[1].innerHTML = 0.03 * bal.innerHTML

//     let expense = transaction.querySelector('#inputs #expense h4'); 
//     logs[3].innerHTML = expense.innerHTML;
// });