// 获取iconCart元素
let iconCart = document.querySelector('.icon-cart');
// 获取关闭购物车元素
let closeCart = document.querySelector('.close');
// 获取页面主题元素
let body = document.querySelector('body');
// 获取产品列表元素
let listProductHTML = document.querySelector('.listProduct');
// 获取购物车清单
let listCartHTML = document.querySelector('.listCart');
// 获取购物车角标
let iconCartSpan = document.querySelector('.icon-cart span');
// 初始化产品列表和购物车数组
let listProduct = [];
let carts = [];
// 点击购物车图标打开关闭购物车页面
iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
})
// 点击关闭按钮时关闭购物车页面
closeCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
})

const addDataToHTML = () => {
  listProductHTML.innerHTML = '';
  if (listProducts.length > 0) {
    listProducts.forEach(product => {
      let newProduct = document.createElement('div');
      newProduct.classList.add('item');
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
        <img src="${product.image}" alt="">
        <h2>${product.name}</h2>
        <div class="price">$${product.price}</div>
        <button class="addCart">
         Add To Cart
        </button>
      `;
      listProductHTML.appendChild(newProduct);
    })
  }
}
listProductHTML.addEventListener('click', (event) => {
  let postitionClcik = event.target;
  if (postitionClcik.classList.contains('addCart')) {
    let product_id = postitionClcik.parentElement.dataset.id;
    addToCart(product_id);
  }
})

const addToCart = (product_id) => {
  let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id)
  if (carts.length <= 0) {
    carts = [{
      product_id: product_id,
      quantity: 1
    }]
  } else if (positionThisProductInCart < 0) {
    carts.push({
      product_id: product_id,
      quantity: 1
    });
  } else {
    carts[positionThisProductInCart].quantity += 1;
  }
  addCartToHTML();
  addCartToMemory();
}
const addCartToMemory = () => {
  localStorage.setItem('cart', JSON.stringify(carts));
}
const addCartToHTML = () => {
  listCartHTML.innerHTML = '';
  let totalQuantity = 0;
  if (carts.length > 0) {
    carts.forEach(cart => {
      totalQuantity += cart.quantity;
      let newCart = document.createElement('div');
      newCart.classList.add('item');
      newCart.dataset.id = cart.product_id;
      let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
      let info = listProducts[positionProduct];
      newCart.innerHTML = `
      <div class="image">
          <img src="${info.image}" alt="">
        </div>
        <div class="name">${info.name}</div>
        <div class="totalPrice">
          $${info.price * cart.quantity}
        </div>
        <div class="quantity">
          <span class="minus"><</span>
          <span>${cart.quantity}</span>
          <span class="plus">></span>
        </div>
      `;
      listCartHTML.appendChild(newCart);
    })
  }
  iconCartSpan.innerText = totalQuantity;
}
listCartHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = 'minus';
    if (positionClick.classList.contains('plus')) {
      type = 'plus';
    }
    changeQuantity(product_id, type);
  }
})
const changeQuantity = (product_id, type) => {
  let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
  if (positionItemInCart >= 0) {
    switch (type) {
      case 'plus':
        carts[positionItemInCart].quantity += 1;
        break;

      default:
        let valueChange = carts[positionItemInCart].quantity - 1;
        if (valueChange > 0) {
          carts[positionItemInCart].quantity = valueChange;
        } else {
          carts.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToMemory();
  addCartToHTML();
}
const initApp = () => {
  // get data from JSON
  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      listProducts = data;
      addDataToHTML();

      // get data form memory
      if (localStorage.getItem('cart')) {
        carts = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
      }
    })
}
initApp();

