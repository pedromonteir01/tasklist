class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.products = [];
    }
}

class Product {
    constructor(id, name, price, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }
}

class CategoryService {
    constructor() {
        this.categories = [];
        this.nextCategoryId = 0;
    }

    addCategory(name) {
        const id = this.nextCategoryId++;
        const category = new Category(id, name);
        this.categories.push(category);
    }
}

class ProductsServices {
    constructor() {
        this.products = [];
        this.nextProductId = 0;
    }

    addProduct(name, price, category) {
        const id = this.nextProductId++;
        const product = new Product(id, name, price, category);
        category.products.push(product);
        this.products.push(product);
    }
}

const categoryList = new CategoryService();
const productList = new ProductsServices();

function createCategory() {
    const categoryName = document.getElementById("categoryName").value;

    categoryList.addCategory(categoryName);

    displayCategoriesAndProducts();
    cleanFields();

    //console.log(categoryList.categories);
}

function createProduct() {
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productCategory = categoryList.categories[0];

    productList.addProduct(productName, productPrice, productCategory);

    //console.log(productList.products);
}

function cleanFields() {
    document.getElementById("categoryName").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productCategory").value = "";
}

function displayCategoriesAndProducts() {
    let content = "";

    categoryList.categories.forEach(category => {
        content += `
            <li>
                <div class="categoriesList">
                    <span><b>Categoria:</b>${category.name}</span>
                </div>
                <div>
                    <button class="editButton">Editar</button>
                    <button class="deleteButton">Remover</button>
                </div>

                <ul class="productsListByCategory">`;
category.products.forEach(product => {
    content += `
        <li>
            <div class="productsList">
                <span><b>Produto:</b> ${product.name} - <b>Preço:</b></span>
                <div>
                    <button class="editButton">Editar</button>
                    <button class="deleteButton">Remover</button>
                </div>
            </div>`;
});

content += `
    </ul>
    </li>`;
    });
    document.getElementById("categoriesList").innerHTML = content;
}   