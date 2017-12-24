// products is an array containing JSON objects
var products = [{
  "Name": "Happy Birthday",
  "Description": "Birthday greeting",
  "Price": 2.99,
  "Image": "images/happybirthday.jpg",
  "Category": "Greetings"
}, {
  "Name": "Design Things",
  "Description": "Design card",
  "Price": 3.99,
  "Image": "images/designthings.jpg",
  "Category": "Design"

}, {
  "Name": "Brain Acrobat",
  "Description": "Synaptic specialists",
  "Price": 4.99,
  "Image": "images/brainacrobat.jpg",
  "Category": "Speciality"
}, {
  "Name": "Design Experts",
  "Description": "Unicorn design experts",
  "Price": 3.99,
  "Image": "images/unicorndesign.jpg",
  "Category": "Design"
}, {
  "Name": "Sun Tzu",
  "Description": "The art of the DOM",
  "Price": 6.99,
  "Image": "images/suntzu.jpg",
  "Category": "Speciality"
}, {
  "Name": "Dogs",
  "Description": "Dogs of the world unite",
  "Price": 4.99,
  "Image": "images/dogsoftheworld.jpg",
  "Category": "Greetings"
}, {
  "Name": "Code",
  "Description": "Code this",
  "Price": 5.99,
  "Image": "images/code.jpg",
  "Category": "Code"
}, {
  "Name": "Fi Dren",
  "Description": "The wifi guy",
  "Price": 8.99,
  "Image": "images/fidren.jpg",
  "Category": "Speciality"
}, {
  "Name": "Bugs Studio",
  "Description": "Fixing developers",
  "Price": 9.99,
  "Image": "images/bugstudio.jpg",
  "Category": "Code"
}
]; // end of products array

//Build the DOM
//for i is less than the number of array items in var prodcucts do the following
function buildDOM() {
    document.getElementById("product-container").innerHTML = "";
    for(var i = 0; i < products.length; i++) {
      var productDiv = document.createElement("div");
      productDiv.setAttribute("class", "col-md-4 product-div");
      productDiv.setAttribute("category", products[i].Category);
      var name = document.createTextNode(products[i].Name);
      var description = document.createTextNode(products[i].Description);
      var price = document.createTextNode(products[i].Price);
      var heading = document.createElement("h3");
      var paragraph = document.createElement("p");
      var paragraph2 = document.createElement("p");
      var dollarsign = document.createTextNode("$");
      var image = document.createElement("img");
      image.setAttribute("src", products[i].Image);
      image.setAttribute("class", "img-responsive");
      var button = document.createElement("button");
      button.setAttribute("class", "btn btn-success");
      button.setAttribute("index", i);
      button.setAttribute("onclick", "getProductInfo(getAttribute('index'))");
      var icon = document.createElement("span");
      icon.setAttribute("class", "glyphicon glyphicon-shopping-cart");
      button.appendChild(icon);
      var input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("value", "1");
      input.setAttribute("min", "0");
      input.setAttribute("max", "100");
      input.setAttribute("class", "product-input");
      input.setAttribute("id", "product-qty" + i);
      var button2 = document.createElement("button");
      button2.setAttribute("class", "btn btn-default heart");
      button2.setAttribute("index", i);
      button2.setAttribute("onclick", "addToWishList(getAttribute('index'))");
      var icon2 = document.createElement("span");
      icon2.setAttribute("class", "fa fa-heart-o");
      button2.appendChild(icon2);
      heading.appendChild(name);
      paragraph.appendChild(description);
      productDiv.appendChild(heading);
      productDiv.appendChild(image);
      productDiv.appendChild(paragraph);
      paragraph2.appendChild(dollarsign);
      paragraph2.appendChild(price);
      productDiv.appendChild(paragraph2);
      productDiv.appendChild(button);
      productDiv.appendChild(input);
      productDiv.appendChild(button2);
      document.getElementById("product-container").appendChild(productDiv);
    } // end of for
} // end of function

// window onload function to build the DOM
window.onload = buildDOM();

// function list
function list() {
    var displayItems = document.getElementsByClassName("product-div");
    for(var i = 0; i < displayItems.length; i++) {
      displayItems[i].style.width = "100%";
    }// end of for
}// end of function

// function grid
function grid() {
    var displayItems = document.getElementsByClassName("product-div");
    for(var i = 0; i < displayItems.length; i++) {
      displayItems[i].style.width = "";
    }// end of for
}// end of function

// onchange function sortByChoice
document.getElementById("sortByChoice").onchange = function() {
    var selectElement = document.getElementById("sortByChoice");
    var selectedOption = selectElement.options[selectElement.selectedIndex].value;
    if(selectedOption === "LowToHigh") {
      products.sort(ascendingOrder);
    } else if(selectedOption === "HighToLow") {
      products.sort(descendingOrder);
    } else {
      products.sort(alphabeticalOrder);
    }
    buildDOM();
}; // end of onchange function

