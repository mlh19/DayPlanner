// Jumbotron
var today = function() {
    var day = moment();
    $("#currentDay").text(day.format("dddd, MMMM Do YYYY, hh:mm:ss a"));
}

setInterval(today, 1000);
// Set the text when the page loads immeidately instead of waiting 1 second.
today();


//Array of hours
const hours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

// Create each day section for the planner.
for (var i = 0; i < hours.length; i++) {
    // Create a div for every day.
    var dayDiv = document.createElement("div");
    dayDiv.classList.add("row");

    var hourDiv = document.createElement("div");
    hourDiv.textContent = hours[i];
    hourDiv.classList.add("col-md-1", "hour");
    dayDiv.append(hourDiv);

    // Create the input box.
    var textArea = document.createElement("textarea");
    textArea.classList.add("col-md-10", "hour");
    textArea.id = "textArea" + i;
    dayDiv.append(textArea);

    // Create a button.
    var saveButton = document.createElement("button");
    saveButton.classList.add("col-md-1", "saveBtn");
    saveButton.textContent = "Save";
    saveButton.id = i;
    // You need to add an event listener to this button.
    saveButton.addEventListener("click", saveButtonPressed);
    dayDiv.append(saveButton);

    // Get a reference to the planner and add each day div.
    document.getElementById("Planner Section").append(dayDiv);
}

// This function is called when the save button is pressed.
function saveButtonPressed() {
    // "this" a Javascript keyword refers to the button that called this function.
    console.log(this.id);
    //The above is the same as: console.log(button0.id);
    var textArea = document.getElementById("textArea" + this.id); 
    console.log(textArea.id);
    // What you pass to log it will print in the console.
    console.log(textArea.value);
    // Create local storage.
    // key-value types are dictionaries and they can CANNOT have duplicate keys.
    // Save the text area's value (user typed in) to the corresponding key.
    localStorage.setItem("textArea" + this.id, textArea.value);
}

// Create a function that gets the data from local storage, and inserts it into
// each corresponding textBox that matches the key ("textArea" + i) so we know we
function loadUserPlannerData() {
    for(var i=0; i < hours.length; i++) {
        // Get value of (textArea + i) key, and store it in dayText.
        var dayText = localStorage.getItem("textArea" + i);
        var textAreaEl = document.getElementById("textArea" + i);
        textAreaEl.value = dayText;
        console.log(dayText);
     }  
}

loadUserPlannerData();

function removeAllData() {
    // First, we want to remove every item for each key.
    for(var i = 0; i < hours.length; i++) {
        localStorage.removeItem("textArea" + i);
    }
    // Second, we want to update the UI and clear each text box.
    // Since there is no data to get from storage, each textAreaEl value 
    // is set to 
    loadUserPlannerData();
}
var resetButton = document.getElementById("Reset");
resetButton.addEventListener("click", removeAllData);

 