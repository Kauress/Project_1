/*--------------------------------------------------------------
                            WISHLIST
   1. Coding the wishlist functionality is similiar to functions:
      getProductInfo(index);
      buildCart();
      removeItem(index);
  2.  Read the comments before each function and event handler and code along!
 ------------------------------------------------------------------  */

/*
1. Attach an onclick event handler to the element with  id="wishlistBtn" in index.html
2. This button is the pink button with the red heart icon displayed in each product listing
3. When the user clicks on the button we want the display the modal element
4. The modal element has an id="myModal"in index.html
5. The modal element contains a table element with id="wishlistTable"
6. The wishlist property of the global cart object refers to an array which will reference items added to the wishlist
7. If the length property of the wishlist array is == 0 i.e. it is empty
8. Then we change the inner HTML of document.getElementById('wishlistText').innerHTML = "Your Wishlist is empty";
9. Else if there are items in the wishlist
10. Then change the text to display "My Wishlist"
*/
document.getElementById("wishlistBtn").onclick = function() {
	var wishlistModal = document.getElementById('myModal');
	wishlistModal.style.display = "block";
	document.getElementById("wishlistTable").style.display = "block";

	if (cart.wishlist.length === 0) {
		document.getElementById('wishlistText').innerHTML = "Your Wishlist is empty";
	} else {
		document.getElementById('wishlistText').innerHTML = "My Wishlist";
	}
}; // end of  onclick function

// When the user clicks on <span> (x), close the modal
document.getElementsByClassName("close")[0].onclick = function() {
	document.getElementById('myModal').style.display = "none";
}; // end of onlclick function


/* function addToWishList(index)
1. This is similiar to function getProductInfo(index)
2. The function has been called from function buildDOM();
3. Declare var wishlist which is an object with key value pairs that reference each products Id, Name, description Price and Image
4. Declare local var productAlreadyInWishlist = false;
5. Iterate through the wishlist array of the global cart object
6. In function buildDOM the wishlist button has an attribute called index whose value is i
7. The "i" of the button clicked which is between 0 - 8 for the 9 products
8. If the wishlist item at index i has the same Id as index
9. Then that means the product is already in the wishlist
10. And so productAlreadyInWishlist = true;
11. And during the iteration through the wishlist items if the product is not in the wishlist array
12. Then push the product into the wishlist array with cart.wishlist.push(wishlist);
13. Then before the closing brace for the function call function showWishlist();
14. Call function saveWishlist() to save cart.wishlist
*/
function addToWishList(index) {
	var wishlist = {
		Id: index,
		Name: products[index].Name,
		Description: products[index].Description,
		Price: products[index].Price,
		Image: products[index].Image
	}; //end of obj
	var productAlreadyInWishlist = false;
	for (var i = 0; i < cart.wishlist.length; i++) {
		if (cart.wishlist[i].Id == index) {
			productAlreadyInWishlist = true;
		}// end of if
	}// end of for
	if (!productAlreadyInWishlist) {
		cart.wishlist.push(wishlist);
	}// end of if
	showWishlist();
	saveWishlist();
} // end of func

/*  function showWishlist
1. This function is similiar to function buildCart()
2. Declare local variable wishlist which is a reference to the items array of the global cart object
3. Declare local variable table which is a reference to element with id of "wishlistTable" in index.html
4. The items within the wishlist array are objects with key value pairs as we determined in function addToWishList with var wishlist
5. Iterate through the keys in the wishlist object
6. Build the wishlist DOM elements and insert them into the DOM
7. The button element is a button which will be used to remove an item from the wishlist
8. set an attribute of the remove button called 'index' whose value is item.Id
9. The remove button has an onclick attribute whose value is the function removeWishListItem which takes the index attribute of the item as an argument
10. The button 2 element is a button which will be used to move items from the wishlist to the cart
11. Button 2 has an attribute called 'index' whose value is item.Id
12. Attached to button 2 is an onclick attribute whose value is the function fromWishlistToCart which takes the index  attribute of the item as an argument
13. Append the newly created elements to their parent
14. And then append the elements to var row and finally append var row
15. Finish off by appending the row element to var table which is a reference to the wishlistTable element in the DOM
16. The while loop will ensure that a new row is not created when the same element is added to the wishlist
*/
function showWishlist() {
	var wishlist = cart.wishlist;
	var table = document.getElementById("wishlistTable");
	while (table.children.length) {
		table.removeChild(table.children[0]);
	}// end of while
	for (var key in wishlist) {
		var item = cart.wishlist[key];
		var row = document.createElement('tr');
		var productNameCell = document.createElement('td');
		var productName = document.createTextNode(item.Name);
		productNameCell.appendChild(productName);
		var descriptionCell = document.createElement('td');
		var description = document.createTextNode(item.Description);
		descriptionCell.appendChild(description);
		var imageCell = document.createElement('td');
		var image = document.createElement('img');
		image.setAttribute('src', item.Image);
		image.setAttribute('class', "img-responsive");
		image.style.height = "70px";
		image.style.margin = "15px";
		imageCell.appendChild(image);
		var buttonCell = document.createElement('td');
		var button = document.createElement('button');
		button.innerHTML = "remove";
		button.setAttribute("class", "btn btn-default");
		buttonCell.appendChild(button);
		button.setAttribute('index', item.Id);
		button.setAttribute("onclick", "removeWishListItem(getAttribute('index'))");
		var button2Cell = document.createElement('td');
		var button2 = document.createElement('button');
		button2.innerHTML = "Add to Cart";
		button2.setAttribute("class", "btn btn-default");
		button2Cell.appendChild(button2);
		button2.setAttribute('index', item.Id);
		button2.setAttribute("onclick", "fromWishlistToCart(getAttribute('index'))");
		row.appendChild(productNameCell);
		row.appendChild(descriptionCell);
		row.appendChild(imageCell);
		row.appendChild(buttonCell);
		row.appendChild(button2Cell);
		table.appendChild(row);
	}// end of for
} // end of func

