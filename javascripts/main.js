// Filter fish that are "on sale"

// Add fish to "Basket"

const writeFishes = (arrayofFishes) => {
    let domString = '';
    arrayofFishes.forEach((fish )=> {
        domString += `
        <div class="${fish.onSale ? 'on-sale' : ''} fish card col-md-6 col-md-offset-3">
                <div class="thumbnail">
                    <img src="${fish.imageSoure}" 
                    alt="" width="40%">
                    <div class="caption">
                        <h3 id="thumbnail-label">${fish.name}</h3>
                        <p>$
                            <span class="price">${fish.basePrice}</span>
                        </p>
                    </div>
                    <div class="caption card-footer">
                        <button class="add btn btn-danger">Add To Basket</button>
                    </div>
                </div>
            </div>
        `
    })
    //write to dom
    $("#available").append(domString);
    bindEvents();
}

const bindEvents = () => {
    addToBasket();
}

const addToBasket = () => {
    $(".add").on('click', (e) => {
        //What is the div that has the fish
        const fishToMove = $(e.target).closest('.fish');
        //Move that fish to the 'snagged' div
        $('#snagged').append(fishToMove);
        // button text => Remove from Baseket | change class -'add' + 'remove'
        $(e.target).text('Remove From Basket').addClass('remove').removeClass('add');
        removeFromBasket();
        });
}

// Remove Fish
const removeFromBasket = () => {
    $(".remove").on('click', (e) => {
        //What is the div that has the fish
        const fishToMove = $(e.target).closest('.fish');
        console.log("CLICKED!!!")
        //Move that fish to the 'available' div
        $('#available').append(fishToMove);
        // button text => Remove from Baseket | change class -'remove' + 'add'
        $(e.target).text('Add To Basket').addClass('add').removeClass('remove');
        bindEvents();
        });
}

// Load Fish
$.get('../db/fishes.json')
    .done((data) => {
        console.log(data);
        writeFishes(data.fishes);
})
.fail((error) => {
    console.log(error);
}) 