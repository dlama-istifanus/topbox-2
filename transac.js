// Transaction page

var record = {
    setRecord: function(newRecord){
        localStorage.setItem('record', JSON.stringify(newRecord))
    },
    getRecord: function(){
        return JSON.parse(localStorage.getItem('record'));
     },
    removeRecord: function(){
        localStorage.removeItem('record')
    }
};

if(record.getRecord() === null){
    record.setRecord([]);
}

const add = document.getElementById('add');

const records = document.getElementById('records');

const income = document.querySelector('#income h4');

const expense = document.querySelector('#expense h4');

const balance = document.querySelector('#bal h1');

const clearBtn = document.getElementById('clear');

const txt = document.getElementById('txt-input');

const amt = document.getElementById('amount');

const select = document.querySelector('select');

let divs

let sum, exp;


let sumArr = [];

let expArr = [];

function logic(){
    class RecordItem {
        constructor(title, amount, type){
            this.title = title;
            this.amount = amount;
            this.type = type
        }
    };

    let newEl = new RecordItem(txt.value, amt.value, select.value);
    let getRec = record.getRecord();
    getRec.push(newEl);
    record.setRecord(getRec);

    records.innerHTML = '';

    for(let i = 0; i < record.getRecord().length; i++){
        let determiner = record.getRecord()[i].type === 'green' ? '+': '-'
        let recordEl = `<div class="record ${record.getRecord()[i].type}"><p>${record.getRecord()[i].title}</p><p id = 'score'>${determiner}${record.getRecord()[i].amount}</p></div>`;

        records.insertAdjacentHTML('afterbegin', recordEl);
        

        divs =  Array.from(records.querySelectorAll('div'));

        divs.forEach((div) => {
            div.addEventListener('click', () => {
                let getRecordList = record.getRecord();
                for(let i = 0; i < record.getRecord().length; i++){
                    if(div.querySelector('p:first-of-type').innerHTML === record.getRecord()[i].title){ 
                    getRecordList.splice(i, 1);
                    console.log(i);
                    }
                }
                record.setRecord(getRecordList)
                div.remove();
            });
        });

        if(record.getRecord()[i].type === 'green'){
            sum =+ record.getRecord()[i].amount;

            sumArr = sumArr.concat(sum);
        }else{
            exp =+ record.getRecord()[i].amount;

            expArr = expArr.concat(exp);
        }
    } 

    income.innerHTML = sumArr.reduce((prevValue, currValue) =>  prevValue + currValue, 0);
        
    expense.innerHTML = expArr.reduce((prevValue, currValue) =>  prevValue + currValue, 0);

    balance.innerHTML = eval(parseInt(income.innerHTML) - parseInt(expense.innerHTML));

    txt.value = '';
    amt.value = '';
}

add.addEventListener('click', (e) => {
    e.preventDefault();
    logic();
});

clearBtn.addEventListener('click', () => {
    let conf = confirm('Warning this will erase all data.')
    if(conf){
        record.removeRecord();
        window.location.reload();
    }
    
});

let dashboard = document.getElementById('dashboard');

fetch('/index.html').then(res => res.text())
.then(data => {
    dashboard.innerHTML = data;
    
});