// function ascendingOrder
function ascendingOrder(a,b) {
    for(var i = 0; i < products.length; i++) {
       return (a.Price) - (b.Price);
    }// end of for
}// end of function

// function descendingOrder
function descendingOrder(a,b) {
    for(var i = 0; i < products.length; i++) {
        return (b.Price) - (a.Price);
    }// end of for
}// end of function

// function alphabeticalOrder
function alphabeticalOrder(a,b) {
    for(var i = 0; i < products.length; i++) {
        return (a.Name) > (b.Name);
    }// end of for
}// end of function


// function updateFilter
function updateFilter() {
    var category = [];
    var inputCheckboxes = document.getElementsByClassName("filterCategory");
    var products = document.getElementsByClassName("product-div");
    for(var i = 0; i < inputCheckboxes.length; i++) {
      if(inputCheckboxes[i].checked) {
        var inputCheckboxValue = inputCheckboxes[i].getAttribute("value");
        category.push(inputCheckboxValue);
        //alert(category);
      }// end of if
    }// end of for
    for(var j = 0; j < products.length; j++) {
      var productCategory = products[j].getAttribute("category");
      products[j].style.display = "none";
      for(var k = 0; k < category.length; k++) {
        if(category[k] === productCategory) {
          products[j].style.display = "block";
          break;
        }// end of if
      }// end of for
    }// end of for
    for(var l = 0; l < products.length; l++) {
      if(category.length === 0) {
          products[l].style.display = "block";
      }// end of if
    }// end of for
}//end of function

// Cart object
var cart = {
items: [],
numberItems: 0,
total: 0,
coupon: ["50%Off", "30%Off"],
wishlist: [],
couponValue: 1,
shipping: 0,
shippingLocation: ""
};

// function getProductInfo
function getProductInfo(index) {
  var quantity = parseInt(document.getElementById("product-qty" + index).value);
  //alert(quantity);
  var product = {
    Id: index,
    Name: products[index].Name,
    Description: products[index].Description,
    Price: products[index].Price,
    Amount: products[index].Price * quantity,
    Quantity: quantity
  }; // end of object
  //alert(product.Id);
  var productAlreadyInCart = false;
  for(var i = 0; i < cart.items.length; i++) {
    if(cart.items[i].Id === index) {
      productAlreadyInCart = true;
      cart.items[i].Amount = (product.Amount + cart.items[i].Amount);
      cart.items[i].Quantity = product.Quantity + cart.items[i].Quantity;
      break;
    }// end of if
  }// end of for
  if(!productAlreadyInCart) {
    cart.items.push(product);
  }// end of if
   productTotal();
   buildCart();
 } // end of getProductInfo function

