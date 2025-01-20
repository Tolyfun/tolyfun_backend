
var base_url2 = `https://ajo.pythonanywhere.com/api/v1/`
var base_image_url = `https://ajo.pythonanywhere.com/`
var admin = [
  /* =========================== Ajo ========================= */
  {
    title: "Get Ajo Info",
    value: "get_site_info",
    method: "GET",
    type: "ajo",
    url: `${base_url2}ajo/`,
    params: `
    <tr>
      
    </tr>`,
    request: `
    const url = "${base_url2}ajo/";
    
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
        "title": "Ajo",
        "subtitle": "Your Traditional Savings Bank",
        "primary_email": "",
        "secondary_email": "",
        "primary_phone": "",
        "secondary_phone": "",
        "privacy_policy": "", // html content
        "terms_and_conditions": "", // html content
        "about": "",
        "logo": "${base_image_url}media/ajo/logo.jpg",
        "icon": "${base_image_url}media/ajo/icon.jpg",
        "privacy_pdf": "${base_image_url}media/ajo/ajo_privacy_policy.pdf",
        "terms_pdf": "${base_image_url}media/ajo/ajo_terms_and_conditions.pdf"
      }
    ]`,
    error_response: `
    // server error
    {
      "status": "error",
      "message": "{error details}"
    }`
  },
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
      <td>username</td>
      <td>String</td>
      <td>Required; must not contain special characters like spaces, symbols and entities</td>
    </tr>
    <tr>
      <td>password</td>
      <td>String</td>
      <td>Required; must be at least 8 characters long consisting alphanumeric characters. can contain special characters</td>
    </tr>
    <tr>
      <td>phone_number</td>
      <td>String</td>
      <td>Required</td>
    </tr>`,
    request: `
    var url = "${base_url2}accounts/create_account/"
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
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})
    `,
    axios_request: ``,
    success_response: `
    {
      "status": "success",
      "email": "johndoe@gmail.com",
      "message": "Account created successfully. Confirmation code has been sent to johndoe@gmail.com. It expires in 10 minutes"
    }`,
    error_response: `
    // error due to invalid email
    {
      "status": "error",
      "message": "Invalid Email"
    }
    // error due to invalid password
    {
      "status": "error",
      "message": "Invalid password combination (minimum of 8 characters including letters, numbers and special characters)"
    }
      // error due to invalid username
    {
      "status": "error",
      "message": "Invalid username"
    }
      // error due to existing username
    {
      "status": "error",
      "message": "Username already exists"
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
      "message": "Confirmation code has been sent to johndoe@gmail.com"
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
  {
    title: "Login Authentication",
    value: "get_site_info",
    method: "POST",
    type: "account",
    url: `${base_url2}auth/login/`,
    params: `
    <tr>
      <td>username</td>
      <td>String</td>
      <td>Required; could be the username or email of user; both works</td>
    </tr>
    <tr>
      <td>password</td>
      <td>String</td>
      <td>Required</td>
    </tr>`,
    request: `
    var url = "${base_url2}auth/login/"
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
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})
    `,
    axios_request: ``,
    success_response: `
    // If 2-FA is not enabled
    // Kindly note that tokens are changed for every login request
    {
      "token": "841ee7393891a48d2a05056ebec3307bb3465050" // token to save in storage for future requests
    }
    // if 2-FA is enabled
    {
      'message': f"Confirmatin code has been sent to johnd*****@gmail.com. It expires in 10 minutes.",
      'email': johndoe@gmail.com
    }`,
    error_response: `
    // error due to invalid parameters
    {
      "message": "Invalid login credentials"
    }
      // error due to deactivated account
    {
      "message": "Your account has been deactivated. Kindly contact the administrator for more enquiries."
    }
      // error due to unconfirmed email
    {
      "message": "Your account has not been activated. Please confirm your email to activate your account"
    }`
  },
  {
    title: "Forgot Password",
    value: "get_site_info",
    method: "POST",
    type: "account",
    url: `${base_url2}accounts/forgot_password/`,
    params: `
    <tr>
      <td>email</td>
      <td>String</td>
      <td>Required; user registered email</td>
    </tr>`,
    request: `
    var url = "${base_url2}accounts/forgot_password/"
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
      'message': "Password reset instructions has been sent to johndoe@gmail.com."
    }`,
    error_response: `
    // error due to invalid email
    {
      "status": "error",
      "message": "Invalid email"
    }
      // error due to non existent account
    {
      "status": "error",
      "message": "Unregistered email."
    }`
  },
  {
    title: "Confirm Email for 2-FA Login",
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
      "message": "Unregistered Email"
    }
      // error due to invalid confirmation code
    {
      "status": "error",
      "message": "Invalid confirmation code"
    }`
  },
  /* =========================== User ========================= */
  /*
  {
    title: "Confirm Phone Number",
    value: "get_site_info",
    method: "POST",
    type: "user",
    url: `${base_url2}accounts/confirm_phone_number/`,
    params: `
    <tr></tr>`,
    request: `
    const url = "${base_url2}user/confirm_phone_number/";

    var headers = {
        'Authorization': "Token {user_token}",
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: ""
    })
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})
    `,
    axios_request: ``,
    success_response: `
    {
      "status": "success",
      "message": "Verification code has been sent to +2349087654354."
    }`,
    error_response: `
    // error due to invalid phone number
    {
      "status": "error",
      "message": "Phone number cannot be verified"
    }
      // error due to already verified phone number
    {
      "status": "error",
      "message": "Phone number has already been verified"
    }
      // error due to invalid token
    {
      "status": "error",
      "message": "Unauthorized request"
    }`
  },
  {
    title: "Verify Phone Number OTP",
    value: "get_site_info",
    method: "POST",
    type: "user",
    url: `${base_url2}user/verify_phone_number/`,
    params: `
    <tr>
      <td>code</td>
      <td>String</td>
      <td>Required</td>
    </tr>`,
    request: `
    const url = "${base_url2}user/verify_phone_number/";
    var formData = {
        'code':'340733'
    }
    var headers = {
        'Authorization': "Token {user_token}",
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
      "message": "Phone number verified successfully."
    }`,
    error_response: `
    // error due to invalid token
    {
      "status": "error",
      "message": "Unauthorized request"
    }
      // error due to invalid confirmation code
    {
      "status": "error",
      "message": "Invalid Verification Code"
    }`
  },
  */
  {
    title: "Get User Profile",
    value: "get_site_info",
    method: "GET",
    type: "user",
    url: `${base_url2}user/user_profile/`,
    params: `
    <tr></tr>`,
    request: `
    const url = "${base_url2}user/user_profile/";

    var headers = {
        'Authorization': "Token {user_token}",
        'Accept': 'application/json',
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
    {
      "status": 'success',
      "message": 'data fetched successfully',
      "data": {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "verifiedPhoneNumber": false,
        "profileId": "GW3JNCZT",
        "image":"/media/users/user.png", // to use this image src, always add the domain "https://ajo.pythonanywhere.com" before it.
        "email": "johndoe@gmail.com",
        "phoneNumber": "07011223344",
        "_2fa_enabled": false,
        "userLevel": 1,
        "creditScore": 300
      }
    }`,
    error_response: `
      // error due to invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Get User Linked IDs",
    value: "get_site_info",
    method: "GET",
    type: "user",
    url: `${base_url2}user/get_user_ids/`,
    params: `
    <tr></tr>`,
    request: `
    const url = "${base_url2}user/get_user_ids/";

    var headers = {
        'Authorization': "Token {user_token}",
        'Accept': 'application/json',
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
    // linked IDs found
    {
      "status": 'success',
      "message": 'data fetched successfully',
      "data": [
        {
          "type":"BVN",
          "verified":true,
          "IdNumber":"98765******",
          "identityNumber": "98765432198",
          "fullName": "JOHN DOE MATHEW"
        }
      ]
    }
      
    // no linked IDs found
    {
      "status": "success",
      "message": "No linked IDs"
    }`,
    error_response: `
      // error due to invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Generate Virtual Account",
    value: "get_site_info",
    method: "POST",
    type: "user",
    url: `${base_url2}user/generate_virtual_account/`,
    params: `
    <tr>
      
    </tr>`,
    request: `
    const url = "${base_url2}user/generate_virtual_account/";

    var headers = {
        'Authorization': "Token {user_token}",
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: ""
    })
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})
    `,
    axios_request: ``,
    success_response: `
    // new account created
    {
      "status":"success",
      "message":"Virtual accounts generated successfully.",
      "data":[
        {
          'id': 1,
          'accountName': 'RIGANTECH/DOE JOHN',
          'accountNumber': '9307694279',
          'bankName': 'Wema Bank'
        }
      ]
    }
    // user existing account
    {
      "status":"success",
      "message":"Virtual accounts for user already exists.",
      "data":[
        {
          'id': 1,
          'accountName': 'RIGANTECH/DOE JOHN',
          'accountNumber': '9307694279',
          'bankName': 'Wema Bank'
        }
      ]
    }`,
    error_response: `
    // error due to invalid token
    {
      "status": "error",
      "message": "Unauthorized request"
    }
      // account generation error
    {
      "status": "error",
      "message": "Error occured while generating account"
    }
    // server error
    {
      "status": "error",
      "message": "Error occured: {error details}"
    }`
  },
  {
    title: "Fetch User Virtual Account(s)",
    value: "get_site_info",
    method: "GET",
    type: "user",
    url: `${base_url2}user/get_virtual_account/`,
    params: `
    <tr>
      
    </tr>`,
    request: `
    const url = "${base_url2}user/get_virtual_account/";
    
    var headers = {
        'Authorization': "Token {user_token}",
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
    // generated virtual accounts
    {
      "status":"success",
      "message":"Virtual accounts fetched successfully.",
      "data":[
        {
          'id': 1,
          'accountName': 'RIGANTECH/DOE JOHN',
          'accountNumber': '9307694279',
          'bankName': 'Wema Bank'
        }
      ]
    }
    // No virtual accounts found
    {
      "status": "success",
      "message": "No virtual accounts generated"
    }`,
    error_response: `
    // error due to invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Activate/Deactivate 2-FA",
    value: "get_site_info",
    method: "POST",
    type: "user",
    url: `${base_url2}user/auth_2fa/`,
    params: `
    <tr>
      <td>password</td>
      <td>String</td>
      <td>Required; User password for authentication</td>
    </tr>
    <tr>
      <td>action</td>
      <td>String</td>
      <td>Required; either "activate" or "deactivate"</td>
    </tr>`,
    request: `
    const url = "${base_url2}user/auth_2fa/";

    var formData = {
        'password':'password123',
        'action': 'activate'
    }
    var headers = {
        'Authorization': "Token {user_token}",
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
      "message": "2 factor auhentication activated."
    }`,
    error_response: `
    // error due to invalid/incorrect action
    {
      "status": "error",
      "message": "Invalid action parameter"
    }
      // error due to incorrect password
    {
      "status": "error",
      "message": "Incorrect password"
    }
      // error due to invalid token
    {
      "status": "error",
      "message": "Unauthorized request"
    }`
  },
  {
    title: "Change User Password",
    value: "get_site_info",
    method: "POST",
    type: "user",
    url: `${base_url2}user/change_password/`,
    params: `
    <tr>
      <td>old_password</td>
      <td>String</td>
      <td>Required; User password for authentication</td>
    </tr>
    <tr>
      <td>new_password</td>
      <td>String</td>
      <td>Required; new password with the right comibination and password length</td>
    </tr>`,
    request: `
    const url = "${base_url2}user/change_password/";

    var formData = {
        'old_password':'password123',
        'new_password': 'password001'
    }
    var headers = {
        'Authorization': "Token {user_token}",
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
      "message": "Your password has been reset successfully!"
    }`,
    error_response: `
    // error due to invalid password combination
    {
      "status": "error",
      "message": "Invalid new password combination"
    }
      // error due to incorrect password
    {
      "status": "error",
      "message": "Incorrect password"
    }
      // error due to invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Get User Payment PIN",
    value: "get_site_info",
    method: "POST",
    type: "user",
    url: `${base_url2}user/get_payment_pin/`,
    params: `
    <tr>
      <td>password</td>
      <td>String</td>
      <td>Required; User password for authentication</td>
    </tr>`,
    request: `
    const url = "${base_url2}user/get_payment_pin/";

    var formData = {
        'password':'password123',
    }
    var headers = {
        'Authorization': "Token {user_token}",
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
      "pin": "1234"
    }`,
    error_response: `
      // error due to incorrect password
    {
      "status": "error",
      "message": "Incorrect password"
    }
      // error due to invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Change Payment PIN",
    value: "get_site_info",
    method: "POST",
    type: "user",
    url: `${base_url2}user/change_payment_pin/`,
    params: `
    <tr>
      <td>old_pin</td>
      <td>String</td>
      <td>Required; User old payment PIN</td>
    </tr>
    <tr>
      <td>new_pin</td>
      <td>String</td>
      <td>Required; User new payment PIN</td>
    </tr>`,
    request: `
    const url = "${base_url2}user/change_payment_pin/";

    var formData = {
        'old_pin':'1234',
        'new_pin': '2004'
    }
    var headers = {
        'Authorization': "Token {user_token}",
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
      "message": "Payment PIN changed successfully"
    }`,
    error_response: `
      // error due to incorrect PIN
    {
      "status": "error",
      "message": "Incorrect PIN"
    }
      // error due to invalid new PIN
    {
      "status": "error",
      "message": "PIN must be 4 digits"
    }
      // error due to invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  /*
  {
    title: "Verify NIN",
    value: "get_site_info",
    method: "POST",
    type: "user",
    url: `${base_url2}accounts/verify_nin/`,
    params: `
    <tr>
      <td>nin</td>
      <td>String</td>
      <td>Required; User NIN</td>
    </tr>`,
    request: `
    const url = "${base_url2}user/verify_nin/";

    var formData = {
        'nin':'98765432123'
    }
    var headers = {
        'Authorization': "Token {user_token}",
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
      "message": "NIN verified successfully.",
      "data": {
        "nin": 98765432123,
        "lastName": Doe,
        "firstName": John,
        "middleName": "",
        "dateOfBirth": "1999-04-08",
        "gender": "OTHER",
        "mobileNumber": 07011223344
      }
    }`,
    error_response: `
    // error due to invalid/incorrect NIN
    {
      "status": "error",
      "message": "NIN not found. Please check and try again."
    }
      // error due to invalid token
    {
      "status": "error",
      "message": "Unauthorized request"
    }`
  },
  {
    title: "Verify BVN",
    value: "get_site_info",
    method: "POST",
    type: "user",
    url: `${base_url2}accounts/verify_bvn/`,
    params: `
    <tr>
      <td>bvn</td>
      <td>String</td>
      <td>Required; User BVN</td>
    </tr>
    <tr>
      <td>date-of-birth</td>
      <td>String</td>
      <td>Required;</td>
    </tr>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>Required; Full name as stated in BVN</td>
    </tr>
    <tr>
      <td>mobile-number</td>
      <td>String</td>
      <td>Required; Phone number registered to BVN</td>
    </tr>`,
    request: `
    const url = "${base_url2}user/verify_bvn/";

    var formData = {
        'bvn':'98765432123',
        'date-of-birth': '1999-01-01',
        'name': 'JOHN DOE',
        'mobile-number': '07011223344'
    }
    var headers = {
        'Authorization': "Token {user_token}",
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
      "data": {
        "bvn": "98765432123",
        "name": {
          "matchStatus": "PARTIAL_MATCH",
          "matchPercentage": 70
        },
        "dateOfBirth": "NO_MATCH",
        "mobileNo": "FULL_MATCH"
      }
    }`,
    error_response: `
    // error due to invalid/incorrect BVN
    {
      "status": "error",
      "message": "Unable to process request. Invalid BVN provided"
    }
      // error due to invalid token
    {
      "status": "error",
      "message": "Unauthorized request"
    }`
  },
  */
  /* =========================== Banks ========================= */
  {
    title: "Fetch Banks List",
    value: "get_site_info",
    method: "GET",
    type: "bank",
    url: `${base_url2}banks/`,
    params: `
    <tr>
      
    </tr>`,
    request: `
    const url = "${base_url2}banks/";
    
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
    // List contains about 239 banks
    // you can fetch once and save in a JSON file for local use
    // instead of fetching every time
    // bankCode are what will be used in requests involving banks
    [
      {
        "id": 412,
        "bankName": "9mobile 9Payment Service Bank",
        "bankCode": "120001",
        "logo": "${base_image_url}media/banks/bank.jpeg"
      },
      {
          "id": 413,
          "bankName": "Abbey Mortgage Bank",
          "bankCode": "404",
          "logo": "${base_image_url}media/banks/bank.jpeg"
      },
      {
          "id": 414,
          "bankName": "Above Only MFB",
          "bankCode": "51204",
          "logo": "${base_image_url}media/banks/bank.jpeg"
      },
      {
          "id": 415,
          "bankName": "Abulesoro MFB",
          "bankCode": "51312",
          "logo": "${base_image_url}media/banks/bank.jpeg"
      },
      {
          "id": 416,
          "bankName": "Access Bank",
          "bankCode": "044",
          "logo": "${base_image_url}media/Access_Bank_PLC_Logo.svg"
      },
      ...
    ]`,
    error_response: `
    // server error
    {
      "status": "error",
      "message": "{error details}"
    }`
  },
  {
    title: "Verify Account Details",
    value: "get_site_info",
    method: "GET",
    type: "bank",
    url: `${base_url2}banks/verify_bank_account/`,
    params: `
    <tr>
      <td>account_number</td>
      <td>String</td>
      <td>Required; Account Number to verify</td>
    </tr>
    <tr>
      <td>bank_code</td>
      <td>String</td>
      <td>Required; bank code of account number. get bank codes from get_banks api request</td>
    </tr>`,
    request: `
    const url = "${base_url2}banks/verify_bank_account/?account_number=2131968770&bank_code=033";
    
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
    // Success response returns the account details belonging to the requested account number
    {
      "status": "success",
      "message": "account verified",
      "data": {
          "account_number": "2131968770",
          "account_name": "RIDWAN ENIOLA HASSAN",
          "bank_id": 18
      }
    }`,
    error_response: `
    // error due to incorrect account number
    {
      "status": "error",
      "message": "Could not resolve account name. Check parameters or try again."
    }
    // error due to incorrect bank code
    {
      "status": "error",
      "message": "Unknown bank code: 033"
    }
    // server error
    {
      "status": "error",
      "message": "Error occured"
    }`
  },
  {
    title: "Add Bank Account",
    value: "get_site_info",
    method: "POST",
    type: "bank",
    url: `${base_url2}bank-accounts/add_bank_account/`,
    params: `
    <tr>
      <td>account_number</td>
      <td>String</td>
      <td>Required; Account Number to add</td>
    </tr>
    <tr>
      <td>bvn</td>
      <td>String</td>
      <td>Required; BVN of user</td>
    </tr>
    <tr>
      <td>first_name</td>
      <td>String</td>
      <td>Required; First Name attached to BVN</td>
    </tr>
    <tr>
      <td>last_name</td>
      <td>String</td>
      <td>Required; Last Name attached to BVN</td>
    </tr>
    <tr>
      <td>bank_code</td>
      <td>String</td>
      <td>Required; bank code of account number. get bank codes from get_banks api request</td>
    </tr>`,
    request: `
    const url = "${base_url2}bank-accounts/add_bank_account/";
    
    var formData = {
        'account_number':'1234567890',
        'bank_code': '033',
        "first_name": "John",
        "last_name": "Doe",
        "bvn": 22222222222
    }
    var headers = {
        'Authorization': "Token {user_token}",
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
    // Verification in progress
    {
      "status": "success",
      "message": "Bank account added. BVN verification is in progress"
    }`,
    error_response: `
    // error due to incorrect BVN
    {
      "status": "error",
      "message": "Invalid BVN"
    }
      
    // invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }
      // error due to multiple accounts
    {
      "status": "error",
      "message": "Multiple bank accounts cannot be added"
    }
      // error due to virtual account
    {
      "status": "error",
      "message": "Kindly generate your virtual account before adding a bank account"
    }`
  },
  {
    title: "Fetch User Bank Accounts",
    value: "get_site_info",
    method: "GET",
    type: "bank",
    url: `${base_url2}bank-accounts/get_bank_accounts/`,
    params: `
    <tr>
      
    </tr>`,
    request: `
    const url = "${base_url2}bank-accounts/get_bank_accounts/";
    
    var headers = {
        'Authorization': "Token {user_token}",
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
    // added banks accounts
    {
      "status":"success",
      "message":"Bank accounts fetched successfully.",
      "data":[
        {
          "id":3,
          "accountName":"JOHN EDWARD DOE",
          "accountNumber":"1234567890",
          "bank": {
            "bankName": "United Bank For Africa",
            "bankCode": "033",
            "logo": "/media/banks/uba_bank.png"
          }
        }
      ]
    }
    // No bank accounts found
    {
      "status": "success",
      "message": "No bank accounts added"
    }`,
    error_response: `
    // invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Add A Bank Card",
    value: "get_site_info",
    method: "POST",
    type: "bank",
    url: `${base_url2}bank-accounts/add_bank_card/`,
    params: `
    <tr>
    </tr>`,
    request: `
    const url = "${base_url2}bank-accounts/add_bank_card/";
    
    var headers = {
        'Authorization': "Token {user_token}",
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: ""
    })
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})
    `,
    axios_request: ``,
    success_response: `
    // Successful Initialization
    // To use the data from this initialization, check the next API on verifying the card transaction
    {
      "status": "success",
      "message": "You will be charged NGN100 to verify your bank card. This amount will be deposited in your wallet after verification.",
      "data": {
          "accessCode": "Opeioxfhpn",
          "paystack_public_key": "pk_live_****************",
          "email": "johndoe@gmail.com",
          "amount": "10000" // amount is returned in kobo (naira multiplied by 100; use it like that)
      }
    }`,
    error_response: `
    // error due to initialization
    {
      "status": "error",
      "message": "Transaction initialization failed."
    }
    // server error
    {
      "status": "error",
      "message": "Error occured"
    }
    // invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Making Payment For Card Verification",
    value: "get_site_info",
    method: "JS",
    type: "bank",
    url: ``,
    params: `
    <tr>
      <td>access_code</td>
      <td>String</td>
      <td>Required; Acess code gotten from pay_with_paystack response</td>
    </tr>
    <tr>
      <td>reference</td>
      <td>String</td>
      <td>Optional; reference can be used to verify payments.</td>
    </tr>`,
    request: `
    // If you prefer inline JS, just add the following script to your project;
    &lt;script src="https://js.paystack.co/v2/inline.js"&gt;&lt;/script&gt;

    // If you prefer npm or yarn, install paystack using the following:
    npm i @paystack/inline-js
    // OR
    yarn add @paystack/inline-js
    //then import using:
    import Paystack from '@paystack/inline-js';

    // create an object instance of Paystack
    const popup = new Paystack();
    // Triggers the paystack popup to continue the transaction
    popup.resumeTransaction({
      access_code: access_code,
      channels: ["card"],
      onCancel: () => {
        // handle when user cancels the transaction, maybe alert or something
      },
      onSuccess: (data) => {
        // handle success
        verifyPayment(access_code)
      },
      onClose: () => {
        // handle when user closes the popup
      }
    })

    // for vanilla JS
    var handler = PaystackPop.setup({
      key: "paystack_public_key",
      email: "johndoe@gmail.com",
      amount: Number(amount), // already multiplied by 100 since transaction is made in kobo
      reference: access_code,
      channels: ["card"],
      onSuccess: function(response) {
        console.log(response);
        verifyPayment(access_code); // function to make the verify payment request, will be discussed in next API request
      }
    });
    handler.openIframe();


    // Sample function to verify payment

    function verifyPayment(code) {
      var url = "${base_url2}bank-accounts/verify_card_charge/?reference={code}";
      var headers = {
          'Authorization': "Token {token}",
          'Accept': 'application/json'
      }
      fetch(url, {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
    }
    `,
    axios_request: ``,
    success_response: `
    When the transaction is successful, the customer's wallet will be updated on the server.
    you can also use the onSuccess callback to trigger an API that verifies the payment using the reference
    // For successful transaction verification
    {
      "status": "success",
      "transaction_status": "success",
      "message": "Bank card added successfully",
      "wallet_balance": "100.00"
    }`,
    error_response: `
    // error due to invalid reference
    {
      "status": "error",
      "message": "Invalid key"
    }
    // server error
    {
      "status": "error",
      "message": "Error occured"
    }
    // error due to invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Fetch User Linked Cards",
    value: "get_site_info",
    method: "GET",
    type: "bank",
    url: `${base_url2}bank-accounts/get_bank_cards/`,
    params: `
    <tr>
      
    </tr>`,
    request: `
    const url = "${base_url2}bank-accounts/get_bank_cards/";
    
    var headers = {
        'Authorization': "Token {user_token}",
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
    // added cards
    {
      "status":"success",
      "message":"Bank cards fetched successfully.",
      "data":[
        {
          "cardType":"visa",
          "cardNumber":"4084 **** **** 4081",
          "firstName":"John",
          "lastName":"Doe",
          "brand":"visa",
          "expiryDate":"12/2030",
          "bankName":"Paystack-Titan",
          "logo":"/media/banks/bank.jpeg"
        }
      ]
    }
    // No bank accounts found
    {
      "status": "success",
      "message": "No bank cards added"
    }`,
    error_response: `
    // invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Fetch User Beneficiary List",
    value: "get_site_info",
    method: "GET",
    type: "bank",
    url: `${base_url2}bank-accounts/get_beneficiaries/`,
    params: `
    <tr>
      
    </tr>`,
    request: `
    const url = "${base_url2}bank-accounts/get_beneficiaries/";
    
    var headers = {
        'Authorization': "Token {user_token}",
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
    // added beneficiaries
    {
      "status":"success",
      "message":"Beneficiary list fetched successfully.",
      "data": [
        {
          "id":2,
          "accountName":"TEST ACCOUNT NAME",
          "accountNumber":"1234567890",
          "bank": {
            "id":107,
            "bankName":"OPay Digital Services Limited (OPay)",
            "bankCode":"999992",
            "logo":"/media/banks/bank.jpeg"
          },
          "recipientCode":"RCP_0987654321"
        },
        {
          "id":1,
          "accountName":"BEN AKPU OHIO",
          "accountNumber":"3213245657",
          "bank":{
            "id":165,
            "bankName":"United Bank For Africa",
            "bankCode":"033",
            "logo":"/media/banks/United_Bank_for_Africa_Logo.svg"
          },
          "recipientCode":"RCP_123456789"
        }
      ]
    }
    // No beneficiaries found
    {
      "status": "success",
      "message": "No beneficiaries added"
    }`,
    error_response: `
    // invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Fetch Beneficiary Details",
    value: "get_site_info",
    method: "GET",
    type: "bank",
    url: `${base_url2}bank-accounts/get_beneficiary/`,
    params: `
    <tr>
      <td>recipient_code</td>
      <td>String</td>
      <td>Required; recipient_code for the beneficiary gotten from beneficiary List</td>
    </tr>`,
    request: `
    const url = "${base_url2}bank-accounts/get_beneficiary/?recipient_code=RCP_0987654321";
    
    var headers = {
        'Authorization': "Token {user_token}",
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
    {
      "status":"success",
      "message":"Beneficiary details fetched successfully.",
      "data": {
        "id":2,
        "accountName":"TEST ACCOUNT NAME",
        "accountNumber":"1234567890",
        "bank": {
          "id":107,
          "bankName":"OPay Digital Services Limited (OPay)",
          "bankCode":"999992",
          "logo":"/media/banks/bank.jpeg"
        },
        "recipientCode":"RCP_0987654321"
      }
    }`,
    error_response: `
    // invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  /* =========================== Wallet ========================= */
  {
    title: "Fund Wallet With Bank Transfer",
    value: "get_site_info",
    method: "GET",
    type: "wallet",
    url: `${base_url2}wallet/fund_with_transfer/`,
    params: `
    <tr>
      
    </tr>`,
    request: `
    const url = "${base_url2}wallet/fund_with_transfer/";
    
    var headers = {
        'Authorization': "Token {user_token}",
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
    // virtual account to transfer to
    {
      "status":"success",
      "message":"Kindly make transfer to the bank account provided. Your wallet will be automatically updated once the transfer is successful. Kindly note that this account belongs only to you and is mainly for the purpose of funcing your wallet.",
      "data":[
        {
          'id': 1,
          'accountName': 'RIGANTECH/DOE JOHN',
          'accountNumber': '9307694279',
          'bankName': 'Wema Bank'
        }
      ]
    }
    // No virtual accounts found
    {
      "status": "success",
      "message": "You have no virtual accounts available for transfer. kindly generate your virtual account to continue."
    }`,
    error_response: `
    // error due to invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Fund Wallet With Paystack",
    value: "get_site_info",
    method: "POST",
    type: "wallet",
    url: `${base_url2}wallet/fund_with_paystack/`,
    params: `
    <tr>
      <td>amount</td>
      <td>String</td>
      <td>Required; Amount to fund with; minimum of NGN100</td>
    </tr>`,
    request: `
    const url = "${base_url2}wallet/fund_with_paystack/";
    
    var formData = {
        'amount':'100'
    }
    var headers = {
        'Authorization': "Token {user_token}",
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
    // Successful Initialization
    // To use the data from this initialization, check the next API on making payment
    {
      "status": "success",
      "message": "Transaction initialized. use the access code to initiate paystack gateway.",
      "data": {
          "accessCode": "Opeioxfhpn",
          "paystack_public_key": "pk_live_****************",
          "email": "johndoe@gmail.com",
          "amount": "10000" // amount is returned in kobo (naira multiplied by 100; use t like that)
      }
    }`,
    error_response: `
    // error due to initialization
    {
      "status": "error",
      "message": "Transaction initialization failed."
    }
    // error due to low amount
    {
      "status": "error",
      "message": "Amount cannot be less than NGN100"
    }
    // error due to invalid amount parameter
    {
      "status": "error",
      "message": "Invalid amount parameter"
    }
    // server error
    {
      "status": "error",
      "message": "Error occured"
    }
    // invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Making Payment",
    value: "get_site_info",
    method: "JS",
    type: "wallet",
    url: ``,
    params: `
    <tr>
      <td>access_code</td>
      <td>String</td>
      <td>Required; Acess code gotten from pay_with_paystack response</td>
    </tr>
    <tr>
      <td>reference</td>
      <td>String</td>
      <td>Optional; reference can be used to verify payments.</td>
    </tr>`,
    request: `
    // If you prefer inline JS, just add the following script to your project;
    &lt;script src="https://js.paystack.co/v2/inline.js"&gt;&lt;/script&gt;

    // If you prefer npm or yarn, install paystack using the following:
    npm i @paystack/inline-js
    // OR
    yarn add @paystack/inline-js
    //then import using:
    import Paystack from '@paystack/inline-js';

    // create an object instance of Paystack
    const popup = new Paystack();
    // Triggers the paystack popup to continue the transaction
    popup.resumeTransaction(access_code, {
      onCancel: () => {
        // handle when user cancels the transaction, maybe alert or something
      },
      onSuccess: (data) => {
        // handle success
        verifyPayment(access_code)
      },
      onClose: () => {
        // handle when user closes the popup
      }
    })

    // for vanilla JS
    var handler = PaystackPop.setup({
      key: "paystack_public_key",
      email: "johndoe@gmail.com",
      amount: Number(amount), // already multiplied by 100 since transaction is made in kobo
      reference: access_code,
      onSuccess: function(response) {
        console.log(response);
        verifyPayment(access_code); // function to make the verify payment request, will be discussed in next API request
      }
    });
    handler.openIframe();


    // Sample function to verify payment

    function verifyPayment(code) {
      var url = "${base_url2}wallet/verify_payment/?reference={code}";
      var headers = {
          'Authorization': "Token {token}",
          'Accept': 'application/json'
      }
      fetch(url, {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
    }
    `,
    axios_request: ``,
    success_response: `
    When the transaction is successful, the customer's wallet will be updated on the server.
    you can also use the onSuccess callback to trigger an API that verifies the payment using the reference
    // For successful transaction verification
    {
      "status": "success",
      "transaction_status": "success",
      "wallet_balance": "100.00"
    }`,
    error_response: `
    // error due to invalid reference
    {
      "status": "error",
      "message": "Invalid key"
    }
    // server error
    {
      "status": "error",
      "message": "Error occured"
    }
    // error due to invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Get User Wallet Account",
    value: "get_site_info",
    method: "GET",
    type: "wallet",
    url: `${base_url2}wallet/get_wallet_account/`,
    params: `
    <tr></tr>`,
    request: `
    const url = "${base_url2}wallet/get_wallet_account/";

    var headers = {
        'Authorization': "Token {user_token}",
        'Accept': 'application/json',
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
    {
      "status": 'success',
      "data": {
        "walletBalance":"0.00",
        "topup": {
          "balance": ["0.00", "500.00", "1500.00"],
          "date": ["23/8/2024", "24/8/2024", "25/8/2024"]
        }
      }
    }`,
    error_response: `
      // error due to invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Get User Wallet Transactions",
    value: "get_site_info",
    method: "GET",
    type: "wallet",
    url: `${base_url2}wallet/get_wallet_transactions/`,
    params: `
    <tr>
      <td>status</td>
      <td>String</td>
      <td>Optional; filters transaction according to status; available status are:<br>success, failed, pending, reversed, all</td>
    </tr>
    <tr>
      <td>type</td>
      <td>String</td>
      <td>Optional; filters transaction according to type; available types are:<br>Deposit, Transfer, Withdrawal, all</td>
    </tr>`,
    request: `
    const url = "${base_url2}wallet/get_wallet_transactions/?status=success&type=Deposit";

    var headers = {
        'Authorization': "Token {user_token}",
        'Accept': 'application/json',
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
    // If transaction
    {
      "status":"success",
      "message":"wallet transactions retrieved",
      "data": [
        {
          "id":6,
          "transactionType":"Deposit",
          "amount":"4000.00",
          "transactionStatus":"Success",
          "transactionReference":"uvxrr8y4lp",
          "date":"2024-08-27T23:47:23.245654Z"
        },
        {
          "id":7,
          "transactionType":"Deposit",
          "amount":"35000.00",
          "transactionStatus":"Success",
          "transactionReference":"rswy5xd63i",
          "date":"2024-08-27T23:49:26.031404Z"
        },
        {
          "id":8,
          "transactionType":"Deposit",
          "amount":"14000.00",
          "transactionStatus":"Success",
          "transactionReference":"r4yvni7b49",
          "date":"2024-08-27T23:50:01.345167Z"
        }
      ]
    }
    // if no transaction
    {
      "status": 'success',
      "data": "No transaction found"
    }`,
    error_response: `
      // error due to invalid parameters
    {
      "status": "error",
      "message": "Invalid filter parameters"
    }
        // error due to invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Get Wallet Transaction Detail",
    value: "get_site_info",
    method: "GET",
    type: "wallet",
    url: `${base_url2}wallet/get_wallet_transaction/`,
    params: `
    <tr>
      <td>reference</td>
      <td>String</td>
      <td>Required; transaction reference for the transaction to be fetched</td>
    </tr>`,
    request: `
    const url = "${base_url2}wallet/get_wallet_transaction/?reference=trf_3jbc45eshf53dj64l3h5";

    var headers = {
        'Authorization': "Token {user_token}",
        'Accept': 'application/json',
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
    {
      "status":"success",
      "message":"wallet transaction retrieved",
      "data": {
        "id":21,
        "transactionType":"Transfer",
        "amount":"4700.00",
        "transactionStatus":"pending",
        "transactionReference":"trf_3jbc45eshf53dj64l3h5",
        "date":"2024-08-29T22:24:26.691418Z",
        "transactionDetails":{
          "destination_account_number":"2134565434",
          "destination_account_name":"JANE PHILIP DOE",
          "destination_bank_name":"United Bank For Africa",
          "destination_bank_code":"033",
          "description":"hello there",
          "amount":"4700",
          "total_amount":"4710",
          "transaction_fee":"10",
          "recipient_code":"RCP_1pms7rcakey8i53",
          "transfer_code":"TRF_rstf8uv4y6asr203"
        }
      }
    }`,
    error_response: `
      // error due to invalid reference
    {
      "status": "error",
      "message": "Transaction does not exist"
    }
        // error due to invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Initiating A Transfer",
    value: "get_site_info",
    method: "POST",
    type: "wallet",
    url: `${base_url2}wallet/initiate_transfer/`,
    params: `
    <tr>
      <td>amount</td>
      <td>String</td>
      <td>Required; Amount to transfer; minimum of &#8358;100 - &#8358;1,000,000</td>
    </tr>
    <tr>
      <td>description</td>
      <td>String</td>
      <td>Optional; Reason for transfer</td>
    </tr>
    <tr>
      <td>recipient_code</td>
      <td>String</td>
      <td>Required; Recipient code if you're selecting from beneficiary list</td>
    </tr>
    <tr>
      <td>account_number</td>
      <td>String</td>
      <td>Required; If you're using a new recipient account</td>
    </tr>
    <tr>
      <td>account_name</td>
      <td>String</td>
      <td>Required; gotten after verifying account details; If you're using a new recipient account</td>
    </tr>
    <tr>
      <td>bank_code</td>
      <td>String</td>
      <td>Required; recipient bank code; If you're using a new recipient account</td>
    </tr>`,
    request: `
    const url = "${base_url2}wallet/initiate_transfer/";
    // If using a beneficiary
    var formData = {
      'amount': "100",
      "recipient_code": "RCP_0987654321",
      "description": "Food stuff"
    }
    // if using a new recipient
    var formData = {
      'amount': "100",
      "account_number": "2131968770",
      'account_name': "RIDWAN ENIOLA HASSAN", // make sure you use the name from verification
      "bank_code": "033",
      "description": "Food Stuff"
    }
    var headers = {
        'Authorization': "Token {user_token}",
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
      "message": "Transfer initiated successfully.",
      "data": {
        "id":35,
        "transactionType":"Transfer",
        "amount":"100.00",
        "transactionStatus":"unpaid",
        "transactionReference":"trf_y1xnl25391iyd7psoww1",
        // this transactionReference will be used to finalize the transfer request
        "date":"2024-08-31T15:18:49.755427Z"
      },
      "details":{
        "destination_account_number":"2131968770",
        "destination_account_name":"RIDWAN ENIOLA HASSAN",
        "destination_bank_name":"United Bank For Africa",
        "destination_bank_code":"033",
        "description":"Food stuff",
        "amount":"100",
        "total_amount":"110",
        "transaction_fee":"10",
        "recipient_code":"RCP_aslgqtz38h5pzm2" //the new account is assigned a recipient code and is added to beneficiaries
      }
    }`,
    error_response: `
    // error due to insufficient balance
    {
      "status": "error",
      "message": "Insufficient wallet balance."
    }
    // error due to low transfer amount
    {
      "status": "error",
      "message": "Amount cannot be less than 100"
    }
    // error due to unverified BVN
    {
      "status": "error",
      "message": "You are not eligible for transfer because your BVN has not been verified"
    }
    // error due to bank account
    {
      "status": "error",
      "message": "Kindly add a bank account and verify your BVN to be eligible for transfer."
    }
    // error due to invalid parameters such as account details or recipient code
    {
      "status": "error",
      "message": "{Error_details}"
    }
    // server error
    {
      "status": "error",
      "message": "{Error_details}"
    }
    // invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Finalizing A Transfer",
    value: "get_site_info",
    method: "POST",
    type: "wallet",
    url: `${base_url2}wallet/make_transfer/`,
    params: `
    <tr>
      <td>reference</td>
      <td>String</td>
      <td>Required; transaction reference gotten from initiation</td>
    </tr>
    <tr>
      <td>payment_pin</td>
      <td>String</td>
      <td>Required; Payment PIN for user</td>
    </tr>`,
    request: `
    const url = "${base_url2}wallet/make_transfer/";

    var formData = {
      'reference': "trf_y1xnl25391iyd7psoww1",
      'payment_pin': "1234"
    }
    var headers = {
        'Authorization': "Token {user_token}",
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
    // when transfer is finalized, the user's account is debited and the transaction is set to pending.
    // If transfer is successful, the transaction history will be updated as successful.
    // If transfer failed or reversed, the transaction is updated as such and the transaction amount is refunded.
    // you can ask the user to refresh their screen to see updates or you can make an extra API call to fetch user balance or transaction history
    {
      "status": "success",
      "message": "Your transfer request is being processed",
    }`,
    error_response: `
    // transfer error
    {
      "status": "error",
      "message": "{Error_details}"
    }
    // incorrect PIN
    {
      "status": "error",
      "message": "Incorrect PIN"
    }
      // invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  /* =========================== Notifications ========================= */
  {
    title: "Get Notifications",
    value: "get_site_info",
    method: "GET",
    type: "note",
    url: `${base_url2}notifications/get_notifications/`,
    params: `
    <tr>
      <td>new</td>
      <td>String</td>
      <td>Optional; value can be "true" or "false" to fetch new or old notifications respectively.<br>omitting this parameter will fetch all notifications</td>
    </tr>`,
    request: `
    // fetches new notifications; such as when a transfer, wallet funding is just made.
    const url = "${base_url2}notifications/get_notifications/?new=true";
    
    var headers = {
        'Authorization': "Token {user_token}",
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
    // notification list
    {
      "status":"success",
      "message":"Notifications fetched successfully.",
      "data":[
        {
          "id":3,
          "title":"Wallet Top-Up",
          "details":{
            "type":"deposit",
            "message":"You have successfully topped up your wallet with NGN3000.00",
            "amount":"3000.00",
            "topup_method":"card"
          },
          "created":"2024-08-31T16:35:47Z"
        }
      ]
    }
    // No notifications found
    {
      "status":"success",
      "message":"No notifications."
    }`,
    error_response: `
    // invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
/* =========================== Personal Savings ========================= */
  {
    title: "Get Target Savings Plans",
    value: "get_site_info",
    method: "GET",
    type: "saving",
    url: `${base_url2}savings/get_target_plans/`,
    params: `
    <tr>
      
    </tr>`,
    request: `
    const url = "${base_url2}savings/get_target_plans/";
    
    var headers = {
        'Authorization': "Token {user_token}",
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
    // user regular savings
    {
      "status":"success",
      "message":"regular savings plan fetched successfully",
      "data":[
        {
          "id":1,
          "title":"My Plan",
          "reference": "tsp_2xyi3nlnlx",
          "saving_amount":1500,
          "frequency":"weekly",
          "duration":"8 months, 10 days",
          "start_date":"2024-09-07",
          "end_date":"2025-05-17",
          "target_amount":50000,
          "matured":false,
          "auto_save":false,
          "interest_enabled":true,
          "interest_rate":15,
          "next_savings":"2024-09-07",
          "balance":"0.00",
          "topup":{
            "balance":[0],
            "date":["2024-09-07"]
          },
          "created":"2024-09-07T09:44:29Z",
          "interest":{}
        },
        {
          "id":2,
          "title":"Business Plan",
          "reference": "tsp_xnip7l4xni",
          "saving_amount":4000,
          "frequency":"weekly",
          "duration":"12 months",
          "start_date":"2024-09-07",
          "end_date":"2025-09-07",
          "target_amount":200000,
          "matured":false,
          "auto_save":true,
          "interest_enabled":true,
          "interest_rate":16,
          "next_savings":"2024-09-07",
          "balance":"0.00",
          "topup":{
            "balance":[0],
            "date":["2024-09-07"]
          },
          "created":"2024-09-07T10:01:43.555010Z",
          "interest":{}
        }
      ]
    }
    
    // No regular savings found
    {
      "status": "success",
      "message": "No regular savings created"
    }`,
    error_response: `
    // invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Create A Target Savings Plan",
    value: "get_site_info",
    method: "POST",
    type: "saving",
    url: `${base_url2}savings/create_target_plan/`,
    params: `
    <tr>
      <td>title</td>
      <td>String</td>
      <td>Required; Title of the savings plan</td>
    </tr>
    <tr>
      <td>start_date</td>
      <td>String</td>
      <td>Required; Starting Date of Plan; must not be earlier than current date</td>
    </tr>
    <tr>
      <td>end_date</td>
      <td>String</td>
      <td>Required; End Date of Plan; must not be less than 30 days from starting date and not more than 366 days from start date</td>
    </tr>
    <tr>
      <td>target_amount</td>
      <td>String</td>
      <td>Required; Amount saving towards</td>
    </tr>
    <tr>
      <td>frequency</td>
      <td>String</td>
      <td>Required; How often to save, options are "daily", "weekly" or "monthly"</td>
    </tr>
    <tr>
      <td>saving_amount</td>
      <td>String</td>
      <td>Required; Proposed amount to save in each saving; used for automatic savings</td>
    </tr>
    <tr>
      <td>enable_interest</td>
      <td>String</td>
      <td>Required; Enable interest on saving plan, options are "true" or "false"</td>
    </tr>
    <tr>
      <td>enable_autosave</td>
      <td>String</td>
      <td>Required; Enable automatic saving on saving plan, options are "true" or "false"</td>
    </tr>`,
    request: `
    const url = "${base_url2}savings/create_target_plan/";

    var formData = {
      "title":"My Plan",
      "start_date":"2024-09-07",
      "end_date":"2025-05-17",
      "target_amount":"50000",
      "frequency":"weekly",
      "saving_amount":"1500",
      "enable_interest":"true",
      "enable_autosave":"false"
    }

    var headers = {
        'Authorization': "Token {user_token}",
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
      "status":"success",
      "message":"New target plan created successfully!",
      "data":{
        "id":1,
        "title":"My Plan",
        "reference": "tsp_2xyi3nlnlx",
        "saving_amount":1500,
        "frequency":"weekly",
        "duration":"8 months, 10 days",
        "start_date":"2024-09-07",
        "end_date":"2025-05-17",
        "target_amount":50000,
        "matured":false,
        "auto_save":false,
        "interest_enabled":true,
        "interest_rate":15,
        "next_savings":"2024-09-07",
        "balance":"0.00",
        "topup":{
          "balance":[0],
          "date":["2024-09-07"]
        },
        "interest": {},
        "created":"2024-09-07T09:44:29.615035Z"
      }
    }`,
    error_response: `
    // error due to low target amount
    {
      "status": "error",
      "message": "Target amount cannot be less than NGN1,000"
    }
    // error due to low saving amount
    {
      "status": "error",
      "message": "Saving amount cannot be less than NGN100"
    }
    // error due to early start date
    {
      "status": "error",
      "message": "Start date cannot be earlier than today"
    }
    // error due to saving duration
    {
      "status": "error",
      "message": "Saving duration must be between 30 days (1 month) and 366 days (1 year)"
    }
    // error due to invalid start or end date
    {
      "status": "error",
      "message": "Invalid start date or end date"
    }
    // error due to request parameters
    {
      "status": "error",
      "message": "Error occured: {Error_details}"
    }
    // invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Get A Target Saving Details",
    value: "get_site_info",
    method: "GET",
    type: "saving",
    url: `${base_url2}savings/get_target_plans/`,
    params: `
    <tr>
      <td>reference</td>
      <td>String</td>
      <td>Required; reference value for the saving plan to be fetched</td>
    </tr>`,
    request: `
    const url = "${base_url2}savings/get_target_plans/?reference=tsp_2xyi3nlnlx";
    
    var headers = {
        'Authorization': "Token {user_token}",
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
    {
      "status":"success",
      "message":"saving plan fetched",
      "data":{
          "id":1,
          "title":"My Plan",
          "reference": "tsp_2xyi3nlnlx",
          "saving_amount":1500,
          "frequency":"weekly",
          "duration":"8 months, 10 days",
          "start_date":"2024-09-07",
          "end_date":"2025-05-17",
          "target_amount":50000,
          "matured":false,
          "auto_save":false,
          "interest_enabled":true,
          "interest_rate":15,
          "next_savings":"2024-09-07",
          "balance":"0.00",
          "topup":{
            "balance":[0],
            "date":["2024-09-07"]
          },
          "created":"2024-09-07T09:44:29Z",
          "interest":{}
      }
    }`,
    error_response: `
    // invalid reference
    {
      "status": "error",
      "message": "Invalid token"
    }
      // invalid reference parameter
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Top Up Savings Plan",
    value: "get_site_info",
    method: "POST",
    type: "saving",
    url: `${base_url2}savings/topup_savings/`,
    params: `
    <tr>
      <td>plan_reference</td>
      <td>String</td>
      <td>Required; Reference value for the saving plan (this API works for target savings and emergency savings)</td>
    </tr>
    <tr>
      <td>amount</td>
      <td>String</td>
      <td>Required; Amount to top-up</td>
    </tr>`,
    request: `
    const url = "${base_url2}savings/topup_savings/";

    var formData = {
      "plan_reference":"tsp_2xyi3nlnlx",
      "amount":"100",
    }

    var headers = {
        'Authorization': "Token {user_token}",
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
      "status":"success",
      "message":"Transaction initiated",
      "data":{
        "id":13,
        "type":"Topup",
        "status":"pending",
        "amount":"100.00",
        "payment_method":"Wallet Balance",
        "date":"2024-09-12T06:54:19.589902Z",
        "reference":"5n4xm4hq0dkj7r7gfp5s"  // will be used to confirm topup transaction in next API call
      },
      "plan":"My Plan",
      "wallet_balance":"500.00"
    }`,
    error_response: `
    // error due to insufficient balance
    {
      "status": "error",
      "message": "Insufficient wallet balance. kindly topup your wallet and try again."
    }
      // error due to matured plan
    {
      "status": "error",
      "message": "This plan has already matured and cannot be topped up."
    }
    // error due to low amount
    {
      "status": "error",
      "message": "Amount cannot be less than NGN100"
    }
    // error due to invalid parameter
    {
      "status": "error",
      "message": "Invalid reference parameter"
    }
    // invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Confirm Savings Top Up",
    value: "get_site_info",
    method: "POST",
    type: "saving",
    url: `${base_url2}savings/confirm_topup/`,
    params: `
    <tr>
      <td>reference</td>
      <td>String</td>
      <td>Required; Topup reference from topup transaction initiation (see previous API call above)</td>
    </tr>`,
    request: `
    const url = "${base_url2}savings/confirm_topup/";

    var formData = {
      "reference":"5n4xm4hq0dkj7r7gfp5s"
    }

    var headers = {
        'Authorization': "Token {user_token}",
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
      "status":"success",
      "message":"Topup Saving successful"
    }`,
    error_response: `
    // error due to invalid parameter
    {
      "status": "error",
      "message": "Invalid reference parameter"
    }
    // invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }`
  },
  {
    title: "Get A Savings Plan Transactions",
    value: "get_site_info",
    method: "GET",
    type: "saving",
    url: `${base_url2}savings/get_plan_transactions/`,
    params: `
    <tr>
      <td>reference</td>
      <td>String</td>
      <td>Required; reference value for the saving plan to get its transactions</td>
    </tr>`,
    request: `
    const url = "${base_url2}savings/get_plan_transactions/?reference=tsp_2xyi3nlnlx";
    
    var headers = {
        'Authorization': "Token {user_token}",
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
    // user regular savings
    {
      "status":"success",
      "message":"plan transactions fetched successfully",
      "data":[
        {
          "id":12,
          "type":"Interest",
          "status":"success",
          "amount":"1.33",
          "payment_method":"",
          "date":"2024-09-12T06:41:57.206850Z",
          "reference":"i4jyewp8dpp2spe0rbaq"
        },
        {
          "id":14,
          "type":"Topup",
          "status":"success",
          "amount":"100.00",
          "payment_method":"Wallet Balance",
          "date":"2024-09-12T07:03:46.330212Z",
          "reference":"h23x8qkjejd1gaqldtev"
        },
        {
          "id":9,
          "type":"Topup",
          "status":"success",
          "amount":"100.00",
          "payment_method":"Wallet Balance",
          "date":"2024-09-11T10:44:35.206809Z",
          "reference":"r28r02veezh1axoybk83"
        },
        {
          "id":8,
          "type":"Topup",
          "status":"success",
          "amount":"100.00",
          "payment_method":"Wallet Balance",
          "date":"2024-09-11T10:39:26.464102Z",
          "reference":"63e3jq952meq14syph1f"
        }
      ]
    }
    
    // No regular savings found
    {
      "status": "success",
      "message": "No transaction found"
    }`,
    error_response: `
    // invalid token
    {
      "status": "error",
      "message": "Invalid token"
    }
      // invalid parameter
    {
      "status": "error",
      "message": "Error occured: {error_details}"
    }`
  },
]



function loadApi() {
  var x = admin
  $('#apuser').empty();
  $('#apajo').empty();
  $('#apaccount').empty();
  $('#apbank').empty();
  $('#apwallet').empty();
  $('#apnote').empty();
  $('#apsaving').empty();
  $('#appool').empty();

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
          case "ajo":
            $('#apajo').append(temp);
            break;
        case "user":
          $('#apuser').append(temp);
          break;
        case "bank":
          $('#apbank').append(temp);
          break;
        case "wallet":
          $('#apwallet').append(temp);
          break;
        case "note":
          $('#apnote').append(temp);
          break;
        case "saving":
          $('#apsaving').append(temp);
          break;
        case "pool":
          $('#appool').append(temp);
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
  checkPin2();
  
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

function checkPin2() {
  if(!sessionStorage.ajo_pin) {
    $('.pin-container2').show();
  }
  else {
    $('.pin-container2').hide();
  }
}
var check = setInterval(checkPin2, 500)

function verifyPin(pin) {
  $('.pin-submit-btn').attr('disabled', true).html(`<i class="fa fa-spinner"><i> Verifying...`)
  
  if(pin === "ajo1" || pin === "2536") {
    sessionStorage.setItem('ajo_pin', "true")
    $('.pin-con')[0].reset()
    $('.pin-container2').hide()
  } 
  else {
    swal('Oops!', "Incorrect PIN", 'warning')
    $('.pin-con')[0].reset()
  }
  $('.pin-submit-btn').attr('disabled', false).html(`Submit PIN`)
}