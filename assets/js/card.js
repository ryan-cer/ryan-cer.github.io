let selected_fam;
let selected_string;

let message = document.getElementById("message");
let history = document.getElementById("score-history");

let j_card = document.getElementById("jack-title");
let q_card = document.getElementById("queen-title");
let k_card = document.getElementById("king-title");

let j_select = document.getElementById("jack-select");
let q_select= document.getElementById("queen-select");
let k_select = document.getElementById("king-select");

let j_score = document.getElementById("j-score");
let q_score = document.getElementById("q-score");
let k_score = document.getElementById("k-score");

let minus_button = document.getElementById("minus-but");
let plus_button = document.getElementById("plus-but");
let score_input = document.getElementById("score-input");

// Sets the selection when clicked
j_select.onclick = function() {
    if (selected_fam != null) {
        document.getElementById(`${selected_fam}card`).classList.remove('highlight');
        selected_fam = undefined;
    }
    selected_fam = "j-col-";
    selected_string_find(selected_fam);
    message.textContent = `You Selected ${selected_string}`;
    document.getElementById(`${selected_fam}card`).classList.add('highlight');
}
q_select.onclick = function() {
    if (selected_fam != null) {
        document.getElementById(`${selected_fam}card`).classList.remove('highlight');
        selected_fam = undefined;
    }
    selected_fam = "q-col-";
    selected_string_find(selected_fam);
    message.textContent = `You Selected ${selected_string}`;
    document.getElementById(`${selected_fam}card`).classList.add('highlight');
}
k_select.onclick = function() {
    if (selected_fam != null) {
        document.getElementById(`${selected_fam}card`).classList.remove('highlight');
        selected_fam = undefined;
    }
    selected_fam = "k-col-";
    selected_string_find(selected_fam);
    message.textContent = `You Selected ${selected_string}`;
    document.getElementById(`${selected_fam}card`).classList.add('highlight');
}

// Finds the string name of selected character
function selected_string_find(selected) {
    switch(selected) {
        case "j-col-":
            selected_string = "Jack"
            break;
        case "q-col-":
            selected_string = "Queen"
            break;
        case "k-col-":
            selected_string = "King"
            break;
    }
}

function add_history(message,neg_pos) {
    let his_ent = document.createElement('p');
            his_ent.textContent = message;
            his_ent.classList.add(neg_pos);
            history.prepend(his_ent);
}


minus_button.onclick = function() {

    if (selected_fam == null) {
        message.textContent = "No Selection made!";
    }
    else {
        if (score_input.value > 0 ) {
            minus_health(score_input.value)
        }
        else {
            minus_health(1)
        }
        
    }
    score_input.value = null;
    
}

function minus_health(amount) {
    let health_num = document.getElementById(`${selected_fam}score`);
    let num = Number(health_num.textContent);
    let fam_card = document.getElementById(`${selected_fam}card`);

    // console.log(amount);
    // console.log(num);
    // console.log(num - amount);

    
    if (num > 1) {
        if (num - amount <= 0 ) {
            health_num.textContent = 0;

            let his_mess = `${amount} Damge, ${selected_string} has been defeated!`

            add_history(his_mess,"neg");

            fam_card.classList.add('dead');
            message.textContent = `${selected_string} has been defeated`;
            
            selected_fam = undefined;
        }
        else {
            num = num - amount
            health_num.textContent = num;

            let his_mess = `-${amount} to ${selected_string}; health: ${num}`
            add_history(his_mess,"neg");
        }
    }
    else {
        health_num.textContent = 0;
        fam_card.classList.add('dead');
        message.textContent = `${selected_string} is dead`;

        his_mess = `${selected_string} has been defeated!`
        add_history(his_mess,"neg")

        selected_fam = undefined;

    }
}

function add_health(amount){
    let health_num = document.getElementById(`${selected_fam}score`);
    let num = Number(health_num.textContent);
    amount = Number(amount);

    if (num == 0) {
        document.getElementById(`${selected_fam}card`).classList.remove('dead');
        num += amount;

        his_mess = `${selected_string} has risen from the dead, +${amount}`

        add_history(his_mess,"pos") 
    }
    else if (num > 0) {
        num += amount;
        
        // console.log("num2: " + num);

        his_mess = `+${amount} to ${selected_string}; health: ${num}`;
        add_history(his_mess,"pos");
    }

    health_num.textContent = num;

}

plus_button.onclick = function() {
    if (selected_fam == null) {
        message.textContent = "No Selection made!";
    }
    else {
        if (score_input.value > 0 ) {
            // console.log(score_input.value);
            add_health(score_input.value);
        }
        else {
            add_health(1);
        }
    } 
    score_input.value = null;    
}

document.getElementById("test").onclick = function(){
    console.log(selected_fam);
    console.log(typeof(selected_fam));
    console.log(selected_string);
}
    
   