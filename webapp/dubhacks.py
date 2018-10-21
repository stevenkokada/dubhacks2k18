import html
from bs4 import BeautifulSoup
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
  return "Hello World!"

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