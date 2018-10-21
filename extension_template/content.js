var conversion = {"lbs of rice": 1/0.89,
                  "meals": 1/8.0,
                  "weeks of groceries": 1/160.0,
                  "malaria nets": 1/2.0,
                  "gals of water": 1/1.22,
                  "days of child labor": 1/0.2,
                  "big macs": 1/5.51}; // as of July 2018

function walkText(node, parent, conversion_type) {
  var convertPrice = function(price_string) {
    var cleaned = price_string.trim().replace(',','');
    if(cleaned.charAt(0) == "$") {
      cleaned = cleaned.substring(1);
    }

    var numeric = parseFloat(cleaned) * conversion[conversion_type];

    return numeric.toFixed(2).toString() + " " + conversion_type + 
        " (" + parseFloat(cleaned).toFixed(2).toString() + " USD)";
  }

  if(node.nodeType == 1 && $(node).hasClass("sx-price")) {
    var converted = convertPrice($(node).children("[class~=sx-price-whole]").html() + 
        "." + $(node).children("[class~=sx-price-fractional]").html());

    node.innerHTML = '<span class="sx-price-whole">' + converted + '</span>';
  } else if(node.nodeType == 1 && $(node).hasClass("a-price")) {
    var converted = convertPrice($(node).children("[class~=a-offscreen]").html());

    node.innerHTML = '<span class="a-price-whole">' + converted + '</span>';
  } else if(node.nodeType == 1 && node.nodeName != "SCRIPT") {
    for(var i = 0; i < node.childNodes.length; i++) {
      walkText(node.childNodes[i], node, conversion_type);
    }
  } else if(node.nodeType == 3) {
    var text = node.nodeValue;
    var r = /\$\d+(,\d{3})*\.?[0-9]?[0-9]?/g;
    var original = text.match(r);

    if(original != null) {
      var replaced_text = text.replace(r, function(pri){ return convertPrice(pri); });

      node.nodeValue = replaced_text;
    }
  }
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    if(key == "currency-type") {
      location.reload();
      return;
    }
  }
});

var obs_callback = function(mutList, obs) {
  chrome.storage.sync.get("currency-type", function(result) {
    var conversion_type = result['currency-type'];

    for(var mut of mutList) {
      if(mut.type == 'childList') {
        for(var i = 0; i < mut.addedNodes.length; i++) {
          walkText(mut.addedNodes[i], mut.target, conversion_type);
        }
      }
    }
  });
}

var obs = new MutationObserver(obs_callback);
chrome.storage.sync.get("currency-type", function(result) {
  walkText(document.body, document, result['currency-type']);
});

obs.observe(document.body, {attributes: true, childList: true, subtree: true});
