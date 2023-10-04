const itemList = document.querySelector('#itemList');
const summaryList = document.querySelector('#summary');
const total = document.querySelector('#total');
const Offer = new Map();
const Summary = new Array();
const SummaryQuantities = new Map();


addDrinkItem("Espresso",["10 grams medium ground coffee","water","sugar(optional)"],2.5,35,"espresso",false);
addDrinkItem("Espresso Lungo",["10 grams medium ground coffee","water","sugar(optional)"],2.5,110,"espresso_lungo",false);
addDrinkItem("Cappuccino",["10 grams medium ground coffee","water","steamed milk","sugar(optional)"],2.5,150,"cappuccino",false);
addDrinkItem("Espresso Macchiato",["10 grams medium ground coffee","water","steamed milk","sugar(optional)"],2.5,40,"espresso_macchiato",false);
addDrinkItem("Caffè Shackerato",["long espresso","hazelnut syrup","hazelnuts grain","ice cubes"],4,150,"shackerato",false);
addDrinkItem("Affogato",["long espresso","ice cream"],4.5,110,"affogato",false);
addDrinkItem("Latte Macchiato",["10 grams medium ground coffee","water","steamed milk","sugar(optional)"],3,250,"macchiato",false);
addDrinkItem("Caffe Cannelle",["espresso","cinnamon syrup","milk cream","black pepper powder","cinnamon flakes","ice cubes"],4.5,150,"cannelle",false);
addDrinkItem("Iced Pistachio Coffee",["long espresso","whipped milk","pistachio cream","pistachio grain"],4.5,250,"pistacho",false);
addDrinkItem("Marocchino",["espresso","chocolate sauce","cocoa powder","milk cream"],4.5,150,"marocchino",false);
addDrinkItem("Pumpkin Spice Latte",["espresso","whipped milk","pumpkin puree","cinnamon","ginger","nutmeg"],4.5,250,"pumpkin",false);
addDrinkItem("Lemonade",["water","sugar","lemon","mint"],3,250,"lemonade",false);

addFoodItem("Cornetto al Pistacchio",["flour","milk","salt","butter","egg","sugar","yeast","water","pistacchio cream"],80,50,"cornetto",false);
addFoodItem("Sicilian Cannolo",[],80,50,"cannolo",false);
addFoodItem("Pistachio Gelato",[],19,160,"gelato",false);
addFoodItem("Macaroons",["ground almonds","powdered sugar","egg white","sugar","water","food colouring"],100,20,"macaroons",false);
addFoodItem("Brownie",["butter","dark chocolate","eggs","sugar","flour","salt","hazelnuts"],50,90,"brownie",false);
addFoodItem("Lemon Tart",[],50,90,"lemon_tart",false);
addFoodItem("Vanilla Brioche",[],21,70,"brioche",false);
addFoodItem("Cheesecake",[],50,90,"cheesecake",false);


itemList.innerHTML = writeAllOffers();
refreshOfferView();
refreshSummaryView();

function FoodItem(name, ingredients, pricePerKilogram, pieceWeight,imgId,gluten) {
	this.name = name;
	this.ingredients = ingredients;
	this.pricePerKilogram = pricePerKilogram;
	this.pieceWeight = pieceWeight;
	this.price = Math.round(((pieceWeight/1000)*pricePerKilogram)*10)/10;
	
	this.imgId = imgId;
	this.image = '<img src="img/'+imgId+'.jpg">';
	this.allergensAlert = allergensAlert(ingredients);
	this.gluten = gluten;
}

function DrinkItem(name, ingredients, price, volume, imgId,gluten) {
	this.name = name;
	this.ingredients = ingredients;
	this.price = price;
	this.volume = volume;
	this.imgId = imgId;
	this.image = '<img src="img/'+imgId+'.jpg">';
	this.allergensAlert = allergensAlert(ingredients);
	this.gluten = gluten;
}

function allergensAlert(ingredients) {
	if(ingredients.includes('hazelnuts grain') || ingredients.includes('hazelnut syrup') || ingredients.includes('hazelnuts') || ingredients.includes('pistachio grain') || ingredients.includes('pistachio cream') || ingredients.includes('ground almonds')) {
		return  "CONTAINS NUTS";
	}
	else return "";
}

