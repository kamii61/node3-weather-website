console.log("client side javascript file is loaded!")
const fetchWeather = (address, callback)=>{
    fetch('http://localhost:3000/weather?address=' + address).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            callback('Unable to connect to location services',undefined)
            messageSecond.textContent = data.errors
        } else {
            callback(undefined,{
            checklocation: data[0].location,
            forecast: data[0].forecast
        })}
    })
})
}


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageSecond = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageSecond.textContent = ''

    fetch('/weather?address=' + location).then((response) =>{
        response.json().then((data) => {
            if(data.error){
                messageSecond.textContent = data.error
            } else {
                messageOne.textContent = data[0].location
                messageSecond.textContent = data[0].forecast
            }
        })
    })
})