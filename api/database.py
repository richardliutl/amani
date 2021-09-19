import pyrebase
from env import firebaseConfig
import fetch

from flask import Flask

app = Flask(__name__)

def push_user(db, data):
  user_id = data["id"]
  db.child("Users").child(user_id).push(data)

def push_restaurant(db, data):
  restaurant_id = data["place_id"]
  db.child("Restaurant").child(restaurant_id).set(data)

def set_field(db, data):
  restaurant_id = data["place_id"]
  db.child("Restaurant").child(restaurant_id).update(data)

def get_all_restauants(db, args):
  restaurant_id = args["place_id"]
  result = db.child("Restaurant").child(restaurant_id).get()
  return result

@app.route("/")
def root():
  firebase = pyrebase.initialize_app(firebaseConfig)
  db = firebase.database()
  results = fetch.get_results()
  r = results[0]
  print(r)
  push_restaurant(db, r)
  r["catering"] = False
  set_field(db, r)
  result = get_all_restauants(db, r)
  return result.val()