function writeAllOffers() {
	let offerList = '';
	for(let offerId of Offer.keys()) {
		offerList += writeOffer(offerId);
	}
	return  offerList;	
}

function writeOffer(offerId) {
    let offerDescription ='<div class="offer">';
	offerDescription += '<div data-offerid="'+offerId+'" class="ingredientsLink">ingredients</div>';
	offerDescription += '<div data-offerid="'+offerId+'" class="ingredientsList"><div data-offerid="'+offerId+'" class="closeIngredients">x</div>'+Offer.get(offerId).ingredients.join(", ")+ '<div class="allergensAlert">'+Offer.get(offerId).allergensAlert+'</div></div>';	 
	if(Offer.get(offerId).name)  offerDescription += '<div class="name">'+Offer.get(offerId).name+'</div>'; 
	if(Offer.get(offerId).pricePerKilogram) offerDescription += '<div class="pricePerKilogram">'+Offer.get(offerId).pricePerKilogram+' EUR per kg</div>';
	if(Offer.get(offerId).pieceWeight) offerDescription += '<div class="pieceWeight"> | weight '+Offer.get(offerId).pieceWeight+' g</div>';

	if(Offer.get(offerId).volume) offerDescription += '<div class="volume">volume '+Offer.get(offerId).volume+' ml</div>';
	if(Offer.get(offerId).price) offerDescription += '<div class="price">'+Offer.get(offerId).price+' EUR</div>';
	offerDescription += '<div class="image-container"><div class="image">' + Offer.get(offerId).image + '</div></div>';
	if(Offer.get(offerId).gluten) offerDescription += '<div class="gluten"><img src="img/gluten_free.jpg"></div>';
	offerDescription += '<div data-offerid="'+offerId+'"class="select">Dodaj</div>';
	offerDescription += '</div>';
	return offerDescription;
}

function addFoodItem(name, ingredients, pricePerKilogram, pieceWeight,imgId,gluten) {
	let newOfferId = 'Item'+(Offer.size+1);
	Offer.set(newOfferId,new FoodItem(name, ingredients, pricePerKilogram, pieceWeight,imgId,gluten));
}

function addDrinkItem(name, ingredients, price, volume, imgId,gluten) {
	let newOfferId = 'Item'+(Offer.size+1);
	Offer.set(newOfferId,new DrinkItem(name, ingredients, price, volume, imgId,gluten));
}

function deleteSelectedItem(selectedItemIndex) {
	SummaryQuantities.delete(JSON.stringify(Summary.at(selectedItemIndex)));
	Summary.splice(selectedItemIndex,1);
}

function addSelectedItemDelete() {
	const deleteLinks = document.querySelectorAll('.selectedDelete');
	for(let deleteLink of deleteLinks) {
		deleteLink.addEventListener('click', function() {
			deleteSelectedItem(this.dataset.selectedItemIndex);
			refreshSummaryView();
		});
	}
}

function writeSelectedItems() {
	let offerList = '';
	for(i=0; i<Summary.length; i++) {
		offerList += writeSelectedItem(i);
	}	
	return '<div class="summaryHeader">My Order</div>' +offerList;
}

function writeSelectedItem(selectedItemIndex) {
    let offerDescription ='<div class="offerSummary">';
	if(Summary.at(selectedItemIndex).name)  offerDescription += '<div class="summary name-summary">'+Summary.at(selectedItemIndex).name+'</div>'; 
	if(Summary.at(selectedItemIndex).pieceWeight) offerDescription += '<div class="summary pieceWeight-summary"> '+Summary.at(selectedItemIndex).pieceWeight+' g</div>';
	if(Summary.at(selectedItemIndex).volume)  offerDescription += '<div class="summary volume-summary"> '+Summary.at(selectedItemIndex).volume+' ml</div>'; 
	offerDescription += '<div data-selected-item-index="'+selectedItemIndex+'"class="selectedDelete"><i class="icon-trash-empty"></i></div>';
	offerDescription += '<div class="summary quantity-box"><div data-selected-item-index="'+selectedItemIndex+'" class="quantityMinus quantity"> - </div><div class="quantity quantityNumber">'+SummaryQuantities.get(JSON.stringify(Summary.at(selectedItemIndex)))+'</div><div data-selected-item-index="'+selectedItemIndex+'" class="quantityPlus quantity"> + </div></div>';
	if(Summary.at(selectedItemIndex).price)  offerDescription += '<div class="summary price-summary"> '+Summary.at(selectedItemIndex).price*SummaryQuantities.get(JSON.stringify(Summary.at(selectedItemIndex)))+' EUR</div>'; 
    offerDescription += '</div>';
	return offerDescription;
}

