const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
try {
// Find all products
const products = await Product.findAll({
include: [Category, Tag],
});
res.json(products);
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Failed to retrieve products' });
}
});

// get one product
router.get('/:id', async (req, res) => {
try {
// Find a single product by its `id`
const product = await Product.findByPk(req.params.id, {
include: [Category, Tag],
});
if (!product) {
res.status(404).json({ error: 'Product not found' });
} else {
res.json(product);
}
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Failed to retrieve product' });
}
});

// create new product
router.post('/', async (req, res) => {
try {
// Create a new product
const product = await Product.create(req.body);

// Check if there are product tags
if (req.body.tagIds && req.body.tagIds.length) {
const productTagIdArr = req.body.tagIds.map((tag_id) => {
return {
product_id: product.id,
tag_id,
};
});

// Create the product tags
await ProductTag.bulkCreate(productTagIdArr);
}

res.status(200).json(product);
} catch (error) {
console.error(error);
res.status(400).json(error);
}
});

// update product
router.put('/:id', async (req, res) => {
try {
// Update product data
await Product.update(req.body, {
where: {
id: req.params.id,
},
});

// Check if there are product tags
if (req.body.tagIds && req.body.tagIds.length) {
const productTags = await ProductTag.findAll({
where: { product_id: req.params.id },
});

const productTagIds = productTags.map(({ tag_id }) => tag_id);

const newProductTags = req.body.tagIds
.filter((tag_id) => !productTagIds.includes(tag_id))
.map((tag_id) => {
return {
product_id: req.params.id,
tag_id,
};
});

const productTagsToRemove = productTags
.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
.map(({ id }) => id);

await Promise.all([
ProductTag.destroy({ where: { id: productTagsToRemove } }),
ProductTag.bulkCreate(newProductTags),
]);
}

const updatedProduct = await Product.findByPk(req.params.id, {
include: [Category, Tag],
});

res.json(updatedProduct);
} catch (error) {
console.error(error);
res.status(400).json(error);
}
});

router.delete('/:id', async (req, res) => {
try {
// Delete one product by its `id` value
const deletedProduct = await Product.destroy({
where: { id: req.params.id },
});
if (!deletedProduct) {
res.status(404).json({ error: 'Product not found' });
} else {
res.status(200).json({ message: 'Product deleted successfully' });
}
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Failed to delete product' });
}
});

module.exports = router;