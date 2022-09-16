const basePrice = {
    original: 2.49,
    apple: 3.49,
    raisin: 2.99,
    walnut: 3.49,
    chocolate: 3.99,
    strawberry: 3.99
};

const glazingAdaption = {
    'Keep original': 0,
    'Sugar milk': 0,
    'Vanilla milk': .5,
    'Double chocolate': 1.5
};

const sizeAdaption = {
    1: 1,
    3: 3,
    6: 5,
    12: 10
};

//updates the price shown when glazing or pack size are changed
//g, s, and d refer to the id's of the glazings, pack sizes, and price for the roll being changed
function updatePrice(g, s, p) {
    var glaze = document.getElementById(g);
    var size = document.getElementsByName(s);
    var num = 0;
    for(i=0; i<size.length; i++) {
        if(size[i].checked) {
            num = size[i].value;
        }
    }
    var price = document.getElementById(p);
    price.innerText = "$ " + ((basePrice[s] + glazingAdaption[glaze.value]) * sizeAdaption[num]).toFixed(2);
}

var cart = [];

class Roll{
    constructor(type, glazing, packSize, packPrice) {
        this.rollType = type;
        this.rollGlazing = glazing;
        this.rollPackSize = packSize;
        this.packPrice = packPrice;
    }
}

function addToCart(g, s) {
    var glaze = document.getElementById(g);
    var size = document.getElementsByName(s);
    var num = 0;
    for(i=0; i<size.length; i++) {
        if(size[i].checked) {
            num = size[i].value;
        }
    }
    var packPrice = ((basePrice[s] + glazingAdaption[glaze.value]) * sizeAdaption[num]).toFixed(2);
    var r = new Roll(s, glaze.value, num, packPrice);
    cart.push(r);
    console.log(cart);
    updatePopUp();
}

function updatePopUp() {
    var cartText = document.getElementById("cart-dropdown");
    var text = "Added to cart:\n\n";
    for (i=0; i<cart.length; i++) {
        text += (cart[i].rollType + " cinnamon roll\n");
        text += (cart[i].rollGlazing + " glazing\n");
        text += ("Pack of " + cart[i].rollPackSize + "\n");
        text += ("Price: $" + cart[i].packPrice + "\n\n");
    }
    console.log(text);
    cartText.innerText = text;
    setTimeout(function() {
        var items = 0;
        var price = 0;
        for (i=0; i<cart.length; i++) {
            items++;
            price += parseFloat(cart[i].packPrice);
        }
        text = items + " item\nTotal: $ " + price;
        cartText.innerText = text;
    }, 3000);
}