const app = require("./app-express.js");

const { Product, ProductImage } = require("../models/models.js");

app.get("/", (req, res) => {
  res.send("Olá, mundo");
});

// cRud - READ
app.get("/v1/product/search", async (request, res) => {
  console.log(req.query);
  const produtos = await Product.findAll({ limit: 30 });

  Product.findAll({ where: { id: request.params.id } });
  res.send(produtos);
});

// cRud - READ
app.get("/v1/product/:id", (request, res) => {
  console.log("request.url", request.url); // debug
  console.log("request.params.id", request.params.id);

  Product.findOne({ where: { id: request.params.id } }).then((result) =>
    res.send(result)
  );
});

// cRud - READ
app.get("/v1/product/", (request, res) => {
  console.log("request.url", request.url); // debug

  Product.findAll().then((result) => res.send(result));
});

// Crud - CREATE
app.post("/v1/product", (request, res) => {
  console.log("request.url", request.url); // debug
  console.log("request.body", request.body);

  Product.create(request.body).then((result) => res.status(201).send(result));
});

// cruD - DELETE
app.delete("/v1/product/:id", (request, res) => {
  console.log("request.url", request.url); // debug
  Product.destroy({ where: { id: request.params.id } }).then((result) => {
    res.send("deletei com sucesso essa quantidade de linhas: " + result);
  });
});

// Crud - CREATE
app.post("/v1/product", async (request, res) => {
  console.log("request.url", request.url); // debug
  console.log("request.body", request.body);

  const productCreated = await Product.create(request.body);
  console.log("productCreated", productCreated);
  await productCreated.addCategories(request.body.category_ids);
  const imagesParsed = request.body.images.map((image) => ({
    product_id: productCreated.id,
    path: image.content,
  }));
  const imagesCreated = await ProductImage.bulkCreate(imagesParsed);

  res.status(201).send({ productCreated, imagesCreated });
});

// crUd - UPDATE
app.put("/v1/product/:id", (request, res) => {
  console.log("request.url", request.url); // debug
  console.log("request.body", request.body);
  Product.update(request.body, { where: { id: request.params.id } }).then(
    (result) => res.send(result)
  );
});
