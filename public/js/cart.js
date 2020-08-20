console.log('running');
let carts = document.querySelectorAll(".cart");

let products = [
    {
        name:'carrot',
        tag:1,
        price:12,
        incart:0
    },
    {
        name:'tomato',
        tag:2,
        price:15,
        incart:0
    },
    {
        name:'cabbage',
        tag:3,
        price:18,
        incart:0
    },
    {
        name:'beetroot',
        tag:4,
        price:22,
        incart:0
    }
];




function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.badge').textContent = productNumbers + 1 ;
    }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.badge').textContent =1 ;
        
    }
    
    setItems(product);
    
}

function setItems(product){
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    if(cartItems != null){
        if(cartItems[product.name]== undefined){
            cartItems={
                
                ...cartItems,
                [product.name]:product
            }
        }
        cartItems[product.name].incart += 1;
        
    }else{
        
        product.incart = 1;
        cartItems = {
            [product.name]:product
    };
    
    };
    
    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
    
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if (productNumbers) {
        document.querySelector('.badge').textContent = productNumbers;
    }
}


for (let i = 0;i < carts.length; i++){
    
    carts[i].addEventListener('click', () =>{
        
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}


function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    
    
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
        
    }else{
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', product.price);
        
    }
    
    
}

function displayCart(){
    let cartItems =localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    
    let productContainer = document.querySelector(".table-body");
    if (cartItems && productContainer){
        
        productContainer.innerHTML = '';
        
        Object.values(cartItems).map(item => {
          
            productContainer.innerHTML+=`
            
<tr>
                          <td class="thumbnail-img">
                                  <a >
									<img class="img-fluid" src="images/img-pro-02.jpg" alt="" />
								</a>
                                    </td>
                                    <td class="name-pr">
                                        <a >${item.name}</a>
                                    </td>
                                    <td class="price-pr">
                                        <p>${item.price}</p>
                                    </td>
                                    <td class="quantity-box">${item.incart}</td>
                                    <td class="total-pr">
                                        <p>Rs:${item.incart * item.price}</p>
                                    </td>
                                    <td class="remove-pr">
                                        <a  onclick=removeItem(${item.tag})>
									<i class="fas fa-times"></i>
								</a>
                                    </td>
                                </tr>`;
        
        });
        
        
    };
    
    
    }
    
//
    

    
    
    
    
    
function removeItem(Tag){
   let prods= localStorage.getItem('productsInCart');
   let cost = localStorage.getItem('totalCost');
   let numbers = localStorage.getItem('cartNumbers');
   numbers=parseInt(numbers);
   cost = parseInt(cost);
   prods=JSON.parse(prods);
   
   for (i=0;i<products.length;i++){
       if (products[i].tag == Tag){
          
           cost = cost - (parseInt(prods[products[i].name].price)* parseInt(prods[products[i].name].incart));
           numbers = numbers - parseInt(prods[products[i].name].incart);
           delete prods[products[i].name];
           
       }
   }
   
   localStorage.setItem('productsInCart',JSON.stringify(prods));
   localStorage.setItem('totalCost',cost);
   localStorage.setItem('cartNumbers',numbers);
   onLoadCartNumbers();
   displayCart();
   billingCheckout();
   

 }



    

function billingCheckout(){
    let cartCost = localStorage.getItem('totalCost');
    let productContainer2 = document.querySelector(".order-box");
    if(cartCost){
        productContainer2.innerHTML=`
 <h3>Order summary</h3>
                        <div class="d-flex">
                            <h4>Sub Total</h4>
                            <div class="ml-auto font-weight-bold">Rs:${cartCost}</div>
                        </div>
                        <div class="d-flex">
                            <h4>Discount</h4>
                            <div class="ml-auto font-weight-bold"> $ 40 </div>
                        </div>
                        <hr class="my-1">
                        <div class="d-flex">
                            <h4>Coupon Discount</h4>
                            <div class="ml-auto font-weight-bold"> $ 10 </div>
                        </div>
                        <div class="d-flex">
                            <h4>Tax</h4>
                            <div class="ml-auto font-weight-bold"> $ 2 </div>
                        </div>
                        <div class="d-flex">
                            <h4>Shipping Cost</h4>
                            <div class="ml-auto font-weight-bold"> Free </div>
                        </div>
                        <hr>
                        <div class="d-flex gr-total">
                            <h5>Grand Total</h5>
                            <div class="ml-auto h5">Rs:${cartCost} </div>
                        </div>
                        <hr>`;
    }else{
        productContainer2.innerHTML='';
    }
    
    
}


 
 
    



onLoadCartNumbers();
displayCart();
billingCheckout();