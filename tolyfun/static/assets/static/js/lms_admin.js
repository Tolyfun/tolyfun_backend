
let base_url2 = `https://tolyfun.pythonanywhere.com/api/v1/`
let base_image_url = `https://tolyfun.pythonanywhere.com/`
let admin = [
  /* =========================== LMS ========================= */
  {
    title: "Get School Info",
    value: "get_site_info",
    method: "GET",
    type: "school",
    url: `${base_url2}school/`,
    params: `
    <tr>
      
    </tr>`,
    request: `
    const url = "${base_url2}school/";
    
    var headers = {
        'Accept': 'application/json'
    }
    fetch(url, {
        headers: headers
    })
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})
    `,
    axios_request: ``,
    success_response: `
    [
      {
          "name": "Tolyfun",
          "motto": "In learning and character",
          "primary_email": "",
          "secondary_email": "",
          "primary_phone": "",
          "secondary_phone": "",
          "privacy_policy": "", // html content
          "terms_of_use": "", // html content
          "about": "",  // html content
          "logo": "${base_image_url}media/logo/logo.jpg",
          "icon": "${base_image_url}media/icon/icon.jpg",
          "privacy_pdf": "${base_image_url}media/privacy_policy/privacy_policy.pdf",
          "terms_pdf": "${base_image_url}media/terms_of_use/terms_and_conditions.pdf"
          "socials": {
              "linkedin": "",
              "twitter": "",
              "facebook": "",
              "website": ""
          }
      }
    ]`,
    error_response: `
    // server error
    {
      "status": "error",
      "message": "{error details}"
    }`
  },
  {
    title: "Admin Login Authentication",
    value: "get_site_info",
    method: "POST",
    type: "account",
    url: `${base_url2}auth/login/`,
    params: `
    <tr>
      <td>username</td>
      <td>String</td>
      <td>Required; username/email of admin</td>
    </tr>
    <tr>
      <td>password</td>
      <td>String</td>
      <td>Required</td>
    </tr>`,
    request: `
    var url = "${base_url2}auth/login/"
    var formData = {
        'username':'admin@gmail.com',
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
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})
    `,
    axios_request: ``,
    success_response: `
    {
      "message": "Confirmation code has been sent to admi****@gmail.com. It expires in 10 minutes.",
      "email": "admin@gmail.com"
    }`,
    error_response: `
    // error due to invalid parameters
    {
      "message": "Invalid login credentials"
    }
      // error due to unauthorized request
    {
      "message": "User is not authorized for this operation."
    }`
  },
  {
    title: "Confirm Email for Login",
    value: "get_site_info",
    method: "POST",
    type: "account",
    url: `${base_url2}accounts/confirm_login/`,
    params: `
    <tr>
      <td>email</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td>code</td>
      <td>String</td>
      <td>Required</td>
    </tr>`,
    request: `
    const url = "${base_url2}accounts/confirm_login/";
    var formData = {
        'email':'admin@gmail.com',
        'code':'34073329'
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
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})
    `,
    axios_request: ``,
    success_response: `
    // tokens are refreshed/changed for every successful login request
    // This is to prevent running multiple session of the same admin account
    // tokens are used for authorization for API requests
    {
      "token": "841ee7393891a48d2a05056ebec3307bb3465050"
    }`,
    error_response: `
    // error due to expired confirmation code
    {
      'status': 'error',
      'message': "Confirmation code has already expired. kindly login again to get another confirmation code.",
    }
    // error due to invalid email
    {
      "status": "error",
      "message": "Invalid Email"
    }
      // error due to invalid confirmation code
    {
      "status": "error",
      "message": "Invalid confirmation code"
    }`
  },
]


