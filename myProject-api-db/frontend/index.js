const axios = require('axios');

// Replace with your API URL
const apiUrl = "http://localhost:30080/api/leaderboard";

// Example data for 10 leaderboard entries
const records = [
  { username: 'Agent', score: 65 },
  { username: 'EaszyE', score: 95 },
  { username: 'Ranger', score: 100 },
  { username: 'Rou', score: 85 },
  { username: 'Pokom', score: 80 },
];

async function addRecords() {
  try {
    for (let record of records) {
      const response = await axios.post(apiUrl, record);
      console.log('Record added:', response.data);
    }
  } catch (error) {
    console.error('Error adding records:', error.response ? error.response.data : error.message);
  }
}

  async function deleteAllEntries() {
    try {
      const response = await axios.delete(apiUrl);
      console.log('All entries deleted:', response.status);
    } catch (error) {
      console.error('Error deleting all entries:', error.message);
    }
  }

  async function getAllEntries() {
    try {
      const response = await axios.get(apiUrl);
      console.log('All entries deleted:', response.data);
    } catch (error) {
      console.error('Error deleting all entries:', error.message);
    }
  }
addRecords();
//deleteAllEntries()
//getAllEntries()