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
|                                        Dashboard                                        |                                        User                                        |                                        Edit                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/react-fullstack/blob/master/client/src/assets/images/screenshots/194734618_316644659935209_3131132289323150312_n.png) | ![](https://github.com/Ren0503/react-fullstack/blob/master/client/src/assets/images/screenshots/195187689_784873362077883_1087735434407446691_n.png) | ![](https://github.com/Ren0503/react-fullstack/blob/master/client/src/assets/images/screenshots/196117497_5361989997160793_4237247148954963508_n.png) |

|                                        Login                                        |                                        Manager                                        |                                        Order                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/react-fullstack/blob/master/client/src/assets/images/screenshots/195198809_190826716278681_1765293144542165745_n.png) | ![](https://github.com/Ren0503/react-fullstack/blob/master/client/src/assets/images/screenshots/195187689_321389972865084_2711998413427075270_n.png) | ![](https://github.com/Ren0503/react-fullstack/blob/master/client/src/assets/images/screenshots/197450679_529539658080020_9013612089332137178_n.png) |

### Client Screenshots
|                                        Home                                        |                                        Shop                                        |                                        Detail                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/react-fullstack/blob/master/client/src/assets/images/screenshots/196694303_840721236562549_2027306225614810390_n.png) | ![](https://github.com/Ren0503/react-fullstack/blob/master/client/src/assets/images/screenshots/196655706_974465676713604_7162672287648145447_n.png) | ![](https://github.com/Ren0503/react-fullstack/blob/master/client/src/assets/images/screenshots/202893348_325380135722462_3372241859954472188_n.png) |

|                                        Author                                        |                                        Post                                        |                                        Cart                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/react-fullstack/blob/master/client/src/assets/images/screenshots/197698778_1024297755007283_2503820427239061084_n.png) | ![](https://github.com/Ren0503/react-fullstack/blob/master/client/src/assets/images/screenshots/195569024_549676902860175_1947106681174839114_n.png) | ![](https://github.com/Ren0503/react-fullstack/blob/master/client/src/assets/images/screenshots/195414232_856001291674383_801010911083484819_n.png) |