$(() => {

    $("#searchName").click(() => {
        callAPI();
    });

    $("#beer-name").keydown(function(e) {
        if (e.keyCode === 13) {
            callAPI()
        }
    });

    $("#searchABV").click(() => {
        callAbvAPI();
    });

    $("#random").click(() => {
        callRandomAPI();
    });

    //ajax search
    $("#beer-name").on("input", () => {
            if ($("#beer-name").val().length > 2) {
                let queryUrl = "https://api.punkapi.com/v2/beers?beer_name=" + $("#beer-name").val();

                $.ajax({
                    url: queryUrl,
                    type: "GET",
                    dataType: 'json',
                    success: (result) => {
                        $("#beerName").empty();
                        for (let i in result) {
                            let name = result[i].name;
                            $("#beerName").append("<option>" + name + "</option>");
                        }
                    },
                    error: (result) => {
                        console.log("error on: " + result)
                    }
                })
            }
        }) //Ajax end

    function callAPI() {
        //search by name
        let search = document.getElementById("beer-name");

        fetch("https://api.punkapi.com/v2/beers?beer_name=" + search.value)
            .then(res => res.json())
            .then(data => {
                document.getElementById("beer-text").innerHTML = `The selected beer is <br> ${data[0].name}.`;
                document.getElementById("beer-img").src = data[0].image_url;
                document.getElementById("beer-food").innerHTML = `Food that match: ${data[0].food_pairing[0]}.`;

                document.getElementById("googleBar").value = data[0].food_pairing[0];
                document.getElementsByClassName("googleSearch")[0].style.display = "block";
            })
    }


    //Search ABV & IBU
    function callAbvAPI() {
        let abv = document.getElementById("abvSlider");
        let ibu = document.getElementById("ibuSlider");
        fetch("https://api.punkapi.com/v2/beers?abv_gt=" + abv.value + "&ibu_gt=" + ibu.value)
            .then(res => res.json())
            .then(data => {
                document.getElementById("beer-text").innerHTML = `The selected beer is <br> ${data[0].name}.`;
                document.getElementById("beer-img").src = data[0].image_url;
                document.getElementById("beer-food").innerHTML = `Food that match: ${data[0].food_pairing[0]}.`;

                document.getElementById("googleBar").value = data[0].food_pairing[0];
                document.getElementsByClassName("googleSearch")[0].style.display = "block";
            })
    };

    // RANDOM BEER SEARCH
    function callRandomAPI() {
        fetch("https://api.punkapi.com/v2/beers/random")
            .then(res => res.json())
            .then(data => {
                document.getElementById("beer-text").innerHTML = `The random beer is <br> ${data[0].name}.`;
                document.getElementById("beer-img").src = data[0].image_url;
                document.getElementById("beer-food").innerHTML = `Food that match: ${data[0].food_pairing[0]}`;

                document.getElementById("googleBar").value = data[0].food_pairing[0];
                document.getElementsByClassName("googleSearch")[0].style.display = "block";
            });
    }

});