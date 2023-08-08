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
    // change product to Item which is made of AttributeValue objects (S, N, L, M, BOOL, NULL, etc.)
    const attributeMap = {
        'string': 'S',
        'number': 'N',
        'list': 'L',
        'map': 'M',
        'boolean': 'BOOL',
        'null': 'NULL',
    };

    const newProduct = {};
    Object.keys(product).forEach((key) => {
        newProduct[key] = { [attributeMap[typeof (product[key])]]: product[key] };
    });


    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            TableName: 'Products',
            Item: newProduct,
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const data = await response.json();
    return data;
}