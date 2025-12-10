# Hygieno

Hygieno is a waste management system that connects people who want to dispose of their waste with nearby collectors who can pick it up. It simplifies waste disposal by allowing users to easily list their waste items and find local collectors to handle the collection.

## Features

- **User Registration & Login**: Users can register as disposers or collectors and securely log in.
- **Waste Listing**: Disposers can list waste items they want to be collected.
- **Waste Collection**: Collectors can view nearby listed wastes and pick up those they are interested in.
- **Location-based Filtering**: Disposers and collectors are matched based on their location to facilitate easier collection.
  
## Technologies Used

- **Frontend**: 
  - HTML
  - CSS
  - Javascript 
  - ReactJS
- **Backend**:
  - Node.js
  - Express.js
- **Database**:
  - MongoDB
- **API**: Geolocation API for location-based filtering

## Installation

Follow these steps to get the project running locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/noelreji/Hygieno.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Hygieno
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000` to view the app.

## Usage

1. **Disposer**: Register as a disposer and list the waste items you want collected.
2. **Collector**: Register as a collector and browse through available waste listings in your area.
3. Use the location filter to narrow down the waste listings based on your preferred collection area.
