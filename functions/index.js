const { scheduler, logger } = require("firebase-functions/v2");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const zipCodes = require("./codes");

// Initialize the Firebase app
admin.initializeApp();

// Define an async function to fetch data for each zipcode
const fetchData = async () => {
  // Iterate over each zipcode
  for (let zipcode of zipCodes) {
    try {
      // Make the request URL dynamic using template literals
      const url = `https://phl.carto.com/api/v2/sql?q=SELECT * FROM permits WHERE permitissuedate >= current_date - 1 AND zip LIKE '${zipcode}%'`;

      // Fetch data from the API
      const response = await fetch(url);
      const data = await response.json();

      // Get a reference to the Firestore collection "permits"
      const docRef = admin.firestore().collection("permits");

      // Save the fetched data to the Firestore collection
      await docRef.doc(zipcode).set(data);

      // Log success message
      logger.log(
        `Data fetch and save to Firestore completed for zipcode: ${zipcode}`
      );
    } catch (error) {
      // Log any error that occurs
      logger.error("An error occurred: ", error);
    }
  }
};

// Export a Cloud Function that runs on a schedule
exports.fetchPermits = scheduler.onSchedule("0 0 * * *", fetchData);
