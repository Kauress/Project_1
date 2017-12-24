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