function addSelectedItemAdd() {
	const selectedLinks = document.querySelectorAll('.select');
	selectedLinks.forEach((selectedLink) => {
		selectedLink.addEventListener('click', function() {
            let quantity = SummaryQuantities.get(JSON.stringify(Offer.get(this.dataset.offerid)));
			if(quantity<20 || quantity==undefined) {
				let object ="";
				if (Offer.get(this.dataset.offerid) instanceof FoodItem) {
					let name = Offer.get(this.dataset.offerid).name;
					let ingredients = Offer.get(this.dataset.offerid).ingredients;
					let pricePerKilogram = Offer.get(this.dataset.offerid).pricePerKilogram;
					let pieceWeight = Offer.get(this.dataset.offerid).pieceWeight;
					let imgId = Offer.get(this.dataset.offerid).imgId;
					let gluten = Offer.get(this.dataset.offerid).gluten;
						
					object= new FoodItem(name, ingredients, pricePerKilogram, pieceWeight,imgId,gluten);
				}
				else {
					let name = Offer.get(this.dataset.offerid).name;
					let ingredients = Offer.get(this.dataset.offerid).ingredients;
					let price = Offer.get(this.dataset.offerid).price;
					let volume = Offer.get(this.dataset.offerid).volume;
					let imgId = Offer.get(this.dataset.offerid).imgId;
					let gluten = Offer.get(this.dataset.offerid).gluten;

					object = new DrinkItem(name, ingredients, price, volume, imgId,gluten);					
				}						
				if(!SummaryQuantities.has(JSON.stringify(object))) {
					Summary.push(object);
					SummaryQuantities.set(JSON.stringify(object),1);
				}
				else {
					SummaryQuantities.set(JSON.stringify(object), SummaryQuantities.get(JSON.stringify(object))+1);
				}
				refreshSummaryView();																					
			} 
		});
	});			
}

function refreshOfferView() {
	addSelectedItemAdd();	
	const selectedLinks = document.querySelectorAll('.select');
	selectedLinks.forEach((selectedLink) => {
		if(SummaryQuantities.get(JSON.stringify(Offer.get(selectedLink.dataset.offerid))) >19) {
			selectedLink.style.backgroundColor = "rgb(228, 228, 228)";
			selectedLink.style.cursor = "default";
		} 
	});
	const ingredientsLinks = document.querySelectorAll('.ingredientsLink');
	for(let ingredientsLink of ingredientsLinks) {
		ingredientsLink.addEventListener('click', function() {
			showIngredients(this.dataset.offerid);
			ingredientsLink.style.cursor = 'default';
			ingredientsLink.style.backgroundColor = '';			
			ingredientsLink.addEventListener('mouseover', function() {
				ingredientsLink.style.backgroundColor = '';
			});
		});		
		ingredientsLink.addEventListener('mouseover', function() {
			ingredientsLink.style.background = 'rgba(145, 145, 145, .5)';
		});
		ingredientsLink.addEventListener('mouseout', function() {
			ingredientsLink.style.backgroundColor = '';
		});
	}	
	const closeIngredientsButtons = document.querySelectorAll('.closeIngredients');
	for(let button of closeIngredientsButtons) {
		button.addEventListener('click', function() {
			closeIngredients(this.dataset.offerid);
			button.style.cursor = 'pointer';
			for(let ingredientsLink of ingredientsLinks) {	
				if(this.dataset.offerid == ingredientsLink.dataset.offerid) {		
					ingredientsLink.style.cursor = "";			
				}			
			}
		});
	}
}

