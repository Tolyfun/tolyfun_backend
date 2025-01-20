
var base_url2 = `https://hoistflick.pythonanywhere.com/api/v1/`
var base_image_url = `https://hoistflick.pythonanywhere.com/`
var admin = [
  {
    title: "Get Hoistflick Info",
    value: "get_site_info",
    method: "GET",
    type: "platform",
    url: `${base_url2}platform/`,
    params: `
    <tr>
      
    </tr>`,
    request: `
    const url = "${base_url2}platform/";
    
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
        "title": "Hoistflick",
        "subtitle": "",
        "primary_email": "",
        "secondary_email": "",
        "primary_phone": "",
        "secondary_phone": "",
        "privacy_policy": "", // html content
        "terms_and_conditions": "", // html content
        "about": "",
        "logo": "${base_image_url}media/lms/logo.jpg",
        "icon": "${base_image_url}media/lms/icon.jpg",
        "privacy_pdf": "${base_image_url}media/lms/lms_privacy_policy.pdf",
        "terms_pdf": "${base_image_url}media/lms/lms_terms_and_conditions.pdf"
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
      <td>password</td>
      <td>String</td>
      <td>Required; must be at least 8 characters long consisting alphanumeric characters. can contain special characters</td>
    </tr>`,
    request: `
    var url = "${base_url2}accounts/create_account/"
    var formData = {
        'email': 'johndoe@gmail.com',
        'first_name': 'John',
        'last_name': 'Doe',
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
      <td>Required; email of user</td>
    </tr>
    <tr>
      <td>password</td>
      <td>String</td>
      <td>Required</td>
    </tr>`,
    request: `
    var url = "${base_url2}auth/login/"
    var formData = {
        'email':'johndoe@gmail.com',
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
      "token": "841ee7393891a48d2a05056ebec3307bb3465050", // token to save in storage for future requests
      "user": {
        "email": "johndoe@gmail.com",
        "name": "John Doe"
      }
    }
    // if 2-FA is enabled
    {
      'message': f"Confirmation code has been sent to johnd*****@gmail.com. It expires in 10 minutes.",
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
    title: "Get User Profile",
    value: "get_site_info",
    method: "GET",
    type: "account",
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
        "profileId": "GW3JNCZT",
        "email": "johndoe@gmail.com",
        "_2fa_enabled": false
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
    title: "Activate/Deactivate 2-FA",
    value: "get_site_info",
    method: "POST",
    type: "account",
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
    type: "account",
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
  /* =========================== Courses ========================= */
  {
    title: "Get Course Tracks",
    value: "get_site_info",
    method: "GET",
    type: "course",
    url: `${base_url2}courses/get_tracks/`,
    params: `
    <tr>
      
    </tr>`,
    request: `
    const url = "${base_url2}courses/get_tracks/";
    
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
    {
      "status": "success",
      "message": "track list fetched",
      "data": [
          {
              "id": 1,
              "title": "Design",
              "category_list": [
                  "UI/UX Design"
              ]
          },
          {
              "id": 2,
              "title": "Development",
              "category_list": [
                  "Wordpress Development",
                  "Frontend Development"
              ]
          }
      ]
    }
    
    // If no track is found
    {
      "status": "success",
      "message": "No tracks found"
    }`,
    error_response: `
    // server error
    {
      "status": "error",
      "message": "Error occured while getting track list"
    }`
  },
  {
    title: "Get Course Categories",
    value: "get_site_info",
    method: "GET",
    type: "course",
    url: `${base_url2}courses/get_categories/`,
    params: `
    <tr>
      
    </tr>`,
    request: `
    const url = "${base_url2}courses/get_categories/";
    
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
    {
      "status": "success",
      "message": "category list fetched",
      "data": [
        {
            "id": 3,
            "title": "Frontend Development",
            "track": {
                "title": "Development"
            },
            "description": "Lorem ipsum dolor sit amet.",
            "courses_number": 0,
            "image": null
        },
        {
            "id": 1,
            "title": "UI/UX Design",
            "track": {
                "title": "Design"
            },
            "description": "A good design principle",
            "courses_number": 0,
            "image": null
        },
        {
            "id": 2,
            "title": "Wordpress Development",
            "track": {
                "title": "Development"
            },
            "description": "Lorem ipsum dolor sit amet.",
            "courses_number": 0,
            "image": null
        }
      ]
    }
    
    // If no category is found
    {
      "status": "success",
      "message": "No categories found"
    }`,
    error_response: `
    // server error
    {
      "status": "error",
      "message": "Error occured while getting category list"
    }`
  },
  {
    title: "Get Courses",
    value: "get_site_info",
    method: "GET",
    type: "course",
    url: `${base_url2}courses/get_courses/`,
    params: `
    <tr>
      <td>page</td>
      <td>integer</td>
      <td>Optional; The page number to be requested (if not provided, default is 1)</td>
    </tr>
    <tr>
      <td>pagesize</td>
      <td>integer</td>
      <td>Optional; The number of items to be returned on a single page (if not provided, default is 20)</td>
    </tr>
    <tr>
      <td>search</td>
      <td>string</td>
      <td>Optional; A search query. search queries are matched with title and description</td>
    </tr>
    <tr>
      <td>category_id</td>
      <td>Integer</td>
      <td>Optional; If filtering course by category, provide the id of the filtered category</td>
    </tr>
    <tr>
      <td>sort_by</td>
      <td>string</td>
      <td>Optional; sorting arrangement; available sortings are:
      <ul>
        <li>"title" - sorting by title alphabetically in ascending order</li>
        <li>"-title" - sorting by title alphabetically in descending order</li>
        <li>"price" - sorting by price, from lowest to highest</li>
        <li>"-price" - sorting by price, from highest to lowest</li>
      </ul>
      </td>
    </tr>
    <tr>
      <td>mode</td>
      <td>string</td>
      <td>Optional; if filtering by mode; available values are; all, free, paid (default is "all")</td>
    </tr>
    <tr>
      <td>level</td>
      <td>string</td>
      <td>Optional; If filtering by level; available values are: all, beginner, intermediate, expert (default is "all")</td>
    </tr>
    <tr>
      <td>type</td>
      <td>string</td>
      <td>Optional; If filtering by type; available values are: all, professional, featured (default is "all")</td>
    </tr>`,
    request: `
    const url = "${base_url2}courses/get_courses/?pagesize=10&sort_by=price&mode=free";
    
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
    {
      "status": "success",
      "data": [
        {
            "id": 1,
            "title": "Frontend Development with React",
            "tutor": {
                "id": 1,
                "firstName": "Rigan",
                "lastName": "Tech",
                "email": "rigantech@gmail.com"
            },
            "description": "<p>Lorem ipsum dolor sit amet</p>",
            "type": "professional",
            "mode": "paid",
            "level": "beginner",
            "category": {
                "id": 3,
                "title": "Web Development",
                "track": {
                    "title": "Development"
                },
                "description": "Lorem ipsum dolor sit amet.",
                "courses_number": 0,
                "image": null
            },
            "image": null,
            "old_price": "50.00",
            "price": "40.00",
            "metadata": {
                "number_of_students": 0,
                "views": 0,
                "rating": 0,
                "prices": {
                    "NGN": 60000,
                    "USD": 40
                },
                "language": "English"
            }
        }
      ],
      "message": "course list retrieved",
      "page_number": 1,
      "items_per_page": 10,
      "total_pages": 1,
      "total_items": 1,
      "search_query": "",
      "sort_by": "price",
      "filters": {
          "mode": "",
          "level": "",
          "type": "",
          "category": null
      }
    }
    
    // If no course is found
    {
      "status": "success",
      "message": "No courses found",
      "page_number": 1,
      "items_per_page": 10,
      "total_pages": 0,
      "total_items": 0,
      "search_query": "",
      "sort_by": "price",
      "filters": {
          "mode": "free",
          "level": "",
          "type": "",
          "category": null
      }
    }`,
    error_response: `
    // error due to invalid parameters
    {
      "status": "error",
      "message": "Invalid course mode: not_free"
    }
      // error due to invalid category ID (if provided)
    {
      "status": "error",
      "message": "Invalid category ID"
    }
      // server error
    {
      "status": "error",
      "message": "Error getting course list"
    }`
  },
  {
    title: "Get Course Info",
    value: "get_site_info",
    method: "GET",
    type: "course",
    url: `${base_url2}courses/get_course/`,
    params: `
    <tr>
      <td>course_id</td>
      <td>Integer</td>
      <td>Required; Id of course to be queried</td>
    </tr>`,
    request: `
    const url = "${base_url2}courses/get_course/?course_id=1";
    
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
    {
      "status": "success",
      "message": "data fetched successfully",
      "data": {
          "id": 1,
          "title": "Frontend Development with React",
          "tutor": {
              "id": 1,
              "firstName": "Rigan",
              "lastName": "Tech",
              "email": "rigantech@gmail.com"
          },
          "description": "<p>Lorem ipsum dolor sit amet</p>",
          "type": "professional",
          "mode": "paid",
          "level": "beginner",
          "category": {
              "id": 3,
              "title": "Web Development",
              "track": {
                  "title": "Development"
              },
              "description": "Lorem ipsum dolor sit amet.",
              "courses_number": 0,
              "image": null
          },
          "image": null,
          "old_price": "50.00",
          "price": "40.00",
          "metadata": {
              "number_of_students": 0,
              "views": 0,
              "rating": 0,
              "prices": {
                  "NGN": 60000,
                  "USD": 40
              },
              "language": "English"
          }
      },
      "modules": [
        {
            "id": 1,
            "title": "Introduction to Javascript",
            "order": 1,
            "description": "Introduction to JS, JS Syntax, Variables"
        },
        {
            "id": 2,
            "title": "JS Functions",
            "order": 2,
            "description": "Concepts of functions, parameters, arguments, return values"
        }
      ]
    }`,
    error_response: `
    // error due to invalid parameters
    {
      "status": "error",
      "message": "Course not found"
    }
      // error due to non-provided course ID
    {
      "status": "error",
      "message": "Invalid course ID parameter"
    }
      // server error
    {
      "status": "error",
      "message": "Error occured: {error_details}"
    }`
  },
  {
    title: "Enroll For Course (Free Course)",
    value: "get_site_info",
    method: "POST",
    type: "course",
    url: `${base_url2}lms/enroll_course/`,
    params: `
    <tr>
      <td>course_id</td>
      <td>Integer</td>
      <td>Required; Id of course to be enrolled for.</td>
    </tr>
    `,
    request: `
    const url = "${base_url2}lms/enroll_course/";
    
    var formData = {
        'course_id': 1
    }
    var headers = {
        'Authorization': "Token {user_token}", // requires login
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
    // new enrollment
    {
      "status": "success",
      "message": "You have successfully enrolled for 'Frontend Development with React'"
    }
    // existing enrollment
    {
      "status": "success",
      "message": "You are already enrolled for 'Frontend Development with React'"
    }`,
    error_response: `
    // paid course error
    {
      "status": "error",
      "message": "'Frontend Development with React' is a paid course. kindly add to cart and make payment to enroll for this course."
    }
      // error due to invalid parameters
    {
      "status": "error",
      "message": "Course not found"
    }
      // error due to non-provided course ID
    {
      "status": "error",
      "message": "Invalid course ID parameter"
    }
      // server error
    {
      "status": "error",
      "message": "Error occured: {error_details}"
    }`
  },
  {
    title: "Add Course to Cart (Paid)",
    value: "get_site_info",
    method: "POST",
    type: "course",
    url: `${base_url2}lms/add_cart/`,
    params: `
    <tr>
      <td>course_id</td>
      <td>Integer</td>
      <td>Required; Id of course to add to cart.</td>
    </tr>
    `,
    request: `
    const url = "${base_url2}lms/add_cart/";
    
    var formData = {
        'course_id': 1
    }
    var headers = {
        'Authorization': "Token {user_token}", // requires login
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
    // new cart - when cart is added
    {
      "status": "success",
      "message": "'Frontend Development with React' successfully added to cart!"
    }
      // existing cart
    {
      "status": "success",
      "message": "'Frontend Development with React' has already been added to cart!"
    }
    // existing enrollment
    {
      "status": "success",
      "message": "You are already enrolled for 'Frontend Development with React'"
    }`,
    error_response: `
    // free course error
    {
      "status": "error",
      "message": "'Frontend Development with React' cannot be added to cart as it is a free course. Kindly enroll for the course instead."
    }
      // error due to invalid parameters
    {
      "status": "error",
      "message": "Course not found"
    }
      // error due to non-provided course ID
    {
      "status": "error",
      "message": "Invalid course ID parameter"
    }
      // server error
    {
      "status": "error",
      "message": "Error occured: {error_details}"
    }`
  },
  {
    title: "Remove Course from Cart",
    value: "get_site_info",
    method: "POST",
    type: "course",
    url: `${base_url2}lms/remove_cart/`,
    params: `
    <tr>
      <td>cart_id</td>
      <td>Integer</td>
      <td>Required; Id of cart to be removed.</td>
    </tr>
    `,
    request: `
    const url = "${base_url2}lms/remove_cart/";
    
    var formData = {
        'cart_id': 4
    }
    var headers = {
        'Authorization': "Token {user_token}", // requires login
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
      "message": "'Frontend Development with React' removed from cart!"
    }`,
    error_response: `
      // error due to invalid parameters
    {
      "status": "error",
      "message": "Cart not found"
    }
      // error due to non-provided cart ID
    {
      "status": "error",
      "message": "Invalid cart ID parameter"
    }
      // server error
    {
      "status": "error",
      "message": "Error occured: {error_details}"
    }`
  },
  {
    title: "Checkout",
    value: "get_site_info",
    method: "POST",
    type: "course",
    url: `${base_url2}lms/checkout/`,
    params: `
    <tr>
      <td>coupon_code</td>
      <td>String</td>
      <td>Optional; code for coupon to use, if available.</td>
    </tr>`,
    request: `
    const url = "${base_url2}lms/checkout/";
    
    var formData = {
        'coupon_code':'AW9XTY45U'
    }
    var headers = {
        'Authorization': "Token {user_token}", // requires login
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
      "message": "Transaction initialized. use the data objects to initiate paystack gateway.",
      "data": {
          "access_code": "Opeioxfhpn",
          "reference": "ref-85764987345092367846"
          "paystack_public_key": "pk_live_****************",
          "email": "johndoe@gmail.com",
          "amount": "10000" // amount is returned in kobo (naira multiplied by 100; use it like that)
      }
    }`,
    error_response: `
    // error due to initialization
    {
      "status": "error",
      "message": "Transaction initialization failed. {error_details}"
    }
    // error due to empty cart
    {
      "status": "error",
      "message": "You do not have any items in your cart"
    }
      // error due to invalid coupon code
    {
      "status": "error",
      "message": "Invalid coupon code"
    }
      // error due to expired coupon code
    {
      "status": "error",
      "message": "coupon already expired"
    }
      // error due to used coupon code
    {
      "status": "error",
      "message": "coupon has already been used"
    }
    // server error
    {
      "status": "error",
      "message": "Error occured"
    }`
  },
  {
    title: "Making Payment",
    value: "get_site_info",
    method: "JS",
    type: "course",
    url: ``,
    params: `
    <tr>
      <td>access_code</td>
      <td>String</td>
      <td>Required; Acess code gotten from checkout response</td>
    </tr>
    <tr>
      <td>reference</td>
      <td>String</td>
      <td>Optional; reference gotten from checkout response, can be used to verify payments.</td>
    </tr>`,
    request: `
    // If you prefer inline JS, just add the following script to your project;
    &lt;script src="https://js.paystack.co/v2/inline.js"&gt;&lt;/script&gt;

    // If you prefer npm or yarn, install paystack SDK using the following:
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
        verifyPayment(reference) // see the function below
      },
      onClose: () => {
        // handle when user closes the popup
      }
    })

    // for vanilla JS
    var handler = PaystackPop.setup({
      key: paystack_public_key,
      email: email,
      amount: Number(amount),
      reference: reference,
      callback: function(response) {
        console.log(response);
        verifyPayment(reference); // function to make the verify payment request, will be discussed below
    });
    handler.openIframe();


    // Sample function to verify payment

    function verifyPayment(reference) {
      var url = "${base_url2}lms/verify_payment/?reference={reference}";
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
]



function loadApi() {
  var x = admin
  $('#aplms').empty();
  $('#apaccount').empty();
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
        case "platform":
          $('#aplms').append(temp);
          break;
        case "account":
          $('#apaccount').append(temp);
          break;
        case "user":
          $('#apuser').append(temp);
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