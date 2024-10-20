const express = require('express')
const app = express()

app.get('/greetings/:username', (req, res) => { 
    const username = req.params.username
    res.send(`<h1>Hello there, ${username}! </h1>`)
});

// EXAMPLE 2

app.get('/roll/:number', (req, res) => {
    const numParam = req.params.number

    if (isNaN(numParam)) {
        return res.send("You must specify a number.")
    }
    const maxNumber = parseInt(numParam)
    const randomRoll = Math.floor(Math.random() * (maxNumber + 1))

    res.send(`You rolled a ${randomRoll}.`)
})

// EXAMPLE 3

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index)

    if (index < 0 || index >= collectibles.length || isNaN(index))
        return res.send("This item is not yet in stock. Check back soon!")
    
    const collectible = collectibles[index]

    return res.send(`So, you want the ${collectible.name}? For ${collectible.price}, it can be yours!`)
  })


// EXAMPLE 4

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    let filteredShoes = shoes

    const { minPrice, maxPrice, type } = req.query

    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice))
    }    
    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice))
    }
    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type)
    }
    res.json(filteredShoes)
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});


