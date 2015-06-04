Magus is a nodejs wrapper for phantom. It works like a usual browser using tabs and extensions. Also it allow to
create macros for simplify execution of complicated tasks.

## Usage examples

Grab page h1 title text.

```javascript
var browser = new Magus();
browser.openTab()
    // Go to url
    .goto('http://nodejs.org/documentation')
    // Wait till page loading
    .wait()
    // Get h1 textContent
    .text('h1')
    // Run actions sequence
    .run(function(error, text){
        if (error) {
            console.error(error);
            process.exit(1);
        }

        console.log(text);
        this.close();
    });
```

Download nodejs shasums from downloads page. (Download is running in nodejs process so it doesn't use browser
authentication username and password):

```javascript
var browser = new Magus();
browser.openTab()
    // Go to url
    .goto('http://nodejs.org/download')
    // Wait till page loading
    .wait()
    // Find shasums link url
    .eval(function(){
        var links = document.querySelectorAll('#content a');
        var a;
        for(var i = 0; i < links.length; i++) {
            a = links[i];
            if (a.textContent === 'Shasums') return a.getAttribute('href');
        }
        return null;
    })
    // Download as shasums.txt
    .download('shasums.txt')
    // Run actions sequence
    .run(function(error){
        if (error) {
            console.error(error);
            process.exit(1);
        }
        process.exit();
    });
```