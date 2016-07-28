const myInput = $("#myInput");
const results = $("#results");

var source = Rx.Observable.fromEvent(myInput, "keyup")
    .map(event => {
        return event.target.value;
    })
    .filter(text => {
        return text.length > 4;
    })
    .debounce(500)
    .distinctUntilChanged()
    .flatMap(text => {
        return searchWikipedia(text);
    })
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
    url: 'https://en.wikipedia.org/w/api.ph',
    dataType: 'jsonp',
    data: {
      action: 'opensearch',
      format: 'json',
      search: term
    }
  }).promise();
}
