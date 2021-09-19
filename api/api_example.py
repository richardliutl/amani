import googlemaps
from key import api_key
from datetime import datetime

gmaps = googlemaps.Client(key= api_key)

# geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')
# print(geocode_result)

results = gmaps.places(query="restaurants", radius=1000)['results']
# gives you a list of dictionaries, where each dictionary corresponds to a place

# for dic in results:
#     if dic['business_status'] != "OPERATIONAL": 

for dic in results:
    for k in dic.copy():
        if k not in {'name', 'rating', 'price_level', 'formatted_address', 'opening_hours', 'user_ratings_total'}:
            del dic[k]
        dic['url'] = "https://maps.google.com/?q=" + dic['formatted_address']

print(results)

# Look up an address with reverse geocoding
# reverse_geocode_result = gmaps.reverse_geocode((40.714224, -73.961452))

# Request directions via public transit
# now = datetime.now()