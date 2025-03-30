import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapScreen() {
  const [searchText, setSearchText] = useState('');
  const webViewRef = useRef(null);
  const [locationError, setLocationError] = useState(null);

  // Use browser's built-in geolocation API instead of Expo
  useEffect(() => {
    let watchId;

    // Set up location tracking
    if (Platform.OS === 'web') {
      // Web platform handling
      if (navigator && navigator.geolocation) {
        // Get initial position
        navigator.geolocation.getCurrentPosition(
          (position) => {
            updateCurrentLocation(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            console.error('Error getting location:', error);
            setLocationError(
              'Unable to access your location. Please check your browser permissions.'
            );
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

        // Set up position watcher
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            updateCurrentLocation(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            console.error('Error watching location:', error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        setLocationError('Geolocation is not supported by this browser/device');
      }
    } else {
      // Native platform handling
      // We'll default to Princeton as the center if no location is available
      updateCurrentLocation(40.3573, -74.6672);
    }

    // Clean up
    return () => {
      if (watchId && navigator && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const updateCurrentLocation = (latitude, longitude) => {
    if (!webViewRef.current) return;

    const script = `
      try {
        if (typeof updateMyLocation === 'function') {
          updateMyLocation(${latitude}, ${longitude});
        } else {
          // If the function isn't available yet, try again in a moment
          setTimeout(() => {
            try {
              updateMyLocation(${latitude}, ${longitude});
            } catch (e) {
              console.error("Delayed error updating location:", e);
            }
          }, 1000);
        }
      } catch (e) {
        console.error("Error updating location:", e);
      }
    `;

    if (Platform.OS === 'web') {
      const iframe = document.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.eval(script);
        } catch (e) {
          console.error('Failed to execute script in iframe:', e);
        }
      }
    } else {
      webViewRef.current.injectJavaScript(script);
    }
  };

  // Initialize map only once with geolocation script
  const initialMapHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sustainable Place Finder</title>
        <style>
            body { margin: 0; padding: 0; }
            #map { height: 100vh; width: 100%; }
            .info-message {
                position: absolute;
                top: 80px;
                left: 50%;
                transform: translateX(-50%);
                background: white;
                padding: 10px 15px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                z-index: 1000;
                display: none;
            }
            .location-button {
                position: absolute;
                bottom: 20px;
                right: 20px;
                z-index: 999;
                background: white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                cursor: pointer;
            }
            .location-button:after {
                content: "📍";
                font-size: 20px;
            }
        </style>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    </head>
    <body>
        <div id="map"></div>
        <div id="info-message" class="info-message"></div>
        <div id="location-button" class="location-button"></div>
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <script>
            // Global variables
            let map;
            let markers = [];
            let myLocationMarker = null;
            let myLocationCircle = null;
            
            // Custom marker for location
            const myLocationIcon = L.divIcon({
                className: 'my-location-icon',
                html: '📍',
                iconSize: [24, 24],
                iconAnchor: [12, 24]
            });
            
            // Initialize map
            function initMap() {
                // Default to Princeton center
                map = L.map('map').setView([40.3573, -74.6672], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
                
                // Add location button functionality
                document.getElementById('location-button').addEventListener('click', function() {
                    if (myLocationMarker) {
                        map.setView(myLocationMarker.getLatLng(), 16);
                    } else {
                        showMessage('Location not available, showing Princeton area');
                    }
                });
                
                // Try to get location directly from browser if available
                tryGetLocation();
            }
            
            function tryGetLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        updateMyLocation(position.coords.latitude, position.coords.longitude);
                    }, function(error) {
                        console.error("Geolocation error:", error);
                        showMessage("Location not available, showing Princeton area");
                    }, {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 60000
                    });
                } else {
                    console.warn("Geolocation not supported");
                    showMessage("Location services not supported by your browser");
                }
            }
            
            // Update my location marker
            function updateMyLocation(lat, lng) {
                // Remove old marker and circle if they exist
                if (myLocationMarker) {
                    map.removeLayer(myLocationMarker);
                }
                if (myLocationCircle) {
                    map.removeLayer(myLocationCircle);
                }
                
                // Create new marker and circle
                myLocationMarker = L.marker([lat, lng], {
                    icon: myLocationIcon,
                    zIndexOffset: 1000
                }).addTo(map);
                
                myLocationMarker.bindPopup("<b>You are here</b><br>Current Location").openPopup();
                
                myLocationCircle = L.circle([lat, lng], {
                    color: '#4285F4',
                    fillColor: '#4285F480',
                    fillOpacity: 0.2,
                    radius: 50
                }).addTo(map);
                
                // Center map on the location
                map.setView([lat, lng], 13);
            }
            
            // Show message to user
            function showMessage(message) {
                const messageElement = document.getElementById('info-message');
                messageElement.textContent = message;
                messageElement.style.display = 'block';
                setTimeout(() => {
                    messageElement.style.display = 'none';
                }, 3000);
            }
            
            // Clear all markers from the map (except location marker)
            function clearMarkers() {
                markers.forEach(marker => map.removeLayer(marker));
                markers = [];
            }
            
            // Add markers to the map
            function addMarkers(places) {
                // Clear existing markers
                clearMarkers();
                
                if (!places || places.length === 0) {
                    showMessage('No places found. Try "Food" or "Clothing".');
                    return;
                }
                
                // Calculate bounds
                const bounds = [];
                
                // Add new markers
                places.forEach(place => {
                    const marker = L.marker([place.coordinates[0], place.coordinates[1]])
                        .addTo(map);
                    
                    marker.bindPopup(
                        '<b>' + place.name + '</b><br>' +
                        place.description + '<br>' +
                        place.address + 
                        '<br><a href="https://maps.google.com/?q=' + 
                        place.coordinates[0] + ',' + place.coordinates[1] + 
                        '" target="_blank">Directions</a>'
                    );
                    
                    // Add a tooltip that shows on hover
                    marker.bindTooltip(place.name + '<br>' + place.address);
                    
                    markers.push(marker);
                    bounds.push([place.coordinates[0], place.coordinates[1]]);
                });
                
                // Fit map to show all markers
                if (bounds.length > 0) {
                    map.fitBounds(bounds, { padding: [50, 50] });
                }
                
                showMessage('Showing ' + places.length + ' locations');
            }
            
            // Initialize map on load
            document.addEventListener('DOMContentLoaded', function() {
                initMap();
            });
        </script>
    </body>
    </html>
  `;

  // Enhanced database of sustainable places with categories
  const places = {
    food: [
      {
        name: 'Whole Earth Center',
        address: '360 Nassau St, Princeton, NJ 08540',
        description:
          'Organic grocery store with vegetarian deli and eco-friendly products.',
        coordinates: [40.3533, -74.6588],
        categories: ['food', 'grocery'],
      },
      {
        name: "Jammin' Crepes",
        address: '20 Nassau St, Princeton, NJ 08542',
        description: 'Seasonal crepes made with local produce.',
        coordinates: [40.3577, -74.665],
        categories: ['food', 'restaurant'],
      },
      {
        name: 'Agricola Eatery',
        address: '11 Witherspoon St, Princeton, NJ 08542',
        description:
          'Farm-to-table restaurant offering organic and locally sourced dishes.',
        coordinates: [40.3515, -74.6599],
        categories: ['food', 'restaurant'],
      },
      {
        name: "Princeton Farmers' Market",
        address: 'Hinds Plaza, Princeton, NJ 08542',
        description: 'Seasonal market offering local and sustainable produce.',
        coordinates: [40.3505, -74.6607],
        categories: ['food', 'grocery', 'market'],
      },
      {
        name: "Arlee's Raw Blends",
        address: '14 1/2 Witherspoon St, Princeton, NJ 08542',
        description: 'Organic juice shop with vegan snacks.',
        coordinates: [40.3503, -74.6603],
        categories: ['food', 'juice', 'vegan'],
      },
    ],
    refill: [
      {
        name: 'The Good Bottle Refill Shop',
        address: '1875 Springfield Ave, Maplewood, NJ 07040',
        description:
          'Offers refillable household cleaners and personal care products.',
        coordinates: [40.7328, -74.2598],
        categories: ['refill', 'household', 'zerowaste'],
      },
      {
        name: 'Dry Goods Refillery',
        address: '193 Bellevue Ave, Montclair, NJ 07043',
        description:
          'Zero-waste store with package-free groceries and eco-friendly products.',
        coordinates: [40.8267, -74.2093],
        categories: ['refill', 'zerowaste', 'grocery'],
      },
      {
        name: 'Greater Goods Refillery',
        address: '11 Parker Ave, Manasquan, NJ 08736',
        description: 'Eco-friendly refill store with nontoxic household goods.',
        coordinates: [40.1242, -74.0472],
        categories: ['refill', 'household', 'zerowaste'],
      },
      {
        name: 'Labo Refillery',
        address: '11 Walnut Ave, Cranford, NJ 07016',
        description:
          'Focuses on refillable liquid products like shampoos and cleaners.',
        coordinates: [40.656, -74.3007],
        categories: ['refill', 'personal', 'cleaners'],
      },
      {
        name: 'Unwrapped Refill Shop',
        address:
          'The Shoppes at the Arcade, 658 Cookman Ave Unit 18, Asbury Park, NJ 07712',
        description:
          'Zero-waste store offering bulk food and personal care items.',
        coordinates: [40.2207, -74.0121],
        categories: ['refill', 'zerowaste', 'bulk', 'food'],
      },
    ],
    clothing: [
      {
        name: 'Greene Street Consignment',
        address: '162 Nassau St, Princeton, NJ 08542',
        description:
          'Sustainable consignment shop offering eco-friendly fashion.',
        coordinates: [40.3518, -74.6585],
        categories: ['clothing', 'consignment', 'fashion'],
      },
      {
        name: 'Shop The World',
        address: '4 Spring St., Princeton, NJ 08542',
        description: 'Fair-trade store selling handmade clothing and jewelry.',
        coordinates: [40.3565, -74.6673],
        categories: ['clothing', 'fairtrade', 'accessories'],
      },
    ],
    skincare: [
      {
        name: 'Lucky Honeybee',
        address: '487 Palisade Ave Lower Level, Jersey City, NJ 07307',
        description:
          'Produces eco-friendly candles, soaps, and skincare products.',
        coordinates: [40.7452, -74.0522],
        categories: ['skincare', 'personal', 'eco-friendly'],
      },
      {
        name: 'Root Green Shoppe',
        address: '11106 Long Beach Blvd, Beach Haven, NJ 08008',
        description:
          'Offers sustainable personal care items like biodegradable products.',
        coordinates: [39.5701, -74.2432],
        categories: ['skincare', 'personal', 'sustainable'],
      },
      {
        name: 'Good Deeds Market',
        address: '31 Perry St, Cape May, NJ 08204',
        description: 'Specializes in sustainable personal care and home goods.',
        coordinates: [38.9351, -74.9226],
        categories: ['skincare', 'personal', 'household', 'sustainable'],
      },
    ],
    miscellaneous: [
      {
        name: 'Sustainable Princeton Lending Library',
        address:
          'Contact Sustainable Princeton Office for details (Princeton area)',
        description: 'Borrow sustainable household items like tools for free.',
        coordinates: [40.3573, -74.6672],
        categories: ['lending', 'household', 'tools'],
      },
      {
        name: 'Simple Bare Necessities',
        address: 'Sparta Farmers Market (specific address varies)',
        description: 'Sells zero-waste home goods and refillable products.',
        coordinates: [41.0337, -74.621],
        categories: ['zerowaste', 'household', 'refill'],
      },
      {
        name: 'Eco Loka',
        address: '23 Race St., Frenchtown, NJ 08825',
        description: 'Offers refillable soaps and eco-friendly gifts.',
        coordinates: [40.5273, -75.0571],
        categories: ['refill', 'gifts', 'eco-friendly'],
      },
      {
        name: 'Rahway Refillery',
        address: '1425 Main St., Rahway, NJ 07065',
        description: 'No-waste marketplace with bath and kitchen products.',
        coordinates: [40.6166, -74.2776],
        categories: ['refill', 'zerowaste', 'kitchen', 'bath'],
      },
      {
        name: 'One Stop Eco Shop',
        address: '1174 Fischer Blvd., Toms River, NJ 08753',
        description: 'Package-free grocery store focusing on sustainability.',
        coordinates: [39.9837, -74.1743],
        categories: ['grocery', 'zerowaste', 'packagefree'],
      },
    ],
    grocery: [
      {
        name: 'Whole Earth Center',
        address: '360 Nassau St, Princeton, NJ 08540',
        description:
          'Organic grocery store with vegetarian deli and eco-friendly products.',
        coordinates: [40.3533, -74.6588],
        categories: ['food', 'grocery'],
      },
      {
        name: "Princeton Farmers' Market",
        address: 'Hinds Plaza, Princeton, NJ 08542',
        description: 'Seasonal market offering local and sustainable produce.',
        coordinates: [40.3505, -74.6607],
        categories: ['food', 'grocery', 'market'],
      },
      {
        name: 'One Stop Eco Shop',
        address: '1174 Fischer Blvd., Toms River, NJ 08753',
        description: 'Package-free grocery store focusing on sustainability.',
        coordinates: [39.9837, -74.1743],
        categories: ['grocery', 'zerowaste', 'packagefree'],
      },
    ],
    zerowaste: [
      {
        name: 'The Good Bottle Refill Shop',
        address: '1875 Springfield Ave, Maplewood, NJ 07040',
        description:
          'Offers refillable household cleaners and personal care products.',
        coordinates: [40.7328, -74.2598],
        categories: ['refill', 'household', 'zerowaste'],
      },
      {
        name: 'Dry Goods Refillery',
        address: '193 Bellevue Ave, Montclair, NJ 07043',
        description:
          'Zero-waste store with package-free groceries and eco-friendly products.',
        coordinates: [40.8267, -74.2093],
        categories: ['refill', 'zerowaste', 'grocery'],
      },
      {
        name: 'Greater Goods Refillery',
        address: '11 Parker Ave, Manasquan, NJ 08736',
        description: 'Eco-friendly refill store with nontoxic household goods.',
        coordinates: [40.1242, -74.0472],
        categories: ['refill', 'household', 'zerowaste'],
      },
      {
        name: 'Unwrapped Refill Shop',
        address:
          'The Shoppes at the Arcade, 658 Cookman Ave Unit 18, Asbury Park, NJ 07712',
        description:
          'Zero-waste store offering bulk food and personal care items.',
        coordinates: [40.2207, -74.0121],
        categories: ['refill', 'zerowaste', 'bulk', 'food'],
      },
      {
        name: 'Simple Bare Necessities',
        address: 'Sparta Farmers Market (specific address varies)',
        description: 'Sells zero-waste home goods and refillable products.',
        coordinates: [41.0337, -74.621],
        categories: ['zerowaste', 'household', 'refill'],
      },
      {
        name: 'Rahway Refillery',
        address: '1425 Main St., Rahway, NJ 07065',
        description: 'No-waste marketplace with bath and kitchen products.',
        coordinates: [40.6166, -74.2776],
        categories: ['refill', 'zerowaste', 'kitchen', 'bath'],
      },
      {
        name: 'One Stop Eco Shop',
        address: '1174 Fischer Blvd., Toms River, NJ 08753',
        description: 'Package-free grocery store focusing on sustainability.',
        coordinates: [39.9837, -74.1743],
        categories: ['grocery', 'zerowaste', 'packagefree'],
      },
    ],
  };

  const handleSearchSubmit = () => {
    if (!searchText.trim()) {
      if (Platform.OS === 'web') {
        alert('Please enter a category to search');
      } else {
        Alert.alert('Error', 'Please enter a category to search');
      }
      return;
    }

    // Case-insensitive search that matches any place with categories containing the search term
    const searchQuery = searchText.trim().toLowerCase();

    // Find all places that match the search criteria
    let matchedPlaces = [];

    // First try direct category match
    if (places[searchQuery]) {
      matchedPlaces = places[searchQuery];
    } else {
      // If no direct category match, search across all places for partial matches
      Object.values(places).forEach((categoryPlaces) => {
        categoryPlaces.forEach((place) => {
          // Check if any category contains the search term
          if (
            place.categories &&
            place.categories.some(
              (category) =>
                category.toLowerCase().includes(searchQuery) ||
                searchQuery.includes(category.toLowerCase())
            )
          ) {
            // Only add if not already in the array
            if (!matchedPlaces.some((p) => p.name === place.name)) {
              matchedPlaces.push(place);
            }
          }
        });
      });
    }

    // Create JavaScript to execute in the WebView
    const searchScript = `
      try {
        const matchedPlaces = ${JSON.stringify(matchedPlaces || [])};
        addMarkers(matchedPlaces);
      } catch (error) {
        showMessage("Error: " + error.message);
        console.error(error);
      }
    `;

    // Execute the script in the WebView
    if (webViewRef.current) {
      if (Platform.OS === 'web') {
        // For web platform
        const iframe = document.querySelector('iframe');
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.eval(searchScript);
        }
      } else {
        // For native platforms
        webViewRef.current.injectJavaScript(searchScript);
      }
    }
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for a category (e.g., Food, Clothing)"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearchSubmit}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchSubmit}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        {locationError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{locationError}</Text>
          </View>
        )}
        <iframe
          ref={webViewRef}
          srcDoc={initialMapHtml}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Map"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for a category (e.g., Food, Clothing)"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearchSubmit}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearchSubmit}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {locationError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{locationError}</Text>
        </View>
      )}
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: initialMapHtml }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    left: 20,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 5,
  },
  searchBar: {
    flex: 1,
    padding: 10,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
  },
});
