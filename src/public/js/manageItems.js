import { getAllItems, deleteItem, editItem } from "./APIService.js";
import { isSmall, handleLayout, createBottomResultsArea } from "./common.js";

const items = await getAllItems();
localStorage.removeItem('itemID');

// Create a bottomResultItemContainer for each item we get back from the database
for (var i = 0; i < items.length; i++) {
    createBottomResultsArea(
        "Item Name and Creator SSO",
        items[i].name,
        items[i].creator,
        items[i].id
    );
}

const bottomResultContainer = document.querySelectorAll(
    ".bottomResultItemContainer"
);

// Loop over all the bottomResultItemContainers and add the edit and delete buttons
for (var i = 0; i < bottomResultContainer.length; i++) {
    bottomResultContainer[i].addEventListener("mouseover", (e) => {
        // Check to see if a buttonContainer child has already been added
        if (e.target.childNodes.length < 3) {
            // Create the buttonContainer and append the buttons
            let buttonContainer = document.createElement('div');
            let editItemButton = document.createElement("button");
            editItemButton.setAttribute('name', 'editItemButton');
            editItemButton.innerHTML = "edit item";
            let removeItemButton = document.createElement("button");
            removeItemButton.setAttribute('name', 'removeItemButton');
            removeItemButton.innerHTML = "remove item";
            buttonContainer.appendChild(editItemButton);
            buttonContainer.appendChild(removeItemButton);
            removeItemButton.setAttribute('style', 'margin-left: 5px');
            buttonContainer.setAttribute('style', 'margin-right: -5px');
            if (e.target.id) {
                // hide the creator SSO and show the button container if the mouse is hovering over the item
                e.target.childNodes[1].setAttribute('hidden', 'true');
                e.target.appendChild(buttonContainer);
                editItemButton.addEventListener('click', (e) => {
                    let itemId = e.target.parentNode.parentNode.id;
                    storeIdAndRedirect(itemId)
                });
                removeItemButton.addEventListener('click', (e) => {
                    let itemId = e.target.parentNode.parentNode.id;
                    if(confirm('Are you sure? Removing an item from the database cannot be undone.')) {
                        deleteItem(itemId);
                    } else {
                        return;
                    }
                });
            }
        }
    });

    // Stores the id of the item the users wants to edit and redirects to the itemForm route
    function storeIdAndRedirect(id) {
        localStorage.setItem('itemID', id);
        window.location.replace('http://localhost:8080/itemForm')
    }

    bottomResultContainer[i].addEventListener("mouseleave", (e) => {
        // Check to make sure we haven't already removed the buttonContainer
        if (e.target.childNodes.length > 2) {
            if (e.target.id) {
                // Show the creator SSO and remove the buttonContainer when the mouse moves away from the item
                e.target.childNodes[1].removeAttribute('hidden', 'true');
                e.target.removeChild(e.target.childNodes[2]);
            }
        }
    });
}

handleLayout(
    "Elite System Information",
    "Manage Items",
    "Removing an item from the database cannot be undone"
);
