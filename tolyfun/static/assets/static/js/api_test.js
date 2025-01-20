//var base_url2 = `http://127.0.0.1:8000/api/v1/`
var base_url2 = `https://ajo.pythonanywhere.com/api/v1/`
var result = $('#result')

function create_account() {
    var url = `${base_url2}accounts/create_account/`
    var formData = {
        'username': 'JohnDoe',
        'email': 'johndoe@gmail.com',
        'first_name': 'John',
        'last_name': 'Doe',
        'phone_number': '07011223344',
        'password': 'password123' 
    }
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData)
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data);
        result.val(JSON.stringify(data))
    })
    .catch(err => {
        console.log(err)
        result.val(JSON.stringify(err))
    })
}
function login() {
    var url = `${base_url2}auth/login/`
    var formData = {
        'username':'JohnDoe',
        'password':'password123'
    }
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData)
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data)
        sessionStorage.tokenId = data.token
        result.val(JSON.stringify(data))
    })
    .catch(err => {
        console.log(err)
        result.val(JSON.stringify(err))
    })
}
function confirm_email() {
    var url = `${base_url2}accounts/confirm_email/`
    var formData = {
        'email':'johndoe@gmail.com',
        'code':'79008892'
    }
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData)
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data)
        result.val(JSON.stringify(data))
    })
    .catch(err => {
        console.log(err)
        result.val(JSON.stringify(err))
    })
}
function req_confirm_email() {
    var url = `${base_url2}accounts/request_confirm_email/`
    var formData = {
        'email':'johndoe@gmail.com'
    }
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData)
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data)
        result.val(JSON.stringify(data))
    })
    .catch(err => {
        console.log(err)
        result.val(JSON.stringify(err))
    })
}
function profile() {
    var url = `${base_url2}user/user_profile/`;
    var headers = {
        'Authorization': "Token " + sessionStorage.tokenId,
        'Accept': 'application/json'
    }
    fetch(url, {
        headers: headers
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data)
        result.val(JSON.stringify(data))
    })
    .catch(err => {
        console.log(err)
        result.val(JSON.stringify(err))
    })
}
function create_monnify_account() {
    var url = `${base_url2}user/generate_monnify_account/`;
    var headers = {
        'Authorization': "Token " + sessionStorage.tokenId,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    let formData = {
        'bvn': "12345678901",
        'nin': "98765432123"
    }
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData)
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data)
        result.val(JSON.stringify(data))
    })
    .catch(err => {
        console.log(err)
        result.val(JSON.stringify(err))
    })
}
function fund_wallet() {
    var url = `${base_url2}wallet/fund_with_paystack/`;
    var headers = {
        'Authorization': "Token " + sessionStorage.tokenId,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    let formData = {
        'amount':'500'
    }
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData)
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data)
        if(data.status == "success") {
            sessionStorage.setItem("access_code", data.data.accessCode)
            sessionStorage.setItem("ref", data.data.reference)
        }
        result.val(JSON.stringify(data))
    })
    .catch(err => {
        console.log(err)
        result.val(JSON.stringify(err))
    })
}
function make_payment() {
    var handler = PaystackPop.setup({
        key: "pk_test_87dbe2659800386cb5293afe7b080c3d810c2454",
        email: "hassanridwan2536@gmail.com",
        amount: 50000, // multiply by 100 since transaction is made in kobo
        reference: sessionStorage.access_code,
        onSuccess: function(response) {
          console.log(response);
          verifyPayment(sessionStorage.access_code); // function to make the verify payment request, will be discussed in next API request
        }
      });
      handler.openIframe();
}

function verifyPayment(ref) {
    var url = `${base_url2}wallet/verify_payment/?reference=${ref}`;
    var headers = {
        'Authorization': "Token " + sessionStorage.tokenId,
        'Accept': 'application/json'
    }
    fetch(url, {
        headers: headers
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data)
        result.val(JSON.stringify(data))
    })
    .catch(err => {
        console.log(err)
        result.val(JSON.stringify(err))
    })
}
function get_monnify_account() {
    var url = `${base_url2}user/get_monnify_account/`;
    var headers = {
        'Authorization': "Token " + sessionStorage.tokenId,
        'Accept': 'application/json'
    }
    fetch(url, {
        headers: headers
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data)
        result.val(JSON.stringify(data))
    })
    .catch(err => {
        console.log(err)
        result.val(JSON.stringify(err))
    })
}
function get_banks() {
    var url = `${base_url2}banks/`;
    var headers = {
        'Accept': 'application/json'
    }
    fetch(url, {
        headers: headers
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data)
        result.val(JSON.stringify(data))
    })
    .catch(err => {
        console.log(err)
        result.val(JSON.stringify(err))
    })
}


