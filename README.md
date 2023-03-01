# potatoe-mind

This is a simple todo list application with a few additional features. It is based on vue.js, vuetify, and firestore. You can clone this project by copying the link.

![App Screenshot](https://github.com/BaryRas/potatoe-mind/blob/5605642bc8f5da348e3dc76f5118992d8e7d5d06/potatoe-mind.png)

To install the necessary packages, run the following command:

## Installation

Install my-project with npm

```bash
  Git clone https://github.com/BaryRas/potatoe-mind.git
  cd potatoe-min
  npm install
  npm run serve
```

## Firestore Database

Create a Firestore database and store the credentials in a secure location. You will need these credentials to connect to the database later.

## Environment Variables

Create a .env file in the root directory of your project and populate it with the following variables:

```bash
    VUE_APP_I18N_LOCALE=fr
    VUE_APP_I18N_FALLBACK_LOCALE=fr
    VUE_APP_FIREBASE_API_KEY= ***your key***
    VUE_APP_FIREBASE_APP_ID= ***your app id ***
    VUE_APP_FIREBASE_MESSAGING_SENDER_ID= ***your messaging dender id***
```

Be sure to replace each value with your own Firestore credentials.

## License

[MIT](https://choosealicense.com/licenses/mit/)

This web application is intended for personal use only. Please do not use it for any commercial or public purposes.
