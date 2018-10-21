var conversion = {"bags of rice": 1/0.89}

function walkText(node, parent) {
  if (node.nodeType == 3) {
    var text = node.nodeValue;
    //var r = /($|\s)\$[0-9]+(\.[0-9][0-9])?(\s|$)/;
    var r = /\b\d+(\.\d\d)?\b/g;
    var original = text.match(r);

    if (original != null){
      console.log(node)
      console.log(original)
      var priceText = original.toString().trim();
      if(priceText.charAt(0) == "$") {
        priceText = priceText.substring(1);
      }

      var numeric = parseFloat(priceText) * conversion["bags of rice"]
      var replacedText = text.replace(r, numeric.toFixed(2).toString() + " bags of rice");

      if (replacedText !== text) {
        parent.replaceChild(document.createTextNode(replacedText), node);
      }
    }
  }


  if (node.nodeType == 1 && node.nodeName != "SCRIPT") {
    for (var i = 0; i < node.childNodes.length; i++) {
      walkText(node.childNodes[i], node);
    }
  }
}

walkText(document.body, document);
