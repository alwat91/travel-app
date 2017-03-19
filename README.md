# travel-app
A simple site for generating travel suggestions

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

## Citations
* Top travel destinations were retrieved from: http://brilliantmaps.com/top-100-tourist-destinations/
* I significantly improved my understanding of promises from this blog post:
https://davidwalsh.name/promises
