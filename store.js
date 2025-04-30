if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    var removeCartItemButtoms = document.getElementsByClassName('cart-column-button')
    for (var i = 0; i < removeCartItemButtoms.length; i++) {
        var button = removeCartItemButtoms[i]
        button.addEventListener('click', removeCartItem)
    }

    var qualityInputs = document.getElementsByClassName('cart-column-quantity')
    for (var i = 0; i < qualityInputs.length; i++) {
        var input = qualityInputs[i]
        input.addEventListener('change', qualityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartChecked)
    }

    document.getElementsByClassName('cart-purchase')[0].addEventListener('click',purchaseClicked)
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function qualityChanged(event) {
    var input= event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function addToCartChecked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var price =shopItem.getElementsByClassName('shop-item-sale')[0].innerText
    var dress = shopItem.getElementsByClassName('shop-item-dress')[0].src
    addItemtoCart(price,dress)
    updateCartTotal()

}

function addItemtoCart(price,dress) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemsCheck = cartItems.getElementsByClassName('cart-price')
    for(var i = 0; i < cartItemsCheck.length; i++){
        if(cartItemsCheck[i].innerText == price){
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-header cart-item cart-column">
            <img class="burn-image cart-column-image" src="${dress}">
        </div>
        <div class="cart-header cart-price cart-column">
            <span class="cart-column-price">${price}</span>
        </div>
        <div class="cart-quantity cart-column">
            <input class="cart-column-quantity" type="number" value="1">
            <button class="btn btn-primary shop-item-button cart-column-button" type="button">REMOVE</button>
        </div>
    `;

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('cart-column-button')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-column-quantity')[0].addEventListener('change', qualityChanged)
    updateCartTotal()

}



function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

    for (var i = 1; i < cartRows.length; i++) {  
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-column-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-column-quantity')[0];

        let price = parseFloat(priceElement.innerText.replace(/[^0-9.]/g, ''));
        var quantity = parseInt(quantityElement.value);

        total += price * quantity;
    }

    document.getElementsByClassName('cart-total-price')[0].innerText = 'NPR ' + total.toLocaleString();
}


function purchaseClicked() {
    alert('Thank you for your purchase! Backend will soon be added.');

    var cartItemsContainer = document.getElementsByClassName('cart-items')[0];

    var cartRows = cartItemsContainer.getElementsByClassName('cart-row');
    
    for (let i = cartRows.length - 1; i >= 1; i--) {
        cartItemsContainer.removeChild(cartRows[i]);
    }

    updateCartTotal();
}
