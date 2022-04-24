// Display stock financials and graphs for 7 stocks in interactive webpage.


document.getElementById('generate').onclick = function() {

    var values = ["AAPL", "AMZN", "FB", "GME", "GOOGL", "MSFT", "TSLA"];

    var select = document.createElement("select");
    select.name = "Ticker";
    select.id = "Tickers"

    for (const val of values)
    {
        var option = document.createElement("option");
        option.value = val;
        option.text = val.charAt(0).toUpperCase();
        select.appendChild(option);
    }

    var label = document.createElement("label");
    label.innerHTML = "Choose your ticker: "
    label.htmlFor = "Tickers";

    document.getElementById("container").appendChild(label).appendChild(select);
}
