# Introduction

There's not a lot of frontend implementation in this app which will be obvious as soon as you open the link in the about section but I have tried to keep a clean design which should also be working on most mobile phones.
I have used `React` and `CSS` to create the frontend.

For the backend I have used a Node server, with my custom Redis Server which is used to cache requests. 
To implement the autocomplete feature I have written a C++ script that takes in words and first using `Tries` tries to give possible completions and if they are not enough uses a `BKTree` to find the words closest to what is typed and returns it to the search bar to be chosen.