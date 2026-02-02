const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const DATA_FILE = path.join(__dirname, 'data', 'visits.json');
const CONTACT_FILE = path.join(__dirname, 'data', 'contacts.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize data files if they don't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ totalVisits: 0, uniqueVisitors: [], dailyStats: {} }, null, 2));
}

if (!fs.existsSync(CONTACT_FILE)) {
  fs.writeFileSync(CONTACT_FILE, JSON.stringify([], null, 2));
}

// Helper functions
const readVisitsData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { totalVisits: 0, uniqueVisitors: [], dailyStats: {} };
  }
};

const writeVisitsData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const readContactsData = () => {
  try {
    const data = fs.readFileSync(CONTACT_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeContactsData = (data) => {
  fs.writeFileSync(CONTACT_FILE, JSON.stringify(data, null, 2));
};

// Generate unique visitor ID
const generateVisitorId = () => {
  return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// API Routes

// Record a visit
app.post('/api/visit', (req, res) => {
  const { visitorId, page } = req.body;
  const data = readVisitsData();
  const today = new Date().toISOString().split('T')[0];
  
  // Update total visits
  data.totalVisits++;
  
  // Track unique visitors
  if (visitorId && !data.uniqueVisitors.find(v => v.id === visitorId)) {
    data.uniqueVisitors.push({
      id: visitorId,
      firstVisit: new Date().toISOString(),
      visits: 1
    });
  } else if (visitorId) {
    const visitor = data.uniqueVisitors.find(v => v.id === visitorId);
    if (visitor) {
      visitor.visits++;
      visitor.lastVisit = new Date().toISOString();
    }
  }
  
  // Track daily stats
  if (!data.dailyStats[today]) {
    data.dailyStats[today] = { visits: 0, uniqueVisitors: 0 };
  }
  data.dailyStats[today].visits++;
  
  writeVisitsData(data);
  
  res.json({ 
    success: true, 
    visitorId: visitorId || generateVisitorId(),
    totalVisits: data.totalVisits,
    uniqueVisitors: data.uniqueVisitors.length
  });
});

// Get visit statistics
app.get('/api/stats', (req, res) => {
  const data = readVisitsData();
  const today = new Date().toISOString().split('T')[0];
  
  res.json({
    totalVisits: data.totalVisits,
    uniqueVisitors: data.uniqueVisitors.length,
    todayVisits: data.dailyStats[today]?.visits || 0,
    dailyStats: data.dailyStats
  });
});

// Submit contact form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }
  
  const contacts = readContactsData();
  const newContact = {
    id: Date.now(),
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  };
  
  contacts.push(newContact);
  writeContactsData(contacts);
  
  res.json({ success: true, message: 'Message sent successfully!' });
});

// Get all contacts (for admin purposes)
app.get('/api/contacts', (req, res) => {
  const contacts = readContactsData();
  res.json(contacts);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  POST /api/visit - Record a visit`);
  console.log(`  GET  /api/stats - Get visit statistics`);
  console.log(`  POST /api/contact - Submit contact form`);
  console.log(`  GET  /api/health - Health check`);
});

module.exports = app;
