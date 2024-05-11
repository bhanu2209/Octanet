const { google } = require('googleapis');
const credentials = require('./credentials.json'); // Your Google Sheets API credentials
const spreadsheetId = 'YOUR_SPREADSHEET_ID';
const range = 'Sheet1!A1:D'; // Specify the range where you want to append data

async function appendToSheet(formData) {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  
  const values = [
    [formData.name, formData.email, formData.message, new Date().toLocaleString()]
  ];

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
    console.log('Data appended successfully!');
  } catch (err) {
    console.error('Error appending data:', err);
  }
}

// Example usage:
const formData = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  message: 'This is a test message.',
};

appendToSheet(formData);
