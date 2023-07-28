// API using localhost
const API = 'http://localhost:8080/api/item'

// API using MacBook IP Address (So I can test on my iphone)
// const API = 'http://192.168.0.17:8080/api/item'

export async function getItems(config) {
    let response = await fetch(`${API}/${config}`);

    let data = await response.json();

    if(data?.success) {
        return data.items;
    }
}

export async function storeItem(data) {
    let response = await fetch(`${API}`, {
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
