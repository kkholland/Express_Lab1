const express = require('express');
const router = express.Router();

router.use(express.json());

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
router.get("/cart-items", (req, res) => {
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
router.get('/cart-items/:id', (req, res) => {
    let result = cartItems.find(item => item.id === +req.params.id);

    if(!result){
        res.status(404).send('ID Not Found');
    } else {
       res.json(result); 
    }
    
})

// add an item and respond with that item
router.post("/cart-items", (req, res) => {

    const quantity = parseInt(req.body.quantity);
    const price = parseInt(req.body.price);

    if(!quantity){
        return res.status(400).send('Invalid quantity');
    }
    if(!price){
        return res.status(400).send('Invalid price');
    }


    
    let newItem = {
        id: cartItems[cartItems.length-1].id+1,
        product: req.body.product,
        price: price,
        quantity: quantity
    };

    cartItems.push(newItem);

    res.status(201).json(newItem);
});

// update an item based on id and respond with the updated item, where req.body has new info
router.put("/cart-items/:id", (req, res) => {
    // let updatedItem = {
    //     id: +req.params.id,
    //     product: req.body.product,
    //     price: req.body.price,
    //     quantity: req.body.quantity
    // };

    // let resultIndex = cartItems.findIndex(item => item.id === +req.params.id);

    // if(resultIndex === -1){
    //     res.status(404).send('ID Not Found');
    // } else{
    //     cartItems.splice(resultIndex,1,updatedItem);  
    //     res.json(updatedItem);
    // }

    let result = cartItems.find(item => item.id === +req.params.id);

    if (result) {
        result.product = req.body.product;
        result.price = +req.body.price;
        result.quantity = +req.body.quantity;
        res.json(result)
    } else {
        res.status(404).send('ID Not Found');
    }

});

// delete an item by id 
router.delete("/cart-items/:id", (req, res) => {

    let resultIndex = cartItems.findIndex(item => item.id === +req.params.id);

    if(resultIndex >= 0){
        cartItems.splice(resultIndex,1);  
        res.status(204).json(cartItems);
    } else {
        res.status(404).json('ID Not Found');
    }
});

module.exports = router;