const Product = require('../models/product');

// function to show all the products
module.exports.products = async function(req, res){
    try {
        const foundProducts = await Product.find({});
        res.send(foundProducts);
    } catch (err) {
        res.send(err);
    }
}


// function to create a new product
module.exports.create = async function(req, res){
    const newProduct = new Product({
        name: req.body.name,
        quantity: req.body.quantity
    });
    try {
        await newProduct.save();
        res.send('New product added successfully.');
    } catch (err) {
        res.send(err);
    }
}

// function to delete a product using it's ID
module.exports.delete = async function(req, res){
    try {
        await Product.deleteOne({_id: req.params.productID});
        res.send({
            message: "Product deleted"
        });
    } catch (err) {
        res.send(err);
    }
}

// Update quantity of a product by ID
exports.updateQuantity = async (req, res) => {
    try {
      const { id } = req.params;
      const { number } = req.query;
      
      if (!Number.isNaN(parseInt(number))) {
        const product = await Product.findByIdAndUpdate(
          id,
          { $inc: { quantity: parseInt(number) } },
          { new: true }
        );
        if (product) {
          res.status(200).json({ product, message: 'Updated successfully' });
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } else {
        res.status(400).json({ error: 'Invalid quantity' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  