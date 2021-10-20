# The `qoolworths` application

This is the repo for a TDD / React / Clean code workshop. It's a simple project that simulates an online grocery shopping application, and there is no
clear plan for release it to public yet. 

However, there are some functionalities that can be useful in cases, what have included (or at least planed) for the app are:

- there are a list of groceries that a customer can browser and add to their cart
- a cart that has total price and items in it
- customer can pay by cash only at the store

Some other enhancement could be 

- search by category / name
- voucher or some kind of redemption
- user register / login / profile

But let's see how it goes

## Prerequisites

There are a bunch of prerequisites:

- nvm `brew install nvm`
- node version `nvm use 14.15.5`
- yarn `npm install -g yarn`  

## Launch the application

Clone this repo and go to the folder

```
git clone git@github.com:abruzzi/qoolworths.git qoolworths
cd qoolworths
```
 
then run
  
```
yarn start
```
 
to start the app. If everything goes well you should be able to see a browser window pointing to `http://localhost:3000`

## Test

Execute the following to run unit tests
```
yarn test
```

A test should be pass
