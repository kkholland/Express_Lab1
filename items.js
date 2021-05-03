const express = require('express');
const items = express.Router();

items.use(express.json());

let cartItems = [
    {
        id: 100,
        product: 'Small Illustration',
        price: 60,
        quantity: 5
    },
    {
        id: 101,
        product: 'Large Illustration',
        price: 110,
        quantity: 3
    },
    {
        id: 102,
        product: 'Digital Print',
        price: 15,
        quantity: 50
    }
];


// respond with all items or search for query parameters
items.get("/cart-items", (req, res) => {
    let results = cartItems;

    if(req.query.maxPrice){
        results = results.filter(item => item.price <= +req.query.maxPrice);
    }

    if(req.query.prefix){
        results = results.filter(item => item.product.toLowerCase().includes(req.query.prefix.toLowerCase()));
    }

    if(req.query.pageSize){
        if (results.length > req.query.pageSize) {
            results.length = req.query.pageSize
        }
    }

    res.json(results);
    
});

// respond with 1 specific item by id
items.get('/cart-items/:id', (req, res) => {
    let result = cartItems.filter(item => item.id === +req.params.id);

    if(result.length === 0){
        result = 'ID Not Found';
        res.status(404);
    }
    
    res.json(result);
    
})

// add an item and respond with that item
items.post("/cart-items", (req, res) => {
    let newId = cartItems[cartItems.length-1].id+1;
    
    let newItem = {
        id: newId,
        product: 'Venue Illustration',
        price: 250,
        quantity: 5
    };

    cartItems.push(newItem);

    res.status(201);
    res.json(newItem);
});

// update an item based on id and respond with the updated item, where req.body has new info
items.put("/cart-items/:id", (req, res) => {
    let updatedItem = req.body;
    let resultIndex = cartItems.findIndex(item => item.id === +req.params.id);

    if(resultIndex === -1){
        res.status(404);
        res.json('ID Not Found');
    } else{
        cartItems.splice(resultIndex,1,updatedItem);  
        res.json(updatedItem);
    }

});

// delete an item by id
items.delete("/cart-items/:id", (req, res) => {

    let resultIndex = cartItems.findIndex(item => item.id === +req.params.id);

    if(resultIndex === -1){
        res.status(404);
        res.json('ID Not Found');
    } else{
        cartItems.splice(resultIndex,1);  
        res.status(204);
    }
});

module.exports = items;