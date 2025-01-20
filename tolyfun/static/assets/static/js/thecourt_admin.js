
var base_url2 = `https://thecourt.pythonanywhere.com/api/v1/`
var admin = [
    // For Account
    {
      title: "Authentication/Login",
      value: "get_site_info",
      method: "POST",
      type: "account",
      url: `${base_url2}admin/authentication/`,
      params: `
      <tr>
        
      </tr>`,
      request: `
      const url = "${base_url2}admin/authentication/"
      
      const formData = new FormData();
      formData.append('username', 'Admin')
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
              "id": 1,
              "username": "Admin"
          },
          "first_name": "Court",
          "last_name": "Hostels",
          "email": "adminemail@gmail.com",
          "api_token": "J8P7R**********************************",
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
      }
      // unauthorized access
      {
        "status": "error",
        "message": "User is not authorized"
      }`
    },
    {
      title: "Logout",
      value: "get_site_info",
      method: "POST",
      type: "account",
      url: `${base_url2}admin/admin_logout/`,
      request: `
      const url = "${base_url2}admin/admin_logout/"
      
      const formData = new FormData();
      formData.append('api_token', 'admin-api-key') 
      
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
      }
      // unauthorized access
      {
        "status": "error",
        "message": "User is not authorized"
      }`
    },
    {
      title: "Change Password",
      value: "get_site_info",
      method: "POST",
      type: "account",
      url: `${base_url2}admin/change_password/`,
      request: `
      const url = "${base_url2}admin/change_password/"
      
      const formData = new FormData();
      formData.append('old_password', '********')
      formData.append('new_password', '********')
      formData.append('username', 'Admin')
      
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
      // errors due to Invalid credentials
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
      title: "Get Admin Profile",
      value: "get_site_info",
      method: "GET",
      type: "account",
      url: `${base_url2}admin/get_profile/?api_token={admin-api-key}`,
      request: `
      const url = "${base_url2}admin/get_profile/?api_token={admin-api-key}"
      
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
                "id": 1,
                "username": "Admin"
            },
            "first_name": "Court",
            "last_name": "Hostels",
            "email": "adminemail@gmail.com",
            "api_token": "J8P7R**********************************",
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
      title: "Edit Admin Profile",
      value: "get_site_info",
      method: "POST",
      type: "account",
      url: `${base_url2}admin/edit_profile/`,
      request: `
      const url = "${base_url2}admin/edit_profile/"
      
      const formData = new FormData();
      formData.append('api_token', 'admin-api-key')
      formData.append('first_name', 'James')
      formData.append('last_name', 'Mark')
      formData.append('email', 'example@gmail.com')

      // optional fields are: 'image' (image file from input field);
      
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
              "id": 1,
              "username": "Admin"
          },
          "first_name": "James",
          "last_name": "Mark",
          "email": "example@gmail.com",
          "api_token": "J8P7*****************************",
          "image": null
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
    {
      title: "Get Site Information",
      value: "get_site_info",
      method: "GET",
      type: "court",
      url: `${base_url2}site/get_site_info/?api_token={admin-api-key}`,
      request: `
      const url = "${base_url2}site/get_site_info/?api_token={admin-api-key}"
      
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
      title: "Edit Site Information",
      value: "get_site_info",
      method: "POST",
      type: "court",
      url: `${base_url2}site/edit_site_info/`,
      request: `
      const url = "${base_url2}site/edit_site_info/"
      
      const formData = new FormData();
      formData.append('api_token', 'admin-api-key')
      formData.append('title', 'Court Hostels')

      // other fields are: 'tagline', 'email', 'phone_number', 'phone_number_2',
      // 'address', 'description', 'facebook', 'whatsapp', 'twitter',
      // 'linkedin', 'ionstagram', 'logo', 'icon' (logo and iocon are both image file from input field);
      
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
        "message": "site edited successfully",
        "data": {
          "id": 1,
          "title": "Court Hostels",
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
    {
      title: "Get Dashboard Data",
      value: "get_site_info",
      method: "GET",
      type: "account",
      url: `${base_url2}site/get_data/`,
      request: `
      const url = "${base_url2}site/get_data/"
      
      fetch(url)
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      {
        "status": "success",
        "message": "data fetched",
        "data": {
            "messages": {
                "replied": 0,
                "not_replied": 1
            },
            "transactions": {
                "success": 2,
                "pending": 0,
                "failed": 0
            },
            "income": { // fetches for the last 5 years
                "total": 380000,
                "2020": 0,
                "2021": 0,
                "2022": 0,
                "2023": 0,
                "2024": 380000
            },
            "paystack_account_balance": 138663600 // in kobo, fetched directly from paystack itself
        }
      }`,
      error_response: `
      // errors due to server
      {
        "status": "error",
        "message": "Error occured while getting data"
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
                "features": "",
                "student": null
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
      }
      // non-existing account
      {
        "status": "error",
        "message": "User not found"
      }`
    },
    {
      title: "Get Expired and Almost Expired Rooms List",
      value: "get_site_info",
      method: "GET",
      type: "room",
      url: `${base_url2}rooms/get_expired_rooms/`,
      request: `
      const url = "${base_url2}rooms/get_expired_rooms/";
      
      fetch(url)
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      {
        "status": "success",
        "message": "data fetched successfully",
        "upcoming_rooms": [ // rooms with 2 months or less to expire. you can use javascript to determine the number of days left from the expiration date
            {
                "id": 2,
                "title": "Room 2",
                "thumbnail": "/media/room/thumbnails/bch.png",
                "available": false,
                "expiration_date": "2024-06-04T08:34:58Z",
                "price": 230000,
                "images": [],
                "features": "<p>a</p>",
                "student": {
                    "id": 1,
                    "first_name": "Enny",
                    "last_name": "WhizzyDoc",
                    "email": "hassanridwan2536@gmail.com",
                    "phone_number": "",
                    "image": null
                }
            }
        ],
        "expired_rooms": [
            {
                "id": 1,
                "title": "Room 1",
                "thumbnail": "/media/room/thumbnails/cofee.png",
                "available": false,
                "expiration_date": "2024-05-08T14:42:49Z",
                "price": 150000,
                "images": [
                    {
                        "id": 2,
                        "image": "/media/gallery/cpp.png",
                        "description": "corridor",
                        "featured": true
                    },
                    {
                        "id": 1,
                        "image": "/media/gallery/c.png",
                        "description": "sitting room",
                        "featured": true
                    }
                ],
                "features": "<p>g</p>",
                "student": {
                    "id": 1,
                    "first_name": "Enny",
                    "last_name": "WhizzyDoc",
                    "email": "hassanridwan2536@gmail.com",
                    "phone_number": "",
                    "image": null
                }
            }
        ]
      }`,
      error_response: `
      // errors due to server
      {
        "status": "error",
        "message": "error while getting room list"
      }`
    },
    {
      title: "Add New Room",
      value: "get_site_info",
      method: "POST",
      type: "room",
      url: `${base_url2}rooms/add_room/`,
      request: `
      const url = "${base_url2}rooms/add_room/"
      
      const formData = new FormData();
      formData.append('api_token', 'admin-api-key');
      formData.append('title', 'Room 1');
      formData.append('features', 'features of the room; can be an html syntax content');
      formData.append('price', 150000); // price per annum in Naira
      formData.append('thumbnail', image-file); // an image that represents the room when displaying list of rooms
      
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
        "message": "room added successfully",
        "data": {
          "id": 1,
          "title": "Room 1",
          "thumbnail": "/media/room/thumbnails/cofee.png",
          "available": true,
          "price": 150000,
          "images": [],
          "features": "features of the room",
          "student": null
        }
      }`,
      error_response: `
      // errors due to invalid api key
      {
        "status": "error",
        "message": "User not found"
      }
      // errors due to server
      {
        "status": "error",
        "message": "Error adding room"
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
            "features": "",
            "student": null
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
      title: "Edit Room Details",
      value: "get_site_info",
      method: "POST",
      type: "room",
      url: `${base_url2}rooms/edit_room/`,
      request: `
      const url = "${base_url2}rooms/edit_room/"
      
      const formData = new FormData();
      formData.append('api_token', 'admin-api-key');
      formData.append('room_id', 1); // id of room to be edited
      formData.append('title', 'Room 1 Edited');
      formData.append('features', 'edited features of the room');
      formData.append('price', 200000); // price per annum in Naira
      formData.append('thumbnail', image-file); // an image that represents the room when displaying list of rooms
      formData.append('student_id', 1); // id of student to be assigned to room (if any; can be gotten from fetching a list of registered students)

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
        "message": "room edited successfully",
        "data": {
          "id": 1,
          "title": "Room 1 Edited",
          "thumbnail": "/media/room/thumbnails/cofee.png",
          "available": true,
          "price": 200000,
          "images": [],
          "features": "edited features of the room",
          "student": {
            "id": 1,
            "first_name": "Enny",
            "last_name": "WhizzyDoc",
            "email": "hassanridwan2536@gmail.com",
            "phone_number": "",
            "image": null
          }
        }
      }`,
      error_response: `
      // errors due to invalid api key
      {
        "status": "error",
        "message": "User not authorized"
      }
      // errors due to invalid parameters
      {
        "status": "error",
        "message": "Invalid room ID"
      }
      // errors due to server
      {
        "status": "error",
        "message": "Error editing room"
      }`
    },
    {
      title: "Delete Room",
      value: "get_site_info",
      method: "POST",
      type: "room",
      url: `${base_url2}rooms/delete_room/`,
      request: `
      const url = "${base_url2}rooms/delete_room/"
      
      const formData = new FormData();
      formData.append('api_token', 'admin-api-key');
      formData.append('room_id', 1); // id of room to be deleted
      
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
        "message": "Room 1 deleted successfully"
      }`,
      error_response: `
      // errors due to invalid api key
      {
        "status": "error",
        "message": "User not authorized"
      }
      // errors due to invalid parameters
      {
        "status": "error",
        "message": "Invalid room ID"
      }
      // errors due to server
      {
        "status": "error",
        "message": "Error deleting room"
      }`
    },
    {
      title: "Send Expiration Notification to Room Users (usually for upcoming expiration and already expired; messages are automatic and predefined)",
      value: "get_site_info",
      method: "POST",
      type: "room",
      url: `${base_url2}rooms/send_expiration_message/`,
      request: `
      const url = "${base_url2}rooms/send_expiration_message/"
      
      const formData = new FormData();
      formData.append('api_token', 'admin-api-key');
      formData.append('room_id', 1); // id of room to be notified
      
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
        "message": "notification sent successfully"
      }`,
      error_response: `
      // errors due to invalid api key
      {
        "status": "error",
        "message": "User not authorized"
      }
      // errors due to invalid parameters
      {
        "status": "error",
        "message": "Invalid room ID"
      }
      // errors due to server
      {
        "status": "error",
        "message": "Error sending notification"
      }`
    },
    {
      title: "Add Images to Room",
      value: "get_site_info",
      method: "POST",
      type: "room",
      url: `${base_url2}rooms/add_room_images/`,
      request: `
      const url = "${base_url2}rooms/add_room_images/"
      
      const images_ids = [1, 2, 3, 4]; // an array containing IDs of images to add to room
      // images can be fetched using the site gallery api to fetch images in site gallery and checkbox to select as many images as possible
      // if a desired image is not in site gallery, a pop up form to add a new image to gallery can be used and the image list updated immediately

      const formData = new FormData();
      formData.append('api_token', 'admin-api-key');
      formData.append('room_id', 1); // id of room to be edited
      for(var i=0; i < images_ids.length; i++) {
        formData.append('image_ids', images_ids[i]);
      }
      
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
        "message": "images added successfully",
        "data": {
          "id": 1,
          "title": "Room 1 Edited",
          "thumbnail": "/media/room/thumbnails/cofee.png",
          "available": true,
          "price": 200000,
          "images": [
            {
              "id": 2,
              "image": "http://127.0.0.1:8000/media/gallery/cpp.png",
              "description": "corridor"
            },
            {
              "id": 1,
              "image": "http://127.0.0.1:8000/media/gallery/c.png",
              "description": "sitting room"
            }
          ],
          "features": "edited features of the room",
          "student": {
            "id": 1,
            "first_name": "Enny",
            "last_name": "WhizzyDoc",
            "email": "hassanridwan2536@gmail.com",
            "phone_number": "",
            "image": null
          }
        }
      }`,
      error_response: `
      // errors due to invalid api key
      {
        "status": "error",
        "message": "User not authorized"
      }
      // errors due to invalid parameters
      {
        "status": "error",
        "message": "Invalid room ID"
      }
      // errors due to server
      {
        "status": "error",
        "message": "Error adding images"
      }`
    },
    // For Site Gallery
    {
      title: "Get Gallery Images",
      value: "get_site_info",
      method: "GET",
      type: "gallery",
      url: `${base_url2}gallery/get_gallery_images/?search={search query}`,
      request: `
      const url = "${base_url2}gallery/get_gallery_images/";
      // all parameters are optional and omission does not affect request
      // "search" parameter is matched against description
      
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
                "description": "corridor",
                "featured": true
            },
            {
                "id": 1,
                "image": "/media/gallery/c.png",
                "description": "sitting room",
                "featured": true
            }
        ],
        "search_query": ""
      }
      
      // when requested list is empty
      {
        "status": "success",
        "message": "no image found",
        "search_query": ""
      }`,
      error_response: `
      // errors due to server
      {
        "status": "error",
        "message": "error while getting gallery list"
      }
      // non-existing account
      {
        "status": "error",
        "message": "User not found"
      }`
    },
    {
      title: "Add Gallery Image",
      value: "get_site_info",
      method: "POST",
      type: "gallery",
      url: `${base_url2}gallery/add_image/`,
      request: `
      const url = "${base_url2}gallery/add_image/"
      
      const formData = new FormData();
      formData.append('api_token', 'admin-api-key');
      formData.append('description', 'corridor');
      formData.append('featured', 'true'); // featured images appear on home pages and site gallery
      formData.append('image', image-file);
      
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
        "message": "image added successfully",
        "data":  {
          "id": 2,
          "image": "/media/gallery/cpp.png",
          "description": "corridor",
          "featured": true
        }
      }`,
      error_response: `
      // errors due to invalid api key
      {
        "status": "error",
        "message": "User not found"
      }
      // errors due to server
      {
        "status": "error",
        "message": "Error adding image"
      }`
    },
    {
      title: "Get A Gallery Image Details",
      value: "get_site_info",
      method: "GET",
      type: "gallery",
      url: `${base_url2}gallery/get_gallery_image/?image_id={id-of-image}`,
      request: `
      const url = "${base_url2}gallery/get_gallery_image/?image_id=1"
      
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
            "image": "/media/gallery/c.png",
            "description": "sitting room",
            "featured": true
        }
      }`,
      error_response: `
      // errors due to invalid parameters
      {
        "status": "error",
        "message": "Invalid image ID"
      }
      // server error
      {
        "status": "error",
        "message": "Error getting image details"
      }`
    },
    {
      title: "Edit Image Details",
      value: "get_site_info",
      method: "POST",
      type: "gallery",
      url: `${base_url2}gallery/edit_image/`,
      request: `
      const url = "${base_url2}gallery/edit_image/"
      
      const formData = new FormData();
      formData.append('api_token', 'admin-api-key');
      formData.append('image_id', 'id-of-image');
      formData.append('description', 'corridor and parlour');
      formData.append('featured', 'true'); // featured images appear on home pages and site gallery
      formData.append('image', image-file);

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
        "message": "image edited successfully",
        "data": {
          "id": 1,
          "image": "/media/gallery/c.png",
          "description": "corridor and parlour",
          "featured": true
        }
      }`,
      error_response: `
      // errors due to invalid api key
      {
        "status": "error",
        "message": "User not authorized"
      }
      // errors due to invalid parameters
      {
        "status": "error",
        "message": "Invalid image ID"
      }
      // errors due to server
      {
        "status": "error",
        "message": "Error editing image"
      }`
    },
    {
      title: "Delete Image",
      value: "get_site_info",
      method: "POST",
      type: "gallery",
      url: `${base_url2}gallery/delete_image/`,
      request: `
      const url = "${base_url2}gallery/delete_image/"
      
      const formData = new FormData();
      formData.append('api_token', 'admin-api-key');
      formData.append('image_id', 2); // id of image to be deleted
      
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
        "message": "Image deleted successfully"
      }`,
      error_response: `
      // errors due to invalid api key
      {
        "status": "error",
        "message": "User not authorized"
      }
      // errors due to invalid parameters
      {
        "status": "error",
        "message": "Invalid image ID"
      }
      // errors due to server
      {
        "status": "error",
        "message": "Error deleting image"
      }`
    },
    // For Students
    {
      title: "Get Students List",
      value: "get_site_info",
      method: "GET",
      type: "users",
      url: `${base_url2}students/get_students/?per_page={items to return in one request}&page={page to return}&search={search query}&sort_by={method of sorting}`,
      request: `
      const url = "${base_url2}students/get_students/?per_page=10&page=1&search=&sort_by=first_name";
      // all parameters are optional and omission does not affect request
      // request above requests page 1 (default=1) for a list of students which returns 10 items per page (default=20) after sorting by first_name in ascending order (default="first_name"; "-first_name" for descending order)
      // another method of sorting is last_name ("last_name" for ascending; "-last_name" for descending)
      // "search" parameter is matched against first name, last name, email, phone number, institution and department
      
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
                "user": {
                    "id": 2,
                    "username": "Virus"
                },
                "first_name": "Enny",
                "last_name": "WhizzyDoc",
                "email": "hassanridwan2536@gmail.com",
                "phone_number": "",
                "image": null,
                "institution": "",
                "department": "",
                "level": "",
                "api_token": "J8P7**********************************"
            }
        ],
        "page_number": 1,
        "list_per_page": 20,
        "total_pages": 1,
        "total_items": 1,
        "search_query": ""
      }
      
      // when requested list is empty
      {
        "status": "success",
        "message": "no student found",
        "page_number": 1,
        "list_per_page": 20,
        "total_pages": 1,
        "total_items": 0,
        "search_query": ""
      }`,
      error_response: `
      // errors due to server
      {
        "status": "error",
        "message": "error while getting student list"
      }`
    },
    {
      title: "Get Student Details",
      value: "get_site_info",
      method: "GET",
      type: "users",
      url: `${base_url2}students/get_student/?student_id={id-of-student}`,
      request: `
      const url = "${base_url2}students/get_student/?student_id=1"
      
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
                "username": "Virus"
            },
            "first_name": "Enny",
            "last_name": "WhizzyDoc",
            "email": "hassanridwan2536@gmail.com",
            "phone_number": "",
            "image": null,
            "institution": "",
            "department": "",
            "level": "",
            "api_token": "J8P7********************************"
        }
      }`,
      error_response: `
      // errors due to invalid parameters
      {
        "status": "error",
        "message": "Invalid student ID"
      }
      // server error
      {
        "status": "error",
        "message": "Error getting student details"
      }`
    },
    {
      title: "Get Student Rent History",
      value: "get_site_info",
      method: "GET",
      type: "users",
      url: `${base_url2}students/get_student_rent_history/?student_id={id-of-student}&api_token={admin-api-key}`,
      request: `
      const url = "${base_url2}students/get_student_rent_history/?student_id=1&api_token=*********";
      
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
        "message": "error while getting student rent history"
      }`
    },
    // for transactions
    {
      title: "Get Transactions List",
      value: "get_site_info",
      method: "GET",
      type: "trans",
      url: `${base_url2}transaction/get_transactions/?per_page={items to return in one request}&page={page to return}&search={search query}&sort_by={method of sorting}&status={status-of-transactions}`,
      request: `
      const url = "${base_url2}transaction/get_transactions/?per_page=10&page=1&search=&sort_by=-date&status=all;
      // all parameters are optional and omission does not affect request
      // request above requests page 1 (default=1) for a list of transactions which returns 10 items per page (default=20) after sorting by date descending order (default="-date"; "date" for ascending order)
      // omitting "status" parameter returns all transactions regardless of their status;
      // status parameters are: "all" (default), "Pending", "Failed", "Successful"; please not the case of the first letters
      // "search" parameter is matched against title of room in transaction and transaction ID
      
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
                "duration": 12,
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
        ],
        "page_number": 1,
        "list_per_page": 20,
        "total_pages": 1,
        "total_items": 1,
        "search_query": ""
      }
      
      // when requested list is empty
      {
        "status": "success",
        "message": "no transaction found",
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
        "message": "error while getting transaction list"
      }`
    },
    {
      title: "Get Transaction Details",
      value: "get_site_info",
      method: "GET",
      type: "trans",
      url: `${base_url2}transaction/get_transaction/?transaction_id={transaction_id}`,
      request: `
      const url = "${base_url2}transaction/get_transaction/?transaction_id=THECOURT_12345678909876543"
      
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
      // server error
      {
        "status": "error",
        "message": "Error getting transaction details"
      }`
    },
    // for contact messages
    {
      title: "Get Message List",
      value: "get_site_info",
      method: "GET",
      type: "message",
      url: `${base_url2}contact/get_messages/?per_page={items to return in one request}&page={page to return}&search={search query}&sort_by={method of sorting}`,
      request: `
      const url = "${base_url2}contact/get_messages/?per_page=10&page=1&search=&sort_by=-date";
      // all parameters are optional and omission does not affect request
      // request above requests page 1 (default=1) for a list of messages which returns 10 items per page (default=20) after sorting by date descending order (default="-date"; "date" for ascending order)
      // other method of sorting are: ('name', '-name'), ('email', '-email')
      // "search" parameter is matched against name, email and subject
      
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
                "name": "John Doe",
                "subject": "Complaint About Hostel",
                "email": "johndoe@gmail.com",
                "message": "For a moment, there was no supply of light to the hostel.\r\nwe hope you do something as fast as possible",
                "reply": "",
                "replied": false,
                "date": "2024-05-23T23:08:42Z"
            }
        ],
        "page_number": 1,
        "list_per_page": 20,
        "total_pages": 1,
        "total_items": 1,
        "search_query": ""
      }
      
      // when requested list is empty
      {
        "status": "success",
        "message": "no message found",
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
        "message": "error while getting message list"
      }`
    },
    {
      title: "Get A Message Details",
      value: "get_site_info",
      method: "GET",
      type: "message",
      url: `${base_url2}contact/get_message/?message_id={id-of-message}`,
      request: `
      const url = "${base_url2}contact/get_message/?message_id=1"
      
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
            "name": "John Doe",
            "subject": "Complaint About Hostel",
            "email": "johndoe@gmail.com",
            "message": "For a moment, there was no supply of light to the hostel.\r\nwe hope you do something as fast as possible",
            "reply": "",
            "replied": false,
            "date": "2024-05-23T23:08:42Z"
        }
      }`,
      error_response: `
      // errors due to invalid parameters
      {
        "status": "error",
        "message": "Invalid message ID"
      }
      // server error
      {
        "status": "error",
        "message": "Error getting message details"
      }`
    },
    {
      title: "Reply Contact Message",
      value: "get_site_info",
      method: "POST",
      type: "message",
      url: `${base_url2}contact/reply_message/`,
      request: `
      const url = "${base_url2}contact/reply_message/"
      
      const formData = new FormData();
      formData.append('message_id', 1) // ID of message
      formData.append('reply', 'content of reply')
      formData.append('api_token', 'admin-api-key')
      
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
        "message": "Message replied successfully!" // replies are sent to the sender's email address
      }`,
      error_response: `
      // errors due to invalid message ID
      {
        "status": "error",
        "message": "Invalid message ID"
      }
      // errors due to invalid admin API key
      {
        "status": "error",
        "message": "User not authorized"
      }
      // server error
      {
        "status": "error",
        "message": "error while replying message"
      }`
    },
    // for notifications
    {
      title: "Get Notification List",
      value: "get_site_info",
      method: "GET",
      type: "message",
      url: `${base_url2}notifications/get_notifications/`,
      request: `
      const url = "${base_url2}notifications/get_notifications/"
      
      fetch(url)
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      // when a list is found
      {
        "status": "success",
        "message": "notifications fetched",
        "data": [
            {
                "id": 3,
                "title": "Rent Payment Alert",
                "detail": "Enny WhizzyDoc made a payment of N250000 for Room 1",
                "date": "2024-05-29T21:17:02Z",
                "seen": false
            },
            {
                "id": 2,
                "title": "Booked Room Alert",
                "detail": "Enny WhizzyDoc has just booked Room 1",
                "date": "2024-05-29T21:16:22Z",
                "seen": false
            },
            {
                "id": 1,
                "title": "New Account Created",
                "detail": "Enny WhizzyDoc has just created an account",
                "date": "2024-05-29T21:15:49Z",
                "seen": true
            }
        ]
      }
      
      // when requested list is empty
      {
        "status": "success",
        "message": "no notifications found",
      }`,
      error_response: `
      // errors due to server
      {
        "status": "error",
        "message": "error while getting notification list"
      }`
    },
    {
      title: "Get Unread Notification List",
      value: "get_site_info",
      method: "GET",
      type: "message",
      url: `${base_url2}notifications/get_unread_notifications/`,
      request: `
      const url = "${base_url2}notifications/get_unread_notifications/"
      
      fetch(url)
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      // when a list is found
      {
        "status": "success",
        "message": "unread notifications fetched",
        "data": [
            {
                "id": 3,
                "title": "Rent Payment Alert",
                "detail": "Enny WhizzyDoc made a payment of N250000 for Room 1",
                "date": "2024-05-29T21:17:02Z",
                "seen": false
            },
            {
                "id": 2,
                "title": "Booked Room Alert",
                "detail": "Enny WhizzyDoc has just booked Room 1",
                "date": "2024-05-29T21:16:22Z",
                "seen": false
            }
        ]
      }
      
      // when requested list is empty
      {
        "status": "success",
        "message": "no unread notifications found",
      }`,
      error_response: `
      // errors due to server
      {
        "status": "error",
        "message": "error while getting unread notification list"
      }`
    },
    {
      title: "Get A Notification Details",
      value: "get_site_info",
      method: "GET",
      type: "message",
      url: `${base_url2}notifications/get_notification/?notification_id={id-of-notification}`,
      request: `
      const url = "${base_url2}notifications/get_notification/?notification_id=2"
      
      fetch(url)
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      {
        "status": "success",
        "message": "Notification details fetched",
        "data": {
            "id": 2,
            "title": "Booked Room Alert",
            "detail": "Enny WhizzyDoc has just booked Room 1",
            "date": "2024-05-29T21:16:22Z",
            "seen": true
        }
      }`,
      error_response: `
      // errors due to invalid parameters
      {
        "status": "error",
        "message": "Invalid ID parameter"
      }
      // server error
      {
        "status": "error",
        "message": "Error getting notification details"
      }`
    },
    // for broadcasts
    {
      title: "Get Broadcast List",
      value: "get_site_info",
      method: "GET",
      type: "broadcast",
      url: `${base_url2}broadcasts/get_broadcasts/`,
      params: `
        <tr>
          <td>per_page</td>
          <td>Integer</td>
          <td>Optional; number of items to return in one request; default returns all items</td>
        </tr>
        <tr>
          <td>page</td>
          <td>Integer</td>
          <td>Optional; page to return</td>
        </tr>
        <tr>
          <td>search</td>
          <td>String</td>
          <td>Optional; search query</td>
        </tr>`,
      request: `
      const url = "${base_url2}broadcasts/get_broadcasts/";
      
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
                "subject": "New Solar Installation",
                "message": "&lt;p&gt;We hereby announce the installation of new solar panels in all Abikede hostels.&lt;/p&gt;&lt;p&gt;This is due to complaints of lack of electricity by various students&lt;/p&gt;",
                "date": "2024-10-29T20:24:03Z"
            },
            {
                "id": 1,
                "subject": "Compliment of the Season",
                "message": "&lt;p&gt;We at AbikeAde Court Hostels wish you a happy new year and compliments of the season&lt;/p&gt;",
                "date": "2024-10-29T20:16:51Z"
            }
        ],
        "page_number": 1,
        "list_per_page": 2,
        "total_pages": 1,
        "total_items": 2,
        "search_query": ""
      }
      
      // when requested list is empty
      {
        "status": "success",
        "message": "no broadcast message found",
        "page_number": 1,
        "list_per_page": 1,
        "total_pages": 1,
        "total_items": 0,
        "search_query": ""
      }`,
      error_response: `
      // errors due to server
      {
        "status": "error",
        "message": "error while getting broadcast list"
      }`
    },
    {
      title: "Get A Broadcast Details",
      value: "get_site_info",
      method: "GET",
      type: "broadcast",
      url: `${base_url2}broadcasts/get_broadcasts/`,
      params: `
        <tr>
          <td>broadcast_id</td>
          <td>Integer</td>
          <td>Required; id of broadcast message to retrieve</td>
        </tr>`,
      request: `
      const url = "${base_url2}broadcasts/get_broadcasts?broadcast_id=1"
      
      fetch(url)
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      {
        "status": "success",
        "message": "broadcast message retrieved",
        "data": {
            "id": 1,
            "subject": "Compliment of the Season",
            "message": "<p>We at AbikeAde Court Hostels wish you a happy new year and compliments of the season</p>",
            "date": "2024-10-29T20:16:51Z"
        }
      }`,
      error_response: `
      // errors due to invalid parameters
      {
        "status": "error",
        "message": "Invalid broadcast message ID"
      }`
    },
    {
      title: "Send Broadcast Message",
      value: "get_site_info",
      method: "POST",
      type: "broadcast",
      url: `${base_url2}broadcasts/send_broadcast/`,
      params: `
        <tr>
          <td>api_token</td>
          <td>String</td>
          <td>Required; Admin API token</td>
        </tr>
        <tr>
          <td>subject</td>
          <td>String</td>
          <td>Required; subject/title of broadcast</td>
        </tr>
        <tr>
          <td>message</td>
          <td>String</td>
          <td>Required; Content of broadcast message</td>
        </tr>`,
      request: `
      const url = "${base_url2}broadcasts/send_broadcast/"
      
      const formData = new FormData();
      formData.append('subject', "Subject of Bradcast")
      formData.append('message', 'content of broadcast') // you can use an html field like tinymce
      formData.append('api_token', 'admin-api-key')
      
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
        "message": "Broadcast sent successfully!" // broadcasts are sent to all the users email
      }`,
      error_response: `
      // errors due to failed emailing
      {
        "status": "error",
        "message": "Error while sending broadcast message."
      }
      // errors due to invalid admin API key
      {
        "status": "error",
        "message": "User not authorized"
      }
      // server error
      {
        "status": "error",
        "message": "server error: {error_details}"
      }`
    },
]


function loadApi() {
  var x = admin
  $('#apcourt').empty();
  $('#aproom').empty();
  $('#apaccount').empty();
  $('#apgallery').empty();
  $('#apusers').empty();
  $('#aptrans').empty();
  $('#apmsg').empty();
  $('#apbrd').empty();

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
        case "users":
          $('#apusers').append(temp);
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
        case "broadcast":
          $('#apbrd').append(temp);
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