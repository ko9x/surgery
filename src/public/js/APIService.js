// API using localhost
const API = 'http://localhost:8080/api'

// API using MacBook IP Address (So I can test on my iphone)
// const API = 'http://192.168.0.17:8080/api'

export async function getAllItems() {
    let response = await fetch(`${API}/items`);

    let data = await response.json();

    if(data?.success) {
        return data.items;
    }
}

export async function getItems(config) {
    let response = await fetch(`${API}/item/${config}`);

    let data = await response.json();

    if(data?.success) {
        return data.items;
    }
}

export async function storeItem(data) {
    let response = await fetch(`${API}/item`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const content = await response.json();

    if(content?.success) {
        // Clear the form (by reloading the screen) when the user clicks the "ok" button in the success = true alert
        if(alert(`Item: ${data.name} has been stored successfully`)){}
        else window.location.reload();
    } else {
        // Don't clear the form when the user clicks the "ok" button in the success = false alert
        alert(`Something went wrong`);
    }
}

export async function deleteItem(id) {
    let response = await fetch(`${API}/item/${id}`, {
        method: "DELETE"
    });

    let data = await response.json();

    if(data?.success) {
        alert(`Item "${data.item.name}" was removed from the database`);
        window.location.reload();
        return data.item;
    }
}

export async function editItem(id, data) {
    let response = await fetch(`${API}/item/${id}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const content = await response.json();

    if(content?.success) {
        alert(`the Item name has been changed to "${content.item.name}"`);
        window.location.reload();
        return content.item;
    } else {
        alert('Something went wrong');
    }
}