/* function removeWishListItem(index)
1. This function is similiar to function removeItem(index) which removes an item from the cart
2. Iterate through the wishlist array of the global cart object
3. If the Id of the wishlist item at index i is the same as index within the argument of the function
4. Then clear the inner HTML of the wishlistTable element
5. Use the splice method to remove the item from the wishlist array
6. If there are no wishlist items i.e. wishlist.length is <= 0 then do not show the wishlistTable element
6. Call function showWishlist to show the updated view of the wihslist
7. Save the updated wishlist without the removed item by calling function saveWishlist();
*/

function removeWishListItem(index) {
	for (var i = 0; i < cart.wishlist.length; i++) {
		if (cart.wishlist[i].Id === index) {
			document.getElementById("wishlistTable").innerHTML = "";
			cart.wishlist.splice(i, 1);
  	}// end of if
	}// end of for
	if (cart.wishlist.length <= 0) {
		document.getElementById("wishlistTable").style.display = "none";
	}// end of if
	showWishlist();
	saveWishlist();
} // end of func

/* function fromWishlistToCart()
1. Add item from wishlist to the shopping cart
2. This function is the value of the onclick attribute of var button in function addToWishList();
3. Index corresponds to an item's id
4. When this button is clicked  then call the removeWishListItem(index) function, this will remove the item from the wishlist
5. And then call function getProductInfo(index)which will add the item to the cart if it's already not there
6. The for loop will iterate through the wishlist array of the cart and the items array of the cart
7. The if conditional statement checks if cart.items at index k has the same value as index
8. If so then return false
9. This ensures that if a product is already in the cart and when the "Add to cart" button is clicked then the item is not added to the cart again
10. Save the current state of the wishlist by calling function saveWishlist();
*/
function fromWishlistToCart(index) {
	for (var i = 0; i < cart.wishlist.length; i++) {
		for (var k = 0; k < cart.items.length; k++) {
			if (cart.items[k].Id === index) {
				return false;
			}// end of if
		}//end of for
	}// end of for
	removeWishListItem(index);
	getProductInfo(index);
	saveWishlist();
} // end of function

/* function saveWishlist
1. This function uses the local storage object to save the wishlist items
2. Therefore, the wishlist items will be present in the wishlist even after the page is refreshed, or the browser window is closed and re-loaded
3. Declare local variable savedWishlistItems which is a reference to the wishlist array and its items
4. Use the setItem method of the localStorage object to save var savedWishlistItems
5. JSON.stringify method is used as local storage only works with strings
6. This function has been called from within functions addToWishList(); removeWishListItem(); and fromWishlistToCart();
*/
function saveWishlist() {
	var savedWishlistItems = cart.wishlist;
	localStorage.setItem("wishlist", JSON.stringify(savedWishlistItems));
	//alert(JSON.stringify(savedWishlistItems))
}// end of function

/* Loading the wishlist items

1. Add the following snippet of code below the closing brace of the if conditional statement for the window.onload function to load the saved cart items
if("wishlist" in localStorage) {
  var loadWishlistItems = JSON.parse(localStorage.getItem("wishlist"));
  cart.wishlist = loadWishlistItems;
  showWishlist();
}//end of if
2. Therefore, the completed function will be:
//window onload function to load saved cart items
window.onload = function() {
    if("cart" in localStorage) {
      var loadCartItems = JSON.parse(localStorage.getItem("cart"));
      cart.items = loadCartItems;
      buildCart();
      productTotal();
    }// end of if
    if("wishlist" in localStorage) {
      var loadWishlistItems = JSON.parse(localStorage.getItem("wishlist"));
      cart.wishlist = loadWishlistItems;
      showWishlist();
    }//end of if
};
*/
