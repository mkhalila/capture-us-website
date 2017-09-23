
function isValidEmail (email) { 
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

function validateHuman (honeypot) {
  if (honeypot) return true; //if hidden form filled up 
  else return false;
}

// get all data in form and return object
function getFormData(form) {
  var elements = document.getElementById (form).elements; // all form elements

  var fields = Object.keys (elements).map (function (k) {
    if (elements[k].name !== undefined) return elements[k].name;
    // special case for Edge's html collection
    else if (elements[k].length > 0) return elements[k].item(0).name;
  }).filter (function (item, pos, self) {
    return self.indexOf (item) == pos && item;
  });

  var data = {};

  fields.forEach (function (k) {
    data[k] = elements[k].value;
    var str = ""; 

    // special case for Edge's html collection
    if (elements[k].type === "checkbox") { 
      str = str + elements[k].checked + ", "; 
      data[k] = str.slice(0, -2); 

    } else if (elements[k].length) {
      for (var i = 0; i < elements[k].length; i++) {
        if (elements[k].item (i).checked) {
          str = str + elements[k].item (i).value + ", ";
          data[k] = str.slice(0, -2);
        }
      }
    }
  });

  return data;
}

function sendEmail (formID, alertID) {
  var data = getFormData(formID);

  if (isValidEmail (data.email)) {
    var url = event.target.action; 
    var xhr = new XMLHttpRequest();

    xhr.open ('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      document.getElementById (formID).style.display = 'none';
      document.getElementById (alertID).style.display = 'block';
    };

    // url encode form data for sending as post data
    var encoded = Object.keys (data).map (function (k) {
      return encodeURIComponent (k) + '=' + encodeURIComponent (data[k])
    }).join ('&');

    xhr.send (encoded);
  }
}

function handleFormSubmit1 (event) {
  event.preventDefault();

  // OPTION: Remove this comment to enable SPAM prevention, see README.md
  // if (validateHuman(data.honeypot)) return false;

  sendEmail ('enquiry-form', 'enquiry-success');
}

function handleFormSubmit2 (event) {
  event.preventDefault();

  // OPTION: Remove this comment to enable SPAM prevention, see README.md
  // if (validateHuman(data.honeypot)) return false;

  sendEmail ('quote-form', 'quote-success');
}

function loaded() {
  var enquiryForm = document.getElementById ('enquiry-form');
  var quoteForm = document.getElementById ('quote-form');

  enquiryForm.addEventListener ("submit", handleFormSubmit1, false);
  quoteForm.addEventListener ("submit", handleFormSubmit2, false);
}

document.addEventListener ('DOMContentLoaded', loaded, false);