import { openDB } from 'idb';

const initdb = async () =>
// creating a new database with the name 'jate' and version 1
  openDB('jate', 1, {
    // Add our database schema if it has not already be initialized 
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create a new object store for the data and give it an key name of 'id' which needs to increment automatically.
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// √ TODO: Add logic to a method that accepts some content and adds it to the database
// Export a functions we will use to PUT/'Update' to the database
export const putDb = async (content) => {
  console.error('putDb not implemented');
  // Create a connection to the 'jate' database and version we want to use
  const db = await openDB('jate', 1);
  // Create a new transaction and specify the 'jate' database and data privileges as 'readwrite'
  const tx = db.transaction('jate', 'readwrite');
  // Open the 'jate' object store
  const store = tx.objectStore('jate');
  // Use the .add() method on the store and pass in the content
  const request = store.add(content);
  // Get confirmation of the request
  const result = await request;
  console.log('Data update in database', result);
};

// √ TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  
  const result = await request;
  console.log('result.value', result);
  return result;
};
// Start the database
initdb();
