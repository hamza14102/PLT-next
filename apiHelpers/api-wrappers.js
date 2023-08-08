import { func } from "prop-types";

export async function getFromProductsByID(_id) {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    const params = new URLSearchParams({
        TableName: 'Products',
        _id: _id,
    });
    const response = await fetch(`${url}?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const data = await response.json();
    // change object to json
    const new_data = data['Items'];
    return new_data;
}

export async function postToProducts(product) {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    const params = new URLSearchParams({
        TableName: 'Products',
    });
    const response = await fetch(`${url}?${params}`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const data = await response.json();
    return data;
}

export async function deleteFromProductsByID(_id) {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    const params = new URLSearchParams({
        TableName: 'Products',
    });
    const response = await fetch(`${url}?${params}`, {
        method: 'DELETE',
        body: JSON.stringify({
            "Key": {
                "_id": _id,
            }
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const data = await response.json();
    return data;
}