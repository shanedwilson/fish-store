const discount = 0.12;

const applySale = () => {
    $('.on-sale').each ((i, fish) => {
        const fullPrice = $(fish).find('.price')
        const newPrice = (parseInt(fullPrice.html()) * (1 - discount)).toFixed(2);
        fullPrice.html(newPrice);
    })
};

// Add fish to "Basket"

const writeFishes = arrayofFishes => {
  let domString = "";
  arrayofFishes.forEach(fish => {
    domString += `
        <div class="${
          fish.onSale ? "on-sale" : ""
        } fish card col-md-6 col-md-offset-3">
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
        `;
  });
  //write to dom
  $("#available").append(domString);
};

$("body").on("click", "button.add", e => {
  //What is the div that has the fish
  const fishToMove = $(e.target).closest(".fish");
  //Move that fish to the 'snagged' div
  $("#snagged").append(fishToMove);
  // button text => Remove from Baseket | change class -'add' + 'remove'
  $(e.target)
    .text("Remove From Basket")
    .addClass("remove")
    .removeClass("add");
});

// Remove Fish
$("body").on("click", "button.remove", e => {
  //What is the div that has the fish
  const fishToMove = $(e.target).closest(".fish");
  //Move that fish to the 'available' div
  $("#available").append(fishToMove);
  // button text => Remove from Baseket | change class -'remove' + 'add'
  $(e.target)
    .text("Add To Basket")
    .addClass("add")
    .removeClass("remove");
});

// Filter fish that are "on sale"
$("#show-sale").click(() => {
  $(".fish")
    .not(".on-sale")
    .toggle();
  $("#show-sale").text((i, text) => {
    return text === "Show Sale Fish" ? "Show All" : "Show Sale Fish";
  });
});

// Load Fish
$.get("../db/fishes.json")
  .done(data => {
    writeFishes(data.fishes);
    applySale();
  })
  .fail(error => {
    console.log(error);
  });
