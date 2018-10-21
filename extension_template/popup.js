var changeType = function() {
	var currencyType = document.getElementById('currencyType').value;
	// sets the current alternative altruistic currency type
	chrome.storage.sync.set({'currency-type': currencyType}, function() {
  		console.log('Value currently is ' + currencyType);
	});
}

// calls change type function when the currency type is selected
document.getElementById('currencyType').onchange = changeType;