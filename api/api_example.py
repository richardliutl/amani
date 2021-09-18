import googlemaps
from key import api_key
from datetime import datetime

gmaps = googlemaps.Client(key= api_key)

# Geocoding an address
geocode_result = gmaps.places(query="restuarants")
print(type(geocode_result))
