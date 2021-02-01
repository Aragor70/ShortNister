## Shortster

Take control of your URL address. Meet Shortster, to build a shortcut address. Get the quick report of the frequency. Right now you know how many times your partners clicked your address.

### Deployed representation
https://shortnister.herokuapp.com/

## Functionality specification

- A user can submit a URL and receive a unique shortcode in response.
- A user can copy a short URL easily.
- A user can customize the short URL to recall what URL it is referencing or give it a cool name.
- A user can see a report of the short URLs, when was created and how many times it was clicked.

- A user can submit a URL and shortcode and will receive the chosen shortcode if it is available.
- A user can access a <i>/'shortcode'</i> endpoint and be redirected to the URL associated with that shortcode, if it exists.
- All shortcodes can contain digits, upper case letters, and lowercase letters. It is case sensitive.
- Automatically allocated shortcodes are exactly 6 characters long.
- User submitted shortcodes must be at least 4 characters long.
- A user can access a <i>/'shortcode'/stats</i> endpoint in order to see when the shortcode was registered, when it was last accessed, and how many times it was accessed.


## Technical Specification

- A README file with setup instructions.
- Good testing practices.
- Clean code (of course).

- A git repository with clean commit history.
- Good REST practices.

## Recommend product suggestions

- create private repository of users URL collection
- give the website a business design
- give the website short domain name

## Usage
Rename "config/config.env.env" to "config/config.env" and update environment settings to your own.

## Install dependencies

```
npm install

# Run this command in base and client directory.
```

Run App in development environment
```
npm run dev
```

Run API tests
```
npm test
```
Run Client tests
```
npm client-tests
```


- Version prequire 1.0.0
- License MIT
- Deployment domain https://shortnister.herokuapp.com/

created by mikey.prus@gmail.com

