### Live Link: https://online-cow-hut-auth-lime.vercel.app

### Application Routes:

## Main part

### Auth (User)

- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/auth/login (POST)
- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/auth/signup (POST)
- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/auth/refresh-token (POST)

### Auth (Admin)

- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/admins/create-admin (POST)
- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/admins/login (POST)

### User

- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/users (GET) => login with admin

```json
{
  "phoneNumber": "01871889317",
  "password": "123456"
}
```

- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/users/649c95c2c212baaf627d93ed (Single GET) => login with admin

```json
{
  "phoneNumber": "01871889317",
  "password": "123456"
}
```

- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/users/649c95c2c212baaf627d93ed (PATCH) => login with admin

```json
{
  "phoneNumber": "01871889317",
  "password": "123456"
}
```

- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/users/649c99a4d2243fded5602ea3 (DELETE) => login with admin

```json
{
  "phoneNumber": "01871889317",
  "password": "123456"
}
```

#### Cows

- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/cows (POST)
- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/cows (GET)
- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/cows/649b35f83ee34f2722ae60af (Single GET)
- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/cows/649c9a80c212baaf627d9400 (PATCH)
- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/cows/649c9ba8c212baaf627d940e (DELETE)

#### Orders

- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/orders (POST)
- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/orders (GET)

## Bonus Part

#### Admin

-Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/admins/create-admin (POST)

#### My Profile

- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/users/my-profile (GET)
- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/users/my-profile (PATCH)

#### Order:

- Route: https://online-cow-hut-auth-lime.vercel.app/api/v1/orders/649c1a08ee5402d6b922c86a (GET)
