const myInput = $("#myInput");
const results = $("#results");

let source = Rx.Observable.fromEvent(myInput, "keyup")
    // .map(event => {
    //     return event.target.value;
    // })
    .pluck("target", "value")
    .filter(x => {
        return x.length >= 3;
    })
    .debounce(500)
    .distinctUntilChanged()
    .flatMap(x => searchWikipedia(x))
    .subscribe(
        data => {
            console.log("Subscribe: ", data);
            results.empty().append($.map(data[1], value =>  $('<li>').text(value)))
        },
        error => {
            console.log("Error: ", error);
        });


function searchWikipedia (term) {
    console.log("Wikipedia...");
  return $.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    dataType: 'jsonp',
    data: {
      action: 'opensearch',
      format: 'json',
      search: term
    }
  }).promise();
}
