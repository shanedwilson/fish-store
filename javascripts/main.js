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
    $(".add").on('click', (e) => {
        //What is the div that has the fish
        const fishToMove = $(e.target).closest('.fish');
        //Move that fish to the 'snagged' div
        $('#snagged').append(fishToMove);
        // button text => Remove from Baseket | change class -'add' + 'remove'
        $(e.target).text('Remove from Basket').addClass('remove').removeClass('add');
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

$(".add").on('click', (e) => {
    alert('fish!!!');
});