function loadApi() {
  var x = admin
  $('#aplms').empty();
  $('#apaccount').empty();
  $('#apusers').empty();
  $('#apcourse').empty();

  for (var i in x) {
      var temp = `
      <section id="${x[i].value}" class="w-padding">
          <h3 class="w-bold-xx mt-3 endpoint-tit">
            <span><span class="w-border w-blue" style="padding:5px 15px;">${x[i].method}</span>&nbsp;&nbsp;${x[i].title}</span>
            <span class="det-icon"><i class="fa fa-chevron-down"></i></span>
          </h3>
          <div class="endpoint">
          <div class="table-responsive">
            <table class="table">
              <tbody>
                <tr>
                  <td>Method</td>
                  <td colspan="2">${x[i].method}</td>
                </tr>
                <tr>
                  <td>URL</td>
                  <td colspan="2">${x[i].url}</td>
                </tr>
                <tr>
                  <td colspan="3" class="h3 w-bold-x">Parameters</td>
                </tr>
                <tr>
                  <th>Parameter Name</th>
                  <th>Value Type</th>
                  <th>Description</th>
                </tr>
                ${x[i].params}
              </tbody>
            </table>
          </div>
          <section>
              <div class="code-header">
                  <div>Request</div>
                  <select class="lang-sel">
                    <option value="axios">JS - Axios</option>
                    <option selected value="fetch" selected>JS - Fetch</option>
                  </select>
              </div>
<pre aria-hidden="true">
<code class="language-javascript highlighting-content fetch">${x[i].request}</code>
<code class="language-javascript highlighting-content axios">
${x[i].axios_request}
</code>

</pre>
</section>

<section>
<div class="code-header">
  <div>Response</div>
  <select class="res-sel">
    <option selected value="success">success</option>
    <option value="error">error</option>
  </select>
</div>            
<pre aria-hidden="true">
<code class="language-javascript highlighting-content success">
${x[i].success_response}
</code>
<code class="language-javascript highlighting-content error">
${x[i].error_response}
</code>
</pre>
</section>
</div>
</section>
      `;
      switch(x[i].type) {
        case "school":
          $('#aplms').append(temp);
          break;
        case "account":
          $('#apaccount').append(temp);
          break;
        case "users":
          $('#apusers').append(temp);
          break;
        case "course":
          $('#apcourse').append(temp);
          break;
      }
      
  }
  $('.page-load').css({'display': 'none'})
  $('.endpoint-tit').click(function() {
    var elem = $(this)
    var sib = $(this).siblings('.endpoint')
    sib.toggleClass('active')
    if(sib.hasClass('active')) {
      elem.children('.det-icon').html(`<i class="fa fa-chevron-up"></i>`)
    }
    else {
      elem.children('.det-icon').html(`<i class="fa fa-chevron-down"></i>`)
    }
  })
  $('.res-sel').on('change', function() {
    $(this).parent('.code-header').siblings('pre').children('code').hide();
    var val = $(this).val();
    val = '.' + val;
    //alert(val)
    $(this).parent('.code-header').siblings('pre').children(val).show();
})
$('.lang-sel').on('change', function() {
  $(this).parent('.code-header').siblings('pre').children('code').hide();
  var val = $(this).val();
  val = '.' + val;
  //alert(val)
  $(this).parent('.code-header').siblings('pre').children(val).show();
})
}


loadApi();

$(document).ready(function() {
  checkPin();
  
  flag = 0
  $('.show-pin').click(function() {
    if(flag == 0) {
      $('.pin-in').attr('type', 'text');
      $('.show-pin').html(`<i class="fa fa-eye-slash"></i>`)
      flag = 1
    }
    else {
      $('.pin-in').attr('type', 'password')
      $('.show-pin').html(`<i class="fa fa-eye"></i>`)
      flag = 0
    }
  })
  $('.pin-in').on('input', function() {
    var elem = $(this)
    var value = $(this).val()
    if(value.length > 0) {
      elem.removeClass('error')
      elem.next('input').focus()
    }
    var pin1 = $('#pin1').val()
    var pin2 = $('#pin2').val()
    var pin3 = $('#pin3').val()
    var pin4 = $('#pin4').val()
    if(pin1.trim()!==""&&pin2.trim()!==""&&pin3.trim()!==""&&pin4.trim()!=="") {
      var password = `${pin1}${pin2}${pin3}${pin4}`
      verifyPin(password)
    }
    
  })
  $('.pin-con').submit(function(e) {
    e.preventDefault();
    $('.pin-in').each(function() {
      if($(this).val().trim() === "") {
        $(this).addClass('error');
      }
      else {
        $(this).removeClass('error');
      }
    })
    var pin1 = $('#pin1').val()
    var pin2 = $('#pin2').val()
    var pin3 = $('#pin3').val()
    var pin4 = $('#pin4').val()
    if(pin1.trim()==""||pin2.trim()==""||pin3.trim()==""||pin4.trim()=="") {
      return
    }
    var password = `${pin1}${pin2}${pin3}${pin4}`
    verifyPin(password)
  })
})

function checkPin() {
  if(!sessionStorage.riglearn_pin) {
    $('.pin-container').show();
  }
  else {
    $('.pin-container').hide();
  }
}
var check = setInterval(checkPin, 500)

function verifyPin(pin) {
  $('.pin-submit-btn').attr('disabled', true).html(`<i class="fa fa-spinner"><i> Verifying...`)
  
  if(pin === "tost" || pin === "2536") {
    sessionStorage.setItem('riglearn_pin', "true")
    $('.pin-con')[0].reset()
    $('.pin-container').hide()
  } 
  else {
    swal('Oops!', "Incorrect PIN", 'warning')
    $('.pin-con')[0].reset()
  }
  $('.pin-submit-btn').attr('disabled', false).html(`Submit PIN`)
}