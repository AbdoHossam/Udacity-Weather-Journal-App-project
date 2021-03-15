/* Global Variables */

/*API key*/
const API_Url = `https://api.openweathermap.org/data/2.5/forecast?zip=`
const API_Key = '&appid=ce12c7421bee7206889a288720bfc6aa&units=imperial'

document.getElementById('generate').addEventListener("click", supmetData)


function supmetData(e) {
    const zipCode = document.getElementById('zip').value
    const feelings = document.getElementById('feelings').value
    WitherData(API_Url, zipCode, API_Key)
        .then((data) => {
            console.log(data)
            let api_r = { date: d, temp: data.list[0].main.temp, content: feelings }
            getData('http://localhost:8000/add', api_r)
            updatUI()
        })
}
let WitherData = async function(API_Url, zipCode, API_Key) {
    const res = await fetch(API_Url + zipCode + API_Key)
    try {
        const data = await res.json()
        return data
    } catch (error) {
        console.log("error", error)
    }
}
let getData = async function(url = "", data = "") {
    const respons = await fetch(url, {
        method: 'post',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
    })

    try {
        const nData = await respons.json()
        return nData
    } catch (error) {
        console.log("error", error)
    }
}
const updatUI = async function() {
    const request = await fetch('http://localhost:8000/all')
    //console.log("allRequest",  await request.json());
        try {
            let allData = await request.json();
            console.log(allData);
            let date = document.getElementById('date');
            date.innerHTML  += allData.date;
            var temp = document.getElementById('temp');
            temp.innerHTML += allData.temp;
            var content = document.getElementById('content');
            content.innerHTML += allData.content;
        } catch (error) {
            console.log("error", error)
        }
    }
    // Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();