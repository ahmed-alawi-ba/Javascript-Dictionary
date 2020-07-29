function Connection(){
	
	this.status = 100;
	this.dataArray = null;
	
	
	
	this.search = function(word) {

		let url = this.generateUrl(word);

		this.connect(url)
			.then(result => {
				console.log(result);
//				let jsonResponse = result;
				return result;
			})
			.then(result => {
				this.dataArray = this.extractDefinitions(result);
				console.log("Data Retrieved Successfully");
				hideLoader();
				addElements(this.dataArray);
				this.status = 200;
			})
			.catch((e) =>{
				console.log("Error: " + e.message);
			})
			.finally(() => {
				// ...
			})

	}
	
	
	
	this.generateUrl = function(word) {
		let url1 = "https://api.wordnik.com/v4/word.json/";
		let url2 = "/definitions?limit=10&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=na1tn4yldzk5rgmqbqi8o8uc9zr5kjqqdjo24q07ti8eqmf1c";
		return (url1 + word + url2);
	}
	

	
	this.connect = async function(url) {
		try {
			let response = await fetch(url);

			if (response.ok) {
				let jsonData = await response.json();
				//			jsonResponse = jsonData;
				return jsonData;
				//			console.log(jsonResponse);
			} else {
				hideLoader();
				console.log("HTTP-Error: " + response.status);
				this.status = 400;
				alert("Sorry! The word you've entered isn't in the dictionary");
			}
		} catch (e) {
			hideLoader();
			alert("Connection error! Please check your internet connection and try again.");
			this.status = 400;
			return false;
		}
	}
	
	
	
	this.extractDefinitions = function(jsonArray){
		
	let defsData = [];
	let counter = 0;
	
	jsonArray.forEach((item, index) =>{
		if(item.text){
			defsData[counter] = item.text;
			counter++;
		}
	})
	return defsData;
}
	
	
}