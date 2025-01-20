
var base_url2 = `https://riganapi.pythonanywhere.com/api/v3/`
var admin = [
    // For site API
    {
        title: "Get Site Information",
        value: "get_site_info",
        method: "GET",
        url: `${base_url2}site/get_site_info/?site_id={site_id}`,
        request: `
        const url = "${base_url2}site/get_site_info/?site_id={site_id}"
        
        fetch(url)
        .then(res => {return res.json()})
        .then(data => {console.log(data)})
        .catch(err => {console.log(err)})
        `,
        success_response: `
        {
          "status": "success",
          "message": "site info fetched",
          "data": {
              "id": 1,
              "title": "Rigan Store",
              "tagline": "giving you a good life",
              "description": "An Ecommerce site to get all quality and affordable wears including women's wear, underwears, crop tops, bags, footwears, etc.",
              "logo": "/media/site/logo/rigan_logo.png",
              "icon": "/media/site/icon/loader.png",
              "template": null,
              "plan": {
                  "id": 3,
                  "title": "Corporate",
                  "level": 3,
                  "no_of_users": 500,
                  "price": 1999,
                  "year_price": 23988,
                  "domain": true,
                  "template_editing": true,
                  "ai_assistant": false
              },
              "deadline": "2025-03-16T08:23:14.112338Z",
              "email": "rigantech@gmail.com",
              "facebook": "https://web.facebook.com/",
              "linkedin": "https://linkedin.com",
              "x_account": "https://x.com/",
              "whatsapp": "https://wa.me/2347011978058",
              "active": true
          }
        }`,
        error_response: `
        {
          "status": "error",
          "message": "Error while getting site info"
        }`
    },
  /* =========================== Products ========================= */
  
  {
    title: "Get Products",
    value: "get_products",
    method: "GET",
    url: `${base_url2}products/get_products/?site_id={site_id}&page={page_number}&per_page={item_per_page}&sort_by{list_sorting}&search={search_query}&category_id={id_of_filtered_category}&sub_category_id={id_of_filtered_sub_category}`,
    request: `
    const url = '${base_url2}products/get_products/?site_id={site_id}';
    // the following are the available parameters for sorting and filtering (all optional except for site_id)
    // page: an integer to call a page number (based on item per page and total list retrievable); default = 1
    // per_page: an integer; number of list items to be retrieved at a time; default = 20
    // sort_by: sorting/arrangement list. available sorting are: (default = title)
    //  1. title: arrange by title in ascending alphabetical order
    //  2. -title: arrange by title in descending alphabetical order
    //  3. created: arrange by date from old to new products
    //  4. -created: arrange by date from new to old products
    //  5. price: arrange by price from cheapest
    //  6. -price: arrange by price from costliest
    //  7. discount: arrange by discount from the least discount
    //  8. -discount: arrange by discount from the most discount
    //  9. number_of_sales: arrange from the least sold out
    //  10. -number_of_sales: arrange from the most sold out
    // search: a string; searches are matched against title, description, and product ID
    // category_id: an integer; id of category if filtering products by category
    // sub_category_id: an integer; id of sub_category if filtering products by sub_category (requires the category_id)
    
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    // when a list is found
    {
      "status": "success",
      "data": [
          {
              "id": 2,
              "title": "Apple Headphones",
              "product_id": "PHA2",
              "description": "A headphone with:\r\n2hrs+ Battery time\r\n15Db sound volume",
              "brand": {
                  "id": 2,
                  "title": "Apple"
              },
              "category": {
                  "id": 1,
                  "title": "Phone Accessories",
                  "image": "/media/categories/headphone.png"
              },
              "sub_category": {
                  "id": 2,
                  "category": {
                      "id": 1,
                      "title": "Phone Accessories",
                      "image": "/media/categories/headphone.png"
                  },
                  "title": "Headphones",
                  "image": "/media/sub_categories/headphone.png"
              },
              "price": 7200,
              "image": "/media/products/img1.png",
              "available": true,
              "old_price": 8000,
              "discount": 10,
              "stock_number": 5,
              "number_of_sales": 0,
              "rating": 5
          },
          {
              "id": 1,
              "title": "Oraimo Airpods",
              "product_id": "PAA115",
              "description": "",
              "brand": {
                  "id": 1,
                  "title": "Oraimo"
              },
              "category": {
                  "id": 1,
                  "title": "Phone Accessories",
                  "image": "/media/categories/headphone.png"
              },
              "sub_category": {
                  "id": 1,
                  "category": {
                      "id": 1,
                      "title": "Phone Accessories",
                      "image": "/media/categories/headphone.png"
                  },
                  "title": "Airpods",
                  "image": "/media/sub_categories/airpods.png"
              },
              "price": 4500,
              "image": "/media/products/airpods.png",
              "available": true,
              "old_price": 0,
              "discount": 0,
              "stock_number": 5,
              "number_of_sales": 1,
              "rating": 3
          }
      ],
      "message": "product list retrieved",
      "page_number": 1,
      "list_per_page": 20,
      "total_pages": 1,
      "total_items": 2,
      "search_query": ""
    }
    
    // when requested list is empty
    {
      "status": "success",
      "message": "no product found",
      "page_number": 1,
      "list_per_page": 10,
      "total_pages": 1,
      "total_items": 0,
      "search_query": ""
    }`,
    error_response: `
    // error due to invalid parameter values/site ID
        {
          "status": "error",
          "message": "Error getting product list"
        }`,
  },
  {
    title: "Get Flash Sales Products",
    value: "get_flash_products",
    method: "GET",
    url: `${base_url2}products/get_flash_products/?site_id={site_id}&items={number_of_items_to_retrieve}`,
    request: `
    const url = '${base_url2}products/get_flash_products/?site_id={site_id}';
    // the following are the available parameters for sorting and filtering (all optional except for site_id)
    // items: an integer to retrieve a certain number of items; default = 5
    
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    // when a list is found
    {
      "status": "success",
      "data": [
          {
              "id": 2,
              "title": "Apple Headphones",
              "product_id": "PHA2",
              "description": "A headphone with:\r\n2hrs+ Battery time\r\n15Db sound volume",
              "brand": {
                  "id": 2,
                  "title": "Apple"
              },
              "category": {
                  "id": 1,
                  "title": "Phone Accessories",
                  "image": "/media/categories/headphone.png"
              },
              "sub_category": {
                  "id": 2,
                  "category": {
                      "id": 1,
                      "title": "Phone Accessories",
                      "image": "/media/categories/headphone.png"
                  },
                  "title": "Headphones",
                  "image": "/media/sub_categories/headphone.png"
              },
              "price": 7200,
              "image": "/media/products/img1.png",
              "available": true,
              "old_price": 8000,
              "discount": 10,
              "stock_number": 5,
              "number_of_sales": 0,
              "rating": 5
          }
      ],
      "message": "flash product list retrieved"
    }
    
    // when requested list is empty
    {
      "status": "success",
      "message": "no flash product found"
    }`,
    error_response: `
    // error due to invalid parameter values/site ID
    {
      "status": "error",
      "message": "Error getting flash product list"
    }`,
  },
  {
    title: "Get New Products",
    value: "get_new_products",
    method: "GET",
    url: `${base_url2}products/get_new_products/?site_id={site_id}&items={number_of_items_to_retrieve}`,
    request: `
    const url = '${base_url2}products/get_new_products/?site_id={site_id}';
    // the following are the available parameters for sorting and filtering (all optional except for site_id)
    // items: an integer to retrieve a certain number of items; default = 5
    
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    // when a list is found
    {
      "status": "success",
      "data": [
          {
              "id": 2,
              "title": "Apple Headphones",
              "product_id": "PHA2",
              "description": "A headphone with:\r\n2hrs+ Battery time\r\n15Db sound volume",
              "brand": {
                  "id": 2,
                  "title": "Apple"
              },
              "category": {
                  "id": 1,
                  "title": "Phone Accessories",
                  "image": "/media/categories/headphone.png"
              },
              "sub_category": {
                  "id": 2,
                  "category": {
                      "id": 1,
                      "title": "Phone Accessories",
                      "image": "/media/categories/headphone.png"
                  },
                  "title": "Headphones",
                  "image": "/media/sub_categories/headphone.png"
              },
              "price": 7200,
              "image": "/media/products/img1.png",
              "available": true,
              "old_price": 8000,
              "discount": 10,
              "stock_number": 5,
              "number_of_sales": 0,
              "rating": 5
          },
          {
              "id": 1,
              "title": "Oraimo Airpods",
              "product_id": "PAA115",
              "description": "",
              "brand": {
                  "id": 1,
                  "title": "Oraimo"
              },
              "category": {
                  "id": 1,
                  "title": "Phone Accessories",
                  "image": "/media/categories/headphone.png"
              },
              "sub_category": {
                  "id": 1,
                  "category": {
                      "id": 1,
                      "title": "Phone Accessories",
                      "image": "/media/categories/headphone.png"
                  },
                  "title": "Airpods",
                  "image": "/media/sub_categories/airpods.png"
              },
              "price": 4500,
              "image": "/media/products/airpods.png",
              "available": true,
              "old_price": 0,
              "discount": 0,
              "stock_number": 5,
              "number_of_sales": 1,
              "rating": 3
          }
      ],
      "message": "new product list retrieved"
    }
    
    // when requested list is empty
    {
      "status": "success",
      "message": "no new product found"
    }`,
    error_response: `
    // error due to invalid parameter values/site ID
        {
          "status": "error",
          "message": "Error getting new product list"
        }`,
  },
  {
    title: "Get A Product",
    value: "get_a_product",
    method: "GET",
    url: `${base_url2}products/get_product/?site_id={site_id}&product_id={id_of_product}`,
    request: `
    const url = '${base_url2}products/get_product/?site_id={site_id}&product_id={id_of_product}';
    
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    {
      "status": "success",
      "data": {
          "id": 2,
          "title": "Apple Headphones",
          "product_id": "PHA2",
          "description": "A headphone with:\r\n2hrs+ Battery time\r\n15Db sound volume",
          "brand": {
              "id": 2,
              "title": "Apple"
          },
          "category": {
              "id": 1,
              "title": "Phone Accessories",
              "image": "/media/categories/headphone.png"
          },
          "sub_category": {
              "id": 2,
              "category": {
                  "id": 1,
                  "title": "Phone Accessories",
                  "image": "/media/categories/headphone.png"
              },
              "title": "Headphones",
              "image": "/media/sub_categories/headphone.png"
          },
          "price": 7200,
          "image": "/media/products/img1.png",
          "available": true,
          "old_price": 8000,
          "discount": 10,
          "stock_number": 5,
          "number_of_sales": 0,
          "rating": 5
      },
      "message": "product details retrieved"
    }`,
    error_response: `
    // error due to invalid product ID/site ID
        {
          "status": "error",
          "message": "Error getting product details"
        }`,
  },
  {
    title: "Get Similar Products",
    value: "get_similar_products",
    method: "GET",
    url: `${base_url2}products/get_similar_products/?site_id={site_id}&product_id={id_of_product}&items={number_of_items_to_retrieve}`,
    request: `
    const url = '${base_url2}products/get_similar_products/?site_id={site_id}&product_id={id_of_product}';
    // the following are the available parameters for sorting and filtering (all optional except for site_id)
    // items: an integer to retrieve a certain number of items; default = 5
    
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    // when a list is found
    {
      "status": "success",
      "data": [
          {
              "id": 1,
              "title": "Oraimo Airpods",
              "product_id": "PAA115",
              "description": "",
              "brand": {
                  "id": 1,
                  "title": "Oraimo"
              },
              "category": {
                  "id": 1,
                  "title": "Phone Accessories",
                  "image": "/media/categories/headphone.png"
              },
              "sub_category": {
                  "id": 1,
                  "category": {
                      "id": 1,
                      "title": "Phone Accessories",
                      "image": "/media/categories/headphone.png"
                  },
                  "title": "Airpods",
                  "image": "/media/sub_categories/airpods.png"
              },
              "price": 4500,
              "image": "/media/products/airpods.png",
              "available": true,
              "old_price": 0,
              "discount": 0,
              "stock_number": 5,
              "number_of_sales": 1,
              "rating": 5
          }
      ],
      "message": "similar product list retrieved"
    }
    
    // when requested list is empty
    {
      "status": "success",
      "message": "no similar product found"
    }`,
    error_response: `
    // error due to invalid product ID/site ID
        {
          "status": "error",
          "message": "Error getting similar product list"
        }`,
  },
  {
    title: "Get Product Comments",
    value: "get_similar_produs",
    method: "GET",
    url: `${base_url2}products/get_product_comments/?site_id={site_id}&product_id={id_of_product}`,
    request: `
    const url = '${base_url2}products/get_product_comments/?site_id={site_id}&product_id={id_of_product}';
    
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    // when a list is found
    {
      "status": "success",
      "data": [
          {
              "id": 1,
              "user": "Hab Ama",
              "comment": "this is nice",
              "reply": "Thank you for your comment",
              "created": "2024-05-03T14:26:59Z"
          }
      ],
      "message": "comment list retrieved"
    }
    
    // when requested list is empty
    {
      "status": "success",
      "message": "no comment found"
    }`,
    error_response: `
    // error due to invalid product ID/site ID
        {
          "status": "error",
          "message": "Error getting comment list"
        }`,
  },
  {
    title: "Get Product Categories",
    value: "get_product_categories",
    method: "GET",
    url: `${base_url2}categories/get_categories/?site_id={site_id}`,
    request: `
    const url = '${base_url2}categories/get_categories/?site_id={site_id}';
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    // when a list is found
    {
      "status": "success",
      "data": [
          {
              "id": 2,
              "title": "Bags",
              "image": null
          },
          {
              "id": 1,
              "title": "Phone Accessories",
              "image": "/media/categories/headphone.png"
          }
      ],
      "message": "category list retrieved"
    }
    
    // when requested list is empty
    {
      "status": "success",
      "message": "no category found"
    }`,
    error_response: `
    // error due to
        {
          "status": "error",
          "message": "Error getting category list"
        }`,
  },
  {
    title: "Get Sub Categories",
    value: "get_sub_categories",
    method: "GET",
    url: `${base_url2}categories/get_sub_categories/?site_id={site_id}&category_id={category_id}`,
    request: `
    const url = '${base_url2}categories/get_sub_categories/?site_id={site_id}&category_id={category_id}';
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    // when a list is found
    {
      "status": "success",
      "data": [
          {
              "id": 1,
              "category": {
                  "id": 1,
                  "title": "Phone Accessories",
                  "image": "/media/categories/headphone.png"
              },
              "title": "Airpods",
              "image": "/media/sub_categories/airpods.png"
          },
          {
              "id": 2,
              "category": {
                  "id": 1,
                  "title": "Phone Accessories",
                  "image": "/media/categories/headphone.png"
              },
              "title": "Headphones",
              "image": "/media/sub_categories/headphone.png"
          }
      ],
      "message": "subcategory list retrieved"
    }
    
    // when requested list is empty
    {
      "status": "success",
      "message": "no sub category found for Phone Accessories"
    }`,
    error_response: `
    // error due to
        {
          "status": "error",
          "message": "Error getting sub category list"
        }`,
  },
  {
    title: "Get Brands",
    value: "get_brands",
    method: "GET",
    url: `${base_url2}categories/get_brands/?sub_category_id={sub_category_id}`,
    request: `
    const url = '${base_url2}categories/get_brands/?sub_category_id={sub_category_id}';
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    // when a list is found
    {
      "status": "success",
      "data": [
          {
              "id": 1,
              "title": "Oraimo"
          }
      ],
      "message": "brand list retrieved"
    }
    
    // when requested list is empty
    {
      "status": "success",
      "message": "no brand found for Headphones"
    }`,
    error_response: `
    // error due to
        {
          "status": "error",
          "message": "Error getting brand list"
        }`,
  },
  
  {
    title: "Add Comment",
    value: "add_comment",
    method: "POST",
    url: `${base_url2}products/add_comment/`,
    request: `
    const url = '${base_url2}products/add_comment/';
    const formData = new FormData();
    formData.append('site_id', site_id)
    formData.append('product_id', id-of-product-to-be-commented) // integer
    formData.append('name', 'John')
    formData.append('comment', 'user-comment')
    formData.append('star', 4) // integer value for project rating (default is 5)
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    {
      "status": "success",
      "message": "comment added sucessfully",
      "data": {
        "id": 7,
        "user": "John",
        "comment": "user-comment",
        "reply": "",
        "star": 4,
        "created": "2023-12-21T20:12:18Z"
      }
    }`,
    error_response: `
    // error due to invalid parameters
        {
          "status": "error",
          "message": "Invalid product ID or Site ID"
        }`,
  },
  /* =========================== Messages ========================= 
  {
    title: "Send Message",
    value: "send_message",
    method: "POST",
    url: `${base_url2}messages/add_message/`,
    request: `
    const url = '${base_url2}messages/add_message/';
    const formData = new FormData();
    formData.append('api_token', your-api-key)
    formData.append('name', 'John')
    formData.append('email', 'john@gmail.com')
    formData.append('message', 'user-message')
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    {
      "status": "success",
      "message": "message sent sucessfully"
    }`,
    error_response: `
    // error due to
        {
          "status": "error",
          "message": "error sending message"
        }`,
  },
  // template
  {
    title: "Admin Resume URL",
    value: "",
    method: "",
    url: `https://riganapi.pythonanywhere.com/resume/{admin_username}/`,
    request: ``,
    success_response: ``,
    error_response: ``,
  },
  */
]



function loadApi() {
  var x = admin
  $('.api-main').empty();
  for (var i in x) {
      var temp = `
      <section id="${x[i].value}" class="w-padding">
          <h3 class="w-bold-xx mt-3 endpoint-tit"><span>${x[i].title}</span><span><i class="fa fa-chevron-down"></i></span></h3>
          <div class="endpoint">
          <div class="table-responsive">
            <table class="table">
              <tbody>
                <tr>
                  <td>Method</td>
                  <td>${x[i].method}</td>
                </tr>
                <tr>
                  <td>URL</td>
                  <td>${x[i].url}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <section>
              <div class="code-header">
                  <div>Request</div>
                  <select class="lang-sel">
                      <option selected value="axios">Fetch</option>
                  </select>
              </div>
<pre aria-hidden="true">
<code class="language-javascript highlighting-content axios">
${x[i].request}
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
      $('.api-main').append(temp);
  }
  $('.page-load').css({'display': 'none'})
  $('.endpoint-tit').click(function() {
    $(this).siblings('.endpoint').toggleClass('active')
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