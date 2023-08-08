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
    // change product to Item which is made of AttributeValue objects (S, N, L, M, BOOL, NULL, etc.)
    // do recursive function to change all values to AttributeValue objects

    // all attribute values accepted by dynamodb
    const attributeMap = {
        'string': 'S',
        'number': 'N',
        'list': 'L',
        'map': 'M',
        'boolean': 'BOOL',
        'null': 'NULL',
        'binary': 'B',
        'stringSet': 'SS',
        'numberSet': 'NS',
        'binarySet': 'BS',
    };

    function recursiveChange(obj) {
        const newObj = {};
        Object.keys(obj).forEach((key) => {
            if (typeof (obj[key]) === 'object') {
                newObj[key] = { [attributeMap[typeof (obj[key])]]: recursiveChange(obj[key]) };
            } else {
                newObj[key] = { [attributeMap[typeof (obj[key])]]: obj[key] };
            }
        });
        return newObj;
    }

    const newProduct = recursiveChange(product);

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