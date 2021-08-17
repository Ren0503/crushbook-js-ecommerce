# CrushBook Shop
![CrushBook](https://github.com/Ren0503/crushbook-js-ecommerce/blob/master/client/public/logo.png)
> Shop with M.E.R.N Stack and Redux. Repository is divided into 3 main packages: 
- **server** This package container API for Otaku Shop, build with Nodejs, Express and MongoDB with Mongoose. Use REST API.
- **admin** Is Admin Dashboard for CrushBook Shop, built with React, Redux and Material UI.
- **client** Is a frontend for CrushBook Shop, build with React, Redux and Bootstraps.

## Features

- Full featured shopping cart
- Book reviews and ratings
- Top books carousel
- Book pagination
- Book search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration

### Server

| Plugin | README |
| ------ | ------ |
| bcryptjs | [plugins/bcryptjs/README.md](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md) |
| express | [plugins/express/README.md](https://github.com/expressjs/express/blob/master/Readme.md) |
| express-async-handler | [plugins/express-async-handler/README.md](https://github.com/abazhenov/express-async-handler/blob/master/README.md) |
| jsonwebtoken | [plugins/jsonwebtoken/README.md](https://github.com/auth0/node-jsonwebtoken/blob/master/README.md) |
| mongoose | [plugins/mongoose/README.md](https://github.com/Automattic/mongoose/blob/master/README.md) |
| multer | [plugins/multer/README.md](https://github.com/expressjs/multer/blob/master/README.md)|
| morgan | [plugins/morgan/README.md](https://github.com/expressjs/morgan/blob/master/README.md) |
| nodemon | [plugins/nodemon/README.md](https://github.com/remy/nodemon/blob/master/README.md) |

### Admin

| Plugin | README |
| ------ | ------ |
| axios | [plugins/axios/README.md](https://github.com/axios/axios/blob/master/README.md) |
| material-ui | [plugins/material-ui/README.md](https://github.com/mui-org/material-ui/blob/next/README.md) |
| react | [plugins/react/README.md](https://github.com/facebook/react/blob/master/README.md) |
| react-paypal-button-v2 | [plugins/react-paypal-button-v2 /README.md](https://github.com/luehang/react-paypal-button-v2/blob/master/README.md) |
| react-redux | [plugins/react-redux/README.md](https://github.com/reduxjs/react-redux) |
| react-router-dom | [plugins/react-router/README.md](https://github.com/ReactTraining/react-router/blob/master/README.md) |
| react-rte | [plugins/react-rte/README.md](https://github.com/sstur/react-rte/blob/master/README.md) |
| redux | [plugins/redux/README.md](https://github.com/reduxjs/redux)|
| redux-thunk | [plugins/redux-thunk/README.md](https://github.com/reduxjs/redux-thunk/blob/master/README.md) |

### Client

| Plugin | README |
| ------ | ------ |
| axios | [plugins/axios/README.md](https://github.com/axios/axios/blob/master/README.md) |
| lottie-react-web | [plugins/lottie-react-web/README.md](https://github.com/felippenardi/lottie-react-web/blob/master/README.md) |
| react | [plugins/react/README.md](https://github.com/facebook/react/blob/master/README.md) |
| react-paypal-button-v2 | [plugins/react-paypal-button-v2 /README.md](https://github.com/luehang/react-paypal-button-v2/blob/master/README.md) |
| react-bootstrap | [plugins/react-bootstrap/README.md](https://github.com/react-bootstrap/react-bootstrap/blob/master/README.md) |
| react-redux | [plugins/react-redux/README.md](https://github.com/reduxjs/react-redux) |
| react-router-dom | [plugins/react-router/README.md](https://github.com/ReactTraining/react-router/blob/master/README.md) |
| react-slick | [plugins/react-slick/README.md](https://github.com/akiran/react-slick) |
| redux | [plugins/redux/README.md](https://github.com/reduxjs/redux)|
| redux-thunk | [plugins/redux-thunk/README.md](https://github.com/reduxjs/redux-thunk/blob/master/README.md) |

## Core Structure
    code
      ├── package.json
      │
      ├── server
      │   ├── uploads
      │   ├── src
      │   │   ├── config
      │   │   ├── controllers
      │   │   ├── middleware
      │   │   ├── models
      │   │   ├── routes
      │   │   ├── utils
      │   │   └── index.js
      │   │
      │   └── package.json
      │
      ├── admin
      │   ├── public
      │   ├── src
      │   │   ├── actions
      │   │   ├── components
      │   │   ├── constants
      │   │   ├── layouts
      │   │   ├── reducers
      │   │   ├── routes
      │   │   ├── screens
      │   │   ├── App.js
      │   │   ├── store.js
      │   │   └── index.js
      │   │
      │   └── package.json
      │
      ├── client
      │   ├── public
      │   ├── src
      │   │   ├── actions
      │   │   ├── assets
      │   │   ├── components
      │   │   ├── constants
      │   │   ├── hooks
      │   │   ├── reducers
      │   │   ├── routes
      │   │   ├── screens
      │   │   ├── App.js
      │   │   ├── store.js
      │   │   └── index.js
      │   │
      │   └── package.json
      │
      ├── .gitignore
      └── README.md

### Admin Screenshots
|                                        Dashboard                                        |                                        User                                        |                                        Book                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/crushbook-js-ecommerce/blob/master/client/src/assets/images/screenshots/dashboard.png) | ![](https://github.com/Ren0503/crushbook-js-ecommerce/blob/master/client/src/assets/images/screenshots/userlist.png) | ![](https://github.com/Ren0503/crushbook-js-ecommerce/blob/master/client/src/assets/images/screenshots/booklist.png) |

|                                        Author                                        |                                        Editor                                        |                                        Order                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/crushbook-js-ecommerce/blob/master/client/src/assets/images/screenshots/authorlist.png) | ![](https://github.com/Ren0503/crushbook-js-ecommerce/blob/master/client/src/assets/images/screenshots/editor.png) | ![](https://github.com/Ren0503/crushbook-js-ecommerce/blob/master/client/src/assets/images/screenshots/ordermanage.png) |

### Client Screenshots
|                                        Home                                        |                                        Shop                                        |                                        Detail                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/crushbook-js-ecommerce/blob/master/client/src/assets/images/screenshots/home.png) | ![](https://github.com/Ren0503/crushbook-js-ecommerce/blob/master/client/src/assets/images/screenshots/book.png) | ![](https://github.com/Ren0503/crushbook-js-ecommerce/blob/master/client/src/assets/images/screenshots/detail.png) |

|                                        Author                                        |                                        Cart                                        |                                        Order                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/crushbook-js-ecommerce/blob/master/client/src/assets/images/screenshots/author.png) | ![](https://github.com/Ren0503/crushbook-js-ecommerce/blob/master/client/src/assets/images/screenshots/cart.png) | ![](https://github.com/Ren0503/crushbook-js-ecommerce/blob/master/client/src/assets/images/screenshots/order.png) |

|                                        Profile                                        |                                        Sales                                        |                                        Contact                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/crushbook-js-ecommerce/blob/master/client/src/assets/images/screenshots/profile.png) | ![](https://github.com/Ren0503/crushbook-js-ecommerce/blob/master/client/src/assets/images/screenshots/sales.png) | ![](https://github.com/Ren0503/crushbook-js-ecommerce/blob/master/client/src/assets/images/screenshots/contact.png) |