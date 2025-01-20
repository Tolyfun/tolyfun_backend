function payWithPaystack() {
    let currency = "NGN";
    let plan = "";
    let ref = "THECOURT_12345678943566596";
    let amount = 230000;

    let obj = {
      key: "pk_test_87dbe2659800386cb5293afe7b080c3d810c2454",
      email: "hassanridwan2536@gmail.com",
      amount: Number(amount)*100, // multiply by 100 since transaction is made in kobo
      ref: ref,
      callback: function(response) {
        console.log(response);
        $('.payment').html('Verifying Payment...')
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

  function verifyPayment(ref) {
    const url = "http://127.0.0.1:8000/api/v2/rooms/verify_payment/"
  
    const formData = new FormData();
    formData.append('api_token', 'J8P7RRSYC4R483TNYUN3KD85178JVCM3QW1R7EGC8IA8K9Q2KY');
    formData.append('transaction_id', ref);

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data);
        $('.payment').html('Make Payment')
        swal(data.status, data.message, data.status)
    })
    .catch(err => {console.log(err)})
  }

  function create_account() {
    const url = "http://127.0.0.1:8000/api/v2/student/create_account/"
  
    const formData = new FormData();
      formData.append('username', 'johndoe')
      formData.append('password', 'hassan2536') // must be at least 8 characters and alphanumeric
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
      .then(data => {
        console.log(data);
        $('.register').html("Create Account")
      })
      .catch(err => {console.log(err)})
  }


//swal("Success", "this is a success message", 'success')