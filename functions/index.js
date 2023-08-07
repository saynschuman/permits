const { scheduler, logger } = require("firebase-functions/v2");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

const zipCodes = [
  "19116",
  "19154",
  "19115",
  "19114",
  "19152",
  "19136",
  "19111",
  "19149",
  "19135",
  "19137",
  "19124",
  "19120",
  "19126",
  "19138",
  "19150",
  "19134",
  "19140",
  "19141",
  "19119",
  "19144",
  "19118",
  "19128",
  "19133",
  "19125",
  "19122",
  "19132",
  "19129",
  "19127",
  "19123",
  "19107",
  "19106",
  "19102",
  "19103",
  "19104",
  "19131",
  "19151",
  "19139",
  "19143",
  "19146",
  "19147",
  "19148",
  "19112",
  "19145",
  "19142",
  "19153"
];

// Initialize the Firebase app
admin.initializeApp();

const fetchData = async () => {
  for (let zipcode of zipCodes) {
    try {
      const url = `https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20permits%20WHERE%20zip%20LIKE%20%27${zipcode}%25%27%20`;

      const response = await fetch(url);
      const data = await response.json();

      const chunkSize = 500;
      for (let i = 0; i < data.rows.length; i += chunkSize) {
        const batch = admin.firestore().batch();

        const chunk = data.rows.slice(i, i + chunkSize);

        chunk.forEach((row) => {
          const docRef = admin
            .firestore()
            .collection(zipcode)
            .doc(row.cartodb_id.toString());
          batch.set(docRef, row);
        });

        await batch.commit();
      }

      logger.log(
        `Data fetch and save to Firestore completed for zipcode: ${zipcode}`
      );
    } catch (error) {
      logger.error("An error occurred: ", error);
    }
  }
};

// Export a Cloud Function that runs on a schedule
exports.fetchPermits = scheduler.onSchedule("0 0 * * *", fetchData);
