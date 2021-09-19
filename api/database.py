import pyrebase
from env import firebaseConfig
import fetch

def push_user(db, data):
  user_id = data["id"]
  db.child("Users").child(user_id).push(data)

def push_restaurant(db, data):
  restaurant_id = data["place_id"]
  db.child("Restaurant").child(restaurant_id).set(data)

def set_field(db, data):
  restaurant_id = data["place_id"]
  if "fields" in data:
    db.child("Restaurant").child(restaurant_id).set(data)

if __name__=="__main__":
  firebase = pyrebase.initialize_app(firebaseConfig)
  db = firebase.database()
  results = fetch.get_results()
  r = results[0]
  print(r)
  push_restaurant(db, r)


