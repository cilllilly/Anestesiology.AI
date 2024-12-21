let xhr = null;
var load = document.getElementById("loading")
getXmlHttpRequestObject = function(){
    if(!xhr){
        xhr = new XMLHttpRequest()
    }
    return xhr;
}
function sendData(e){
    load.style.display = "block";
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
    xhr.open("POST","http://127.0.0.1:8000/views/submit", true);
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
    waitForData();
}

document.getElementById("calculateButton").addEventListener("click", sendData)

async function waitForData() {
    await fetch("/views/submit");
    getData();
}

async function getData(){
    const response = await fetch("/views/getData");
    const result = await response.json();
    if(result.data){
        display(result.data)
    }
    else{
        setTimeout(getData, 1000);
    }
}

function display(calculations){
    load.style.display = "none";
    console.log(calculations);
    document.getElementById("result").style.display = "block";
    var minDose = document.getElementById("minDose");
    var maxDose = document.getElementById("maxDose");
    minDose.innerText = calculations["MinDose"] + "mg";
    maxDose.innerText = calculations["MaxDose"] + "mg";
}