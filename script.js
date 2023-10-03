document.addEventListener("DOMContentLoaded", function () {
    //fetchOrders();
    getMockOrders();

    document.getElementById("buyers").addEventListener("click", selectPanel);
    document.getElementById("sellers").addEventListener("click", selectPanel);
});

const mockData = {
    buyers: [
        { platform: "BYBIT", price: 0.99,  link: "https://www.bybit.com/en-US/", name: "Goga", fiat: "USD", crypto: "USDT" },
        { platform: "BINANCE", price: 1.00, link: "https://www.binance.com/en", name: "Nikoha", fiat: "USD", crypto: "USDT" },
        { platform: "BINANCE", price: 1.00, link: "https://www.binance.com/en", name: "Philipp Olgevich Olgevich ssssss", fiat: "USD", crypto: "USDT" },
        { platform: "BYBIT", price: 0.99,  link: "https://www.bybit.com/en-US/", name: "Goga", fiat: "USD", crypto: "USDT" },
        { platform: "BINANCE", price: 1.00, link: "https://www.binance.com/en", name: "Nikoha", fiat: "USD", crypto: "USDT" },
        { platform: "BINANCE", price: 1.00, link: "https://www.binance.com/en", name: "Philipp Olgevich Olgevich ssssss", fiat: "USD", crypto: "USDT" },
        { platform: "BYBIT", price: 0.99,  link: "https://www.bybit.com/en-US/", name: "Goga", fiat: "USD", crypto: "USDT" },
        { platform: "BINANCE", price: 1.00, link: "https://www.binance.com/en", name: "Nikoha", fiat: "USD", crypto: "USDT" },
        { platform: "BINANCE", price: 1.00, link: "https://www.binance.com/en", name: "Philipp Olgevich Olgevich ssssss", fiat: "USD", crypto: "USDT" },
    ],
    sellers: [
        { platform: "BYBIT", price: 1.16, link: "https://www.bybit.com/en-US/", name: "Charlie", fiat: "USD", crypto: "USDT" },
        { platform: "BYBIT", price: 1.14, link: "https://www.bybit.com/en-US/", name: "Alice", fiat: "USD", crypto: "USDT" },
        { platform: "BINANCE", price: 1.10, link: "https://www.binance.com/en", name: "David", fiat: "USD", crypto: "USDT" },
        { platform: "BYBIT", price: 1.16, link: "https://www.bybit.com/en-US/", name: "Charlie", fiat: "USD", crypto: "USDT" },
        { platform: "BYBIT", price: 1.14, link: "https://www.bybit.com/en-US/", name: "Alice", fiat: "USD", crypto: "USDT" },
        { platform: "BINANCE", price: 1.10, link: "https://www.binance.com/en", name: "David", fiat: "USD", crypto: "USDT" },
        { platform: "BYBIT", price: 1.16, link: "https://www.bybit.com/en-US/", name: "Charlie", fiat: "USD", crypto: "USDT" },
        { platform: "BYBIT", price: 1.14, link: "https://www.bybit.com/en-US/", name: "Alice", fiat: "USD", crypto: "USDT" },
        { platform: "BINANCE", price: 1.10, link: "https://www.binance.com/en", name: "David", fiat: "USD", crypto: "USDT" },
    ]
};

function getMockOrders() {
    renderPanels("buyers", mockData.buyers);
    renderPanels("sellers", mockData.sellers);
    calculateSpread();
}

async function fetchOrders() {
    try {
        let response = await fetch('YOUR_API_ENDPOINT');
        let data = await response.json();

        renderPanels("buyers", data.buyers);
        renderPanels("sellers", data.sellers);

        calculateSpread();

    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

function renderPanels(columnId, orders) {
    const column = document.getElementById(columnId);
    orders.forEach((order, index) => {
        let panel = document.createElement("div");
        panel.className = "panel" + (index === 0 ? " selected" : "");
        panel.dataset.price = order.price;
        panel.innerHTML = `
            <div class="panel_header">${order.platform}</div>
            <div class="panel_body">
                <div class="panel_cost">${order.price.toFixed(2)} ${columnId === "buyers" ? order.fiat : order.fiat}</div>
                <a class="panel_ref" href="${order.link}" target="_blank">${order.name}</a>
            </div>
        `;
        column.appendChild(panel);
    });
    //                 <a class="panel_ref" href="${order.link}" target="_blank">${order.name}</a>
}

function selectPanel(event) {
    let panel = event.target.closest(".panel");
    
    if (panel) {
        [...panel.parentElement.children].forEach(p => p.classList.remove("selected"));
        panel.classList.add("selected");
        calculateSpread();
    }
}


function calculateSpread() {
    const selectedBuyer = document.querySelector("#buyers .panel.selected");
    const selectedSeller = document.querySelector("#sellers .panel.selected");

    if (selectedBuyer && selectedSeller) {
        const buyerPrice = parseFloat(selectedBuyer.dataset.price);
        const sellerPrice = parseFloat(selectedSeller.dataset.price);
        const spread = Math.abs((buyerPrice - sellerPrice) / buyerPrice * 100).toFixed(2);
        document.getElementById("spread").textContent = spread;
    }
}
