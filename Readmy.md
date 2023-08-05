## report on the developed functionality

1. A cloud function has been created that iterates over the zipCodes array, sending a request for each code.
2. The requests are performed sequentially (that is, each subsequent request waits for the current one to finish before starting).
3. If any request returns an error, it will not stop the entire cycle. The catch block will handle any errors that arise and allow the cycle to continue for the next elements in the array. Errors will be logged but will not interrupt the cycle.
4. The data obtained as a result of each request is saved in Firestore under the "permits" field.