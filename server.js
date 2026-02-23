/**
 * THE EMPIRE FOUNDATION - Backend Server
 * Social Welfare Platform
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Helper function to read JSON file
function readJsonFile(filename) {
    const filePath = path.join(dataDir, filename);
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        return [];
    }
}

// Helper function to write JSON file
function writeJsonFile(filename, data) {
    const filePath = path.join(dataDir, filename);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error(`Error writing ${filename}:`, error);
        return false;
    }
}

// Initialize data files with sample data if they don't exist
function initializeData() {
    // Blood Donors
    if (!fs.existsSync(path.join(dataDir, 'bloodDonors.json'))) {
        writeJsonFile('bloodDonors.json', [
            {
                id: "bd001",
                name: "Rahul Sharma",
                bloodType: "O+",
                phone: "+91 98765 43210",
                email: "rahul.sharma@email.com",
                city: "New Delhi",
                state: "Delhi",
                available: true,
                lastDonated: "2024-01-15",
                createdAt: "2024-01-01"
            },
            {
                id: "bd002",
                name: "Priya Singh",
                bloodType: "A+",
                phone: "+91 98765 43211",
                email: "priya.singh@email.com",
                city: "Mumbai",
                state: "Maharashtra",
                available: true,
                lastDonated: "2024-02-20",
                createdAt: "2024-01-05"
            },
            {
                id: "bd003",
                name: "Amit Kumar",
                bloodType: "B+",
                phone: "+91 98765 43212",
                email: "amit.kumar@email.com",
                city: "Bangalore",
                state: "Karnataka",
                available: true,
                lastDonated: "2024-03-10",
                createdAt: "2024-01-10"
            },
            {
                id: "bd004",
                name: "Sneha Reddy",
                bloodType: "AB+",
                phone: "+91 98765 43213",
                email: "sneha.reddy@email.com",
                city: "Hyderabad",
                state: "Telangana",
                available: false,
                lastDonated: "2023-12-05",
                createdAt: "2024-01-15"
            },
            {
                id: "bd005",
                name: "Vikram Patel",
                bloodType: "O-",
                phone: "+91 98765 43214",
                email: "vikram.patel@email.com",
                city: "Ahmedabad",
                state: "Gujarat",
                available: true,
                lastDonated: "2024-02-01",
                createdAt: "2024-01-20"
            }
        ]);
    }

    // NGOs
    if (!fs.existsSync(path.join(dataDir, 'ngos.json'))) {
        writeJsonFile('ngos.json', [
            {
                id: "ngo001",
                name: "Youth Rise Foundation",
                description: "Empowering youth through education and skill development programs",
                category: "Education",
                phone: "+91 11 2345 6789",
                email: "info@youthrise.org",
                website: "https://youthrise.org",
                address: "123 Community Center, New Delhi",
                city: "New Delhi",
                state: "Delhi",
                verified: true,
                rating: 4.5,
                volunteers: 150,
                established: 2015
            },
            {
                id: "ngo002",
                name: "Green Earth Initiative",
                description: "Environmental conservation and waste management",
                category: "Environment",
                phone: "+91 22 2345 6789",
                email: "contact@greenearth.org",
                website: "https://greenearth.org",
                address: "45 Green Park, Mumbai",
                city: "Mumbai",
                state: "Maharashtra",
                verified: true,
                rating: 4.8,
                volunteers: 300,
                established: 2010
            },
            {
                id: "ngo003",
                name: "Care for Elderly",
                description: "Providing care and support for elderly citizens",
                category: "Elderly Care",
                phone: "+91 80 2345 6789",
                email: "help@careforelderly.org",
                website: "https://careforelderly.org",
                address: "78 Senior Colony, Bangalore",
                city: "Bangalore",
                state: "Karnataka",
                verified: true,
                rating: 4.6,
                volunteers: 80,
                established: 2018
            }
        ]);
    }

    // Volunteers
    if (!fs.existsSync(path.join(dataDir, 'volunteers.json'))) {
        writeJsonFile('volunteers.json', [
            {
                id: "vol001",
                name: "Ankit Mishra",
                email: "ankit.mishra@email.com",
                phone: "+91 98765 43220",
                skills: ["Teaching", "Event Management", "Social Media"],
                interests: ["Education", "Healthcare"],
                city: "New Delhi",
                state: "Delhi",
                available: true,
                hoursPerWeek: 10,
                joinedAt: "2024-01-10"
            },
            {
                id: "vol002",
                name: "Kavya Agarwal",
                email: "kavya.agarwal@email.com",
                phone: "+91 98765 43221",
                skills: ["Medical", "First Aid", "Counseling"],
                interests: ["Healthcare", "Elderly Care"],
                city: "Mumbai",
                state: "Maharashtra",
                available: true,
                hoursPerWeek: 15,
                joinedAt: "2024-01-15"
            }
        ]);
    }

    // Government Schemes
    if (!fs.existsSync(path.join(dataDir, 'schemes.json'))) {
        writeJsonFile('schemes.json', [
            {
                id: "scheme001",
                name: "Pradhan Mantri Jan Dhan Yojana",
                description: "National Mission for Financial Inclusion to ensure access to financial services",
                ministry: "Ministry of Finance",
                eligibility: "Indian citizens above 10 years of age",
                benefits: ["Zero balance savings account", "Free RuPay debit card", "Accidental insurance cover"],
                documents: ["Aadhaar Card", "Mobile Number", "Photo"],
                website: "https://pmjdby.gov.in",
                category: "Finance"
            },
            {
                id: "scheme002",
                name: "Pradhan Mantri Kisan Samman Nidhi",
                description: "Income support to farmer families",
                ministry: "Ministry of Agriculture",
                eligibility: "Small and marginal farmer families",
                benefits: ["Rs. 6000 per year in 3 installments"],
                documents: ["Aadhaar Card", "Land Records", "Bank Account"],
                website: "https://pmkisan.gov.in",
                category: "Agriculture"
            },
            {
                id: "scheme003",
                name: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana",
                description: "Health insurance cover for eligible families",
                ministry: "Ministry of Health",
                eligibility: "Families identified as per SECC data",
                benefits: ["Rs. 5 lakh coverage per family per year", "Cashless treatment"],
                documents: ["Aadhaar Card", "Ration Card", "SECC Data"],
                website: "https://pmjay.gov.in",
                category: "Healthcare"
            },
            {
                id: "scheme004",
                name: "Skill India Mission",
                description: "Free skill training programs for youth",
                ministry: "Ministry of Skill Development",
                eligibility: "Indian citizens aged 15-45 years",
                benefits: ["Free training", "Certification", "Placement assistance"],
                documents: ["Aadhaar Card", "Educational Certificates"],
                website: "https://skillindia.gov.in",
                category: "Employment"
            }
        ]);
    }

    // Jobs
    if (!fs.existsSync(path.join(dataDir, 'jobs.json'))) {
        writeJsonFile('jobs.json', [
            {
                id: "job001",
                title: "Social Media Manager",
                company: "Youth Rise Foundation",
                location: "New Delhi",
                type: "Full-time",
                salary: "₹30,000 - ₹45,000",
                description: "Manage social media platforms and create awareness campaigns",
                requirements: ["2+ years experience", "Good communication"],
                postedDate: "2024-03-01",
                applyEmail: "careers@youthrise.org"
            },
            {
                id: "job002",
                title: "Field Coordinator",
                company: "Green Earth Initiative",
                location: "Mumbai",
                type: "Full-time",
                salary: "₹25,000 - ₹35,000",
                description: "Coordinate environmental awareness programs in schools",
                requirements: ["Graduate", "Own vehicle preferred"],
                postedDate: "2024-03-05",
                applyEmail: "jobs@greenearth.org"
            },
            {
                id: "job003",
                title: "Caregiver",
                company: "Care for Elderly",
                location: "Bangalore",
                type: "Part-time",
                salary: "₹15,000 - ₹20,000",
                description: "Provide care and companionship to elderly members",
                requirements: ["Good with elderly", "Basic medical knowledge"],
                postedDate: "2024-03-10",
                applyEmail: "volunteer@careforelderly.org"
            }
        ]);
    }

    // Food Requests
    if (!fs.existsSync(path.join(dataDir, 'foodRequests.json'))) {
        writeJsonFile('foodRequests.json', [
            {
                id: "food001",
                type: "request",
                name: "Ravi Kumar",
                phone: "+91 98765 43230",
                address: "Sector 15, New Delhi",
                quantity: "2 persons",
                mealType: "Lunch",
                status: "pending",
                createdAt: "2024-03-15T10:00:00Z"
            },
            {
                id: "food002",
                type: "donation",
                name: "Sharma Ji ki Dukaan",
                phone: "+91 98765 43231",
                address: "Karol Bagh, New Delhi",
                quantity: "50 packets",
                mealType: "Dinner",
                pickupTime: "8:00 PM",
                status: "available",
                createdAt: "2024-03-15T09:00:00Z"
            }
        ]);
    }

    // Civic Issues
    if (!fs.existsSync(path.join(dataDir, 'civicIssues.json'))) {
        writeJsonFile('civicIssues.json', [
            {
                id: "issue001",
                category: "Road Damage",
                description: "Large pothole on Main Road causing traffic",
                location: "Main Road, Sector 12",
                city: "New Delhi",
                status: "reported",
                upvotes: 15,
                reportedBy: "Anonymous",
                createdAt: "2024-03-10T08:00:00Z"
            },
            {
                id: "issue002",
                category: "Garbage",
                description: "Uncollected garbage pile near park",
                location: "Green Park, Andheri",
                city: "Mumbai",
                status: "in-progress",
                upvotes: 28,
                reportedBy: "Citizen",
                createdAt: "2024-03-08T14:00:00Z"
            }
        ]);
    }

    // Emergency Contacts
    if (!fs.existsSync(path.join(dataDir, 'emergencyContacts.json'))) {
        writeJsonFile('emergencyContacts.json', [
            {
                id: "em001",
                service: "Police",
                phone: "100",
                available: "24/7",
                description: "Police Emergency"
            },
            {
                id: "em002",
                service: "Ambulance",
                phone: "102",
                available: "24/7",
                description: "Medical Emergency"
            },
            {
                id: "em003",
                service: "Fire",
                phone: "101",
                available: "24/7",
                description: "Fire Emergency"
            },
            {
                id: "em004",
                service: "Women Helpline",
                phone: "1091",
                available: "24/7",
                description: "Women Safety Helpline"
            },
            {
                id: "em005",
                service: "Child Helpline",
                phone: "1098",
                available: "24/7",
                description: "Child Protection"
            },
            {
                id: "em006",
                service: "Elderly Helpline",
                phone: "14567",
                available: "8 AM - 8 PM",
                description: "Senior Citizens Helpline"
            }
        ]);
    }

    // Contacts (Contact form submissions)
    if (!fs.existsSync(path.join(dataDir, 'contacts.json'))) {
        writeJsonFile('contacts.json', []);
    }

    // Subscribers (Newsletter)
    if (!fs.existsSync(path.join(dataDir, 'subscribers.json'))) {
        writeJsonFile('subscribers.json', []);
    }
}

// Initialize data on server start
initializeData();

// ========================================
// API ROUTES
// ========================================

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'THE EMPIRE FOUNDATION API is running' });
});

// ========================================
// BLOOD DONORS API
// ========================================
app.get('/api/blood-donors', (req, res) => {
    const donors = readJsonFile('bloodDonors.json');
    const { bloodType, city, available } = req.query;
    
    let filtered = donors;
    
    if (bloodType) {
        filtered = filtered.filter(d => d.bloodType.toUpperCase() === bloodType.toUpperCase());
    }
    if (city) {
        filtered = filtered.filter(d => d.city.toLowerCase().includes(city.toLowerCase()));
    }
    if (available !== undefined) {
        filtered = filtered.filter(d => d.available === (available === 'true'));
    }
    
    res.json({ success: true, count: filtered.length, data: filtered });
});

app.get('/api/blood-donors/:id', (req, res) => {
    const donors = readJsonFile('bloodDonors.json');
    const donor = donors.find(d => d.id === req.params.id);
    
    if (!donor) {
        return res.status(404).json({ success: false, message: 'Donor not found' });
    }
    
    res.json({ success: true, data: donor });
});

app.post('/api/blood-donors', (req, res) => {
    const donors = readJsonFile('bloodDonors.json');
    
    const newDonor = {
        id: "bd" + String(donors.length + 1).padStart(3, '0'),
        ...req.body,
        available: true,
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    donors.push(newDonor);
    writeJsonFile('bloodDonors.json', donors);
    
    res.status(201).json({ success: true, message: 'Donor registered successfully', data: newDonor });
});

app.put('/api/blood-donors/:id', (req, res) => {
    const donors = readJsonFile('bloodDonors.json');
    const index = donors.findIndex(d => d.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Donor not found' });
    }
    
    donors[index] = { ...donors[index], ...req.body };
    writeJsonFile('bloodDonors.json', donors);
    
    res.json({ success: true, message: 'Donor updated successfully', data: donors[index] });
});

app.delete('/api/blood-donors/:id', (req, res) => {
    const donors = readJsonFile('bloodDonors.json');
    const filtered = donors.filter(d => d.id !== req.params.id);
    
    if (filtered.length === donors.length) {
        return res.status(404).json({ success: false, message: 'Donor not found' });
    }
    
    writeJsonFile('bloodDonors.json', filtered);
    res.json({ success: true, message: 'Donor removed successfully' });
});

// ========================================
// NGOs API
// ========================================
app.get('/api/ngos', (req, res) => {
    const ngos = readJsonFile('ngos.json');
    const { category, city, verified } = req.query;
    
    let filtered = ngos;
    
    if (category) {
        filtered = filtered.filter(n => n.category.toLowerCase() === category.toLowerCase());
    }
    if (city) {
        filtered = filtered.filter(n => n.city.toLowerCase().includes(city.toLowerCase()));
    }
    if (verified !== undefined) {
        filtered = filtered.filter(n => n.verified === (verified === 'true'));
    }
    
    res.json({ success: true, count: filtered.length, data: filtered });
});

app.get('/api/ngos/:id', (req, res) => {
    const ngos = readJsonFile('ngos.json');
    const ngo = ngos.find(n => n.id === req.params.id);
    
    if (!ngo) {
        return res.status(404).json({ success: false, message: 'NGO not found' });
    }
    
    res.json({ success: true, data: ngo });
});

app.post('/api/ngos', (req, res) => {
    const ngos = readJsonFile('ngos.json');
    
    const newNgo = {
        id: "ngo" + String(ngos.length + 1).padStart(3, '0'),
        ...req.body,
        verified: false,
        rating: 0,
        volunteers: 0,
        established: new Date().getFullYear(),
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    ngos.push(newNgo);
    writeJsonFile('ngos.json', ngos);
    
    res.status(201).json({ success: true, message: 'NGO registered successfully', data: newNgo });
});

// ========================================
// VOLUNTEERS API
// ========================================
app.get('/api/volunteers', (req, res) => {
    const volunteers = readJsonFile('volunteers.json');
    const { city, available } = req.query;
    
    let filtered = volunteers;
    
    if (city) {
        filtered = filtered.filter(v => v.city.toLowerCase().includes(city.toLowerCase()));
    }
    if (available !== undefined) {
        filtered = filtered.filter(v => v.available === (available === 'true'));
    }
    
    res.json({ success: true, count: filtered.length, data: filtered });
});

app.post('/api/volunteers', (req, res) => {
    const volunteers = readJsonFile('volunteers.json');
    
    const newVolunteer = {
        id: "vol" + String(volunteers.length + 1).padStart(3, '0'),
        ...req.body,
        available: true,
        joinedAt: new Date().toISOString().split('T')[0]
    };
    
    volunteers.push(newVolunteer);
    writeJsonFile('volunteers.json', volunteers);
    
    res.status(201).json({ success: true, message: 'Volunteer registered successfully', data: newVolunteer });
});

// ========================================
// GOVERNMENT SCHEMES API
// ========================================
app.get('/api/schemes', (req, res) => {
    const schemes = readJsonFile('schemes.json');
    const { category, ministry } = req.query;
    
    let filtered = schemes;
    
    if (category) {
        filtered = filtered.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }
    if (ministry) {
        filtered = filtered.filter(s => s.ministry.toLowerCase().includes(ministry.toLowerCase()));
    }
    
    res.json({ success: true, count: filtered.length, data: filtered });
});

app.get('/api/schemes/:id', (req, res) => {
    const schemes = readJsonFile('schemes.json');
    const scheme = schemes.find(s => s.id === req.params.id);
    
    if (!scheme) {
        return res.status(404).json({ success: false, message: 'Scheme not found' });
    }
    
    res.json({ success: true, data: scheme });
});

// ========================================
// JOBS API
// ========================================
app.get('/api/jobs', (req, res) => {
    const jobs = readJsonFile('jobs.json');
    const { location, type, company } = req.query;
    
    let filtered = jobs;
    
    if (location) {
        filtered = filtered.filter(j => j.location.toLowerCase().includes(location.toLowerCase()));
    }
    if (type) {
        filtered = filtered.filter(j => j.type.toLowerCase() === type.toLowerCase());
    }
    if (company) {
        filtered = filtered.filter(j => j.company.toLowerCase().includes(company.toLowerCase()));
    }
    
    res.json({ success: true, count: filtered.length, data: filtered });
});

app.get('/api/jobs/:id', (req, res) => {
    const jobs = readJsonFile('jobs.json');
    const job = jobs.find(j => j.id === req.params.id);
    
    if (!job) {
        return res.status(404).json({ success: false, message: 'Job not found' });
    }
    
    res.json({ success: true, data: job });
});

app.post('/api/jobs', (req, res) => {
    const jobs = readJsonFile('jobs.json');
    
    const newJob = {
        id: "job" + String(jobs.length + 1).padStart(3, '0'),
        ...req.body,
        postedDate: new Date().toISOString().split('T')[0]
    };
    
    jobs.push(newJob);
    writeJsonFile('jobs.json', jobs);
    
    res.status(201).json({ success: true, message: 'Job posted successfully', data: newJob });
});

// ========================================
// FOOD SHARING API
// ========================================
app.get('/api/food-sharing', (req, res) => {
    const requests = readJsonFile('foodRequests.json');
    const { type, status, city } = req.query;
    
    let filtered = requests;
    
    if (type) {
        filtered = filtered.filter(f => f.type === type);
    }
    if (status) {
        filtered = filtered.filter(f => f.status === status);
    }
    
    res.json({ success: true, count: filtered.length, data: filtered });
});

app.post('/api/food-sharing', (req, res) => {
    const requests = readJsonFile('foodRequests.json');
    
    const newRequest = {
        id: "food" + String(requests.length + 1).padStart(3, '0'),
        ...req.body,
        status: req.body.type === 'request' ? 'pending' : 'available',
        createdAt: new Date().toISOString()
    };
    
    requests.push(newRequest);
    writeJsonFile('foodRequests.json', requests);
    
    res.status(201).json({ success: true, message: 'Food request submitted successfully', data: newRequest });
});

// ========================================
// CIVIC ISSUES API
// ========================================
app.get('/api/civic-issues', (req, res) => {
    const issues = readJsonFile('civicIssues.json');
    const { category, city, status } = req.query;
    
    let filtered = issues;
    
    if (category) {
        filtered = filtered.filter(i => i.category.toLowerCase() === category.toLowerCase());
    }
    if (city) {
        filtered = filtered.filter(i => i.city.toLowerCase().includes(city.toLowerCase()));
    }
    if (status) {
        filtered = filtered.filter(i => i.status === status);
    }
    
    res.json({ success: true, count: filtered.length, data: filtered });
});

app.post('/api/civic-issues', (req, res) => {
    const issues = readJsonFile('civicIssues.json');
    
    const newIssue = {
        id: "issue" + String(issues.length + 1).padStart(3, '0'),
        ...req.body,
        status: 'reported',
        upvotes: 1,
        createdAt: new Date().toISOString()
    };
    
    issues.push(newIssue);
    writeJsonFile('civicIssues.json', issues);
    
    res.status(201).json({ success: true, message: 'Issue reported successfully', data: newIssue });
});

app.put('/api/civic-issues/:id/upvote', (req, res) => {
    const issues = readJsonFile('civicIssues.json');
    const index = issues.findIndex(i => i.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Issue not found' });
    }
    
    issues[index].upvotes = (issues[index].upvotes || 0) + 1;
    writeJsonFile('civicIssues.json', issues);
    
    res.json({ success: true, message: 'Issue upvoted', data: issues[index] });
});

// ========================================
// EMERGENCY CONTACTS API
// ========================================
app.get('/api/emergency/contacts', (req, res) => {
    const contacts = readJsonFile('emergencyContacts.json');
    res.json({ success: true, data: contacts });
});

app.post('/api/emergency/sos', (req, res) => {
    const { name, phone, location, type, message } = req.body;
    
    // In a real application, this would trigger actual emergency services
    // For now, we'll log and return success
    console.log('SOS Alert:', { name, phone, location, type, message });
    
    res.json({ 
        success: true, 
        message: 'Emergency alert sent successfully. Help is on the way!',
        alertId: 'SOS' + Date.now()
    });
});

// ========================================
// CONTACT FORM API
// ========================================
app.post('/api/contact', (req, res) => {
    const contacts = readJsonFile('contacts.json');
    
    const newContact = {
        id: "contact" + String(contacts.length + 1).padStart(4, '0'),
        ...req.body,
        status: 'new',
        createdAt: new Date().toISOString()
    };
    
    contacts.push(newContact);
    writeJsonFile('contacts.json', contacts);
    
    res.status(201).json({ success: true, message: 'Message sent successfully! We will get back to you soon.', data: newContact });
});

app.get('/api/contact', (req, res) => {
    const contacts = readJsonFile('contacts.json');
    res.json({ success: true, count: contacts.length, data: contacts });
});

// ========================================
// NEWSLETTER API
// ========================================
app.get('/api/newsletter', (req, res) => {
    const subscribers = readJsonFile('subscribers.json');
    res.json({ success: true, count: subscribers.length, data: subscribers });
});

app.post('/api/newsletter', (req, res) => {
    const subscribers = readJsonFile('subscribers.json');
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }
    
    // Check if already subscribed
    const existing = subscribers.find(s => s.email === email);
    if (existing) {
        return res.status(400).json({ success: false, message: 'Already subscribed' });
    }
    
    const newSubscriber = {
        id: "sub" + String(subscribers.length + 1).padStart(4, '0'),
        email,
        subscribedAt: new Date().toISOString()
    };
    
    subscribers.push(newSubscriber);
    writeJsonFile('subscribers.json', subscribers);
    
    res.status(201).json({ success: true, message: 'Thank you for subscribing to our newsletter!' });
});

// ========================================
// STATS API
// ========================================
app.get('/api/stats', (req, res) => {
    const bloodDonors = readJsonFile('bloodDonors.json');
    const ngos = readJsonFile('ngos.json');
    const volunteers = readJsonFile('volunteers.json');
    const jobs = readJsonFile('jobs.json');
    const foodRequests = readJsonFile('foodRequests.json');
    const civicIssues = readJsonFile('civicIssues.json');
    const contacts = readJsonFile('contacts.json');
    const subscribers = readJsonFile('subscribers.json');
    
    res.json({
        success: true,
        data: {
            bloodDonors: bloodDonors.length,
            ngos: ngos.length,
            volunteers: volunteers.length,
            jobs: jobs.length,
            foodRequests: foodRequests.length,
            civicIssues: civicIssues.length,
            contacts: contacts.length,
            subscribers: subscribers.length
        }
    });
});

// Serve the main HTML file for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     🏥 THE EMPIRE FOUNDATION Backend Server               ║
║                                                           ║
║     Server running at: http://localhost:${PORT}            ║
║                                                           ║
║     API Endpoints:                                        ║
║     - GET  /api/health           Health Check            ║
║     - GET  /api/stats            Platform Statistics     ║
║                                                           ║
║     Blood Donors:                                         ║
║     - GET  /api/blood-donors     List all donors         ║
║     - POST /api/blood-donors     Register donor          ║
║                                                           ║
║     NGOs:                                                 ║
║     - GET  /api/ngos             List all NGOs           ║
║     - POST /api/ngos             Register NGO            ║
║                                                           ║
║     Volunteers:                                           ║
║     - GET  /api/volunteers       List volunteers         ║
║     - POST /api/volunteers       Join as volunteer       ║
║                                                           ║
║     Schemes:                                               ║
║     - GET  /api/schemes           List government schemes ║
║                                                           ║
║     Jobs:                                                 ║
║     - GET  /api/jobs             List job openings       ║
║     - POST /api/jobs             Post a job              ║
║                                                           ║
║     Food Sharing:                                          ║
║     - GET  /api/food-sharing     List food requests      ║
║     - POST /api/food-sharing     Request/donate food     ║
║                                                           ║
║     Civic Issues:                                          ║
║     - GET  /api/civic-issues     List issues             ║
║     - POST /api/civic-issues     Report issue            ║
║                                                           ║
║     Emergency:                                             ║
║     - GET  /api/emergency/contacts  Emergency contacts   ║
║     - POST /api/emergency/sos     Send SOS alert         ║
║                                                           ║
║     Contact:                                               ║
║     - POST /api/contact           Submit contact form    ║
║                                                           ║
║     Newsletter:                                            ║
║     - POST /api/newsletter       Subscribe newsletter   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
});

