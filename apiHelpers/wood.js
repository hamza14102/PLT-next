export async function postToInspectionLogs(report) {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    const params = new URLSearchParams({
        TableName: 'WoodInspections',
    });
    const response = await fetch(`${url}?${params}`, {
        method: 'POST',
        body: JSON.stringify(report),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const data = await response.json();
    // check status code and return accordingly
    return data;
}


export async function getProductionLogsByJobNo(jobNo) {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    const params = new URLSearchParams({
        TableName: 'WoodInspections',
        search_by: 'jobNo',
        value: jobNo,
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