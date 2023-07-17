### Live Link: https://online-cow-hut-auth-lime.vercel.app

### Application Routes:

## Main part

### Auth (User)

- Route: https://book-catalog-backend-ruby.vercel.app/api/v1/auth/login (POST)
- Route: https://book-catalog-backend-ruby.vercel.app/api/v1/auth/signup (POST)
- Route: https://book-catalog-backend-ruby.vercel.app/api/v1/auth/refresh-token (POST)

### User

- Route: https://book-catalog-backend-ruby.vercel.app/api/v1/user/64b4e378beb6f1e2b71f938e (GET)

```json
{
  "email": "jeba1234@mail.com",
  "password": "123456"
}
```

- Route: https://book-catalog-backend-ruby.vercel.app/api/v1/users/649c95c2c212baaf627d93ed (PATCH) => login with admin

```json
{
  "phoneNumber": "01871889317",
  "password": "123456"
}
```

- Route: https://book-catalog-backend-ruby.vercel.app/api/v1/users/649c99a4d2243fded5602ea3 (DELETE) => login with admin

```json
{
  "phoneNumber": "01871889317",
  "password": "123456"
}
```

#### Books

- Route: https://book-catalog-backend-ruby.vercel.app/api/v1/books (POST)
- Route: https://book-catalog-backend-ruby.vercel.app/api/v1/books (GET)
- Route: https://book-catalog-backend-ruby.vercel.app/api/v1/books/64b4e360beb6f1e2b71f9386 (Single GET)
- Route: https://book-catalog-backend-ruby.vercel.app/api/v1/books/64b4e360beb6f1e2b71f9386 (PATCH)
- Route: https://book-catalog-backend-ruby.vercel.app/api/v1/books/64b4e360beb6f1e2b71f9386 (DELETE)
- Route: https://book-catalog-backend-ruby.vercel.app/api/v1/books/addToWishlist/64b4e360beb6f1e2b71f9386 (POST)
- Route: https://book-catalog-backend-ruby.vercel.app/api/v1/books/addToCurrentlyReading/64b4e360beb6f1e2b71f9386 (POST)
- Route: https://book-catalog-backend-ruby.vercel.app/api/v1/books/addToPlanToReadSoon/64b4e360beb6f1e2b71f9386 (POST)
- Route: https://book-catalog-backend-ruby.vercel.app/api/v1/books/finishedReading/64b4e360beb6f1e2b71f9386 (POST)
- Route: https://book-catalog-backend-ruby.vercel.app/api/v1/books/addReview/64b4e360beb6f1e2b71f9386 (POST)
