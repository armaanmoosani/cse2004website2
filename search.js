const apiKey = "API_KEY_PLACEHOLDER";
document.getElementById("search-button").addEventListener("click", function () {
    const ticker = document.getElementById("ticker").value.toUpperCase();
    if (!ticker) {
        resultsDiv.textContent = "Please enter a ticker symbol.";
        return;
    }
    fetch("`https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${apiKey}`", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                
            }
        })
        .catch(err => {
            console.error();
            document.getElementById("message").textContent = "An error occurred. Please try again.";
        });
});