// function buildCart
 function buildCart() {
       cartItems = cart.items;
     //alert(JSON.stringify(cartItems));
     var table = document.getElementById('productsTable');
     while (table.children.length) {
        table.removeChild(table.children[0]);
    }// end of while
     		for (var key in cartItems) {
     			var item = cart.items[key];
     			//  alert(JSON.stringify(item));
     			var row = document.createElement('tr');
     			var productNameCell = document.createElement('td');
     			var productName = document.createTextNode(item.Name);
     			productNameCell.appendChild(productName);
     			var descriptionCell = document.createElement('td');
     			var description = document.createTextNode(item.Description);
     			descriptionCell.appendChild(description);
     			var quantityCell = document.createElement('td');
     			var quantity = document.createTextNode(item.Quantity);
     			quantityCell.appendChild(quantity);
     			var decreaseButton = document.createElement('button');
     			decreaseButton.appendChild(document.createTextNode('-'));
     			decreaseButton.setAttribute("class", "quantityButton");
     			decreaseButton.setAttribute('index', item.Id);
     			decreaseButton.setAttribute("onclick", "decreaseQuantity(getAttribute('index'))");
     			quantityCell.appendChild(decreaseButton);
     			var increaseButton = document.createElement('button');
     			increaseButton.appendChild(document.createTextNode('+'));
     			increaseButton.setAttribute("class", "quantityButton");
     			increaseButton.setAttribute('index', item.Id);
     			increaseButton.setAttribute("onclick", "increaseQuantity(getAttribute('index'))");
     			quantityCell.appendChild(increaseButton);
     			var priceCell = document.createElement('td');
     			var price = document.createTextNode("$" + item.Price);
     			priceCell.appendChild(price);
     			var amountCell = document.createElement('td');
     			var amount = (item.Amount).toFixed(2);
     			var amountText = document.createTextNode("$" + amount);
           amountCell.appendChild(amountText);
     			var removeItemCell = document.createElement('td');
     			var removeButton = document.createElement('button');
     			removeButton.innerHTML = "Remove";
     			removeButton.setAttribute('index', item.Id);
     			removeButton.setAttribute('class', " btn btn-danger");
     			removeButton.setAttribute("onclick", "removeItem(getAttribute('index'))");
     			removeItemCell.appendChild(removeButton);
     			row.appendChild(productNameCell);
     			row.appendChild(descriptionCell);
     			row.appendChild(quantityCell);
     			row.appendChild(priceCell);
     			row.appendChild(amountCell);
     			row.appendChild(removeItemCell);
     			table.appendChild(row);
     		} // end of for loop
        var couponCell = document.createElement("td");
        couponCell.setAttribute("id", "couponCell1");
        var couponInput = document.createElement("input");
        couponInput.setAttribute("type", "text");
        couponInput.setAttribute("id", "couponCode");
        var applyCouponButton = document.createElement("button");
        applyCouponButton.innerHTML = "Apply coupon";
        applyCouponButton.setAttribute("id", "couponButton");
        applyCouponButton.setAttribute("class", "btn btn-success");
        applyCouponButton.onclick = function() {
          coupon();
        };
        couponCell.appendChild(couponInput);
        couponCell.appendChild(applyCouponButton);
        table.appendChild(couponCell);
        var totalCell = document.createElement("td");
        totalCell.style.fontSize = "18px";
        totalCell.innerHTML = ("Total of items is $" + cart.total);
        totalCell.setAttribute("id", "total");
        table.appendChild(totalCell);
        if(cart.couponValue != 1) {
          couponInputChange();
        }
        var shippingRow = document.createElement("tr");
        var shippingCell = document.createElement("td");
        var select = document.createElement("select");
        select.setAttribute("onchange", "shipping()");
        select.setAttribute("id", "selectBox");
        shippingCell.appendChild(select);
        table.appendChild(shippingCell);
        var selectArray = ["Please select a country", "Canada", "China", "Europe", "USA"];
        for(var i = 0; i < selectArray.length; i++) {
          var option = document.createElement("option");
          option.setAttribute("id", "optionValue");
          option.setAttribute("value", "selectArray[i]");
          option.text = selectArray[i];
          option.value = selectArray[i];
          select.appendChild(option);
        }// end of for
        var shippingPriceCell = document.createElement("td");
        var shippingPrice = document.createElement("p");
        shippingPrice.setAttribute("id", "shippingRate");
        shippingPriceCell.appendChild(shippingPrice);
        shippingRow.appendChild(select);
        shippingRow.appendChild(shippingPriceCell);
        table.appendChild(shippingRow);
        showShipping();
        var totalRow = document.createElement("tr");
        var totalCell = document.createElement("td");
        var sumCell = document.createElement("td");
        sumCell.setAttribute("id", "sumCell");
        var totalText = document.createElement("p");
        totalText.setAttribute("id", "grandTotal");
        totalCell.appendChild(totalText);
        totalRow.appendChild(totalCell);
        totalRow.appendChild(sumCell);
        table.appendChild(totalRow);
        grandTotal();
 } // end of function

// decrease quantity
function decreaseQuantity(index) {
    for(var i = 0; i < cart.items.length; i++) {
      if(cart.items[i].Id === index) {
        cart.items[i].Quantity--;
        cart.items[i].Amount = cart.items[i].Quantity * cart.items[i].Price;
        if(cart.items[i].Quantity <= 0) {
          removeItem(index);
        }// end of if
      }// end of if
    }// end of for
    productTotal();
}// end of function

//increase quantity
function increaseQuantity(index) {
    for(var i = 0; i < cart.items.length; i++) {
      if(cart.items[i].Id === index) {
        cart.items[i].Quantity++;
        cart.items[i].Amount = cart.items[i].Quantity * cart.items[i].Price;
        if(cart.items[i].Quantity >= 101) {
          removeItem(index);
        }// end of if
      }// end of if
    }// end of for
    productTotal();
}// end of function

// function removeItem
function removeItem(index) {
    for(var i = 0; i < cart.items.length; i++) {
      if(cart.items[i].Id === index) {
        document.getElementById("productsTable").innerHTML = "";
        cart.items.splice(i, 1);
      }// end of if
    }// end of for
    if(cart.items.length == 0) {
      document.getElementById("topCartDisplay").value = 0;
      localStorage.clear();
    }//end of if
    productTotal();
    buildCart();
}// end of function


