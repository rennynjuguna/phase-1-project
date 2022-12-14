$(document).ready(function() {
  var item, tile, author, publisher, publishedDate, bookLink, bookImg;
  var outputList = document.getElementById("list-output");
  var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  //var apiKey = "key=AIzaSyDCcXWo8wwC-mfsflJUaLaC2IVa-Kfqulo";
  var placeHldr = '<img src="https://via.placeholder.com/150">';
  var searchData;

  //listener for search button
  $("#search").click(function() {
    outputList.innerHTML = ""; //empty html output
    document.body.style.backgroundImage = "url('')";
     searchData = $("#search-box").val();
     //handling empty search input field
     if(searchData === "" || searchData === null) {
       displayError();
     }
     else {
       // console.log(searchData);
       // $.get("https://www.googleapis.com/books/v1/volumes?q="+searchData, getBookData()});
       $.ajax({
          url: bookUrl + searchData,
          dataType: "json",
          success: function(response) {
            console.log(response)
            if (response.totalItems === 0) {
              alert("no result!.. try again")
            }
            else {
              $("#title").animate({'margin-top': '5px'}, 1000); //search box animation
              $(".book-list").css("visibility", "visible");
              displayResults(response);
            }
          },
          error: function () {
            alert("Something went wrong... <br>"+"Try again!");
          }
        });
      }
      $("#search-box").val(""); //clear search box
   });

   /*
    function to display result in index.html
   */
   function displayResults(response) {
      for (var i = 0; i < response.items.length; i++) {
        item = response.items[i];
        title1 = item.volumeInfo.title;
        author1 = item.volumeInfo.authors;
        publisher1 = item.volumeInfo.publisher;
        publishedDate1 = item.volumeInfo.publishedDate;
        bookLink1 = item.volumeInfo.previewLink;
        bookIsbn = item.volumeInfo.industryIdentifiers[1].identifier
        bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr ;

        item2 = response.items[i+1];
        title2 = item2.volumeInfo.title;
        author2 = item2.volumeInfo.authors;
        publisher2 = item2.volumeInfo.publisher;
        publishedDate2 = item2.volumeInfo.publishedDate;
        bookLink2 = item2.volumeInfo.previewLink;
        bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier
        bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr ;

        // output list to HTML
        outputList.innerHTML += '<div class="row mt-4">' +
                                formatOutput(bookImg1, title1, author1, publisher1, publishedDate1, bookLink1, bookIsbn) +
                                formatOutput(bookImg2, title2, author2, publisher2, publishedDate2, bookLink2, bookIsbn2) +
                                '</div>';

        console.log(outputList);
      }
   }

   /*
   Card Element Obtained From Bootstrap
   */
   function formatOutput(bookImg, title, author, publisher, publishedDate, bookIsbn) {
     // console.log(title + ""+ author +" "+ publisher +" "+ publishedDate+" "+ bookImg)
     var htmlCard = `<div class="col-lg-6">
       <div class="card" style="">
         <div class="row no-gutters">
           <div class="col-md-4">
             <img src="${bookImg}" class="card-img" alt="...">
           </div>
           <div class="col-md-8">
             <div class="card-body">
               <h5 class="card-title">${title}</h5>
               <p class="card-text">Author: ${author}</p>
               <p class="card-text">Publisher: ${publisher}</p>
               <p class="card-text">Published Date: ${publishedDate}</p>
             </div>
           </div>
         </div>
       </div>
     </div>`
     return htmlCard;
   }

   //handling error for empty search box
   function displayError() {
     alert("search term can not be empty!")
   }

});
