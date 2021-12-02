const BASE_URL = 'http://localhost:8080';
export default function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText);
        if (response.status === 403 && response.url === (BASE_URL + '/login')) {
            error.message = 'Incorrect credentials!';
            error.response = response;
            throw error;
        } else if (response.status === 403 && response.type === 'cors') {
            console.log('err response: ', response)
            error.message = 'Your JWT token is expired. Please log in!'
            error.status = 403;
            error.type = 'cors'
            throw error;
        } else if (response.status === 400) {
            console.log('err response: ', response)
            error.message = 'Error: Bad request'
            // error.message = response.message
            error.status = 400;
            error.type = 'cors'
            throw error;
        }
            // else if (response.status === 500) {
            //     console.log('err response: ', response)
            //     error.message = 'Something went wrong'
            //     error.status = 403;
            //     error.type = 'cors'
            //     throw error;
        // }
        else {
            return response;
        }
    }
}