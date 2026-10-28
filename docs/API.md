# Backend API Documentation

## 1. Overview

This project provides REST APIs for managing products, orders, and users using Node.js and Express.

**Base URL:** `http://localhost:4000`

**API format:** JSON

**Content-Type:** `application/json`

### Standard response format

Successful responses generally follow this structure:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

Error responses generally follow this structure:

```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

Product listing endpoints may also return a `pagination` object.

---

## 2. Product APIs — Version 1

Base path: `/api/v1/products`

### 2.1 Get all products

- **Method:** GET
- **Endpoint:** `/api/v1/products`
- **Request body:** None
- **Success status:** `200 OK`

Returns the product list.

**Example request**

```http
GET /api/v1/products
```

### 2.2 Get a product by ID

- **Method:** GET
- **Endpoint:** `/api/v1/products/:id`
- **Path parameter:** `id` — product ID
- **Success status:** `200 OK`
- **Error status:** `404 Not Found` if the product does not exist

**Example request**

```http
GET /api/v1/products/1
```

**Example response**

```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "id": 1,
    "name": "Laptop",
    "price": 50000
  }
}
```

### 2.3 Create a product

- **Method:** POST
- **Endpoint:** `/api/v1/products`
- **Content-Type:** `application/json`

**Example request body**

```json
{
  "name": "Laptop Stand",
  "price": 1200
}
```

- **Success status:** Check the implemented controller; typically `201 Created`.
- **Validation errors:** Check the implemented controller and middleware.

The server creates a product and returns the created product.

### 2.4 Replace a product using PUT

- **Method:** PUT
- **Endpoint:** `/api/v1/products/:id`
- **Path parameter:** `id` — product ID

**Example request**

```http
PUT /api/v1/products/1
```

**Request body**

```json
{
  "name": "Laptop",
  "price": 40000
}
```

- **Success status:** Check the implemented controller.
- **Error status:** `404 Not Found` if the product does not exist.

PUT updates the specified product fields according to the implementation. Sending the same values repeatedly leaves the product in the same final state.

### 2.5 Partially update a product using PATCH

- **Method:** PATCH
- **Endpoint:** `/api/v1/products/:id`

**Example request body**

```json
{
  "price": 45000
}
```

PATCH is used for partial updates. The accepted fields and validation rules depend on the controller implementation.

### 2.6 Delete a product

- **Method:** DELETE
- **Endpoint:** `/api/v1/products/:id`

**Example request**

```http
DELETE /api/v1/products/1
```

Deletes the product identified by the supplied ID.

Document the success status and repeated-delete behavior according to the implemented controller.

---

## 3. Product Filtering, Sorting, Searching, and Pagination

- **Method:** GET
- **Endpoint:** `/api/v1/products`

These features use query parameters.

### 3.1 Search by product name

**Parameter:** `name`

Searches product names using a case-insensitive partial match.

**Example**

```http
GET /api/v1/products?name=lap
```

This can return products whose names contain `lap`, such as `Laptop`.

If no products match, the endpoint returns a successful response with an empty product array.

### 3.2 Filter by price

**Parameters:**
- `minPrice` — minimum price
- `maxPrice` — maximum price

**Example**

```http
GET /api/v1/products?minPrice=1000&maxPrice=10000
```

Returns products within the specified price range.

If `minPrice` is greater than `maxPrice`, the API returns `400 Bad Request`.

### 3.3 Sort products by price

**Parameter:** `sort`

Supported values:

- `asc` — ascending price order, lowest to highest
- `desc` — descending price order, highest to lowest

**Examples**

```http
GET /api/v1/products?sort=asc
```

```http
GET /api/v1/products?sort=desc
```

An unsupported sort value returns `400 Bad Request`.

### 3.4 Paginate products

**Parameters:**
- `page` — page number
- `limit` — maximum number of products per page

**Example**

```http
GET /api/v1/products?page=1&limit=5
```

This requests the first page with up to five products.

If omitted, the current implementation defaults to page `1` and limit `10`. Page and limit must be positive integers.

### 3.5 Combine query parameters

Query parameters can be combined in a single request.

**Example**

```http
GET /api/v1/products?name=lap&sort=asc&page=1&limit=5
```

This searches product names for `lap`, sorts matching products by ascending price, and returns the first page with up to five results.

**Example response structure**

```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 50000
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "totalProducts": 1,
    "totalPages": 1
  }
}
```

The numbers shown are illustrative; actual results depend on the current in-memory data.

---

## 4. Product APIs — Version 2

Base path: `/api/v2/products`

### Get all products — Version 2

- **Method:** GET
- **Endpoint:** `/api/v2/products`
- **Request body:** None
- **Success status:** `200 OK`

Version 2 returns the product list with an additional `inStock` field.

**Example request**

```http
GET /api/v2/products
```

**Example response**

```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 50000,
      "inStock": true
    }
  ]
}
```

The example shows the response shape; actual data contains all products returned by the service.

Versioning allows the API to evolve while preserving the existing Version 1 response structure.

---

## 5. Temporary Price-Increase Endpoint

This endpoint was added as a learning exercise. Confirm it exists in your current code before relying on it.

- **Method:** POST
- **Endpoint:** `/api/v1/products/:id/increase-price`
- **Request body:** None
- **Increase amount:** ₹1,000 per request

**Example request**

```http
POST /api/v1/products/1/increase-price
```

Each request adds ₹1,000 to the current price of the specified product.

Repeated requests change the final price each time, so this operation is non-idempotent.

**Example response**

```json
{
  "success": true,
  "message": "Product price increased successfully",
  "data": {
    "id": 1,
    "name": "Laptop",
    "price": 51000
  }
}
```

The example price assumes the product started at ₹50,000.

---

## 6. HTTP Status Codes

| Status code | Meaning |
|---|---|
| `200 OK` | Request succeeded |
| `201 Created` | A resource was created, if used by the controller |
| `400 Bad Request` | Invalid input or query parameters |
| `404 Not Found` | Resource or route was not found |
| `500 Internal Server Error` | Unexpected server error |

The exact status code for each operation should match the implementation.

---

## 7. Error Handling

The application uses centralized error-handling middleware.

Example error response:

```json
{
  "success": false,
  "message": "Invalid sort value. Use 'asc' or 'desc'",
  "data": null
}
```

Unexpected server errors return a generic `Internal Server Error` message to the client.

Unknown routes return a `404` response indicating that the route was not found.

---

## 8. API Versioning Rules

- Version 1 is available under `/api/v1`.
- Version 2 is available under `/api/v2`.
- Version 2 adds the `inStock` property to product responses.
- Version 1 remains available for clients that depend on its existing response structure.

---

## 9. Data Storage and Limitations

This learning project stores data in in-memory JavaScript arrays rather than a database.

As a result:

- Changes are temporary.
- Restarting the server resets data to the values defined in the source code.
- Data is not shared across separate server processes.
- The project is intended for learning API development, not persistent production storage.

---

## 10. Testing with Postman

To test the API:

1. Start the Express server.
2. Open Postman.
3. Select the required HTTP method.
4. Enter the endpoint URL.
5. Add query parameters or a JSON request body when needed.
6. Click **Send**.
7. Check the HTTP status and JSON response.

Recommended tests include retrieving products, creating a product, updating and deleting products, filtering by price, searching by name, sorting, pagination, version comparison, and error handling.

---

## 11. Future Improvements

Potential improvements include:

- Interactive documentation with Swagger UI.
- An OpenAPI specification.
- Consistent validation for every endpoint.
- Automated API tests.
- Authentication and authorization.
- Persistent database storage.
