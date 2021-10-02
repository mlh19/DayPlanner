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

    var hourDiv = document.createElement("div");
    hourDiv.textContent = hours[i];
    hourDiv.classList.add("col-md-1");
    dayDiv.append(hourDiv);

    // Create the input box.
    var textArea = document.createElement("textarea");
    textArea.classList.add("col-md-10");
    textArea.id = "textArea" + i;
    dayDiv.append(textArea);

    // Create a button.
    var saveButton = document.createElement("button");
    saveButton.classList.add("col-md-1");
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
    // this refers to the current object that called this function.
    console.log(this.id);
    var textArea = document.getElementById("textArea" + this.id); 
    console.log(textArea.id);
    // > Get the text inside textArea and save the text as a key("textArea" + id)-value in local storage.
    // key-value types are dictionaries and they can CANNOT have duplicate keys.
    localStorage.setItem("textArea" + this.id, "value");
    // { "textArea0": "1729" }
}

// Create a function that gets the data from local storage, and inserts it into
// each corresponding textBox that matches the key ("textArea" + i) so we know we
// are putting it back in the right place.
// When you get the data for textAreaX, you just get that element id and set its text to the value.
// { "textArea0": "1729" } loop
 