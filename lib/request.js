function request({
    method = 'GET',
    url,
    type = 'json',
    onSuccess = noop,
}) {
    const request = new XMLHttpRequest();

    request.open(method, url);
    request.responseType = type;
    request.send();


    request.onload = function(event) {
        const target = event.target;

        onSuccess(target.response);
        
        if(request.status !== 200) {
            console.log('Ошибка');
        } else {
            return target.response;
        }

    }
}
