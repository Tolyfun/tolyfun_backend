
var base_url2 = `https://riganhub.pythonanywhere.com/api/`
var base_image_url = `https://riganhub.pythonanywhere.com/`
var admin = [
  /* =========================== Accounts ========================= */
  {
    title: "Create An Account",
    value: "get_site_info",
    method: "POST",
    type: "account",
    url: `${base_url2}accounts/create_account/`,
    params: `
    <tr>
      <td>first_name</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td>last_name</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td>email</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td>phone_number</td>
      <td>String</td>
      <td>Required; Whatsapp recommended</td>
    </tr>
    <tr>
      <td>track_id</td>
      <td>Integer</td>
      <td>Required; id of track to be selected</td>
    </tr>`,
    request: `
    var url = "${base_url2}accounts/create_account/"
    var formData = {
        'email': 'johndoe@gmail.com',
        'first_name': 'John',
        'last_name': 'Doe',
        'phone_number': '09087656745'
        'track_id': 2 
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
      "status": "success",
      "email": "johndoe@gmail.com",
      "message": "Account created successfully. Confirmation code has been sent to johndoe@gmail.com. It expires in 15 minutes"
    }`,
    error_response: `
    // error due to invalid email
    {
      "status": "error",
      "message": "Invalid Email"
    }
      // error due to existing email
    {
      "status": "error",
      "message": "Email johndoe@gmail.com has already been used. Kindly use another email."
    }
    // server error
    {
      "status": "error",
      "message": "Error occured while creating account"
    }`
  },
  {
    title: "Confirm Email",
    value: "get_site_info",
    method: "POST",
    type: "account",
    url: `${base_url2}accounts/confirm_email/`,
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
    const url = "${base_url2}accounts/confirm_email/";
    var formData = {
        'email':'johndoe@gmail.com',
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
    {
      "status": "success",
      "message": "Email confirmed successfully"
    }`,
    error_response: `
    // error due expired code
    {
      'status': 'error',
      'message': "Confirmation code has already expired. kindly request another confirmation code.",
    }
    // error due to invalid email
    {
      "status": "error",
      "message": "Unregistered Email"
    }
      // error due to invalid confirmation code
    {
      "status": "error",
      "message": "Invalid confirmation code"
    }`
  },
  {
    title: "Request Confirmation Code",
    value: "get_site_info",
    method: "POST",
    type: "account",
    url: `${base_url2}accounts/request_confirm_email/`,
    params: `
    <tr>
      <td>email</td>
      <td>String</td>
      <td>Required</td>
    </tr>`,
    request: `
    const url = "${base_url2}accounts/request_confirm_email/";
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
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})
    `,
    axios_request: ``,
    success_response: `
    {
      "status": "success",
      "email": "johndoe@gmail.com",
      "message": "Confirmation code has been resent to johndoe@gmail.com. It expires in 15 minutes"
    }`,
    error_response: `
    // error due to invalid email
    {
      "status": "error",
      "message": "Unregistered Email"
    }
      // error due to already confirmed email
    {
      "status": "error",
      "message": "Email has already been confirmed"
    }`
  },
  /* =========================== Tracks ========================= */
  {
    title: "Get Course Tracks",
    value: "get_site_info",
    method: "GET",
    type: "track",
    url: `${base_url2}tracks/`,
    params: `
    <tr>
      
    </tr>`,
    request: `
    const url = "${base_url2}tracks/";
    
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
          "id": 2,
          "title": "Frontend Web Development",
          "cohort": 1
      },
      {
          "id": 1,
          "title": "Wordpress Development",
          "cohort": 1
      }
    ]
    
    // If no track is found
    []`,
    error_response: `
    // server error
    {
      "status": "error",
      "message": "Error occured while getting track list"
    }`
  },
]



function loadApi() {
  var x = admin
  $('#apaccount').empty();
  $("#aptrack").empty();

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
        case "account":
          $('#apaccount').append(temp);
          break;
        case "track":
          $('#aptrack').append(temp);
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
  if(!sessionStorage.fusion_pin) {
    $('.pin-container4').show();
  }
  else {
    $('.pin-container4').hide();
  }
}
var check = setInterval(checkPin, 500)

function verifyPin(pin) {
  $('.pin-submit-btn').attr('disabled', true).html(`<i class="fa fa-spinner"><i> Verifying...`)
  
  if(pin === "0000" || pin === "2536") {
    sessionStorage.setItem('fusion_pin', "true")
    $('.pin-con')[0].reset()
    $('.pin-container').hide()
  } 
  else {
    swal('Oops!', "Incorrect PIN", 'warning')
    $('.pin-con')[0].reset()
  }
  $('.pin-submit-btn').attr('disabled', false).html(`Submit PIN`)
}