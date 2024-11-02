let xhr = null;
getXmlHttpRequestObject = function(){
    if(!xhr){
        xhr = new XMLHttpRequest()
    }
    return xhr;
}
function getData(e){
    e.preventDefault()//stop the page from reloading when data is submitted
    let weight = document.getElementById("weightInput").value 
    console.log(weight);

    let patientHistory = document.getElementById("patientHistoryInput").value
    console.log(patientHistory);

    let systolicBloodPressure = document.getElementById("systolicBloodPressureInput").value
    console.log(systolicBloodPressure);

    let diastolicBloodPressure = document.getElementById("diastolicBloodPressureInput").value
    console.log(diastolicBloodPressure);

    let temperature = document.getElementById("temperatureInput").value
    console.log(temperature);

    let pulse = document.getElementById("pulseInput").value
    console.log(pulse);

    let age = document.getElementById("ageInput").value
    console.log(age);

    let opperation = document.getElementById("opperationInput").value
    console.log(opperation);

    xhr = getXmlHttpRequestObject();
    //send post request
    xhr.open("POST","http://127.0.0.1:8000/views/calculate", true);
    //Allow server to accept json files. 
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type","Application/json");
    //Attach json data to post request.
    xhr.send(JSON.stringify({
        "weight": weight, 
        "systolicBloodPressure": systolicBloodPressure,
        "diastolicBloodPressure": diastolicBloodPressure,
        "temperature": temperature,
        "pulse": pulse,
        "age": age,
        "opperation": opperation
    }));

}

document.getElementById("calculateButton").addEventListener("click", getData)