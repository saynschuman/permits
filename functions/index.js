const { scheduler } = require("firebase-functions/v2");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const { logger } = require("firebase-functions/v2");

admin.initializeApp();

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

const fetchData = async () => {
  for (let i = 0; i < zipCodes.length; i++) {
    const zipcode = zipCodes[i];
    try {
      const response = await fetch(
        `https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20permits%20WHERE%20permitissuedate%20%3E=%20current_date%20-%201%20AND%20zip%20LIKE%20%27${zipcode}%25%27%20`
      );
      const data = await response.json();

      const docRef = admin.firestore().collection("permits");
      await docRef.doc(zipcode).set(data);

      logger.log(
        `Data fetch and save to Firestore completed for zipcode: ${zipcode}`
      );
    } catch (error) {
      logger.error("An error occurred: ", error);
    }
  }
};

exports.fetchPermits = scheduler.onSchedule("0 0 * * *", fetchData);
