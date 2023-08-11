
export async function getAttributeFromUsers(attributes) {
    // fetch users from api and return attributes
    const url = `https://pz4igk3vl9.execute-api.us-east-2.amazonaws.com/default/getUsers`;
    const params = new URLSearchParams({
        attributes: attributes,
    });
    const response = await fetch(`${url}?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const data = await response.json();
    // check status code and return accordingly
    const users = data['users'];

    return users;
}

export async function getUsers() {
    // fetch users from api and return attributes
    const url = `https://pz4igk3vl9.execute-api.us-east-2.amazonaws.com/default/getUsers`;
    const params = new URLSearchParams({
        attributes: 'name',
    });
    const response = await fetch(`${url}?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const data = await response.json();
    // check status code and return accordingly
    const users = data['users'];

    return users;
}