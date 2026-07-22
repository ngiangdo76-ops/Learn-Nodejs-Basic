// let products = [
//   {
//     id: 1,
//     name: "Adidas Samba OG Shoes",
//     price: "2.000.000 VND",
//     image:
//       "https://www.outbacksylt.com/files/image/id/29692/fixed/1/w/1000/h/1000/n/adidas-samba-og-white-b75806-1.jpg",
//   },
//   {
//     id: 2,
//     name: "Nike Jordan 1",
//     price: "2.000.000 VND",
//     image: "https://www.glab.vn/storage/products/2023/05/12/645e09068edaf.jpg",
//   },
//   {
//     id: 3,
//     name: "Nike Dunk",
//     price: "2.500.000 VND",
//     image:
//       "https://bizweb.dktcdn.net/thumb/1024x1024/100/413/335/products/duyetfashion-nike-dunk-low-black-white-dd1391-100-dd1503-101-duyet-fashion-8-jpeg-1feca183-0585-412a-ae79-6bb72eebd04a-616ff778-ef3e-4fde-85bd-6988122fa5fc.jpg?v=1654677561477",
//   },
//   {
//     id: 4,
//     name: "Nike Blazer",
//     price: "1.500.000 VND",
//     image:
//       "https://bizweb.dktcdn.net/thumb/1024x1024/100/427/393/products/img-9250.jpg",
//   },
// ];

// exports.getAllProducts = (req, res) => {
//   res.render("product/index", {
//     title: "NodeJS Ninedev 2024",
//     products,
//   });
// };

// exports.createProduct = (req, res) => {
//   res.render("product/create");
// };

// exports.postCreateProduct = (req, res) => {
//   try {
//     const { body } = req;
//     products.push({
//       id: Number(Math.random()),
//       ...body,
//     });
//     res.json(200);
//   } catch (error) {
//     res.json("Server internal error");
//   }
// };

// exports.getDetailProduct = (req, res) => {
//   const { id } = req.params;

//   const product = products.find(item => item.id == id);
//   res.render("product/detail", { product });
// };

// exports.deleteProduct = (req, res) => {
//   try {
//     const { id } = req.params;
//     const index = products.findIndex(item => item.id == id);
//     products.splice(index, 1);
//     res.json(200);
//   } catch (error) {
//     res.json("Server internal error");
//   }
// }