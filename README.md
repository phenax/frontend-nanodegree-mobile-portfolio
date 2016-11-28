# Website Performance Optimization project


## Instructions

 * To start the static server, just do an ```npm start```(Needs npm installed). OR just open the index.html in your browser.
 * To minify and optimize the static files, run ```npm run js``` or ```npm run css``` or ```npm run img``` depending on what you want to type of file.
 * To get the page speed insights scores, run ```./node_modules/.bin/psi http://example.com``` (Assuming you have already run ```npm install```).


## What I've done

####Part 1: Optimize PageSpeed Insights score for index.html

 * Inlined critical styles in the head
 * Defered loading of font stylesheet with javascript
 * Wrote a simple nodejs server for static files with gzip, caching and clustering.
 * Moved google analytics stuff to the bottom of the page
 * Added async and defer attibutes to the scripts for loading asynchronously and defering execution to the end



####Part 2: Optimize Frames per Second in pizza.html

 * Took the document.body.scrollTop call outside the for loop(Because it forces layout)
 * Replaced the scroll event handling mechanism with just one function that updates the current scroll position value and check if the value has been updated on each frame and if it has, update the values of the pizzas.
 * Changed the number of pizzas to depend on the size of the screen.(Makes it faster for mobile devices).
 * Changed the movement of pizzas so that instead of changing the 'left' property, it translates the element(It still paints tho).
 * Changed a few stuff to prevent forced synchronous layout from being triggered.
 * Cached DOM elements
