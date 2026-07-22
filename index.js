const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const productRouter = require('./modules/product/product.router');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', productRouter);
app.get('/', (req, res) => {
const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is product 1',
    image: ''
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is product 2',
    image: ''
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'This is product 3',
    image: ''
  }
];
  const data = {
    title: 'Home Page',
    message: 'Welcome to the Home Page!'
  };
  res.render('index', data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
