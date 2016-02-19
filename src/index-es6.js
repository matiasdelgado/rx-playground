// Starting with a promise...
var promise = new Promise((resolve) => {
    console.log("start promise");
    setTimeout(() => {
        resolve(87);
        console.log("resolved promise");
    }, 500);
});

promise.then((x) => {
    console.log("Promise 1", x);
    return x + "!";
}).then((x) => {
    console.log("Promise 2", x);
});

// Create observable
var source = Rx.Observable.create((observer) => {
    console.log("start");
    var id = setTimeout(() => {
        console.log("resolved");
        observer.onNext(1891);
    }, 500);

    // clean up
    return () => {
        console.log("disposed");
        clearTimeout(id);
    };
});

var disposable = source.subscribe((x) => {
    console.log("X1 observer", x);
});
setTimeout(() => {
    console.log("disposing");
    disposable.dispose();
}, 3000);

// Subscribing by iterating the observable
source.forEach((e) => {
    console.log(e + "!");
    return true;
});

// source.subscribe((x) => {
//     console.log("X2 observable", x);
// });

// Process the results as they come up
var observable = Rx.Observable.create((observer) => {
    var data = [1,2,3,4,5,6], index = 0;
    var id = setInterval(() => {
        if (index < data.length) {
            observer.onNext(data[index]);
            index++;
        } else {
            clearTimeout(id);
        }
    }, 1000);
});
observable
    .filter(x => {
        console.log("Filtering", x);
        return x % 2 === 0;
    })
    .forEach(x => console.log(x));