function refreshSummaryView() {
	summaryList.innerHTML = writeSelectedItems();	
	addSelectedItemDelete();
	writeTotalPrice();
	quantityPlus();
	quantityMinus();
	const quantityMinuses = document.querySelectorAll('.quantityMinus');
	quantityMinuses.forEach((quantityMinus) => {
		if(SummaryQuantities.get(JSON.stringify(Summary.at(quantityMinus.dataset.selectedItemIndex))) < 2) {
			quantityMinus.style.backgroundColor = "rgb(228, 228, 228)";
			quantityMinus.style.cursor = "default";
		}
	});
	const quantityPluses = document.querySelectorAll('.quantityPlus');
	quantityPluses.forEach((quantityPlus) => {
		if(SummaryQuantities.get(JSON.stringify(Summary.at(quantityPlus.dataset.selectedItemIndex))) >19) {
			quantityPlus.style.backgroundColor = "rgb(228, 228, 228)";
			quantityPlus.style.cursor = "default";
		}
	});
	const selectedLinks = document.querySelectorAll('.select');
	selectedLinks.forEach((selectedLink) => {
		let quantity = SummaryQuantities.get(JSON.stringify(Offer.get(selectedLink.dataset.offerid)));
		if(quantity>19) {
			selectedLink.style.backgroundColor = "#757575";
			selectedLink.style.cursor = "default";
			selectedLink.innerHTML = quantity;
		} 
		else if(quantity>1 && quantity<20) {
			selectedLink.style.backgroundColor = "#2c2c2c";
			selectedLink.style.cursor = "";
			selectedLink.innerHTML = quantity;
		}
		else if(quantity==1) {
			selectedLink.style.backgroundColor = "#2c2c2c";
			selectedLink.style.cursor = "";
			selectedLink.innerHTML = quantity;			
		}
		else {
			selectedLink.style.backgroundColor = "";
			selectedLink.style.cursor = "";	
			selectedLink.innerHTML = "add";			
		}
	});
}

function writeTotalPrice() {
	let totalprice = 0;
	Summary.forEach((element) => totalprice += element.price * SummaryQuantities.get(JSON.stringify(element)));
	total.innerHTML =  '<span class="summary total">Total</span><span class="total__price">'+ totalprice+' EUR</span><span class="summary order"><a href="end_of_order.html">Checkout</a></span>';
}

function quantityPlus() {
	const pluses = document.querySelectorAll('.quantityPlus');		
	for(let plus of pluses) {
		plus.addEventListener('click', function() {
			let object = Summary.at(this.dataset.selectedItemIndex);
			let key = JSON.stringify(object);
			let quantity= SummaryQuantities.get(key);
			if(quantity <20) {
			SummaryQuantities.set(key, quantity+1);
			refreshSummaryView();
			}			
		});
	}
}

function quantityMinus() {
	const minuses = document.querySelectorAll('.quantityMinus');	
	for(let minus of minuses) {
		minus.addEventListener('click', function() {
			let object = Summary.at(this.dataset.selectedItemIndex);
			let key = JSON.stringify(object);
			let quantity= SummaryQuantities.get(key);
			if(quantity>1) {
				SummaryQuantities.set(key, quantity-1);
				refreshSummaryView();
			}
			else {
			}
		});
	}
}

function showIngredients(offerid) {
	const ingredientsLists =  document.querySelectorAll('.ingredientsList');
	for(let ingredientsList of ingredientsLists) {
		if(ingredientsList.dataset.offerid == offerid) {
			ingredientsList.style.display ="block";
		}
	}
}

function closeIngredients(offerid) {
	const ingredientsLists =  document.querySelectorAll('.ingredientsList');
	for(let ingredientsList of ingredientsLists) {
		if(ingredientsList.dataset.offerid == offerid) {		
			ingredientsList.style.display ="none";
		}
	}
	const ingredientsLinks = document.querySelectorAll('.ingredientsLink');
	for(let ingredientsLink of ingredientsLinks) {	
		ingredientsLink.addEventListener('mouseover', function() {
			ingredientsLink.style.background = 'rgba(145, 145, 145, .5)';
		});	
		ingredientsLink.addEventListener('mouseout', function() {
			ingredientsLink.style.backgroundColor = '';
		});
	}
}

function setSwitchButtonState() {
	var order_mode = localStorage.getItem("order_mode");
	if(order_mode == "toGo") {
		moveRight();
	}
}