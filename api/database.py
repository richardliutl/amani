import pyrebase
from env import firebaseConfig
# config = {
#   "apiKey": "AAAAmE48JT4:APA91bHOPEgRiy9hEFee2R_exSIX6vebXAyE6bP7j_1NQG92B9SyKw3YFDs8Q3Ya6oiWMk6WkUKlemCA6Fe6i3A3slzTyG5vWPL0vQX6qN_-1cmppJ8KFS1_uWmQ6QhwyxzY6o5Ar3f4",
#   "authDomain": "projectId.firebaseapp.com",
#   "databaseURL": "https://amani.firebaseio.com",
#   "storageBucket": "gs://amani-326418.appspot.com"
# }
def push_user(db, data):
  user_id = data["id"]
  db.child("Users").child(user_id).push(data)

def push_restaurant(db, data):
  restaurant_id = data["id"]
  db.child("Restaurant").child(restaurant_id).push(data)

if __name__=="__main__":
  firebase = pyrebase.initialize_app(firebaseConfig)
  db = firebase.database()
  r = {"id":100, "data":1}
  push_restaurant(db, r)


