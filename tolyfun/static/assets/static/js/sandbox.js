function formatJson() {
    let value = $("#post_data").val()
    let obj_value = JSON.parse(value)
    let string_value = JSON.stringify(obj_value, null, 4)
    $("#post_data").val(string_value)
}

function makeGetRequest() {
    $('#get_btn').attr('disabled', true).html('Making Request')
    let url = $("#get_url").val();
    let token = $("#get_token").val();

    let headers = {
        'Accept': 'application/json',
        'Authorization': `Token ${token}`
    }
    fetch(url, {
        headers: headers
    })
    .then(res => {return res.json()})
    .then(data => {
        let parsed = JSON.stringify(data, null, 4)
        $('#get_result').val(parsed)
        $('#get_btn').attr('disabled', false).html('Make Request')
    })
    .catch(err => {
        $('#get_result').val(err)
        $('#get_btn').attr('disabled', false).html('Make Request')
    })
}

function makePostRequest() {
    $('#post_btn').attr('disabled', true).html('Making Request')
    let url = $("#post_url").val();
    let token = $("#post_token").val();
    let info = $("#post_data").val();
    let csrfToken = $('[name=csrfmiddlewaretoken]').val();
    console.log(csrfToken)

    let formData = JSON.parse(info)

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
        'Authorization': `Token ${token}`
    }
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData)
    })
    .then(res => {return res.json()})
    .then(data => {
        let parsed = JSON.stringify(data, null, 4)
        $('#post_result').val(parsed)
        $('#post_btn').attr('disabled', false).html('Make Request')
    })
    .catch(err => {
        $('#post_result').val(err)
        $('#post_btn').attr('disabled', false).html('Make Request')
    })
}
