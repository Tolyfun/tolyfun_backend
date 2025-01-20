
var base_url2 = `https://thecourt.pythonanywhere.com/api/v2/`
var admin = [
    // For Account
    {
      title: "Create An Account",
      value: "get_site_info",
      method: "POST",
      type: "account",
      url: `${base_url2}student/create_account/`,
      request: `
      const url = "${base_url2}student/create_account/"
      
      const formData = new FormData();
      formData.append('username', 'JohnDoe')
      formData.append('password', '********') // must be at least 8 characters and alphanumeric
      formData.append('first_name', 'John')
      formData.append('last_name', 'Doe')
      formData.append('email', 'johndoe@example.com')
      formData.append('phone_number', '07011223344')
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      {
        "status": "success",
        "message": "Account created successfully"
      }`,
      error_response: `
      // errors due to invalid parameters
      {
        "status": "error",
        "message": "Invalid username"
      }
      {
        "status": "error",
        "message": "Invalid password"
      }
      {
        "status": "error",
        "message": "Invalid email"
      }
      // errors due to existing username/email
      {
        "status": "error",
        "message": "Username already exists"
      }
      {
        "status": "error",
        "message": "Email johndoe@example.com has already been used. Kindly use another email."
      }
      // server error
      {
        "status": "error",
        "message": "Error occured while creating an account."
      }
      {
        "status": "error",
        "message": "Account created, Error generating profile."
      }`
    },
    {
      title: "Authentication/Login",
      value: "get_site_info",
      method: "POST",
      type: "account",
      url: `${base_url2}student/authentication/`,
      request: `
      const url = "${base_url2}student/authentication/"
      
      const formData = new FormData();
      formData.append('username', 'JohnDoe')
      formData.append('password', '********') 
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      {
        "status": "success",
        "message": "login successful",
        "data": {
          "id": 1,
          "user": {
              "id": 2,
              "username": "JohnDoe"
          },
          "first_name": "John",
          "last_name": "Doe",
          "email": "johndoe@gmail.com",
          "phone_number": "07011223344",
          "institution": "",
          "department": "",
          "level": "",
          "api_token": "j8p7r**********************************",
          "image": null
        }
      }`,
      error_response: `
      // errors due to invalid credentials
      {
        "status": "error",
        "message": "Invalid login credentials"
      }
      // errors due to disabled account
      {
        "status": "error",
        "message": "Your account has been disabled"
      }`
    },
    {
      title: "Logout",
      value: "get_site_info",
      method: "POST",
      type: "account",
      url: `${base_url2}student/admin_logout/`,
      request: `
      const url = "${base_url2}student/admin_logout/"
      
      const formData = new FormData();
      formData.append('api_token', 'user-api-key') 
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      {
        "status": "success",
        "message": "logout successful"
      }`,
      error_response: `
      // errors due to invalid API key
      {
        "status": "error",
        "message": "Invalid API token"
      }`
    },
    {
      title: "Forgot Password",
      value: "get_site_info",
      method: "POST",
      type: "account",
      url: `${base_url2}student/forgot_password/`,
      request: `
      const url = "${base_url2}student/forgot_password/"
      
      const formData = new FormData();
      formData.append('email', 'johndoe@example.com')
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      {
        "status": "success",
        "message": "Password reset instructions has been sent to johndoe@example.com"
      }`,
      error_response: `
      // errors due to invalid parameters
      {
        "status": "error",
        "message": "Invalid email"
      }
      // errors due to non-existing email
      {
        "status": "error",
        "message": "Unregistered email."
      }`
    },
    {
      title: "Change Password",
      value: "get_site_info",
      method: "POST",
      type: "account",
      url: `${base_url2}student/change_password/`,
      request: `
      const url = "${base_url2}student/change_password/"
      
      const formData = new FormData();
      formData.append('old_password', '********')
      formData.append('new_password', '********')
      formData.append('api_token', 'user-api-key')
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      {
        "status": "success",
        "message": "password changed successfully"
      }`,
      error_response: `
      // errors due to invalid old password
      {
        "status": "error",
        "message": "Incorrect password"
      }
      // errors due to Invalid new password
      {
        "status": "error",
        "message": "Invalid new password combination."
      }
      // errors due to Invalid API key
      {
        "status": "error",
        "message": "User not found"
      }
      // server error
      {
        "status": "error",
        "message": "error while changing password"
      }`
    },
    {
      title: "Get User Profile",
      value: "get_site_info",
      method: "GET",
      type: "account",
      url: `${base_url2}student/get_profile/?api_token={user-api-key}`,
      request: `
      const url = "${base_url2}student/get_profile/?api_token={user-api-key}"
      
      fetch(url)
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      {
        "status": "success",
        "message": "data fetched successfully",
        "data": {
          "id": 1,
          "user": {
              "id": 2,
              "username": "JohnDoe"
          },
          "first_name": "John",
          "last_name": "Doe",
          "email": "johndoe@gmail.com",
          "phone_number": "07011223344",
          "institution": "",
          "department": "",
          "level": "",
          "api_token": "j8p7r**********************************",
          "image": null
        }
      }`,
      error_response: `
      // errors due to invalid API key
      {
        "status": "error",
        "message": "Invalid API token"
      }
      // non-existing account
      {
        "status": "error",
        "message": "User not found"
      }`
    },
    {
      title: "Edit Profile",
      value: "get_site_info",
      method: "POST",
      type: "account",
      url: `${base_url2}student/edit_profile/`,
      request: `
      const url = "${base_url2}student/edit_profile/"
      
      const formData = new FormData();
      formData.append('api_token', 'user-api-key')
      formData.append('first_name', 'James')
      formData.append('last_name', 'Mark')
      formData.append('email', 'example@gmail.com')
      formData.append('phone_number', '08011223344')

      // other fields are: 'institution', 'department', 'level', 'image' (image file from input field);
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      {
        "status": "success",
        "message": "profile edited successfully",
        "data": {
          "id": 1,
          "user": {
              "id": 2,
              "username": "JohnDoe"
          },
          "first_name": "James",
          "last_name": "Mark",
          "email": "example@gmail.com",
          "phone_number": "08011223344",
          "institution": "University of Ilorin",
          "department": "Accounting",
          "level": "200L",
          "api_token": "j8p7r**********************************",
          "image": "/media/images/students/image.png"
        }
      }`,
      error_response: `
      // errors due to invalid parameters
      {
        "status": "error",
        "message": "Invalid API token"
      }
      // errors due to non-existing account
      {
        "status": "error",
        "message": "User not found"
      }`
    },
    // For site info
    {
      title: "Get Site Information",
      value: "get_site_info",
      method: "GET",
      type: "court",
      url: `${base_url2}site/get_site_info/`,
      request: `
      const url = "${base_url2}site/get_site_info/"
      
      fetch(url)
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      {
        "status": "success",
        "message": "data fetched successfully",
        "data": {
            "id": 1,
            "title": "The  Court",
            "tagline": "",
            "email": "",
            "phone_number": "",
            "address": "",
            "phone_number_2": "",
            "description": "",
            "logo": null,
            "icon": null,
            "facebook": "",
            "whatsapp": "",
            "twitter": "",
            "linkedin": "",
            "instagram": ""
        }
      }`,
      error_response: `
      // errors due to server
      {
        "status": "error",
        "message": "Error occured on the server"
      }`
    },
    {
      title: "Get Featured Images",
      value: "get_site_info",
      method: "GET",
      type: "gallery",
      url: `${base_url2}site/get_featured_images/?item={number of images to return; default=10}`,
      request: `
      const url = "${base_url2}site/get_featured_images/?items=5";
      // all parameters are optional and omission does not affect request
      // to fetch all images, set "items=all"
      
      fetch(url)
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      // when a list is found
      {
        "status": "success",
        "message": "data fetched successfully",
        "data": [
            {
                "id": 2,
                "image": "/media/gallery/cpp.png",
                "description": "corridor"
            },
            {
                "id": 1,
                "image": "/media/gallery/c.png",
                "description": "sitting room"
            }
        ]
      }
      
      // when requested list is empty
      {
        "status": "success",
        "message": "no featured images found"
      }`,
      error_response: `
      // errors due to server
      {
        "status": "error",
        "message": "error while getting featured images"
      }`
    },
    // For Rooms
    {
      title: "Get Rooms List",
      value: "get_site_info",
      method: "GET",
      type: "room",
      url: `${base_url2}rooms/get_rooms/?per_page={items to return in one request}&page={page to return}&search={search query}&sort_by={method of sorting}&available={true or false}`,
      request: `
      const url = "${base_url2}rooms/get_rooms/?per_page=10&page=1&search=&sort_by=title&available=true";
      // all parameters are optional and omission does not affect request
      // request above requests page 1 (default=1) for a list of rooms which returns 10 items per page (default=20) after sorting by title in ascending order (default="title"; "-title" for descending order)
      // another method of sorting is price ("price" for ascending; "-price" for descending)
      // omitting "available" parameter returns both available and occupied rooms
      // "search" parameter is matched against title and features
      
      fetch(url)
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      // when a list is found
      {
        "status": "success",
        "message": "data fetched successfully",
        "data": [
            {
                "id": 1,
                "title": "Room 1",
                "thumbnail": "/media/room/thumbnails/cofee.png",
                "available": true,
                "price": 150000,
                "images": [
                    {
                        "id": 2,
                        "image": "/media/gallery/cpp.png",
                        "description": "corridor"
                    },
                    {
                        "id": 1,
                        "image": "/media/gallery/c.png",
                        "description": "sitting room"
                    }
                ],
                "features": ""
            }
        ],
        "page_number": 1,
        "list_per_page": 10,
        "total_pages": 1,
        "total_items": 1,
        "search_query": ""
      }
      
      // when requested list is empty
      {
        "status": "success",
        "message": "no room found",
        "page_number": 1,
        "list_per_page": 10,
        "total_pages": 1,
        "total_items": 0,
        "search_query": ""
      }`,
      error_response: `
      // errors due to server
      {
        "status": "error",
        "message": "error while getting room list"
      }`
    },
    {
      title: "Get Room Details",
      value: "get_site_info",
      method: "GET",
      type: "room",
      url: `${base_url2}rooms/get_room/?room_id={id-of-room}`,
      request: `
      const url = "${base_url2}rooms/get_room/?room_id=1"
      
      fetch(url)
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      {
        "status": "success",
        "message": "data fetched successfully",
        "data": {
            "id": 1,
            "title": "Room 1",
            "thumbnail": "/media/room/thumbnails/cofee.png",
            "available": true,
            "price": 150000,
            "images": [
                {
                    "id": 2,
                    "image": "/media/gallery/cpp.png",
                    "description": "corridor"
                },
                {
                    "id": 1,
                    "image": "/media/gallery/c.png",
                    "description": "sitting room"
                }
            ],
            "features": ""
        }
      }`,
      error_response: `
      // errors due to invalid parameters
      {
        "status": "error",
        "message": "Invalid room ID"
      }
      // server error
      {
        "status": "error",
        "message": "Error getting room details"
      }`
    },
    {
      title: "Book A Room",
      value: "get_site_info",
      method: "POST",
      type: "room",
      url: `${base_url2}rooms/book_room/`,
      request: `
      const url = "${base_url2}rooms/book_room/"
      
      const formData = new FormData();
      formData.append('api_token', 'user-api-key');
      formData.append('room_id', 1); // ID of room
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      {
        "status": "success",
        "message": "room booked! kindly proceed to payment",
        "paystack_public_key": "pk_live_*****************************", // to be used for the payment gateway
        "data":  {
          "id": 1,
          "transaction_id": "THECOURT_12345678909876543", // also will be used in the payment gateway
          "description": "Payment for Rent",
          "duration": 12,
          "amount": 150000,
          "status": "Pending",
          "date": "2024-05-21T14:41:38Z",
          "expiration_date": "2025-05-21T14:42:49Z",
          "receipt": null,
          "student": {
              "id": 1,
              "first_name": "Enny",
              "last_name": "WhizzyDoc",
              "email": "hassanridwan2536@gmail.com",
              "phone_number": "",
              "image": null
          },
          "room": {
              "id": 1,
              "title": "Room 1",
              "thumbnail": "http://127.0.0.1:8000/media/room/thumbnails/cofee.png",
              "available": true,
              "price": 150000,
              "features": "<p>g</p>"
          }
        }
      }`,
      error_response: `
      // errors due to unavailable room
      {
        "status": "error",
        "message": "Room 1 is not available for booking"
      }
      // errors due to invalid api key
      {
        "status": "error",
        "message": "Invalid room ID/API key"
      }
      // errors due to server
      {
        "status": "error",
        "message": "Error while booking room"
      }`
    },
    {
      title: "Making Payments",
      value: "get_site_info",
      method: "SDK",
      type: "room",
      url: ``,
      request: `
      // for paystack gateway, first make sure you have the following SDK script in your project;
      // &lt;script src="https://js.paystack.co/v1/inline.js"&gt;&lt;/script&gt;
      // for best practices, also include the script url for popper.js
      // after booking a room and it returns a pending transaction created for that purpose,
      // use the info from the data returned such as paystack_public_key, transaction_id, email and amount in the payment gateway;
      // you can use a button onclick event to trigger the function to make payment;
      // in this case, i'll call the function payWithPaystack()

      function payWithPaystack() {
        let currency = "NGN";
        let plan = "";
        let ref = "reference_id";
        let amount = "amount";

        let obj = {
          key: "paystack_public_key",
          email: "email of student",
          amount: Number(amount)*100, // multiply by 100 since transaction is made in kobo
          ref: ref,
          callback: function(response) {
            console.log(response);
            verifyPayment(ref); // function to make the verify payment request, will be discussed in next API request
          }
        };
        if(Boolean(currency)) {
          obj.currency = currency.toUpperCase();
        }
        if(Boolean(plan)) {
          obj.plan = plan;
        }

        var handler = PaystackPop.setup(obj);
        handler.openIframe();
      }
      `,
      success_response: `
      `,
      error_response: `
      `
    },
    {
      title: "Making and Verifying Payments",
      value: "get_site_info",
      method: "POST",
      type: "room",
      url: `${base_url2}rooms/verify_payment/`,
      request: `
      function verifyPayment(ref) {
        const url = "${base_url2}rooms/verify_payment/"
      
        const formData = new FormData();
        formData.append('api_token', 'user-api-key');
        formData.append('transaction_id', ref);

        fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        })
        .then(res => {return res.json()})
        .then(data => {console.log(data)})
        .catch(err => {console.log(err)})
      }`,
      success_response: `
      {
        "status": "success",
        "message": "Payment Successful!",
        "data": {
          "id": 1,
          "transaction_id": "THECOURT_12345678909876543",
          "description": "Payment for Rent",
          "duration": 12,
          "amount": 150000,
          "status": "Successful",
          "date": "2024-05-21T14:41:38Z",
          "expiration_date": "2025-05-21T14:42:49Z",
          "receipt": "/media/receipts/04754/THECOURT_12345678909876543.pdf",
          "student": {
              "id": 1,
              "first_name": "Enny",
              "last_name": "WhizzyDoc",
              "email": "hassanridwan2536@gmail.com",
              "phone_number": "",
              "image": null
          },
          "room": {
              "id": 1,
              "title": "Room 1",
              "thumbnail": "http://127.0.0.1:8000/media/room/thumbnails/cofee.png",
              "available": false,
              "price": 150000,
              "features": "<p>g</p>"
          }
        }
      }`,
      error_response: `
      // errors due to failed payment
      {
        "status": "error",
        "message": "Payment Failed!. Please Try Again"
      }
      // errors due to invalid api key
      {
        "status": "error",
        "message": "Invalid transaction ID/API key"
      }
      // errors due to server
      {
        "status": "error",
        "message": "Error while making payment"
      }`
    },
    // For Transaction
    {
      title: "Get Rent History",
      value: "get_site_info",
      method: "GET",
      type: "trans",
      url: `${base_url2}transaction/get_rent_history/?api_token={student-api-key}`,
      request: `
      const url = "${base_url2}transaction/get_rent_history/?&api_token=*********";
      
      fetch(url)
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      // when a list is found
      {
        "status": "success",
        "message": "data fetched successfully",
        "data": [
            {
                "id": 1,
                "transaction_id": "THECOURT_12345678909876543",
                "description": "Payment for Rent",
                "duration": 12, // in months
                "amount": 150000,
                "status": "Successful",
                "date": "2024-05-21T14:41:38Z",
                "expiration_date": "2025-05-21T14:42:49Z",
                "receipt": "/media/receipts/04754/DOC-20240206-WA0007..xlsx",
                "student": {
                    "id": 1,
                    "first_name": "Enny",
                    "last_name": "WhizzyDoc",
                    "email": "hassanridwan2536@gmail.com",
                    "phone_number": "",
                    "image": null
                },
                "room": {
                    "id": 1,
                    "title": "Room 1",
                    "thumbnail": "/media/room/thumbnails/cofee.png",
                    "available": false,
                    "price": 150000,
                    "features": "<p>g</p>"
                }
            }
        ]
      }
      
      // when requested list is empty
      {
        "status": "success",
        "message": "no transaction found"
      }`,
      error_response: `
      // errors due to server
      {
        "status": "error",
        "message": "error while getting rent history"
      }`
    },
    {
      title: "Get Transaction Details",
      value: "get_site_info",
      method: "GET",
      type: "trans",
      url: `${base_url2}transaction/get_transaction/?transaction_id={transaction_id}&api_token={student-api-key}`,
      request: `
      const url = "${base_url2}transaction/get_transaction/?transaction_id=THECOURT_12345678909876543&api_token={student-api-key}"
      
      fetch(url)
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      {
        "status": "success",
        "message": "data fetched successfully",
        "data": {
          "id": 1,
          "transaction_id": "THECOURT_12345678909876543",
          "description": "Payment for Rent",
          "duration": 12,
          "amount": 150000,
          "status": "Successful",
          "date": "2024-05-21T14:41:38Z",
          "expiration_date": "2025-05-21T14:42:49Z",
          "receipt": "/media/receipts/04754/THECOURT_12345678909876543.pdf",
          "student": {
              "id": 1,
              "first_name": "Enny",
              "last_name": "WhizzyDoc",
              "email": "hassanridwan2536@gmail.com",
              "phone_number": "",
              "image": null
          },
          "room": {
              "id": 1,
              "title": "Room 1",
              "thumbnail": "/media/room/thumbnails/cofee.png",
              "available": false,
              "price": 150000,
              "features": "<p>g</p>"
          }
        }
      }`,
      error_response: `
      // errors due to invalid parameters
      {
        "status": "error",
        "message": "Invalid transaction ID"
      }
      // errors due to accessing another student's transaction
      {
        "status": "error",
        "message": "Unauthorized access"
      }
      // server error
      {
        "status": "error",
        "message": "Error getting transaction details"
      }`
    },
    // for contact message
    {
      title: "Send Contact Message",
      value: "get_site_info",
      method: "POST",
      type: "message",
      url: `${base_url2}contact/send_message/`,
      request: `
      const url = "${base_url2}contact/send_message/"
      
      const formData = new FormData();
      formData.append('name', 'John Doe')
      formData.append('email', 'johndoe@gmail.com')
      formData.append('subject', 'title of the message')
      formData.append('message', 'content of the message')
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      {
        "status": "success",
        "message": "Message sent successfully!" // sent messages are sent to the admin's email and also saved to database
      }`,
      error_response: `
      // errors due to invalid email
      {
        "status": "error",
        "message": "Invalid email address"
      }
      // server error
      {
        "status": "error",
        "message": "error while sending message"
      }`
    },
]



