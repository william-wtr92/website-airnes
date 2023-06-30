# Api documentation

Here’s a complete documentation to explain each existing route, with examples every time it’s possible.

## App

These are the public routes - they are very similar from a few admin routes but still slightly differ

### Authentication

- `POST /api/sign-up` - Registers a new user

There are a few required parameters to send. Here is an example of fields:

```json
{
  "name": "John Doe",
  "mail": "john@doe.com",
  "password": "mP^aJ9%R2j2}s9",
  "passwordConfirmation": "mP^aJ9%R2j2}s9",
  "cgu": true
}
```

By default, the user is set to the role “user”.

NB: there are only 2 possible roles, which are “user” or “admin”, automatically created when the database and its tables
are set.

- `POST /api/sign-in` - Logs in a user

```json
{
  "mail": "john@doe.com",
  "password": "mP^aJ9%R2j2}s9"
}
```

- `POST /api/logout` - Logs out a user

This route automatically gets the session parameters, then remove it.
Contact or user support

- `POST /api/contact` - Sends a contact form

All the fields are required. Here is an example of body for the request:

```json
{
  "mail": "john@doe.com",
  "topic": "Lorem Ipsum",
  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing..."
}
```

- `POST /api/reset_password` - Sends a password reset email

```json
{
  "mail": "john@doe.com"
}
```

This route generates a token to authenticate the user when they click on the link in the email.

- `PATCH /api/reset_password` - Resets the password

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "password": "f349OQAv!kIS"
}
```

### Products

Products from the category with the id 0 (which corresponds to the “no category”) won’t be showed with this route. Refer
to the admin products route if you want to display all the products.

- `GET /api/app/products/all` - Returns all products

This route allows an optional parameters: “sale”, a boolean indicating whether you only want sales products or all of
them. You also have to specify the page index:

```json
{
  "sale": true,
  "page": 1
}
```

- `GET /api/app/products/{productId}` - Returns a specific product

This route allows an optional parameters: “withSimilarProducts”, indicating whether you want to see similar products (
from the same category) or not.

```json
{
  "withSimilarProducts": true
}
```

- `GET /api/app/products/filter` - Returns all the public products and the materials available

- `GET /api/app/products/search` - Returns products based on the criteria given

This route is a bit more complicated. Here is a list of all the available parameters:

- page: the index (for exemple the 5th page out of the 10 rendered)
- search: the name or part of the description searched;
- promo: states if the article looked for is in sales or not;
- stock: states if the article looked for available or not;
- category: the category id;
- material: the material id;
- order: how the results are supposed to be ordered
- minPrice: the smallest price;
- maxPrice: the biggest price.

```json
{
  "page": 1,
  "search": "little table",
  "promo": true,
  "stock": true,
  "category": 2,
  "material": "wood",
  "order": "id",
  "minPrice": 10,
  "maxPrice": 200
}
```

### Categories

- `GET /api/app/categories/all` - Returns all categories

- `GET /api/app/categories/{categoryId}` - Returns a specific category and its products. The “categoryId” can’t be equal
  to 0 since it’s not a real category, so it’s not accessible.

## Admin

Only admin can use these routes. They are all used in the backoffice.

### Homepage carousel

- `GET /api/admin/carousel/images` - Returns all carousel images- `
- `POST /api/admin/carousel/add` - Adds an image to the carousel

```json
{
  "url": "https://shorturl.at/dklCL",
  "label": "Pretty table"
}
```

- `PATCH /api/admin/carousel/{imageId}` - Changes the order of carousel images

```json
{
  "direction": 2
}
```

- `DELETE /api/admin/carousel/{imageId}` - Deletes a specific carousel image

### Homepage selected categories

- `GET /api/admin/categories/homepage/selected` - Returns all carousel images

- `POST /api/admin/categories/homepage/selected` - Adds a category to the homepage

```json
{
  "categoryId": 5
}
```

- `PATCH /api/admin/categories/homepage/{categoryId}` - Modifies a category’s order

```json
{
  "direction": 3
}
```

- `DELETE /api/admin/categories/homepage/{categoryId}` - Deletes a category from the homepage

### Homepage selected products

- `GET /api/admin/products/homepage/selected` - Returns all carousel images

- `POST /api/admin/products/homepage/selected` - Adds a product to the homepage

```json
{
  "productId": 100
}
```

- `PATCH /api/admin/products/homepage/{productId}` - Modifies a product’s order

```json
{
  "direction": 2
}
```

- `DELETE /api/admin/products/homepage/{productId}` - Deletes a product from the homepage

### Dashboard

- `GET /api/admin/dashboard` - Gets statistics: the number of users, products, recent sells, top sells and sells per
  day.

### Contact requests

- `GET /api/admin/contacts/contacts` - Returns all the contact requests

This route has 3 optional parameters:

- the page number;
- col: to order a column;
- order: the direction (“asc” for ascendant, or “desc” for descendant).

```json
{
  "page": 1,
  "order": "topic",
  "col": "desc"
}
```

- `GET /api/admin/contacts/{contactId}` - Returns a specific contact request

- `PATCH /api/admin/contacts/{contactId}` - Updates its status (new/open)

Once this route is called, there are no parameters available since a contact request is either new or read.

- `DELETE /api/admin/contacts/{contactId}` - Deletes the contact request

### Categories

- `GET /api/admin/categories/category` - Returns all the categories

