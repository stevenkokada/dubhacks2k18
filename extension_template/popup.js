var changeType = function() {
	var currencyType = document.getElementById('currencyType').value;
	chrome.storage.sync.set({'currency-type': currencyType}, function() {
  		console.log('Value currently is ' + currencyType);
	});
}

document.getElementById('currencyType').onchange = changeType;