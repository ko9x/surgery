import { getAllItems } from "./APIService.js";
import { isSmall, handleLayout, createBottomResultsArea } from "./common.js";

const items = await getAllItems();

for (var i = 0; i < items.length; i++) {
    createBottomResultsArea('Items', items[i].name, items[i].creator);
}

handleLayout(
    "Elite System Information",
    "Select an Item to be Removed from the Database",
    "Removing an item from the database cannot be undone"
    );
