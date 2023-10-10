const connectionStatus = document.getElementById("connectionStatus");
const ipAddressText = document.getElementById("ipAddresstext");
const networkSpeedText = document.getElementById("networkSpeedtext");

// Function to check internet connectivity
async function checkInternetStatus() {
    try {
        // Check internet connectivity using a public API
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        if (response.status === 200) {
            connectionStatus.textContent = "Internet is available!";
            connectionStatus.style.color = "green";
        } else {
            connectionStatus.textContent = "Internet is not available!";
            connectionStatus.style.color = "red";
        }
    } catch (error) {
        connectionStatus.textContent = "Internet is not available!";
        connectionStatus.style.color = "red";
    }

    // Fetch IP address using a public IP API
    fetch("https://api64.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => {
            ipAddressText.textContent = data.ip;
        })
        .catch((error) => {
            ipAddressText.textContent = "N/A";
        });

    // Check network speed range using the navigator.connection API
    if (navigator.connection && navigator.connection.downlink) {
        const speedMbps = navigator.connection.downlink;
        if (speedMbps >= 10) {
            networkSpeedText.textContent = "High Speed (> 10 Mbps)";
        } else if (speedMbps >= 2) {
            networkSpeedText.textContent = "Medium Speed (2-10 Mbps)";
        } else {
            networkSpeedText.textContent = "Low Speed (< 2 Mbps)";
        }
    } else {
        networkSpeedText.textContent = "N/A";
    }
}

// Initial check when the page loads
checkInternetStatus();

// Check the internet status and speed range periodically (every 5 seconds)
setInterval(checkInternetStatus, 5000);
