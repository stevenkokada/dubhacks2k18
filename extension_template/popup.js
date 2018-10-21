var changeType = function() {
	var currencyType = document.getElementById('currencyType').value;
	// sets the current alternative altruistic currency type
	chrome.storage.sync.set({'currency-type': currencyType}, function() {
  		console.log('Value currently is ' + currencyType);
	});
}

chrome.storage.sync.get(['currency-type'], function(res) {
  document.getElementById('currencyType').value = res['currency-type'];
});

// calls change type function when the currency type is selected
document.getElementById('currencyType').onchange = changeType;
