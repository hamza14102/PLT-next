export async function getFromSupervisorSearch(names, times, manpower) {
    const apiGatewayUrl = 'https://4110ohgv2h.execute-api.us-east-2.amazonaws.com/launch';
    const resourcePath = '/p1';
    const queryParams = `firstNames=${names.join(',')}&lastNames=${times.join(',')}&number=${manpower}`;
    const response = await fetch(`${apiGatewayUrl}${resourcePath}?${queryParams}`,
        {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Access-Control-Allow-Origin': '*',
            // },
        });
    const data = await response.json();

    return data;

}