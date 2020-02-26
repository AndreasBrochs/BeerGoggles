 $(() => {
     // SLIDERS IN MODAL
     let abvSlider = document.getElementById("abvSlider");
     let abvOutput = document.getElementById("abvSpan");;
     abvOutput.innerHTML = abvSlider.value;
     abvSlider.oninput = function() {
         abvOutput.innerHTML = this.value;
     }

     let ibuSlider = document.getElementById("ibuSlider");
     let ibuOutput = document.getElementById("ibuSpan");
     ibuOutput.innerHTML = ibuSlider.value;
     ibuSlider.oninput = function() {
         ibuOutput.innerHTML = this.value;
     }

     // MODAL SHOW & HIDE


     $("#bigBtn").click(() => {
         $("#myModal").show()
     });

     let modal = $("#myModal");
     $(window).click((e) => {
         if (e.target.id === modal.attr("id")) {
             modal.css("display", "none");
         }
     });

     $(".close").click(() => {
         $(".modal").hide();
     });

     $("#searchName").click(() => {
         $(".modal").hide();
     });

     $("#searchABV").click(() => {
         $(".modal").hide();
     });

     $("#random").click(() => {
         $(".modal").hide();
     });

     $("#beer-name").keydown(function(e) {
         if (e.keyCode === 13) {
             $(".modal").hide()
         }
     });


 })