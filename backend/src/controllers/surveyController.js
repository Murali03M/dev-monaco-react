
import { GoogleSpreadsheet } from 'google-spreadsheet';
import creds from '../utils/cred.json' assert { type: 'json' }; // Add the assert with type 'json'
import { JWT } from "google-auth-library";

const SPREADSHEET_ID = '1VCruR8i7IcIQw2NxycyGqbjjkcTdhVXpAU9TsV9_rxQ';  // Replace with your actual spreadsheet ID
const SHEET_INDEX = 0;

async function accessSpreadsheet() {
   
    
  const serviceAccountAuth = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

    
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID,serviceAccountAuth);


  await doc.loadInfo(); // loads document properties and worksheets
  return doc.sheetsByIndex[SHEET_INDEX]; // index 0 is the first sheet
}

export const submitSurvey = async (req, res) => {
  const userId = req.userId; // Extract userId from request object
  const {
    satisfaction,
    difficulty,
    learningImpact,
    recommendationUsefulness,
    navigation,
    support,
    suggestions
  } = req.body;

  try {
    const sheet = await accessSpreadsheet();

    // Append the new row with survey data
    await sheet.addRow({
      UserId: userId,
      Satisfaction: satisfaction,
      Difficulty: difficulty,
      LearningImpact: learningImpact,
      RecommendationUsefulness: recommendationUsefulness,
      Navigation: navigation,
      Support: support,
      Suggestions: suggestions,
      Timestamp: new Date().toLocaleString(), // Optionally add a timestamp
    });

    res.status(201).json({ message: 'Survey submitted successfully to Google Sheets' });
  } catch (error) {
    console.error('Error submitting survey to Google Sheets:', error);
    res.status(500).json({ message: 'Failed to submit survey to Google Sheets', error });
  }
};

