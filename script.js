// Function to handle distance and expense calculation
async function calculateDistance() {
    const startLocation = document.getElementById("startLocation").value;
    const destination = document.getElementById("destination").value;
    const mode = document.getElementById("mode").value;

    try {
        const startCoords = await getCoordinates(startLocation);
        const destCoords = await getCoordinates(destination);

        if (startCoords && destCoords) {
            const distance = getDistance(startCoords, destCoords);
            displayDistanceAndExpenses(distance, mode, startLocation, destination);
        } else {
            document.getElementById("resultText").innerText = "Error: Could not get coordinates. Please check your inputs.";
        }
    } catch (error) {
        document.getElementById("resultText").innerText = "Error: " + error.message;
    }
}

// Function to fetch coordinates from OpenStreetMap API
async function getCoordinates(location) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
    const data = await response.json();
    if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
    }
    return null;
}

// Function to calculate distance between two coordinates using Haversine formula
function getDistance(coords1, coords2) {
    const R = 6371; // Radius of Earth in km
    const dLat = toRadians(coords2.lat - coords1.lat);
    const dLon = toRadians(coords2.lon - coords1.lon);
    const lat1 = toRadians(coords1.lat);
    const lat2 = toRadians(coords2.lat);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in km
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Function to display distance and expenses
function displayDistanceAndExpenses(kilometers, mode, startLocation, destination) {
    let costPerKm;

    // Define cost per kilometer based on the mode of transport
    switch (mode) {
        case "car":
            costPerKm = 10; // Example rate per km for car
            break;
        case "train":
            costPerKm = 5; // Example rate per km for train
            break;
        case "bus":
            costPerKm = 3; // Example rate per km for bus
            break;
        case "flight":
            costPerKm = 20; // Example rate per km for flight
            break;
        default:
            costPerKm = 0;
    }

    // Calculate the total cost
    const totalCost = kilometers * costPerKm;

    // Display the result
    const resultText = `Estimated travel cost from ${startLocation} to ${destination} is ₹${totalCost.toFixed(2)} based on transport by ${mode}.`;
    document.getElementById("resultText").innerText = resultText;

    // Display the distance
    const distanceText = `Distance: ${kilometers.toFixed(2)} km.`;
    document.getElementById("distanceText").innerText = distanceText;
}

// Function to show the next interface (interface2)
function showNextInterface() {
    document.getElementById("interface1").style.display = "none";
    document.getElementById("interface2").style.display = "block";
}

// Function to show the previous interface (interface1)
function showPreviousInterface() {
    document.getElementById("interface2").style.display = "none";
    document.getElementById("interface1").style.display = "block";
}

// Function to handle clicks on service icons
document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.icon');

    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            const id = icon.id;

            switch (id) {
                case 'hotel':
                    window.open('https://www.agoda.com', '_blank');
                    break;
                case 'transport':
                    document.getElementById("interface2").style.display = "none";
                    document.getElementById("transportFacilitiesInterface").style.display = "block";
                    break;
                case 'services':
                    document.getElementById("interface2").style.display = "none";
                    document.getElementById("localServicesInterface").style.display = "block";
                    break;
                case 'weather':
                    window.open('https://openweathermap.org/', '_blank');
                    break;
                case 'food':
                    window.open('https://www.zomato.com', '_blank');
                    break;
                case 'emergencyContacts':
                    document.getElementById("localServicesInterface").style.display = "none";
                    document.getElementById("emergencyInterface").style.display = "block";
                    break;
                case 'regionalTraveling':
                    window.open('https://www.olacabs.com', '_blank');
                    break;
                case 'instantBooking':
                    window.open('https://www.abhibus.com', '_blank');
                    break;
                case 'carRenting':
                    window.open('https://www.zoomcar.com', '_blank');
                    break;
                default:
                    alert('Unknown icon clicked.');
            }
        });
    });
});

// Function to go back to the local services options from Local Services interface
function showPreviousInterfaceFromLocalServices() {
    document.getElementById("localServicesInterface").style.display = "none";
    document.getElementById("interface2").style.display = "block";
}

// Function to go back to the transport facilities options from Transport Facilities interface
function showPreviousInterfaceFromTransportFacilities() {
    document.getElementById("transportFacilitiesInterface").style.display = "none";
    document.getElementById("interface2").style.display = "block";
}

// Function to go back to the previous interface from Emergency Contacts interface
function showPreviousInterfaceFromEmergency() {
    document.getElementById("emergencyInterface").style.display = "none";
    document.getElementById("localServicesInterface").style.display = "block";
}