//function coupon
function coupon() {
    var couponInput = document.getElementById("couponCode");
    if(couponInput.value === "30%Off") {
        cart.couponValue = 0.30;
    } else if(couponInput.value === "50%Off") {
       cart.couponValue = 0.50;
    } else {
      cart.couponValue = 1;
    }
    productTotal();
}// end of function

// function couponInputChange
function couponInputChange() {
    document.getElementById("couponCode").value = "Discount applied";
}// end of function

// function productTotal
function productTotal() {
    var itemTotal = 0;
    var totalCartQuantity = 0;
    for(var i = 0; i < cart.items.length; i++) {
      if(cart.couponValue === 0.30) {
        itemTotal+= (cart.items[i].Amount) - (cart.items[i].Amount * 0.30);
      } else if(cart.couponValue === 0.50) {
        itemTotal+= (cart.items[i].Amount) - (cart.items[i].Amount * 0.50);
      } else {
        itemTotal+= cart.items[i].Amount;
      }
    }// end of for
    if(cart.items.length === 0) {
      itemTotal = 0;
      document.getElementById("total").innerHTML = "";
    }// end of if
    for(var i = 0; i < cart.items.length; i++) {
      totalCartQuantity+= cart.items[i].Quantity;
      cart.numberItems = totalCartQuantity;
      topCartDisplay();
    }// end of for
    cart.total = itemTotal.toFixed(2);
    buildCart();
}// end of function

// function topCartDisplay
function topCartDisplay() {
    document.getElementById("topCartDisplay").value = cart.numberItems;
}// end of function

//function shipping
function shipping() {
    var selected = document.getElementById("selectBox").value;
    if(selected === "Please select a country") {
      document.getElementById("shippingRate").innerHTML = "";
      cart.shipping = 0;
      cart.shippingLocation = "";
    } else if(selected === "Canada") {
      document.getElementById("shippingRate").innerHTML = "$" + 9.99;
      cart.shipping = 9.99;
      cart.shippingLocation = "Canada";
    }  else if(selected === "China") {
      document.getElementById("shippingRate").innerHTML = "$" + 10.99;
      cart.shipping = 10.99;
      cart.shippingLocation = "China";
    } else if(selected === "Europe") {
      document.getElementById("shippingRate").innerHTML = "$" + 19.99;
      cart.shipping = 19.99;
      cart.shippingLocation = "Europe";
    } else {
      document.getElementById("shippingRate").innerHTML = "$" + 9;
      cart.shipping = 9;
      cart.shippingLocation = "USA";
    }
    grandTotal();
}//end of shipping

// function showShipping
function showShipping() {
    if(cart.shipping !== 0) {
        document.getElementById("selectBox").value = cart.shippingLocation;
    }// end of if
}// end of function

//function grandTotal
function grandTotal() {
    var table = document.getElementById("productsTable");
    var checkoutRow = document.createElement("tr");
    checkoutRow.setAttribute("class", "checkoutRow");
    var grandTotal = 0;
    if(cart.shipping !== 0) {
      grandTotal = parseFloat(cart.total) + parseFloat(cart.shipping);
      document.getElementById("grandTotal").innerHTML = "Your total is:"
      document.getElementById("sumCell").innerHTML = "$" + grandTotal.toFixed(2);
    }// end of if
    if(cart.shipping > 0) {
      var checkoutCell = document.createElement("td");
      var checkoutText = document.createElement("p");
      checkoutText.appendChild(document.createTextNode("You're almost done.."));
      checkoutCell.appendChild(checkoutText);
      var checkoutButtonCell = document.createElement("td");
      var checkoutButton = document.createElement("button");
      checkoutButton.setAttribute("class", "btn btn-lg btn-info");
      checkoutButton.innerHTML = "Paypal";
      checkoutButton.setAttribute("onclick", "paypalPage()");
      checkoutButtonCell.appendChild(checkoutButton);
      checkoutRow.appendChild(checkoutCell);
      checkoutRow.appendChild(checkoutButtonCell);
      table.appendChild(checkoutRow);
    } else {
      var checkoutCell = document.createElement("td");
      var checkoutText = document.createElement("p");
      checkoutText.appendChild(document.createTextNode("Choose a shipping location"));
      document.getElementById("grandTotal").innerHTML = "";
      document.getElementById("sumCell").innerHTML = "";
      checkoutCell.appendChild(checkoutText);
      checkoutRow.appendChild(checkoutCell);
      table.appendChild(checkoutRow);
    }//end of else
    var checkoutRowElements = document.getElementsByClassName("checkoutRow");
    while(checkoutRowElements.length > 1) {
      checkoutRowElements[0].parentNode.removeChild(checkoutRowElements[0]);
    }// end of while
}// end of function

// function paypalPage
function paypalPage() {
    window.location = "http://www.paypal.com";
}// end of function

