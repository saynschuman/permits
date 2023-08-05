const { scheduler } = require("firebase-functions/v2");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const { logger } = require("firebase-functions/v2");

admin.initializeApp();

const zipcode = "19118";

const fetchData = async () => {
  try {
    const response = await fetch(
      `https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20permits%20WHERE%20permitissuedate%20%3E=%20current_date%20-%201%20AND%20zip%20LIKE%20%27${zipcode}%25%27%20`
    );
    const data = await response.json();

    const docRef = admin.firestore().collection("permits");
    await docRef.doc(zipcode).set(data);

    logger.log("Data fetch and save to Firestore completed");
  } catch (error) {
    logger.error("An error occurred: ", error);
  }
};

exports.fetchPermits = scheduler.onSchedule("* * * * *", fetchData);
