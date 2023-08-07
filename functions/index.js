const { scheduler, logger } = require("firebase-functions/v2");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

const zipCodes = [
  "19102",
  "19103",
  "19104",
  "19106",
  "19107",
  "19109",
  "19113",
  "19114",
  "19115",
  "19116",
  "19118",
  "19119",
  "19120",
  "19121",
  "19122",
  "19123",
  "19124",
  "19125",
  "19126",
  "19127",
  "19128",
  "19129",
  "19130",
  "19131",
  "19132",
  "19133",
  "19134",
  "19135",
  "19136",
  "19137",
  "19138",
  "19139",
  "19140",
  "19141",
  "19142",
  "19143",
  "19144",
  "19145",
  "19146",
  "19147",
  "19148",
  "19149",
  "19150",
  "19151",
  "19152",
  "19153",
  "19154",
];

// Initialize the Firebase app
admin.initializeApp();

const fetchData = async () => {
  for (let zipcode of zipCodes) {
    try {
      const url = `https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20permits%20WHERE%20zip%20LIKE%20%27${zipcode}%25%27%20`;

      const response = await fetch(url);
      const data = await response.json();

      const docRef = admin.firestore().collection("permits");

      // Transform the rows array into an object with the objectid as the key
      const transformedRows = data.rows.reduce((acc, cur) => {
        acc[cur.cartodb_id] = cur;
        return acc;
      }, {});

      // Save the transformed data to Firestore
      await docRef.doc(zipcode).set({
        rows: transformedRows,
        time: data.time,
        fields: data.fields,
        total_rows: data.total_rows,
      });

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
