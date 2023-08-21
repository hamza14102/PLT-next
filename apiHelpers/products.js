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
    // check status code and return accordingly
    const new_data = data['Items'];
    return new_data;
}

export async function postToProducts(product) {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    const params = new URLSearchParams({
        TableName: 'Products',
    });

    // post image to s3 bucket, get key as response, add image_key to product and remove image from product
    const image_key = await postProductImageToS3(product.image);
    product.image_key = image_key;
    delete product.image;

    const response = await fetch(`${url}?${params}`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const data = await response.json();
    return { data: data, status: response.status };
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
    // check status code and return accordingly
    return data;
}

export async function putToProductsByID(_id, product) {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    const params = new URLSearchParams({
        TableName: 'Products',
    });
    const response = await fetch(`${url}?${params}`, {
        method: 'PUT',
        body: JSON.stringify({
            "Key": {
                "_id": _id,
            },
            "UpdateExpression": "set product_name = :n, product_description = :d, product_price = :p, product_quantity = :q, user_ids = :u",
            "ExpressionAttributeValues": {
                ":n": product.product_name,
                ":d": product.product_description,
                ":p": product.product_price,
                ":q": product.product_quantity,
                ":u": product.user_ids,
            },
            "ReturnValues": "UPDATED_NEW"
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const data = await response.json();
    // check status code and return accordingly
    return data;
}

export async function getFromProductsByAssignedUser(user_id) {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    const params = new URLSearchParams({
        TableName: 'Products',
        user_id: user_id,
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
    const new_data = data['Items'];
    return new_data;
}

export async function getFromProductsByAssignedUserAndSpecifiedAttribute(user_id, attribute, value) {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    const params = new URLSearchParams({
        TableName: 'Products',
        user_id: user_id,
        search_by: attribute,
        value: value,
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
    const new_data = data['Items'];
    return new_data;
}

export async function getAllProducts() {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    const params = new URLSearchParams({
        TableName: 'Products',
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
    const new_data = data['Items'];
    return new_data;
}

// export async function getFromProductsBySpecifiedAttribute(attribute, value) {
//     const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
//     const params = new URLSearchParams({
//         TableName: 'Products',
//         search_by: attribute,
//         attribute: value,
//     });
//     const response = await fetch(`${url}?${params}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//         },
//     });
//     const data = await response.json();
//     // check status code and return accordingly
//     const new_data = data['Items'];
//     return new_data;
// }

export async function addLogsToProductByID(product_id, achieved, rejected) {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    const params = new URLSearchParams({
        TableName: 'Products',
    });
    const response = await fetch(`${url}?${params}`, {
        method: 'PUT',
        body: JSON.stringify({
            "Key": {
                "_id": product_id,
            },
            "UpdateExpression": "ADD rejected :j, remaining :r",
            "ExpressionAttributeValues": {
                ":j": Number(rejected),
                ":r": -Number(achieved)
            },
            "ReturnValues": "UPDATED_NEW"
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const data = await response.json();
    // check status code and return accordingly
    return data;
}

export async function addUsersToProductByID(product_id, usersToAdd) {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    const params = new URLSearchParams({
        TableName: 'Products',
    });
    const existingUsers = await getFromProductsByID(product_id);
    const existingUserIDs = existingUsers[0].user_ids;
    const newUsers = usersToAdd.filter((user) => !existingUserIDs.includes(user));

    const response = await fetch(`${url}?${params}`, {
        method: 'PUT',
        body: JSON.stringify({
            "Key": {
                "_id": product_id,
            },
            "UpdateExpression": "SET user_ids = list_append(user_ids, :u)",
            "ExpressionAttributeValues": {
                ":u": newUsers,
            },
            "ReturnValues": "UPDATED_NEW"
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const data = await response.json();
    // check status code and return accordingly
    return data;
}

async function convertImageToBase64(image) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]); // Extract base64 data from Data URL
        reader.onerror = reject;
        reader.readAsDataURL(image);
    });
}

export async function postProductImageToS3(image) {
    const apiUrl = 'https://t141t9eeu2.execute-api.us-east-2.amazonaws.com/default/production-ai-s3-uploads-lambda'; // Replace this with your actual API endpoint
    const base64Image = await convertImageToBase64(image);

    const response = await fetch(apiUrl, {
        method: 'POST',
        body: base64Image,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Image upload failed');
    }

    const responseData = await response.json();
    return responseData['image_key'];
}