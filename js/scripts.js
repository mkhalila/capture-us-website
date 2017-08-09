var pathArray = window.location.pathname.split("/")
var currentPage = pathArray[pathArray.length - 1];

switch (currentPage) {
	case "index.html":
	  initCookieConsent();
	  initCarousel();
		quoteAutomation();
		$(".gallery").photoSwipe();
	  break;
	case "products.html":
		break;
	case "gallery.html":
		$(".gallery").photoSwipe();
		break;
	case "faqs.html":
		break;
	case "contact.html":
		$("#date-picker").pickadate();
    $("#time-picker").pickatime();
    $('.selectize').selectize();
		break;
}	

function initCookieConsent() {
	window.addEventListener("load", function() {
    window.cookieconsent.initialise({
      "palette": {
        "popup": {
          "background": "#000",
          "text": "#9c7f1e"
        },
        "button": {
          "background": "#9c7f1e",
          "text": "#050505"
        }
      },
      "position": "bottom-left",
      "theme": "classic",
      "content": {
        "dismiss": "Agree"
      }
    })
  });
}

function initCarousel() {
	var owl = $('.owl-carousel');
  owl.owlCarousel({
    margin: 20,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  });
}

function quoteAutomation() {
	// Quote automation
  var quotes = [
    "Amazing setup, u guys delivered. Honestly love you guys"
  ];

  randNumber = Math.random() * (quotes.length - 1);
  randIndex = Math.round(randNumber);
  randQuote = quotes[randIndex];

  document.getElementById("auto-quote").innerHTML = randQuote;
}

function switchToEnquiryForm() {
  var switchEnquiry = document.getElementById("switch-enquiry");
  var switchQuote = document.getElementById("switch-quote");
  var enquiryForm = document.getElementById("enquiry-form");

  switchEnquiry.disabled = true;
  switchQuote.disabled = false;

  switchEnquiry.style.backgroundColor = "rgba(223, 181, 43, 0.7)";
  switchEnquiry.style.color = "black";
  switchQuote.style.backgroundColor = "black";
  switchQuote.style.color = "rgba(223, 181, 43, 0.7)";
  document.getElementById("contact-quote").style.display = "none";
  document.getElementById("contact-enquiry").style.display = "";

  document.getElementById("gform").id = "quote-form";
  if(enquiryForm) enquiryForm.id = "gform";
}

function switchToQuoteForm() {
  var switchEnquiry = document.getElementById("switch-enquiry");
  var switchQuote = document.getElementById("switch-quote");
  var gForm = document.getElementById("gform");

  switchQuote.disabled = true;
  switchEnquiry.disabled = false;

  switchQuote.style.backgroundColor = "rgba(223, 181, 43, 0.7)";
  switchQuote.style.color = "black";
  switchEnquiry.style.backgroundColor = "black";
  switchEnquiry.style.color = "rgba(223, 181, 43, 0.7)";
  document.getElementById("contact-enquiry").style.display = "none";
  document.getElementById("contact-quote").style.display = "";

  if(gForm) gForm.id = "enquiry-form";
  document.getElementById("quote-form").id = "gform";
}