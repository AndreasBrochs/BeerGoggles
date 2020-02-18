//jQuery start
$(() => {

    //search by name
    $("#searchName").click(() => {
        callAPI();
    });
    //search by name by pressing enter
    $("#beer-name").keydown(function(e) {
        if (e.keyCode === 13) {
            callAPI()
        }
    });
    //search by abv & ibu
    $("#searchABV").click(() => {
        callAbvAPI();
    });
    //search random beer
    $("#random").click(() => {
        callRandomAPI();
    });

    function callAPI() {
        //search by name
        let search = $("#beer-name");
        fetch("https://api.punkapi.com/v2/beers?beer_name=" + search.val())
            .then(res => res.json())
            .then(data => {
                console.log(data);
                document.getElementById("beer-text").innerHTML = `The selected beer is <br> ${data[0].name}.`;
                document.getElementById("beer-img").src = data[0].image_url;
                document.getElementById("beer-food").innerHTML = `Food that match: ${data[0].food_pairing[0]}.`;
                $("#googleBar").val(data[0].food_pairing[0]);
                $(".googleSearch").fadeIn();

                //ajax search, funkar inte just nu
                $("#beer-name").on("input", () => {
                    if ($("#beer-name").val().length > 2) {
                        let queryUrl = "https://api.punkapi.com/v2/beers?beer_name=" + $("#beer-name").val();
                        console.log(queryUrl) //såhär långt funkar det

                        $.ajax({
                            type: "Get",
                            url: queryUrl,
                            dataType: 'json',
                            success: (result) => {
                                $("#beer-name").empty();
                                for (let i = 0; i < result.length; i++) {
                                    let [id, name] = result[i];
                                    $("#beer-name").append("<option data-value='" + id + "'>" + name + "</option>");
                                }
                            }
                        })
                    }
                })

            }) //ajax end


    }


    //Search ABV & IBU
    function callAbvAPI() {
        let abv = $("#abvSlider");
        let ibu = $("#ibuSlider");
        fetch("https://api.punkapi.com/v2/beers?abv_gt=" + abv.val() + "&ibu_gt=" + ibu.val())
            .then(res => res.json())
            .then(data => {
                console.log(data);
                document.getElementById("beer-text").innerHTML = `The selected beer is <br> ${data[0].name}.`;
                document.getElementById("beer-img").src = data[0].image_url;
                document.getElementById("beer-food").innerHTML = `Food that match: ${data[0].food_pairing[0]}.`;
                $("#googleBar").val(data[0].food_pairing[0]);
                $(".googleSearch").fadeIn();
            })
    };

    // RANDOM BEER SEARCH
    function callRandomAPI() {
        fetch("https://api.punkapi.com/v2/beers/random")
            .then(res => res.json())
            .then(data => {
                console.log(data[0]);
                document.getElementById("beer-text").innerHTML = `The random beer is <br> ${data[0].name}.`;
                document.getElementById("beer-img").src = data[0].image_url;
                document.getElementById("beer-food").innerHTML = `Food that match: ${data[0].food_pairing[0]}`;
                $("#googleBar").val(data[0].food_pairing[0]);
                $(".googleSearch").fadeIn();
            });
    }

    // SLIDER
    var abvSlider = document.getElementById("abvSlider");
    var abvOutput = document.getElementById("abvSpan");
    abvOutput.innerHTML = abvSlider.value;


    abvSlider.oninput = function() {
        abvOutput.innerHTML = this.value;
    }
    var ibuSlider = document.getElementById("ibuSlider");
    var ibuOutput = document.getElementById("ibuSpan");
    ibuOutput.innerHTML = ibuSlider.value;


    ibuSlider.oninput = function() {
        ibuOutput.innerHTML = this.value;
    }

    // MODAL

    var modal = document.getElementById("myModal");


    var btn = document.getElementById("bigBtn");


    var closeX = document.getElementsByClassName("close")[0];


    btn.onclick = function() {
        modal.style.display = "block";
    }


    closeX.onclick = function() {
        modal.style.display = "none";
    }


    window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        //ska stänga modalen när man trycker på sök. funkar inte just nu.
    $("#searchName").onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}); //jQuery body ready