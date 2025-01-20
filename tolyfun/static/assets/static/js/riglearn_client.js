
var base_url2 = `https://riganapi.pythonanywhere.com/api/v3/`
var admin = [
    // For Account 
    {
        title: "Create An Account",
        value: "get_site_info",
        method: "POST",
        type: "account",
        url: `${base_url2}students/create_account/`,
        request: `
        const url = "${base_url2}students/create_account/"
        
        const formData = new FormData();
        formData.append('username', 'JohnDoe')
        formData.append('password', '********') // must be at least 8 characters and alphanumeric
        formData.append('first_name', 'John')
        formData.append('last_name', 'Doe')
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
          "message": "Account created successfully",
          "data": {
            "id": 1,
            "user": {
                "id": 1,
                "username": "JohnDoe",
                "email": "johndoe@example.com",
                "first_name": "John",
                "last_name": "Doe",
                "is_superuser": false
            },
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@example.com",
            "image": null,
            "api_token": "**********************************",
            "openai_key": null
          }
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
      url: `${base_url2}students/authentication/`,
      request: `
      const url = "${base_url2}students/authentication/"
      
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
              "id": 1,
              "username": "JohnDoe",
              "email": "johndoe@example.com",
              "first_name": "John",
              "last_name": "Doe",
              "is_superuser": false
          },
          "first_name": "John",
          "last_name": "Doe",
          "email": "johndoe@example.com",
          "image": null,
          "api_token": "**********************************", // you may save the api key in cookies, sessionStorage, etc for future use in the site
          "openai_key": null
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
      url: `${base_url2}students/admin_logout/`,
      request: `
      const url = "${base_url2}students/admin_logout/"
      
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
      }
      // unauthorized access
      {
        "status": "error",
        "message": "User is not authorized"
      }`
    },
    {
      title: "Forgot Password",
      value: "get_site_info",
      method: "POST",
      type: "account",
      url: `${base_url2}students/forgot_password/`,
      request: `
      const url = "${base_url2}students/forgot_password/"
      
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
      url: `${base_url2}students/change_password/`,
      request: `
      const url = "${base_url2}students/change_password/"
      
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
      type: "user",
      url: `${base_url2}students/get_profile/?api_token={user-api-key}`,
      request: `
      const url = "${base_url2}students/get_profile/?api_token={user-api-key}"
      
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
              "username": "JohnDoe",
              "email": "johndoe@example.com",
              "first_name": "John",
              "last_name": "Doe",
              "is_superuser": false
          },
          "first_name": "John",
          "last_name": "Doe",
          "email": "johndoe@example.com",
          "image": null,
          "api_token": "**********************************",
          "openai_key": null
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
      title: "Edit User Profile",
      value: "get_site_info",
      method: "POST",
      type: "user",
      url: `${base_url2}students/edit_profile/`,
      request: `
      const url = "${base_url2}students/edit_profile/"
      
      const formData = new FormData();
      formData.append('api_token', 'user-api-key')
      formData.append('fname', 'James')
      // available editable fields are; 'fname', 'lname', 'openai' (openAI api key for GPT),'email', 'image' (image file from input field);
      
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
              "username": "JohnDoe",
              "email": "johndoe@example.com",
              "first_name": "James",
              "last_name": "Doe",
              "is_superuser": false
          },
          "first_name": "James",
          "last_name": "Doe",
          "email": "johndoe@example.com",
          "image": null,
          "api_token": "**********************************",
          "openai_key": null
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
      title: "Get User Progress",
      value: "get_site_info",
      method: "GET",
      type: "user",
      url: `${base_url2}students/get_data/?api_token={user-api-key}`,
      request: `
      const url = "${base_url2}students/get_data/?api_token={user-api-key}"
      
      fetch(url)
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      {
        "status": "success",
        "message": "data fetched successfully",
        "scores_data": {
            "Basic Syntax and Formats in HTML": 100,
            "HTML Headings and Paragraphs": 67
        }, // represents percentage scores in most recent 5 quizzes taken
        "progress_data": 23 // represents overall percentage of registered courses progress
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
      title: "Get Skill Categories",
      value: "get_site_info",
      method: "GET",
      type: "skill",
      url: `${base_url2}skills/get_skill_categories/`,
      request: `
      const url = "${base_url2}skills/get_skill_categories/"
      
      fetch(url)
      .then(res => {return res.json()})
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
      `,
      success_response: `
      // when a list is found
      {
          "status": "success",
          "message": "category list fetched",
          "data": [
              {
                  "id": 5,
                  "title": "Artificial Intelligence",
                  "image": null
              },
              {
                  "id": 1,
                  "title": "Cyber Security",
                  "image": null
              },
              {
                  "id": 3,
                  "title": "Data Science",
                  "image": null
              },
              {
                  "id": 4,
                  "title": "Hardware Engineering",
                  "image": null
              },
              {
                  "id": 2,
                  "title": "Software Development",
                  "image": null
              },
              {
                  "id": 6,
                  "title": "Web Programming",
                  "image": null
              }
          ]
      }
      // when list is empty
      {
          "status": "success",
          "message": "No category found"
      }`,
      error_response: `
      {
        "status": "error",
        "message": "Error occured while getting categories"
      }`
    },
    {
        title: "Get Popular Skills",
        value: "get_site_info",
        method: "GET",
        type: "skill",
        url: `${base_url2}skills/get_popular_skills/`,
        request: `
        const url = "${base_url2}skills/get_popular_skills/"
        
        fetch(url)
        .then(res => {return res.json()})
        .then(data => {console.log(data)})
        .catch(err => {console.log(err)})
        `,
        success_response: `
        // when a list is found (top 10 most registered skills); prices in Naira (price of 0 means free)
        {
            "status": "success",
            "message": "popular skill list fetched",
            "data": [
                {
                    "id": 1,
                    "title": "Front End Web Development",
                    "category": {
                        "id": 2,
                        "title": "Software Development",
                        "image": null
                    },
                    "description": "<p>Become a professional Front End web developer with our modern course routine.</p>\r\n<p>You will learn the practical use of front end technologies such as:</p>\r\n<ul style=\"list-style-type: square;\">\r\n<li>HTML</li>\r\n<li>CSS</li>\r\n<li>Javascript</li>\r\n<li>Bootstrap</li>\r\n<li>Git</li>\r\n<li>Javascript frameworks (React JS, Angular JS, Vue JS, Next JS)</li>\r\n</ul>",
                    "image": "/media/hackode/skills/webdev.jpg",
                    "duration": "3 Months",
                    "price": 160000
                },
                {
                    "id": 4,
                    "title": "Server Side Development with Javascript",
                    "category": {
                        "id": 2,
                        "title": "Software Development",
                        "image": null
                    },
                    "description": "",
                    "image": "/media/hackode/skills/webdev.jpeg",
                    "duration": "3 Months",
                    "price": 200000
                },
                {
                    "id": 7,
                    "title": "Game development",
                    "category": {
                        "id": 2,
                        "title": "Software Development",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                },
                {
                    "id": 8,
                    "title": "Machine Learning and AI",
                    "category": {
                        "id": 5,
                        "title": "Artificial Intelligence",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                },
                {
                    "id": 10,
                    "title": "Server Side Development with Java",
                    "category": {
                        "id": 6,
                        "title": "Web Programming",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                },
                {
                    "id": 11,
                    "title": "Server Side Development with Python",
                    "category": {
                        "id": 6,
                        "title": "Web Programming",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                },
                {
                    "id": 12,
                    "title": "Server Side Development with C#",
                    "category": {
                        "id": 6,
                        "title": "Web Programming",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                },
                {
                    "id": 3,
                    "title": "Ethical Hacking",
                    "category": {
                        "id": 1,
                        "title": "Cyber Security",
                        "image": null
                    },
                    "description": "",
                    "image": "/media/hackode/skills/hack1.jpeg",
                    "duration": "3 Months",
                    "price": 300000
                },
                {
                    "id": 9,
                    "title": "Mobile App Development",
                    "category": {
                        "id": 2,
                        "title": "Software Development",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                },
                {
                    "id": 2,
                    "title": "Data Science",
                    "category": {
                        "id": 3,
                        "title": "Data Science",
                        "image": null
                    },
                    "description": "",
                    "image": "/media/hackode/skills/data.jpeg",
                    "duration": "3 Months",
                    "price": 200000
                }
            ]
        }
        // when list is empty
        {
            "status": "success",
            "message": "No skill found"
        }`,
        error_response: `
        {
          "status": "error",
          "message": "Error occured while getting list"
        }`
    },
    {
        title: "Get Free Skills",
        value: "get_site_info",
        method: "GET",
        type: "skill",
        url: `${base_url2}skills/get_free_skills/`,
        request: `
        const url = "${base_url2}skills/get_free_skills/"
        
        fetch(url)
        .then(res => {return res.json()})
        .then(data => {console.log(data)})
        .catch(err => {console.log(err)})
        `,
        success_response: `
        // when a list is found (top 10 most registered free skills); prices in Naira
        {
            "status": "success",
            "message": "free skill list fetched",
            "data": [
                {
                    "id": 7,
                    "title": "Game development",
                    "category": {
                        "id": 2,
                        "title": "Software Development",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                },
                {
                    "id": 8,
                    "title": "Machine Learning and AI",
                    "category": {
                        "id": 5,
                        "title": "Artificial Intelligence",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                },
                {
                    "id": 10,
                    "title": "Server Side Development with Java",
                    "category": {
                        "id": 6,
                        "title": "Web Programming",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                },
                {
                    "id": 11,
                    "title": "Server Side Development with Python",
                    "category": {
                        "id": 6,
                        "title": "Web Programming",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                },
                {
                    "id": 12,
                    "title": "Server Side Development with C#",
                    "category": {
                        "id": 6,
                        "title": "Web Programming",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                }
            ]
        }
        // when list is empty
        {
            "status": "success",
            "message": "No skill found"
        }`,
        error_response: `
        {
          "status": "error",
          "message": "Error occured while getting list"
        }`
    },
    {
        title: "Get Skills List",
        value: "get_site_info",
        method: "GET",
        type: "skill",
        url: `${base_url2}skills/get_skills/?cat_id={id-of-filtered-category}&sort_by={sort-method}`,
        request: `
        const url = "${base_url2}skills/get_skills/?cat_id=6" // filtering skills by category (with id=6; "web programming")
        // the following are the available parameters for sorting and filtering (all optional)
        // cat_id: an integer to representing id of category to be filtered (omitting the cat_id fetches all skills)
        // sort_by: sorting/arrangement list. available sorting are "title", "price": (default = title)
        fetch(url)
        .then(res => {return res.json()})
        .then(data => {console.log(data)})
        .catch(err => {console.log(err)})
        `,
        success_response: `
        // when a list is found
        {
            "status": "success",
            "message": "skill list fetched",
            "data": [
                {
                    "id": 12,
                    "title": "Server Side Development with C#",
                    "category": {
                        "id": 6,
                        "title": "Web Programming",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                },
                {
                    "id": 10,
                    "title": "Server Side Development with Java",
                    "category": {
                        "id": 6,
                        "title": "Web Programming",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                },
                {
                    "id": 11,
                    "title": "Server Side Development with Python",
                    "category": {
                        "id": 6,
                        "title": "Web Programming",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                }
            ],
            "c_count": [
                0,
                0,
                1
            ], // list of number of courses corresponding to the skills fetched above
            "v_count": [
                0,
                0,
                0
            ] // list of number of videos corresponding to the skills fetched above
        }
        // when list is empty
        {
            "status": "success",
            "message": "No skill found"
        }`,
        error_response: `
        {
          "status": "error",
          "message": "Error occured while getting skills"
        }`
    },
    {
        title: "Get User Registered Skills List",
        value: "get_site_info",
        method: "GET",
        type: "skill",
        url: `${base_url2}skills/get_user_skills/?api_token={user-api-key}`,
        request: `
        const url = "${base_url2}skills/get_user_skills/?api_token={user-api-key}";
        
        fetch(url)
        .then(res => {return res.json()})
        .then(data => {console.log(data)})
        .catch(err => {console.log(err)})
        `,
        success_response: `
        // when a list is found
        {
            "status": "success",
            "message": "skill list fetched",
            "data": [
                {
                    "id": 1,
                    "title": "Front End Web Development",
                    "category": {
                        "id": 2,
                        "title": "Software Development",
                        "image": null
                    },
                    "description": "<p>Become a professional Front End web developer with our modern course routine.</p>\r\n<p>You will learn the practical use of front end technologies such as:</p>\r\n<ul style=\"list-style-type: square;\">\r\n<li>HTML</li>\r\n<li>CSS</li>\r\n<li>Javascript</li>\r\n<li>Bootstrap</li>\r\n<li>Git</li>\r\n<li>Javascript frameworks (React JS, Angular JS, Vue JS, Next JS)</li>\r\n</ul>",
                    "image": "/media/hackode/skills/webdev.jpg",
                    "duration": "3 Months",
                    "price": 160000
                },
                {
                    "id": 7,
                    "title": "Game development",
                    "category": {
                        "id": 2,
                        "title": "Software Development",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                },
                {
                    "id": 8,
                    "title": "Machine Learning and AI",
                    "category": {
                        "id": 5,
                        "title": "Artificial Intelligence",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                },
                {
                    "id": 12,
                    "title": "Server Side Development with C#",
                    "category": {
                        "id": 6,
                        "title": "Web Programming",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                },
                {
                    "id": 10,
                    "title": "Server Side Development with Java",
                    "category": {
                        "id": 6,
                        "title": "Web Programming",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                },
                {
                    "id": 4,
                    "title": "Server Side Development with Javascript",
                    "category": {
                        "id": 2,
                        "title": "Software Development",
                        "image": null
                    },
                    "description": "",
                    "image": "/media/hackode/skills/webdev.jpeg",
                    "duration": "3 Months",
                    "price": 200000
                },
                {
                    "id": 11,
                    "title": "Server Side Development with Python",
                    "category": {
                        "id": 6,
                        "title": "Web Programming",
                        "image": null
                    },
                    "description": "",
                    "image": null,
                    "duration": "3 Months",
                    "price": 0
                }
            ],
            "c_count": [
                10,
                0,
                1,
                0,
                0,
                2,
                1
            ], // represents the number of courses available for each skill above (first value for first skill and so on)
            "v_count": [
                1,
                0,
                0,
                0,
                0,
                0,
                0
            ], // represents the number of video tutorials available for each skill above (first value for first skill and so on)
            "s_count": [
                2,
                1,
                1,
                1,
                1,
                2,
                1
            ], // represents the number of students registered for each skill above (first value for first skill and so on)
            "p_list": [
                23,
                0,
                0,
                0,
                0,
                0,
                0
            ] // represents the percentage progress of user for each skill above (first value for first skill and so on)
        }
        // when list is empty
        {
            "status": "success",
            "message": "No skill found"
        }`,
        error_response: `
        {
          "status": "error",
          "message": "Error occured while getting skills"
        }`
    },
    {
        title: "Get User Class Schedules",
        value: "get_site_info",
        method: "GET",
        type: "skill",
        url: `${base_url2}skills/get_user_schedules/?api_token={user-api-key}`,
        request: `
        const url = "${base_url2}skills/get_user_schedules/?api_token={user-api-key}";
        
        fetch(url)
        .then(res => {return res.json()})
        .then(data => {console.log(data)})
        .catch(err => {console.log(err)})
        `,
        success_response: `
        // when a list is found
        {
            "status": "success",
            "message": "schedule list fetched",
            "data": [
                {
                    "id": 14,
                    "status": "Ongoing", // status of the class schedule
                    "skill": {
                        "id": 3,
                        "title": "Ethical Hacking",
                        "category": {
                            "id": 1,
                            "title": "Cyber Security",
                            "image": null
                        },
                        "description": "",
                        "image": "/media/hackode/skills/hack1.jpeg",
                        "duration": "3 Months",
                        "price": 300000
                    },
                    "course": {
                        "id": 6,
                        "order": 1,
                        "title": "Python",
                        "image": "/media/hackode/courses/python.png"
                    },
                    "date": "2024-05-05T07:16:42Z",
                    "url": "https://meet.google.com/nvw-xbdr-vtq",
                    "venue": "Google Meet",
                    "description": "<p>hfjgfjhgfg</p>"
                },
                {
                    "id": 4,
                    "status": "Pending",
                    "skill": {
                        "id": 1,
                        "title": "Front End Web Development",
                        "category": {
                            "id": 2,
                            "title": "Software Development",
                            "image": null
                        },
                        "description": "<p>Become a professional Front End web developer with our modern course routine.</p>\r\n<p>You will learn the practical use of front end technologies such as:</p>\r\n<ul style=\"list-style-type: square;\">\r\n<li>HTML</li>\r\n<li>CSS</li>\r\n<li>Javascript</li>\r\n<li>Bootstrap</li>\r\n<li>Git</li>\r\n<li>Javascript frameworks (React JS, Angular JS, Vue JS, Next JS)</li>\r\n</ul>",
                        "image": "/media/hackode/skills/webdev.jpg",
                        "duration": "3 Months",
                        "price": 160000
                    },
                    "course": {
                        "id": 3,
                        "order": 3,
                        "title": "Javascript",
                        "image": "/media/hackode/courses/js.png"
                    },
                    "date": "2024-05-05T04:54:43Z",
                    "url": "https://meet.google.com/nvw-xbdr-vtq",
                    "venue": "Google Meet",
                    "description": "<p>dsfdfdsfd</p>"
                },
                {
                    "id": 1,
                    "status": "Done",
                    "skill": {
                        "id": 1,
                        "title": "Front End Web Development",
                        "category": {
                            "id": 2,
                            "title": "Software Development",
                            "image": null
                        },
                        "description": "<p>Become a professional Front End web developer with our modern course routine.</p>\r\n<p>You will learn the practical use of front end technologies such as:</p>\r\n<ul style=\"list-style-type: square;\">\r\n<li>HTML</li>\r\n<li>CSS</li>\r\n<li>Javascript</li>\r\n<li>Bootstrap</li>\r\n<li>Git</li>\r\n<li>Javascript frameworks (React JS, Angular JS, Vue JS, Next JS)</li>\r\n</ul>",
                        "image": "/media/hackode/skills/webdev.jpg",
                        "duration": "3 Months",
                        "price": 160000
                    },
                    "course": {
                        "id": 1,
                        "order": 1,
                        "title": "HTML",
                        "image": "/media/hackode/courses/html.png"
                    },
                    "date": "2024-05-04T12:00:00Z",
                    "url": "https://meet.google.com/nvw-xbdr-vtq",
                    "venue": "Google Meet",
                    "description": ""
                }
            ]
        }
        // when list is empty
        {
            "status": "success",
            "message": "No schedule found"
        }`,
        error_response: `
        {
          "status": "error",
          "message": "Error occured while getting schedules"
        }`
    },
    {
        title: "Get A Skill Details",
        value: "get_site_info",
        method: "GET",
        type: "skill",
        url: `${base_url2}skills/get_skill/?skill_id={id-of-requested-skill}`,
        request: `
        const url = "${base_url2}skills/get_skill/?skill_id=1"
        
        fetch(url)
        .then(res => {return res.json()})
        .then(data => {console.log(data)})
        .catch(err => {console.log(err)})
        `,
        success_response: `
        {
            "status": "success",
            "message": "skill details fetched",
            "data": {
                "id": 1,
                "title": "Front End Web Development",
                "category": {
                    "id": 2,
                    "title": "Software Development",
                    "image": null
                },
                "description": "<p>Become a professional Front End web developer with our modern course routine.</p>\r\n<p>You will learn the practical use of front end technologies such as:</p>\r\n<ul style=\"list-style-type: square;\">\r\n<li>HTML</li>\r\n<li>CSS</li>\r\n<li>Javascript</li>\r\n<li>Bootstrap</li>\r\n<li>Git</li>\r\n<li>Javascript frameworks (React JS, Angular JS, Vue JS, Next JS)</li>\r\n</ul>",
                "image": "/media/hackode/skills/webdev.jpg",
                "duration": "3 Months",
                "price": 160000
            }
        }`,
        error_response: `
        {
          "status": "error",
          "message": "Error occured while getting skill details"
        }`
    },
    {
        title: "Get A Class Schedule Details",
        value: "get_site_info",
        method: "GET",
        type: "skill",
        url: `${base_url2}skills/get_schedule/?schedule_id={id-of-requested-schedule}`,
        request: `
        const url = "${base_url2}skills/get_schedule/?schedule_id=4"
        
        fetch(url)
        .then(res => {return res.json()})
        .then(data => {console.log(data)})
        .catch(err => {console.log(err)})
        `,
        success_response: `
        {
            "status": "success",
            "message": "schedule details fetched",
            "data": {
                "id": 4,
                "status": "Pending",
                "skill": {
                    "id": 1,
                    "title": "Front End Web Development",
                    "category": {
                        "id": 2,
                        "title": "Software Development",
                        "image": null
                    },
                    "description": "<p>Become a professional Front End web developer with our modern course routine.</p>\r\n<p>You will learn the practical use of front end technologies such as:</p>\r\n<ul style=\"list-style-type: square;\">\r\n<li>HTML</li>\r\n<li>CSS</li>\r\n<li>Javascript</li>\r\n<li>Bootstrap</li>\r\n<li>Git</li>\r\n<li>Javascript frameworks (React JS, Angular JS, Vue JS, Next JS)</li>\r\n</ul>",
                    "image": "/media/hackode/skills/webdev.jpg",
                    "duration": "3 Months",
                    "price": 160000
                },
                "course": {
                    "id": 3,
                    "order": 3,
                    "title": "Javascript",
                    "image": "/media/hackode/courses/js.png"
                },
                "date": "2024-05-05T04:54:43Z",
                "url": "https://meet.google.com/nvw-xbdr-vtq",
                "venue": "Google Meet",
                "description": "<p>dsfdfdsfd</p>"
            }
        }`,
        error_response: `
        {
          "status": "error",
          "message": "Error occured while getting schedule details"
        }`
    },
    {
        title: "Get Course List For A Skill",
        value: "get_site_info",
        method: "GET",
        type: "skill",
        url: `${base_url2}skills/get_skill_courses/?skill_id={id-of-requested-skill}`,
        request: `
        const url = "${base_url2}skills/get_skill_courses/?skill_id=1"
        
        fetch(url)
        .then(res => {return res.json()})
        .then(data => {console.log(data)})
        .catch(err => {console.log(err)})
        `,
        success_response: `
        // when a list is found
        {
            "status": "success",
            "message": "course list fetched",
            "data": [
                {
                    "id": 1,
                    "order": 1,
                    "title": "HTML",
                    "image": "/media/hackode/courses/html.png"
                },
                {
                    "id": 2,
                    "order": 2,
                    "title": "CSS",
                    "image": "/media/hackode/courses/css.png"
                },
                {
                    "id": 3,
                    "order": 3,
                    "title": "Javascript",
                    "image": "/media/hackode/courses/js.png"
                },
                {
                    "id": 8,
                    "order": 4,
                    "title": "Git",
                    "image": "/media/hackode/courses/git.png"
                },
                {
                    "id": 9,
                    "order": 5,
                    "title": "Bootstrap",
                    "image": "/media/hackode/courses/bootstrap.png"
                },
                {
                    "id": 4,
                    "order": 6,
                    "title": "React JS",
                    "image": "/media/hackode/courses/react.png"
                },
                {
                    "id": 10,
                    "order": 7,
                    "title": "Angular JS",
                    "image": null
                },
                {
                    "id": 11,
                    "order": 8,
                    "title": "Next JS",
                    "image": null
                },
                {
                    "id": 12,
                    "order": 9,
                    "title": "Nuxt JS",
                    "image": null
                },
                {
                    "id": 13,
                    "order": 10,
                    "title": "Solidity",
                    "image": null
                }
            ]
        }
        // when requested list is empty
        {
            "status": "success",
            "message": "No course found"
        }`,
        error_response: `
        {
          "status": "error",
          "message": "Error occured while getting courses"
        }`
    },
    {
        title: "Get Reviews For A Skill",
        value: "get_site_info",
        method: "GET",
        type: "skill",
        url: ``,
        request: `
        const url = ""
        
        fetch(url)
        .then(res => {return res.json()})
        .then(data => {console.log(data)})
        .catch(err => {console.log(err)})
        `,
        success_response: `
        // when a list is found
        
        // when requested list is empty
        {
            "status": "success",
            "message": "No review found"
        }`,
        error_response: `
        {
          "status": "error",
          "message": "Error occured while getting reviews"
        }`
    },
    {
        title: "Enroll A Skill",
        value: "get_site_info",
        method: "POST",
        type: "skill",
        url: `${base_url2}skills/enroll_skill/`,
        request: `
        const url = "${base_url2}skills/enroll_skill/"
        
        const formData = new FormData();
        formData.append('skill_id', 6)
        formData.append('api_token', '*********************') 
        
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
        // for free courses
        {
          "status": "success",
          "message": "You have successfully enrolled for Embedded systems engineering",
          "mode": "free"
        }
        // for paid courses
        {
          "status": "success",
          "mode": "paid",
          "paystack_pub_key": "pk_live_*************************", // public key used for paystack payment gateway
          "skill": {
            "id": 6,
            "title": "Embdded systems engineering",
            "category": {
                "id": 4,
                "title": "Hardware Engineering",
                "image": null
            },
            "description": "",
            "image": null,
            "duration": "3 Months",
            "price": 0
          },
          "data": {
            "amount": 200000,
            "date": "2024-05-07T07:54:43.746309Z",
            "email":"johndoe@gmail.com",
            "id": 42,
            "reference_id": "RIGAN_79742342502735657448",
            "status": "Pending"
          } // transaction details (details of how to implement payment gateway coming soon)
        }`,
        error_response: `
        // errors due to already registered skill
        {
          "status": "error",
          "message": "You are already enrolled for \"Embedded systems engineering\""
        }
        // errors due to server
        {
          "status": "error",
          "message": "Error occured while enrolling user"
        }`
    },
]



function loadApi() {
  var x = admin
  $('#apuser').empty();
  $('#aprig').empty();
  $('#apaccount').empty();
  $('#apskill').empty();
  $('#approject').empty();
  $('#apgroup').empty();
  $('#apgpt').empty();

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
        case "rigl":
          $('#aprig').append(temp);
          break;
        case "account":
          $('#apaccount').append(temp);
          break;
        case "user":
          $('#apuser').append(temp);
          break;
        case "skill":
          $('#apskill').append(temp);
          break;
        case "project":
          $('#approject').append(temp);
          break;
        case "group":
          $('#apgroup').append(temp);
          break;
        case "gpt":
          $('#apgpt').append(temp);
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