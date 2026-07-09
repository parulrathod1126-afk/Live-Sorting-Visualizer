let numbers = [];

async function loadData() {

    try {
        document.getElementById("message").innerHTML = "Loading Data...";
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        numbers = data.products
            .slice(0, 10)
            .map(product => product.stock);

        numbers.sort(() => Math.random() - 0.5);
        displayBars();
        document.getElementById("message").innerHTML = "Data Loaded Successfully";

    } catch (error) {
        document.getElementById("message").innerHTML = "Failed to Load API Data";
    }
}

function displayBars() {
    const container = document.getElementById("bars");
    container.innerHTML = "";
    numbers.forEach(function(value) {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = (value * 3) + "px";
        bar.innerHTML = value;
        container.appendChild(bar);
    });
}

async function bubbleSort() {

    document.getElementById("message").innerHTML = "Sorting...";
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length - i - 1; j++) {
            if (numbers[j] > numbers[j + 1]) {                
                let temp = numbers[j];
                numbers[j] = numbers[j + 1];
                numbers[j + 1] = temp;
                displayBars();                
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
    }
    submitResult();
}

async function submitResult() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: "Success",
                sortedArray: numbers,
                message: "Bubble Sort Completed"
            })
        });
        const result = await response.json();
        console.log(result);
        document.getElementById("message").innerHTML =
            "Sorting Completed & Data Submitted Successfully";
    } catch (error) {
        document.getElementById("message").innerHTML =
            "POST Request Failed";
    }
}