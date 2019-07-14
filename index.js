const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = 3000;

// créer un serveur
const app = express();
app.use(bodyParser.json());

// Se connecter à la base de données
mongoose.connect("mongodb://localhost/onlineShop", { useNewUrlParser: true });

// 1]  CRUD pour la collection Department (familles de categories) **********************************************************************************************************

// Déclarer les models - Department
const Department = mongoose.model("Department", {
  title: {
    type: String,
    default: ""
  }
});

// Créer les routes - Department

// Route 1 = Create - Department
app.post("/department/create", async (req, res) => {
  try {
    const newDepartment = new Department({
      title: req.body.title
    });
    await newDepartment.save();
    return res.json({ message: "Created" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// route 2 = Read - Department
// Cette route devra récupérer les attributs de tous les départements.

app.get("/department", async (req, res) => {
  try {
    const departments = await departments.find();
    return res.json(departments);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// route 3 - Update - Department
app.post("/department/update", async (req, res) => {
  try {
    if (req.body.id && req.body.title) {
      const department = await Department.findOne({ _id: req.body.id });

      department.title = req.body.title;
      await department.save();
      return res.json({ message: "Updated" });
    } else {
      return res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Route 4 - Delete - Department
app.post("/department/delete", async (req, res) => {
  try {
    if (req.query.id) {
      const department = await Department.findOne({ _id: req.query.id });

      await department.remove();
      return res.json({ message: "Removed" });
    } else {
      return res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// 2] CRUD pour la collection Category (categories de produits)
//**********************************************************************************************************
// Déclarer les models - Category
const Category = mongoose.model("Category", {
  title: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "department"
  }
});

// Route 1 = Create - Category
app.post("/category/create", async (req, res) => {
  try {
    const newCategory = new Category({
      title: req.body.title,
      description: req.body.description,
      department: req.body.department
    });
    await newCategory.save();
    return res.json({ message: "Created" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Route 2 = Read - Category
app.get("/category", async (req, res) => {
  try {
    const categories = await categories.find();
    return res.json(categories);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Route 3 - Update - Category
app.post("/category/update", async (req, res) => {
  try {
    if (req.query.id && req.body.title) {
      const category = await Category.findOne({ _id: req.query.id });

      (category.title = req.body.title),
        (category.description = req.body.description),
        (category.department = req.body.department);

      await category.save();
      return res.json({ message: "Updated" });
    } else {
      return res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
// Route 4 - Delete - Category
app.post("/category/delete", async (req, res) => {
  try {
    if (req.query.id) {
      const category = await Category.findOne({ _id: req.query.id });

      await category.remove();
      return res.json({ message: "Removed" });
    } else {
      return res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// 3] CRUD pour la collection Product (produits)
//**********************************************************************************************************
// Déclarer les models - Product
const Product = mongoose.model("Product", {
  title: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  price: {
    type: Number
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category"
  }
});

// Route 1 = Create - Product

app.post("/product/create", async (req, res) => {
  try {
    const newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category
    });

    await newProduct.save();
    return res.json({ message: "Created" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Route 2 = Read - Product
app.get("/product", async (req, res) => {
  try {
    if (
      req.query.category || // si le parametre category ou le parametre  titre... ou le parametre
      req.query.title ||
      req.query.priceMin ||
      req.query.priceMax
    ) {
      let param = {};
      if (req.query.category) {
        param.category = req.query.category;
      }
      if (req.query.title) {
        param.title = req.query.title;
      }
      if (req.query.priceMin) {
        param.priceMin = req.query.priceMin;
      }
      if (req.query.priceMax) {
        param.priceMax = req.query.priceMax;
      }
      // const resultSearch = Product.find(param)
    } else {
      const products = await Product.find({
        category: req.body.category,
        title: req.body.title
      });
      return res.json(products);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
// department.category.product.find({
//   price: { $gt: 40, $lt: 60 }
// }).populate;
// const search = Product.find().populate("category");
// if (req.query.sort === "price-asc") {
//   search.sort({ price: 1 });
// }
// const products = await search;

// const seachPrice = Product.find().populate("product");
// if (req.query.)

// Route 3 - Update - Product
app.post("/product/update", async (req, res) => {
  console.log("test prod up");
  try {
    if (req.query.id && req.body.title) {
      const product = await Product.findOne({ _id: req.query.id });

      (product.title = req.body.title),
        (product.description = req.body.description),
        (product.department = req.body.department);

      await product.save();
      return res.json({ message: "Updated" });
    } else {
      return res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Route 4 - Delete - Product
app.post("/product/delete", async (req, res) => {
  console.log("test route delete product");
  try {
    if (req.query.id) {
      const product = await Product.findOne({ _id: req.query.id });

      await product.remove();
      return res.json({ message: "Removed" });
    } else {
      return res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
// - Attribut
// * title (texte)
// * description (texte)
// * price (nombre)
// * category (référence vers Category)

// Démarrer le serveur

app.listen(port, () => {
  console.log("C'est parti sur le port : " + port + " !!");
});