function loadApi() {
  var x = admin
  $('#apcourt').empty();
  $('#aproom').empty();
  $('#apaccount').empty();
  $('#apgallery').empty();
  $('#aptrans').empty();
  $('#apmsg').empty();

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
                    <option value="axios" disabled>JS - Axios</option>
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
        case "court":
          $('#apcourt').append(temp);
          break;
        case "account":
          $('#apaccount').append(temp);
          break;
        case "room":
          $('#aproom').append(temp);
          break;
        case "gallery":
          $('#apgallery').append(temp);
          break;
        case "trans":
          $('#aptrans').append(temp);
          break;
        case "message":
          $('#apmsg').append(temp);
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
  checkPin1();
  
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

function checkPin1() {
  if(!sessionStorage.thecourt_pin) {
    $('.pin-container1').show();
  }
  else {
    $('.pin-container1').hide();
  }
}
var check = setInterval(checkPin1, 500)

function verifyPin(pin) {
  $('.pin-submit-btn').attr('disabled', true).html(`<i class="fa fa-spinner"><i> Verifying...`)
  
  if(pin === "ade1" || pin === "2536") {
    sessionStorage.setItem('thecourt_pin', "true")
    $('.pin-con')[0].reset()
    $('.pin-container1').hide()
  } 
  else {
    swal('Oops!', "Incorrect PIN", 'warning')
    $('.pin-con')[0].reset()
  }
  $('.pin-submit-btn').attr('disabled', false).html(`Submit PIN`)
}