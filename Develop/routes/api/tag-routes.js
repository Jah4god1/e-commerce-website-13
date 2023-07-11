const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
try {
// Find all tags
const tags = await Tag.findAll({
include: [Product],
});
res.json(tags);
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Failed to retrieve tags' });
}
});

router.get('/:id', async (req, res) => {
try {
// Find a single tag by its `id`
const tag = await Tag.findByPk(req.params.id, {
include: [Product],
});
if (!tag) {
res.status(404).json({ error: 'Tag not found' });
} else {
res.json(tag);
}
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Failed to retrieve tag' });
}
});

router.post('/', async (req, res) => {
try {
// Create a new tag
const tag = await Tag.create(req.body);
res.status(201).json(tag);
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Failed to create tag' });
}
});

router.put('/:id', async (req, res) => {
try {
// Update a tag's name by its `id` value
const updatedTag = await Tag.update(req.body, {
where: { id: req.params.id },
});
if (updatedTag[0] === 0) {
res.status(404).json({ error: 'Tag not found' });
} else {
res.status(200).json({ message: 'Tag updated successfully' });
}
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Failed to update tag' });
}
});

router.delete('/:id', async (req, res) => {
try {
// Delete one tag by its `id` value
const deletedTag = await Tag.destroy({
where: { id: req.params.id },
});
if (!deletedTag) {
res.status(404).json({ error: 'Tag not found' });
} else {
res.status(200).json({ message: 'Tag deleted successfully' });
}
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Failed to delete tag' });
}
});

module.exports = router;