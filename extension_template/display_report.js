$("#add-to-cart-button, .a-button-input").click(function(){


chrome.storage.sync.get("currency-type", function(result) {
  var conversion_type = result['currency-type'];

  if (conversion_type == 'lbs of rice' || conversion_type == 'meals' || conversion_type == 'weeks of groceries' || conversion_type == 'big macs'){
    window.open("https://give.wfp.org/607/?step=country&utm_campaign=2017-wfp-donatenowpage-onetime-button1&utm_source=2017-wfp-donatenowpage-onetime-button1&_ga=2.16435313.654337630.1540113451-137370510.1540113451&utm_medium=legacy");

  }

  if (conversion_type == 'gals of water'){
    window.open("https://www.charitywater.org/donate");


  }

  if (conversion_type == 'malaria nets'){
    window.open("https://www.againstmalaria.com/donate.aspx");

  }

  if (conversion_type == 'days of child labor'){
    window.open("http://endchildlabor.net/donate/");
  }


});

});
