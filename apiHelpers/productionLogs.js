export async function postToProductionLogs(log) {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    const params = new URLSearchParams({
        TableName: 'ProductionLogs',
    });
    const response = await fetch(`${url}?${params}`, {
        method: 'POST',
        body: JSON.stringify(log),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const data = await response.json();
    // check status code and return accordingly
    return data;
}