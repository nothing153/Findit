let items = [
    {
        id: 1,
        name: " Headphones",
        type: "Lost",
        location: "College Library",
        date: "2026-10-25",
        description: "Black wireless headphones.",
        claimed: false
    },
    {
        id: 2,
        name: " Water Bottle",
        type: "Found",
        location: "Canteen",
        date: "2026-10-26",
        description: "Blue bottle left on a table.",
        claimed: false
    },
    {
        id: 3,
        name: "Engineering Book",
        type: "Lost",
        location: "Room 204",
        date: "2026-10-27",
        description: "First-year engineering textbook.",
        claimed: true
    },
    {
        id: 4,
        name: "Calculator",
        type: "Found",
        location: "Computer Lab",
        date: "2026-10-28",
        description: "Scientific calculator found on a desk.",
        claimed: false
    },
    {
        id: 5,
        name: "laptop charger",
        type: "Found",
        location: "Computer Lab",
        date: "2026-10-28",
        description: "laptop charger found on a desk.",
        claimed: true
    },
    {
        id: 6,
        name: "Assignment of Data structure",
        type: "Lost",
        location: "Chemistry lab",
        date: "2026-10-28",
        description: "cover of assignment is red.",
        claimed: false
    }
];

let nextId = 5;
let currentFilter = "All";

const container = document.getElementById("itemsContainer");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
const itemForm = document.getElementById("itemForm");
const filterButtons = document.querySelectorAll(".filter-btn");


function displayItems() {
    container.innerHTML = "";

    const searchText = searchInput.value.trim().toLowerCase();

    const filteredItems = items.filter(function (item) {
        const searchableText =
            item.name + " " +
            item.type + " " +
            item.location + " " +
            item.description;

        const matchesSearch =
            searchableText.toLowerCase().includes(searchText);

        const matchesFilter =
            currentFilter === "All" || item.type === currentFilter;

        return matchesSearch && matchesFilter;
    });

    resultCount.textContent =
        filteredItems.length + " item(s) found";

    if (filteredItems.length === 0) {
        container.innerHTML =
            '<p class="empty-message">No matching items found.</p>';
        return;
    }

    filteredItems.forEach(function (item) {
        const card = document.createElement("div");
        card.className = "item-card";

        const typeClass = item.type.toLowerCase();

        // Build the card using textContent for user-provided values.
        const title = document.createElement("h3");
        title.textContent = item.name;

        const type = document.createElement("span");
        type.className = "item-type " + typeClass;
        type.textContent = item.type;

        const location = document.createElement("p");
        location.textContent = "📍 Location: " + item.location;

        const date = document.createElement("p");
        date.textContent = "📅 Date: " + item.date;

        const description = document.createElement("p");
        description.textContent = item.description;

        card.append(title, type, location, date, description);

        if (item.claimed) {
            const claimedLabel = document.createElement("p");
            claimedLabel.textContent = "✓ Marked as claimed";
            card.appendChild(claimedLabel);
        }

        const actions = document.createElement("div");
        actions.className = "card-actions";

        const claimButton = document.createElement("button");
        claimButton.className = "claim-btn";
        claimButton.textContent =
            item.claimed ? "Undo Claimed" : "Mark Claimed";

        claimButton.addEventListener("click", function () {
            item.claimed = !item.claimed;
            displayItems();
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            const confirmed = confirm(
                "Are you sure you want to delete this item?"
            );

            if (confirmed) {
                items = items.filter(function (currentItem) {
                    return currentItem.id !== item.id;
                });

                displayItems();
            }
        });

        actions.append(claimButton, deleteButton);
        card.appendChild(actions);
        container.appendChild(card);
    });
}


searchInput.addEventListener("input", displayItems);


filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        displayItems();
    });
});


itemForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("itemName").value.trim();
    const type = document.getElementById("itemType").value;
    const location = document.getElementById("itemLocation").value.trim();
    const date = document.getElementById("itemDate").value;
    const description =
        document.getElementById("itemDescription").value.trim();

    if (!name || !location || !date || !description) {
        alert("Please fill in all fields.");
        return;
    }

    const newItem = {
        id: nextId++,
        name: name,
        type: type,
        location: location,
        date: date,
        description: description,
        claimed: false
    };

    items.unshift(newItem);

    itemForm.reset();
    currentFilter = "All";
    searchInput.value = "";

    filterButtons.forEach(function (button) {
        button.classList.toggle(
            "active",
            button.dataset.filter === "All"
        );
    });

    displayItems();
});


displayItems();