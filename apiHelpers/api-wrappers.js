async function getFromProducts(_id) {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    // add body with TableName, KeyConditionExpression, ExpressionAttributeValues, and ExpressionAttributeNames
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Connection": "keep-alive",
        },
        body: JSON.stringify({
            "TableName": "Products",
            "KeyConditionExpression": "#pk = :pkval",
            "ExpressionAttributeNames": {
                "#pk": "_id"
            },
            "ExpressionAttributeValues": {
                ":pkval": { "S": "10" }
            }
        })
    });

    const data = await response.json();
    return data;
}