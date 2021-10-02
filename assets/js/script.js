//Array of hours
let hours = ["09", "10", "11", "12", "01", "02", "03", "04", "05" ];
//Array of ante and post meridiem.
let meridiem = ["am", "am", "am", "pm", "pm", "pm", "pm", "pm", "pm"];
//Variable for days.
var myDays = [];

for (let i=0; i < hours.length; i++) {
    let dict = {hour: hours[i], meridiem: meridiems[i]};
    myDays.push(dict);
}
console.log(myDays);






// var today = function() {
// var day = moment();
// $("#time").text(day.format("dddd, MMMM Do YYYY,"));
// }