This route has 3 optional parameters, the same as GET /api/admin/contacts/contacts:

- the page number;
- col: to order by a column;
- order: the direction (“asc” for ascendant, or “desc” for descendant).

```json
{
  "page": 1,
  "order": "id",
  "col": "as"
}
```

- `GET /api/admin/categories/{categoryId}` - Returns a given category

- `POST /api/admin/categories/category` - Adds a category

```json
{
  "image": "https://shorturl.at/dklCL",
  "name": "Tables",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
}
```

- `PATCH /api/admin/categories/{categoryId}` - Modifies a given category

```json
{
  "image": "https://shorturl.at/dklCL",
  "name": "Tables",
  "description": "Lorem ipsum dolor sit amet..."
}
```

- `DELETE /api/admin/categories/{categoryId}` - Deletes a given category

### Materials

- `GET /api/admin/materials/material` - Returns all the materials

- `GET /api/admin/materials/{materialId}` - Returns a given material

- `POST /api/admin/materials/material` - Adds a material

```json
{
  "name": "Wood",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
}
```

- `PATCH /api/admin/materials/{materialId}` - Modifies a given material

```json
{
  "name": "Steel",
  "description": "Lorem ipsum dolor sit amet"
}
```

- `DELETE /api/admin/materials/{materialId}` - Deletes a given material

### Products

- `GET /api/admin/products/product` - Returns all the products

This route has 3 optional parameters, the same as `GET /api/admin/contacts/contacts` and `GET
/api/admin/categories/category`:

- the page number;
- col: to order by a column;
- order: the direction (“asc” for ascendant, or “desc” for descendant).

```json
{
  "page": 1,
  "order": "id",
  "col": "as"
}
```

- `GET /api/admin/products/{productId}` - Returns a given product

- `POST /api/admin/products/product` - Adds a product

This route has one optional parameters, the “promotion”. It should be less than the original price.

```json
{
  "image": "https://shorturl.at/dklCL",
  "category": 12,
  "name": "Really cool table",
  "price": 140,
  "promotion": 100,
  "quantity": 423,
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  "material": "Wood",
  "priority": true
}
```

- `PATCH /api/admin/products/{productId}` - Modifies a given product

```json
{
  "image": "https://shorturl.at/dklCL",
  "category": 12,
  "name": "Really cool table",
  "price": 140,
  "promotion": 10,
  "quantity": 2,
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  "material": "Wood"
}
```

- `DELETE /api/admin/products/{productId}` - Deletes a given product

### Users

- `GET /api/admin/users/user` - Returns all the users

- `GET /api/admin/users/{userId}` - Returns a given user

- `PATCH /api/admin/users/{userId}` - Modifies a given user

Reminder: the only roles available are

- admin (role id: 1);
- user (role id: 2).

```json
{
  "roleid": 2,
  "name": "John Doe",
  "mail": "john@doe.com"
}
```

## User Routes

Only corresponding users (connected and in the query) and admin can use them

### Users

- `GET /api/user/{userId}` - Returns a given user's data

- `PATCH /api/user/{userId}` - Updates a given user’s data

```json
{
  "name": "John Doe Bis",
  "mail": "john@doe.com"
}
```

- `PATCH /api/user/{userId}/changePassword` - Updates a given user’s password

```json
{
  "userId": 1,
  "oldPassword": "oldpassword&123",
  "password": "Azerty&123"
}
```

- `DELETE /api/user/{userId}` - Deletes a given user

### Addresses

- `POST /api/user/create/address` - Adds an address for a user

```json
{
  "name": "John",
  "lastName": "Doe",
  "addressName": "Home",
  "address": "221A Baker Street",
  "complete": "Marylebone",
  "city": "London",
  "postal_code": "NW1 6XE"
}
```

- `GET /api/user/{userId}/{addressId}` - Returns a specific address for a user

- `PATCH /api/user/{userId}/{addressId}` - Updates a specific address for a user

```json
{
  "name": "John",
  "lastName": "Doe",
  "addressName": "Best friend's",
  "address": "221A Baker Street",
  "complete": "Marylebone",
  "city": "London",
  "postal_code": "NW1 6XE"
}
```

- `DELETE /api/user/{userId}/{addressId}` - Deletes a specific address for a user

### Cart Routes

Only corresponding users and admin can use them

- `POST /api/cart/payment` - Processes payment for the cart

This route is a requisite for the api/cart/confirmOrder one.

```json
{
  "items": ["item 1", "item 2"]
}
```

- `POST /api/cart/confirmOrder` - Confirms the order in the cart

This route create an order and associate that order to the products in the cart

```json
{
  "payment_intent": "pi_3NNXdhIACBtQSJSw1hyxE3Jr",
  "redirect_status": "succeeded",
  "cartItems": ["item 1", "item 2"]
}
```

- `GET /api/user/{userId}/order/{orderId}` - Returns a specific order for a user

```json
{
  "userId": 1,
  "orderId": 3
}
```

- `PATCH /api/user/{userId}/order/{orderId}` - Cancel the order

```json
{
  "orderId": 3
}
```

- `PATCH /api/user/{userId}/order/{orderId}/return` - Update the comment of a product returned

This is route allows a user to return a product and add a comment to it.

```json
{
  "orderId": 3,
  "productId": 1,
  "comment": "I don't like it"
}
```
