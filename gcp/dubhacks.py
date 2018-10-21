import html
from bs4 import BeautifulSoup
from flask import Flask, jsonify, make_response, request, render_template
app = Flask(__name__, template_folder='.')

@app.route("/")
def hello():
  return render_template('index.html')


@app.route("/report", methods=["POST", "GET"])
def report():

    if request.method == "GET":
        return make_response(jsonify({'error': 'Use POST instead'}), 400)

    if request.method == "POST":
        html_text = request.files['html']

        if html_text is None:
            return make_response(jsonify({'error': 'Missing data parameter'}), 400)


        return jsonify(total_spent(html_text))


# order_page should be the HTML content of the order page as a string
def total_spent(order_page):
  soup = BeautifulSoup(order_page, "html.parser")
  total_cost = 0.0
  for item in soup.find_all("div", class_="a-col-right"):
    item_name = item.find("a", class_="a-link-normal")
    item_price = item.find("span", class_="a-color-price")

    if item_name is not None and item_price is not None:
      total_cost += float(item_price.string.strip()[1:])

  return total_cost


if __name__ == '__main__':
    app.run()
