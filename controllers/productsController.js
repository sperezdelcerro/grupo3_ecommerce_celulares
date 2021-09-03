const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {
	// Show all products
	products: (req, res) => {
        res.render('products', { products })
    },
	// Detail from one product
    detail: (req, res) => {
        let productId = req.params.id - 1;

        res.render('detail', { product: products[productId] })
    },

	// create
	create: (req, res) => {
		res.render("productAdd");
	},

	// store
	store: (req, res) => {
		let productsDataJSON = fs.readFileSync("data/products.json",{encoding: "utf-8"})

		let products = JSON.parse(productsDataJSON);


		let id = products.length + 1;
	
		let product = {
			id: id,
			name: req.body.name,
			description:req.body.description,
			price:req.body.price,
			category: req.body.category,
			image:req.file.filename
		};
		products.push(product);

		let productsJSON = JSON.stringify(products);

		fs.writeFileSync('data/products.json', productsJSON);
		return res.redirect("/")
	},

	// Update - Form to edit
    edit: (req, res) => {
        products.forEach(product => {
            if (product.id == req.params.id) {
                res.render('productEdit', { product: product });
            }
        });
	},
	// Update - Method to update
	pruebaPut: (req, res) => {
		res.send("put funciona")
	},
	editSave: (req, res) => {
		let productsJSON = fs.readFileSync('data/products.json', { encoding: 'utf-8' });

        let products = JSON.parse(productsJSON);

        let updatedProducts = [];
        products.forEach(product => {

            if (product.id == req.params.id) {

                let updatedProduct = {
                    name: req.body.name,
					description:req.body.description,
					price:req.body.price,
					category: req.body.category,
                };
                if (req.files == '') {
                    updatedProduct["image"] = product.image;
                } else {
                    updatedProduct["image"] = req.file.filename;
                };

                updatedProducts.push(updatedProduct);

            } else {
                updatedProducts.push(product);
            };



        });

        let updatedProductsJSON = JSON.stringify(updatedProducts);

        fs.writeFileSync('data/products.json', updatedProductsJSON);
    
		return res.redirect('../detail/' + req.params.id);
    },
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	},


};

module.exports = controller
