// ---- Variables ----
//#current-score
let score = document.getElementById("score");

//#ez-change
let ez_p = document.getElementById("ez-p");
let ez_m = document.getElementById("ez-m");

//#num-change
let input_num = document.getElementById("num-in");
let max_health = document.getElementById("max-health")

//#numbers
let pad_buttons = {};

//#history
let history = document.getElementById("history");
let his_line = 1;

for (let i = 0; i <= 9; i++) {
    pad_buttons[`b_${i}`] = document.getElementById(`b-${i}`);
}

pad_buttons.b_p = document.getElementById("b-p");
pad_buttons.b_m = document.getElementById("b-m");
pad_buttons.b_clear = document.getElementById("b-clear");
pad_buttons.b_reset = document.getElementById("b-reset");

//---- FUNCTION ----

//Focus input box
// input_num.focus();

// !!!  **** Quick Maffs FUNCTION **** !!!!
function adjust_points(adjust, mod) {
  // Ensure the input is a valid number, otherwise default to 0
  let adjustValue = parseInt(adjust, 10);
  if (isNaN(adjustValue)) {
    adjustValue = 0;
  }

  // Clear and focus the input field
  input_num.value = null;
  input_num.focus();

  // Perform the operation based on the mod
  switch (mod) {
    case "+":
      new_score = parseInt(score.textContent, 10) + adjustValue;
      if(new_score <= max_health.value ) {
        add_history(`${his_line}. Added: ${adjustValue}, Health: ${new_score}`,"pos");
         his_line++;
        return new_score;
      } else {
        add_history(`${his_line}. Added: ${adjustValue}, Max Health: ${max_health.value}`,"pos");
         his_line++;
        return max_health.value;
      }
    case "-":
      new_score = parseInt(score.textContent, 10) - adjustValue;
      add_history(`${his_line}. Subtracted: ${adjustValue}, Health: ${new_score}`,"neg");
      his_line++;
      return new_score;
    default:
      throw new Error("Invalid operator");
  }
}

//Add to history 
function add_history(message,neg_pos) {
    let his_ent = document.createElement('p');
            his_ent.textContent = message;
            his_ent.classList.add(neg_pos);
            history.prepend(his_ent);
}


// Keyboard Input for plus and minus
document.addEventListener("keydown", (event) => {
  if (event.key === "+" || event.key === "=") {
    score.textContent = adjust_points(input_num.value, "+");
  } else if (event.key === "-") {
    score.textContent = adjust_points(input_num.value, "-");
  }
});



// Easy Buttons Functions
ez_p.onclick = function() {
  let cur_score = parseInt(score.textContent);
  cur_score++;
  score.textContent = cur_score;
  console.log(score.textContent);
}

ez_m.onclick = function() {
  let cur_score = parseInt(score.textContent);
  cur_score--;
  score.textContent = cur_score;
  console.log(score.textContent);
}

// Append numbers to input box
for (let i = 0; i <= 9; i++) {
    pad_buttons[`b_${i}`].addEventListener("click", () => {
      input_num.value += i;
      input_num.focus();
        // console.log(`Button ${i} clicked`);
    });
}

//Validate 
input_num.addEventListener("input", () => {
  input_num.value = input_num.value.replace(/[^0-9]/g, "");
  // console.log("Current input:", input_num.value);
});

 max_health.addEventListener("input", () => {
  max_health.value = max_health.value.replace(/[^0-9]/g, ""); 

});

//Plus and Minus numpad buttons
pad_buttons.b_p.onclick = function() {
  score.textContent = adjust_points(input_num.value, "+");
}

pad_buttons.b_m.onclick = function() {
  score.textContent = adjust_points(input_num.value, "-");
}


// Handle clear 
pad_buttons.b_clear.onclick = function() {
  input_num.value = null;
  input_num.focus();
}

// Handle Reset
pad_buttons.b_reset.onclick = function() {
  let confirmReset = confirm("Are you sure you want to reset your game? This cannot be undone and will delete the history.");
    if (confirmReset) {
      input_num.value = null;
      input_num.focus();
      score.textContent = 0;
      history.textContent = "";
        // console.log("Resetting the score...");
    } else {
        // Cancel the action
        console.log("Reset canceled.");
    }
  input_num.value = null;
  input_num.focus();
}