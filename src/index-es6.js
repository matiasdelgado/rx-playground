
// var promise = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve(1981);
//         console.log("Fin promise");
//     }, 500);
// });
//
// promise.then((x) => {
//     console.log("Then: ", x);
//     return promise2;
// });

var source = Rx.Observable.create((observer) => {
    var data = [1, 2, 3, 4, 5, 6],
        index = 0;
    var id = setInterval(() => {
        if (index < data.length) {
            observer.onNext(data[index]);
            index++;
        } else {
            clearTimeout(id);
            observer.onCompleted();
        }
    }, 1000);
});

var disposer = source
    .filter(x => {
        return x % 2 === 0;
    })
    .map(x => x*2)
    .subscribe(
        (x) => {
            console.log("X: ", x);
        },
        error => console.log(error),
        complete => console.log("Complete")
);
//
// setTimeout(() => {
//     console.log("Disposing");
//     disposer.dispose();
// }, 5000);
