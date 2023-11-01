export async function getFromTasksByID(_id) {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    const params = new URLSearchParams({
        TableName: 'Tasks',
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

export async function getFromTasksByAssignedUser(user_id) {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    const params = new URLSearchParams({
        TableName: 'Tasks',
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

export async function putToTasks(item) {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    const params = new URLSearchParams({
        TableName: 'Tasks',
    });

    // in user_ids, we need to add the user_id of the user who can view all the tasks

    const all_access_user_ids = ['Shariq Ali', 'Hamza Husain'];
    // append the user_ids to the item['user_ids']
    item['user_ids'] = item['user_ids'].concat(all_access_user_ids);

    const response = await fetch(`${url}?${params}`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const data = await response.json();
    return { data: data, status: response.status };
}



export async function addLogsToTaskByID(task_id, achieved, rejected) {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    const params = new URLSearchParams({
        TableName: 'Tasks',
    });
    const response = await fetch(`${url}?${params}`, {
        method: 'PUT',
        body: JSON.stringify({
            "Key": {
                "_id": task_id,
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

export async function getAllTasks() {
    const url = `https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/`;
    const params = new URLSearchParams({
        TableName: 'Tasks',
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