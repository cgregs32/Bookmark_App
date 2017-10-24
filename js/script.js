// $.("#form-submit").on("click", function(){
// });

document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e){
	
	//Get form values
	var siteName = document.getElementById("siteName").value;

	var siteUrl = document.getElementById("siteUrl").value;	

	if(!validateForm(siteName, siteUrl)){
		return false;
	}


	var bookmark={
		name: siteName,
		url: siteUrl
	};

	// // Local storage test -  local storage stores strings
	// //Saves to users local storage: Key, Content
	// localStorage.setItem("test", "Hello World");
	// //selects  the item in storage
	// localStorage.getItem("test");
	// //removes item from local storage
	// localStorage.removeItem("test");


	//if bookmark value is there??
	if(localStorage.getItem("bookmarks") === null){
		//initialize array
		var bookmarks = [];
		// add to array
		bookmarks.push(bookmark);
		//set to local storage - local storage must be a string: must stringify your json
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
		//add bookmark to that array
	}
	//if bookmarks is in your local storage
	else {
		//get bookmakrs from local storage: taking out the local storage(string), making it a json to work with
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add bookmark to your array
		bookmarks.push(bookmark);
		//re-set back to local storage
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	}

	//clear form
	document.getElementById("myForm").reset();

	//re-fetch bookmarks after ading
	fetchBookmarks();		

	//prevent form from submitting : we want to work with it
	e.preventDefault();
}


//delete bookmark
function deleteBookmark(url){
	//get bookmark from localstorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//loop through bookmarks
	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			//remove from array
			bookmarks.splice(i, 1)
		}
	}
	// reset back to local storage
	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

	//after delete, refetch bookmakrs
	fetchBookmarks();	
}

//fetch bookmarks from local storage
function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//get output ID
	var bookmarksResult = document.getElementById("bookmarksResult");

	//build the output
	bookmarksResult.innerHTML = "";
	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var Url = bookmarks[i].url;
		console.log(Url);

	bookmarksResult.innerHTML += '<div class="well">' +
								 '<h3>' + name +
								 ' <a class="btn btn-default" target="_blank" href='+Url+'>Visit</a> ' +
								 ' <a onclick="deleteBookmark(\''+Url+'\')" class="btn btn-danger" href="#">Delete</a> ' +

								 '</h3>' +
								 '</div>';		
	}
}

function validateForm(siteName, siteUrl){
	if(!siteName || !siteUrl){
			alert("Please fill in the form");
			return false;
		}

		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);

		if (!siteUrl.match(regex)) {
	  		alert("Please use a valid URL");
	  		return false;
		}
	return true;
}
