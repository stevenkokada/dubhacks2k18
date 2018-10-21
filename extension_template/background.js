const initial_type = "malaria nets";

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({'currency-type': initial_type}, function() {});
})