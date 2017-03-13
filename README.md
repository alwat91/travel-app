# travel-app
A simple site for generating travel suggestions

## ERD

### Entities

#### User

```
id: Number,
email: String,
password_digest: String
nearest_airport: String
```

#### Potentials

```
id: Number,
user_id: Number,
airport_codes: Array,
description: "String",
places_id: "Number"
```
#### AlreadyBeen

```
id: Number,
user_id: Number,
airport_codes: Array,
description: "String",
places_id: "Number"
```

#### DefaultLists

```
potential_ids: Array
```
