import googlemaps
from key import api_key
from datetime import datetime

gmaps = googlemaps.Client(key= api_key)

geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')
print(geocode_result)

results = gmaps.places(query="indian restaurants", radius=1000)
print(results)
# Look up an address with reverse geocoding
# reverse_geocode_result = gmaps.reverse_geocode((40.714224, -73.961452))

# Request directions via public transit
# now = datetime.now()