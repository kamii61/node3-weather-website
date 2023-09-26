const express = require('express')
const path = require('path')
const hbs = require('hbs')
const GeoCode = require('../utils/geocode')
const forecast = require('../utils/forecast')
const { error } = require('console')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000
//Difine a paths for Express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

app.set("view engine", "hbs")
app.set("views", viewsDirectoryPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Xuan Thai'
        
    })
})
app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Xuan Thai'

    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help page!!',
        name: 'Xuan Thai'

    })
})

//app.com/weather
app.get('/weather',(req,res) => {
    const query= req.query
    if(!query.address) {
        res.send({
            error: "You must provide address term!!"
        })
    }
    GeoCode(query.address, (error,{Latitute, Longtitute, Location} = {}) => {
        if(error){
            res.send({
                error: "The address " + query.address + " is no existed!!"
            })
        }
        console.log("Latitute is "+ Latitute)
        console.log("Longtitute is "+ Longtitute)
        forecast(Latitute,Longtitute, (error, {precip:forecast,temperature} = {}) =>{
            if(error){
                res.send({
                    error: "Failed to forecast the weather in " + query.address
                })
            }else{
                res.send([{
                    temperature,
                    forecast,
                    location: Location
                }])
            }

        })
    })

})

app.get('/products', (req,res) => {
    if(!req.query.search){
        res.send({
            error: "You must provide a search"
        })

    }
    console.log(req.query)
    res.send(
        {
            products: []
        }
    )
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: "404 Page!!",
        name: "Xuan Thai",
        errorMessage: "My help artical not found"
    })
})
app.get('*', (req,res) => {
    res.render('404',{
        title: "404 Page!!",
        name: "Xuan Thai",
        errorMessage: "Page not found"
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ', port)
})