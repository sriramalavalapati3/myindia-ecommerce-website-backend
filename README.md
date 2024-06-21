# E-Commerce Backend

This is the backend for an e-commerce platform built with Node.js, Express.js, and MongoDB. The application handles user registration, login, product management, order processing, and payments using Stripe.
## Explanation [Video](https://drive.google.com/file/d/10JccSR0Ax5ZNd_efraSHSvgVN3izbrKn/view)
## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Stripe Account](https://stripe.com/)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/sriramalavalapati3/myindia-ecommerce-website-backend.git
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory of your project and add the following environment variables:

    ```plaintext
    port=your_port_number
    mongoLink=your_mongodb_connection_string
    secretTokenKey=your_secret_token_key
    STRIPE_SECRET_KEY=your_stripe_secret_key
    STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
    ```

    Replace the placeholder values with your actual configuration details.

    - `port`: The port number where your server will run (e.g., 3000).
    - `mongoLink`: The connection string for your MongoDB database.
    - `secretTokenKey`: A secret key used for token generation and verification.
    - `STRIPE_SECRET_KEY`: Your Stripe secret key for API authentication.
    - `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret for verifying webhook events.

4. **Start the server:**

    Start the server using the following command:

    ```bash
    npm run start
    ```

    The server will run on the specified port (default is 3000 if not specified).




## API Endpoints

### 1. User Registration

**Endpoint:** `POST /api/register`

**Description:** Registers a new user.

**Input:**

```json
{
    "name": "Your Name",
    "email": "your.email@example.com",
    "password": "12345",
    "address": "Your Address",
    "userType": "customer",   //if ur are seller ,use 'seller' or admin use 'admin'
    "mobile": 7032949088
}
```
**Res**
```
{
    "msg": "User registered successfully"
}

```

### 2.user login
**Endpoint:** `POST /api/login`

**Description:** Registers a new user.

**Input:**

```json
{
   
    "email": "your.email@example.com",
    "password": "ur password",
   
}

```
`email`: `String, required, must follow regex pattern containing @ and ending in .in or .com.`
`password`: `String, required`.
```
{
token,
userdetails
}
```


### 3. Product Upload
**Endpoint**: `POST /api/productUpload`

**Description**: `Uploads a new product to the platform. Requires authentication.`

**Headers:**

**Authorization: Bearer token**  `only seller can upload products`


**Input:**
```
json
{
    "product": "AC",
    "productCategory": "Electronics",
    "productDescription": "Ogeneral AC 1.5 ton 5 star",
    "productQuantity": 5,
    "productPrize": 40000,
    "productSupplier": "66731d51ddaa34ece036db2d"
}
```
`product`: `String, required`.
`productCategory`: `String, required`.
`productDescription`: `String, required`.
`productQuantity`: `Number, required`.
`productPrize`: `Number, required`.
`productSupplier`: `String, required, ID of the supplier`.

**res**
```
{
    "msg": "Product uploaded successfully"
}

```



### 4.Get All Products
**Endpoint**: `GET /api/products?pageOffset=0&pageSize=10`

**Description:** `Retrieves all products with pagination.`

**Query Parameters:**

**pageOffset:** `Number, required`.
**pageSize:** `Number, required`.


**Response:**
```
[
    {
        "id": "product id",
        "product": "AC",
        "productCategory": "Electronics",
        "productDescription": "Ogeneral AC 1.5 ton 5 star",
        "productQuantity": 5,
        "productPrize": 40000,
        "productSupplier": "66731d51ddaa34ece036db2d"
    },
    ...
]

```

### 5. Filter Products
**Endpoint:** `GET /api/filterProducts?pageOffset=0&pageSize=10&sortBy=lowToHigh&category=Clothing`

**Description:** `Retrieves filtered products based on category and sorting order.`

**Query Parameters:**

**pageOffset:** `Number, required.`
**pageSize:** `Number, required.`
**sortBy:** `String, optional, sorting order (e.g., lowToHigh, highToLow).`
**category:** `String, optional, product category to filter by.`



**Response:**
```
[
    {
        "id": "product id",
        "product": "Shirt",
        "productCategory": "Clothing",
        "productDescription": "Cotton Shirt",
        "productQuantity": 10,
        "productPrize": 500,
        "productSupplier": "66731d51ddaa34ece036db2d"
    },
    ...
]
```

### 6. Get Product by ID
**Endpoint:** `GET /api/product/:id`

**Description:** `Retrieves product details by product ID.`

**Response:**

```
{
    "id": "product id",
    "product": "AC",
    "productCategory": "Electronics",
    "productDescription": "Ogeneral AC 1.5 ton 5 star",
    "productQuantity": 5,
    "productPrize": 40000,
    "productSupplier": "66731d51ddaa34ece036db2d"
}

```

### 7. Order Checkout
**Endpoint:** `POST /api/orderCheckout`

**Description:** `Creates a new order and initiates a Stripe payment session.`

**Input:**
```
{
    "product": "AC",
    "amount": 40000,
    "user": "User ID", //no need for user , because user id can be extracted from token
    "productId": "Product ID",
    "billingAddress": "Billing Address",
    "productQuantity": 1
}

```

`product``: String, required.`
`amount:` `Number, required.`
`user:` `String, required, ID of the user placing the order.`
`productId:` `String, required, ID of the product being ordered.`
`billingAddress:` `String, required.`
`productQuantity:` `Number, required.`



**Response:**

```
{
    "sessionId": "cs_test_a1ukiTBZEGa3hEbKP2ggOtbadZiVQ1cRIw1Bm1HneSTScQahfjLIIaGgO5",
    "url": "https://checkout.stripe.com/c/pay/cs_test_a1ukiTBZEGa3hEbKP2ggOtbadZiVQ1cRIw1Bm1HneSTScQahfjLIIaGgO5#fidkdWxOYHwnPyd1blpxYHZxWjA0VUpmXG5DbWpSbF9EQmsya2FMd3ZNNkhzMl1xb3YzR2xuSGhKS0tOandTVzAwcXFVQUxNN1A0ZkFOb0pwQ0dORGtzYFJ9dDNyUGpoVl9XYjJzXExyfVNLNTV8R1ZEaGJQbicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl"
}
```

```
i am attaching duplicate stripe card details for stripe payment ,you can use this 

card no : 4242424242424242
Expiry : 02/28
cvv : 453
```

### 8. Stripe Webhook
**Endpoint:** `POST /api/paymentStatus`

**Description:** `Handles Stripe webhook events to update payment status.`

**Input:** `Raw Stripe webhook event payload.`

**Response:**

```
200 OK for successful processing.
400 Bad Request for failed verification or processing.
```

`by clicking on url from response we can redirect to check out page `



### Testing

You can use tools like Postman to test the API endpoints and verify the functionality.

## Dependencies

- Node.js
- Express.js
- MongoDB
- Stripe

## License

This project is licensed under the MIT License.


### this is postman [documentation](https://documenter.getpostman.com/view/24325307/2sA3XV9zVR)

<h1>Thank You😊😊</h1>





