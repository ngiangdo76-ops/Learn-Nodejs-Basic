const products = [
  { id: 1, name: "Giày Nike 1", description: "Mô tả sản phẩm 1", image: "https://www.outbacksylt.com/files/image/id/29692/fixed/1/w/1000/h/1000/n/adidas-samba-og-shoes.jpg" },
  { id: 2, name: "Giày Nike 2", description: "Mô tả sản phẩm 2", image: "https://www.outbacksylt.com/files/image/id/29692/fixed/1/w/1000/h/1000/n/adidas-samba-og-shoes.jpg" },
  { id: 3, name: "Giày Nike 3", description: "Mô tả sản phẩm 3", image: "https://www.outbacksylt.com/files/image/id/29692/fixed/1/w/1000/h/1000/n/adidas-samba-og-shoes.jpg" },
  { id: 4, name: "Giày Nike 4", description: "Mô tả sản phẩm 4", image: "https://www.outbacksylt.com/files/image/id/29692/fixed/1/w/1000/h/1000/n/adidas-samba-og-shoes.jpg" }
];

exports.getAllProducts = (req, res) => {
  const data = {
    title: "NodeJS Ninedev 2024",
    message: "Welcome to my website",
    sum: 2 + 3,
    products
  };
  res.render('products/index', data);
};

exports.getProductById = (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(item => item.id == id);
  if (index !== -1) {
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

exports.createProduct = (req, res) => {
  res.render('products/create');
};

exports.updateProduct = (req, res) => {
  res.json('Update');
};

exports.deleteProduct = (req, res) => {
  res.json('Delete');
};
