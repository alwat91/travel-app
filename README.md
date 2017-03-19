# travel-app
A simple site for generating travel suggestions. Users can randomly generate a suggested travel location based on their desired departure city. Users can also do full CRUD actions on lists to randomly choose destinations from.

## ERD

### Entities

#### User

```
id: Number,
email: String,
password_digest: String,
nearest_airport: String
```

#### Cities

```
id: Number,
description: "String",
skyscanner_id: "Number"
```
#### List

```
id: Number,
user_id: Number,
_cities: [City refs],
description: "String",
places_id: "Number"
```

## Challenges

Making server side API calls proved to be more difficult that expected because of the necessity of chaining different promises together. My understanding of promises was not as strong as I thought, but I was able to overcome this issue.

I originally had planned on embedding a google maps object for the location returned to the user. Unfortunately that proved more difficult than expected because the required HTML needed strict contextual escaping (SCE) to be used. This proved to be quite difficult and ultimately was scrapped from the final product.

## Future features

* Google maps embed for the result
* Google places image embed for the result
* Users able to own their own lists
* Departure airport automatically chosen for logged in users

## Citations
* Top travel destinations were retrieved from: http://brilliantmaps.com/top-100-tourist-destinations/
* I significantly improved my understanding of promises from this blog post:
https://davidwalsh.name/promises
