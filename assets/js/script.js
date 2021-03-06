

// Jumbotron
var today = function() {
    var day = moment();
    $("#currentDay").text(day.format("dddd, MMMM Do YYYY, hh:mm:ss a"));
}

setInterval(today, 1000);
// Set the text when the page loads immeidately instead of waiting 1 second.
today();


//Array of hours
const hours = ["09am", "10am", "11am", "12pm", "01pm", "02pm", "03pm", "04pm", "05pm"];

// Create each day section for the planner.
for (var i = 0; i < hours.length; i++) {
    // Create a div for every day.
    var dayDiv = document.createElement("div");
    dayDiv.classList.add("row");

    // Create the hour label.
    var hourDiv = document.createElement("div");
    hourDiv.textContent = hours[i];
    hourDiv.classList.add("col-md-1", "hour", "time-block");
    dayDiv.append(hourDiv);

    // Create the input box.
    var textArea = document.createElement("textarea");
    textArea.classList.add("col-md-10", "hour", "textarea", "description");
    textArea.id = "textArea" + i;
    dayDiv.append(textArea);
    colorTextArea(i, textArea);

    // Create a button.
    var saveButton = document.createElement("button");
    saveButton.classList.add("col-md-1", "saveBtn");
    saveButton.innerHTML = '<i class="far fa-save"></i>';
    saveButton.id = i;
    // You need to add an event listener to this button.
    saveButton.addEventListener("click", saveButtonPressed);
    dayDiv.append(saveButton);

    // Get a reference to the planner and add each day div.
    document.getElementById("Planner Section").append(dayDiv);
}

// This function will color the text area depending on the planner's day hour and the
// current time.
function colorTextArea(i, textAreaToColor) {
    // Get the current hour and meridiam.
    // var currentTime = "12pm"; // Testing purposes.
    var currentTime = moment().format("hha");
    // Get the index of where it exists in the hours array.
    var currentTimeIndex = hours.indexOf(currentTime);

    if (currentTimeIndex == -1) {
        // If the current time is NOT present in the planner, it only
        // matters to check before 9 am and after 5 pm.
        var isAfter5pm = currentTime.slice(0, 2) > 5;
        var isAm = currentTime.slice(2, 4) != "am";
        if (isAfter5pm && isAm) {
            textAreaToColor.classList.add("past");
        } else {
            textAreaToColor.classList.add("future");
        }
    } else {
        // If the curent time is present in the planner, color accordingly.
        if (currentTimeIndex > i) {
            // Color Past - Gray
            textAreaToColor.classList.add("past");
        } else if (currentTimeIndex == i) {
            // Color Present - Red
            textAreaToColor.classList.add("present");
        } else {
            // Color Future - Green
            textAreaToColor.classList.add("future");
        }
    }
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

 