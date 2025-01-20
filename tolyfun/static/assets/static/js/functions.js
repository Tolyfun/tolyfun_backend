
/* Navigation bar */
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
//localStorage.removeItem('api_key')
function openNav() {
    $(".sidenav").toggleClass('active');
    $("main").toggleClass('active');
}

function escapeHtml(text) {
  var escapedText = $('<code>').text(text).html();
  return escapedText.replace(/\n/g, '&lt;br&gt;')
}