// Student Leaderboard System with PIN Database
let studentsData = [];
let currentPin = null;
let isProcessing = false;

// Sample data for demo
const sampleData = [
    {"Name": "Alice Johnson", "Subject": "Mathematics", "Obtained Marks": 95, "Total Marks": 100, "Percentage": 95.0},
    {"Name": "David Martinez", "Subject": "Physics", "Obtained Marks": 92, "Total Marks": 100, "Percentage": 92.0},
    {"Name": "Emma Thompson", "Subject": "Chemistry", "Obtained Marks": 89, "Total Marks": 100, "Percentage": 89.0},
    {"Name": "Michael Chen", "Subject": "Biology", "Obtained Marks": 86, "Total Marks": 100, "Percentage": 86.0},
    {"Name": "Sarah Williams", "Subject": "English", "Obtained Marks": 84, "Total Marks": 100, "Percentage": 84.0},
    {"Name": "James Rodriguez", "Subject": "History", "Obtained Marks": 82, "Total Marks": 100, "Percentage": 82.0},
    {"Name": "Sophia Kumar", "Subject": "Computer Science", "Obtained Marks": 80, "Total Marks": 100, "Percentage": 80.0},
    {"Name": "Robert Brown", "Subject": "Economics", "Obtained Marks": 78, "Total Marks": 100, "Percentage": 78.0}
];

// Template URL
const TEMPLATE_URL = 'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/ba03d0ecb021d36f55ea4614103e9b73/83d30eda-35e0-4d5c-9c8e-c064f41916b0/5000eaf4.xlsx';

// DOM Elements
let uploadPage, leaderboardPage, uploadArea, fileInput, fileInfo, fileName;
let loadingContainer, errorMessage, errorText, successMessage, successText;
let podium, completeStudentList, downloadBtn, demoBtn, backBtn;
let templateDownloadBtn, pinInput, pinSubmitBtn, pinDisplaySection, pinNumber, pinCopyBtn;
let themeToggleBtn;

// Initialize the application immediately
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing application...');
    
    // Initialize DOM elements first
    initializeDOMElements();
    
    // Set proper initial state immediately
    setInitialState();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize theme
    initializeTheme();
    
    // Load demo data for PIN access
    loadStoredDemo();
    
    console.log('Application initialized successfully');
});

// Set initial application state immediately
function setInitialState() {
    console.log('Setting initial application state...');
    
    // Ensure upload page is visible and others are hidden
    if (uploadPage) {
        uploadPage.classList.remove('hidden');
        uploadPage.style.display = '';
    }
    
    if (leaderboardPage) {
        leaderboardPage.classList.add('hidden');
    }
    
    // CRITICAL: Hide loading container immediately
    if (loadingContainer) {
        loadingContainer.classList.add('hidden');
        loadingContainer.style.display = 'none';
    }
    
    // Hide messages
    if (errorMessage) {
        errorMessage.classList.add('hidden');
    }
    
    if (successMessage) {
        successMessage.classList.add('hidden');
    }
    
    // Hide PIN display initially
    if (pinDisplaySection) {
        pinDisplaySection.classList.add('hidden');
    }
    
    // Hide file info initially
    if (fileInfo) {
        fileInfo.classList.add('hidden');
    }
    
    console.log('Initial state set - upload page visible, loading hidden');
}

// Initialize DOM elements
function initializeDOMElements() {
    uploadPage = document.getElementById('uploadPage');
    leaderboardPage = document.getElementById('leaderboardPage');
    uploadArea = document.getElementById('uploadArea');
    fileInput = document.getElementById('fileInput');
    fileInfo = document.getElementById('fileInfo');
    fileName = document.getElementById('fileName');
    loadingContainer = document.getElementById('loadingContainer');
    errorMessage = document.getElementById('errorMessage');
    errorText = document.getElementById('errorText');
    successMessage = document.getElementById('successMessage');
    successText = document.getElementById('successText');
    podium = document.getElementById('podium');
    completeStudentList = document.getElementById('completeStudentList');
    downloadBtn = document.getElementById('downloadBtn');
    demoBtn = document.getElementById('demoBtn');
    backBtn = document.getElementById('backBtn');
    templateDownloadBtn = document.getElementById('templateDownloadBtn');
    pinInput = document.getElementById('pinInput');
    pinSubmitBtn = document.getElementById('pinSubmitBtn');
    pinDisplaySection = document.getElementById('pinDisplaySection');
    pinNumber = document.getElementById('pinNumber');
    pinCopyBtn = document.getElementById('pinCopyBtn');
    themeToggleBtn = document.getElementById('themeToggleBtn');
    
    console.log('DOM elements found and assigned');
}

// Setup all event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // File input change
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
    
    // Drag and drop events
    if (uploadArea) {
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleFileDrop);
        uploadArea.addEventListener('click', function(e) {
            if (e.target.classList.contains('upload-btn') || e.target.closest('.upload-btn')) {
                return;
            }
            if (fileInput) {
                fileInput.click();
            }
        });
    }
    
    // PIN input and submission
    if (pinInput) {
        pinInput.addEventListener('input', function(e) {
            // Only allow numbers
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            
            if (e.target.value.length === 6) {
                if (pinSubmitBtn) {
                    pinSubmitBtn.style.opacity = '1';
                    pinSubmitBtn.disabled = false;
                }
            } else {
                if (pinSubmitBtn) {
                    pinSubmitBtn.style.opacity = '0.5';
                    pinSubmitBtn.disabled = true;
                }
            }
        });
        
        pinInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && e.target.value.length === 6) {
                handlePinSubmit();
            }
        });
    }
    
    // PIN submit button
    if (pinSubmitBtn) {
        pinSubmitBtn.addEventListener('click', handlePinSubmit);
        pinSubmitBtn.disabled = true;
        pinSubmitBtn.style.opacity = '0.5';
    }
    
    // Template download button
    if (templateDownloadBtn) {
        templateDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadTemplate();
        });
    }
    
    // Download screenshot button
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadScreenshot();
        });
    }
    
    // Demo button
    if (demoBtn) {
        demoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loadDemo();
        });
    }

    // Back button
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showUploadPage();
        });
    }
    
    // PIN copy button
    if (pinCopyBtn) {
        pinCopyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            copyPin();
        });
    }
    
    // Theme toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
        });
    }
    
    console.log('Event listeners set up successfully');
}

// Theme Management
function initializeTheme() {
    try {
        const savedTheme = localStorage.getItem('leaderboard-theme') || 'light';
        document.documentElement.setAttribute('data-color-scheme', savedTheme);
        console.log('Theme initialized:', savedTheme);
    } catch (error) {
        console.warn('Could not initialize theme:', error);
        document.documentElement.setAttribute('data-color-scheme', 'light');
    }
}

function toggleTheme() {
    try {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('leaderboard-theme', newTheme);
        console.log('Theme toggled to:', newTheme);
    } catch (error) {
        console.warn('Could not toggle theme:', error);
    }
}

// Database operations using MySQL
const db = require('./db');

function generatePin() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function saveLeaderboardToDB(pin, data) {
    try {
        // First create the leaderboard
        const leaderboard = await db.Leaderboard.create({
            pin: pin,
            title: 'Smart Study Classes Toppers'
        });

        // Then create all students
        const studentRecords = data.map((student, index) => ({
            leaderboard_pin: pin,
            name: student.name,
            subject: student.subject,
            obtained_marks: student.obtainedMarks,
            total_marks: student.totalMarks,
            percentage: student.percentage,
            rank_position: index + 1  // rank_position based on array index (already sorted by percentage)
        }));

        await db.Student.bulkCreate(studentRecords);

        console.log('Leaderboard saved to database with PIN:', pin);
        return {
            pin: pin,
            title: 'Smart Study Classes Toppers',
            students: data,
            created_at: new Date().toISOString()
        };
    } catch (error) {
        console.error('Error in saveLeaderboardToDB:', error);
        throw error;
    }
}

async function getLeaderboardFromDB(pin) {
    try {
        // Find the leaderboard with its associated students
        const leaderboard = await db.Leaderboard.findOne({
            where: { pin: pin },
            include: [{
                model: db.Student,
                order: [['rank_position', 'ASC']]
            }]
        });

        if (!leaderboard) {
            return null;
        }

        const processedStudents = leaderboard.students.map(student => ({
            name: student.name,
            subject: student.subject,
            obtainedMarks: student.obtained_marks,
            totalMarks: student.total_marks,
            percentage: parseFloat(student.percentage),
            originalIndex: student.rank_position - 1
        }));

        return {
            pin: pin,
            title: leaderboard.title,
            students: processedStudents,
            created_at: leaderboard.created_at
        };
    } catch (error) {
        console.error('Error retrieving from database:', error);
        return null;
    }
}

// Load stored demo data if available
function loadStoredDemo() {
    try {
        const demoPins = ['123456', '654321', '111111'];
        demoPins.forEach(async pin => {
            const exists = await getLeaderboardFromDB(pin);
            if (!exists) {
                const processedData = sampleData.map((student, index) => ({
                    name: student.Name,
                    subject: student.Subject,
                    obtainedMarks: student["Obtained Marks"],
                    totalMarks: student["Total Marks"],
                    percentage: student.Percentage,
                    originalIndex: index
                })).sort((a, b) => b.percentage - a.percentage);
                
                try {
                    await saveLeaderboardToDB(pin, processedData);
                } catch (error) {
                    console.warn('Could not save demo data for PIN', pin, ':', error);
                }
            }
        });
        console.log('Demo data loaded successfully');
    } catch (error) {
        console.warn('Could not load demo data:', error);
    }
}

// PIN Handling
function handlePinSubmit() {
    const pin = pinInput ? pinInput.value.trim() : '';
    
    if (pin.length !== 6) {
        showError('Please enter a valid 6-digit PIN');
        return;
    }
    
    console.log('Submitting PIN:', pin);
    showLoading();
    
    setTimeout(() => {
        getLeaderboardFromDB(pin)
            .then(leaderboard => {
                if (leaderboard && leaderboard.students) {
                    studentsData = leaderboard.students;
                    currentPin = pin;
                    hideLoading();
                    showLeaderboardPage();
                    showSuccess(`Leaderboard loaded successfully! PIN: ${pin}`);
                    console.log('PIN validation successful');
                } else {
                    hideLoading();
                    showError('Invalid PIN. Please check and try again.');
                    console.log('PIN validation failed');
                }
            })
            .catch(error => {
                console.error('Error validating PIN:', error);
                hideLoading();
                showError('Error accessing leaderboard. Please try again.');
            });
    }, 1500);
}

function copyPin() {
    if (!currentPin) {
        showError('No PIN to copy');
        return;
    }
    
    try {
        navigator.clipboard.writeText(currentPin).then(() => {
            const originalHTML = pinCopyBtn.innerHTML;
            pinCopyBtn.innerHTML = '<i class="fas fa-check"></i> <span>Copied!</span>';
            pinCopyBtn.style.background = 'var(--color-success)';
            
            setTimeout(() => {
                pinCopyBtn.innerHTML = originalHTML;
                pinCopyBtn.style.background = '';
            }, 2000);
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = currentPin;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            showSuccess('PIN copied to clipboard!');
        });
    } catch (error) {
        console.error('Error copying PIN:', error);
        showError('Failed to copy PIN');
    }
}

// Page Navigation
function showUploadPage() {
    console.log('Showing upload page');
    
    if (uploadPage) uploadPage.classList.remove('hidden');
    if (leaderboardPage) leaderboardPage.classList.add('hidden');
    
    // Reset form
    if (pinInput) pinInput.value = '';
    if (fileInput) fileInput.value = '';
    if (fileInfo) fileInfo.classList.add('hidden');
    if (pinSubmitBtn) {
        pinSubmitBtn.disabled = true;
        pinSubmitBtn.style.opacity = '0.5';
    }
    
    currentPin = null;
    studentsData = [];
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showLeaderboardPage() {
    console.log('Showing leaderboard page');
    
    if (uploadPage) uploadPage.classList.add('hidden');
    if (leaderboardPage) leaderboardPage.classList.remove('hidden');
    
    displayLeaderboard();
    
    setTimeout(() => {
        if (leaderboardPage) {
            leaderboardPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 300);
}

// Template Download
function downloadTemplate() {
    console.log('Downloading template...');
    
    if (!templateDownloadBtn) return;
    
    const originalHTML = templateDownloadBtn.innerHTML;
    templateDownloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Downloading...</span>';
    templateDownloadBtn.disabled = true;
    
    setTimeout(() => {
        templateDownloadBtn.innerHTML = originalHTML;
        templateDownloadBtn.disabled = false;
    }, 2000);

    try {
        const link = document.createElement('a');
        link.href = TEMPLATE_URL;
        link.download = 'Student_Leaderboard_Template.xlsx';
        link.target = '_blank';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showSuccess('Template downloaded successfully! 📊');
    } catch (error) {
        console.error('Template download error:', error);
        showError('Error downloading template. Please try again!');
    }
}

// Drag and Drop Handling
function handleDragOver(e) {
    e.preventDefault();
    if (uploadArea) {
        uploadArea.classList.add('dragover');
    }
}

function handleDragLeave(e) {
    e.preventDefault();
    if (uploadArea) {
        uploadArea.classList.remove('dragover');
    }
}

function handleFileDrop(e) {
    e.preventDefault();
    
    if (uploadArea) {
        uploadArea.classList.remove('dragover');
    }
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

// File Processing
function handleFile(file) {
    if (isProcessing) return;
    
    console.log('Processing file:', file.name);
    
    // Validate file type
    const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
    ];
    
    if (!validTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls)$/i)) {
        showError('Please select a valid Excel file (.xlsx or .xls)');
        return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        showError('File size too large. Please select a file smaller than 10MB');
        return;
    }
    
    // Show file info
    if (fileName) fileName.textContent = file.name;
    if (fileInfo) fileInfo.classList.remove('hidden');
    
    processExcelFile(file);
}

function processExcelFile(file) {
    console.log('Processing Excel file...');
    showLoading();
    isProcessing = true;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            console.log('Raw JSON data:', jsonData);
            
            const processedData = validateAndProcessData(jsonData);
            console.log('Processed data:', processedData);
            
            if (processedData.length === 0) {
                hideLoading();
                showError('No valid student data found. Please check your Excel file format and try our template!');
                isProcessing = false;
                return;
            }
            
            studentsData = processedData;
            
            // Generate PIN and save to database
            currentPin = generatePin();
            const saved = saveLeaderboardToDB(currentPin, studentsData);
            
            hideLoading();
            isProcessing = false;
            
            if (saved) {
                showLeaderboardPage();
                showSuccess(`Leaderboard created successfully! PIN: ${currentPin}`);
            } else {
                showError('Error saving leaderboard. Please try again.');
            }
            
        } catch (error) {
            console.error('Error processing file:', error);
            hideLoading();
            isProcessing = false;
            showError('Error reading the Excel file. Please ensure it\'s a valid Excel format!');
        }
    };
    
    reader.onerror = function(error) {
        console.error('FileReader error:', error);
        hideLoading();
        isProcessing = false;
        showError('Error reading the file. Please try again!');
    };
    
    reader.readAsArrayBuffer(file);
}

// Data Validation and Processing
function validateAndProcessData(data) {
    console.log('Validating and processing data...');
    const processed = [];
    
    data.forEach((row, index) => {
        const name = findColumnValue(row, ['name', 'student name', 'student_name', 'studentname']);
        const subject = findColumnValue(row, ['subject', 'course', 'class', 'stream', 'department']);
        const obtainedMarks = findColumnValue(row, ['obtained marks', 'obtained_marks', 'obtainedmarks', 'marks obtained', 'score']);
        const totalMarks = findColumnValue(row, ['total marks', 'total_marks', 'totalmarks', 'max marks', 'maximum marks']);
        let percentage = findColumnValue(row, ['percentage', 'percent', '%', 'marks percentage']);
        
        if (name && subject && obtainedMarks !== null && totalMarks !== null) {
            let numericObtained = parseFloat(String(obtainedMarks).replace(/[^\d.-]/g, ''));
            let numericTotal = parseFloat(String(totalMarks).replace(/[^\d.-]/g, ''));
            let numericPercentage = null;
            
            // Calculate percentage if not provided or invalid
            if (percentage === null || percentage === undefined || isNaN(parseFloat(String(percentage).replace(/[^\d.-]/g, '')))) {
                if (!isNaN(numericObtained) && !isNaN(numericTotal) && numericTotal > 0) {
                    numericPercentage = (numericObtained / numericTotal) * 100;
                }
            } else {
                numericPercentage = parseFloat(String(percentage).replace(/[^\d.-]/g, ''));
            }
            
            if (!isNaN(numericObtained) && !isNaN(numericTotal) && !isNaN(numericPercentage) && 
                numericObtained >= 0 && numericTotal > 0 && numericPercentage >= 0 && numericPercentage <= 100) {
                
                processed.push({
                    name: String(name).trim(),
                    subject: String(subject).trim(),
                    obtainedMarks: Math.round(numericObtained * 100) / 100,
                    totalMarks: Math.round(numericTotal * 100) / 100,
                    percentage: Math.round(numericPercentage * 100) / 100,
                    originalIndex: index
                });
            }
        }
    });
    
    // Sort by percentage in descending order
    return processed.sort((a, b) => b.percentage - a.percentage);
}

function findColumnValue(row, possibleKeys) {
    const keys = Object.keys(row);
    
    for (const possibleKey of possibleKeys) {
        const foundKey = keys.find(key => 
            key.toLowerCase().replace(/[^a-z0-9]/g, '') === 
            possibleKey.toLowerCase().replace(/[^a-z0-9]/g, '')
        );
        
        if (foundKey && row[foundKey] !== null && row[foundKey] !== undefined && row[foundKey] !== '') {
            return row[foundKey];
        }
    }
    
    return null;
}

// Demo Data Loading
function loadDemo() {
    console.log('Loading demo data...');
    
    if (isProcessing) return;
    
    showLoading();
    isProcessing = true;
    
    setTimeout(() => {
        try {
            studentsData = sampleData.map((student, index) => ({
                name: student.Name,
                subject: student.Subject,
                obtainedMarks: student["Obtained Marks"],
                totalMarks: student["Total Marks"],
                percentage: student.Percentage,
                originalIndex: index
            })).sort((a, b) => b.percentage - a.percentage);
            
            // Generate PIN and save demo data
            currentPin = generatePin();
            const saved = saveLeaderboardToDB(currentPin, studentsData);
            
            hideLoading();
            isProcessing = false;
            
            if (saved) {
                showLeaderboardPage();
                showSuccess(`Demo leaderboard loaded! PIN: ${currentPin}`);
            } else {
                showError('Error loading demo. Please try again.');
            }
        } catch (error) {
            console.error('Error loading demo data:', error);
            hideLoading();
            isProcessing = false;
            showError('Error loading demo data. Please try again!');
        }
    }, 2000);
}

// Leaderboard Display
function displayLeaderboard() {
    console.log('Displaying leaderboard with', studentsData.length, 'students');
    
    // Update PIN display
    if (currentPin && pinNumber) {
        pinNumber.textContent = currentPin;
        if (pinDisplaySection) pinDisplaySection.classList.remove('hidden');
    }
    
    // Display top 3 podium
    displayPodium();
    
    // Display complete leaderboard
    displayCompleteLeaderboard();
}

// Mobile-Responsive Podium with Fixed Order
function displayPodium() {
    console.log('Creating podium...');
    
    if (!podium) return;
    
    podium.innerHTML = '';
    
    const top3 = studentsData.slice(0, 3);
    if (top3.length === 0) return;
    
    // Create podium positions with correct ordering
    // Desktop: 2nd, 1st, 3rd (visual left-center-right)
    // Mobile: 1st, 2nd, 3rd (stacked vertically with 1st on top/center)
    const podiumData = [];
    
    if (top3[1]) podiumData.push({ student: top3[1], position: 'second', rank: 2, icon: 'fas fa-medal', color: 'second' });
    if (top3[0]) podiumData.push({ student: top3[0], position: 'first', rank: 1, icon: 'fas fa-crown', color: 'first' });
    if (top3[2]) podiumData.push({ student: top3[2], position: 'third', rank: 3, icon: 'fas fa-trophy', color: 'third' });
    
    podiumData.forEach((item, index) => {
        const podiumPosition = createPodiumPosition(item.student, item.position, item.rank, item.icon, item.color);
        podium.appendChild(podiumPosition);
        
        // Staggered animation
        setTimeout(() => {
            podiumPosition.style.transform = 'translateY(0) scale(1)';
            podiumPosition.style.opacity = '1';
        }, index * 300);
    });
}

function createPodiumPosition(student, position, rank, icon, color) {
    const div = document.createElement('div');
    div.className = `podium-position podium-position--${position}`;
    div.style.transform = 'translateY(50px) scale(0.8)';
    div.style.opacity = '0';
    div.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    div.innerHTML = `
        <div class="podium-card podium-card--${color}">
            <div class="podium-rank podium-rank--${color}">${rank}</div>
            <div class="podium-icon podium-icon--${color}">
                <i class="${icon}"></i>
            </div>
            <div class="podium-name">${student.name}</div>
            <div class="podium-subject">${student.subject}</div>
            <div class="podium-percentage">${student.percentage}%</div>
            <div class="podium-marks">${student.obtainedMarks}/${student.totalMarks}</div>
        </div>
    `;
    
    return div;
}

// Complete Leaderboard Display
function displayCompleteLeaderboard() {
    console.log('Displaying complete leaderboard...');
    
    if (!completeStudentList) return;
    
    completeStudentList.innerHTML = '';
    
    studentsData.forEach((student, index) => {
        const rank = index + 1;
        const studentCard = createStudentCard(student, rank);
        completeStudentList.appendChild(studentCard);
        
        // Staggered animation
        setTimeout(() => {
            studentCard.style.transform = 'translateY(0) scale(1)';
            studentCard.style.opacity = '1';
        }, (index * 100) + 1000);
    });
}

function createStudentCard(student, rank) {
    const div = document.createElement('div');
    div.className = 'student-card';
    div.style.transform = 'translateY(30px) scale(0.95)';
    div.style.opacity = '0';
    div.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    // Special styling for top 3
    if (rank <= 3) {
        const colors = ['#ffd700', '#c0c0c0', '#cd7f32'];
        div.style.borderColor = colors[rank - 1];
        div.style.borderWidth = '3px';
        div.style.boxShadow = `0 8px 25px ${colors[rank - 1]}40`;
    }
    
    div.innerHTML = `
        <div class="student-rank">${rank}</div>
        <div class="student-info">
            <h4>${student.name}</h4>
            <p>${student.subject}</p>
        </div>
        <div class="student-marks">
            <div class="percentage">${student.percentage}%</div>
            <div class="marks">${student.obtainedMarks}/${student.totalMarks}</div>
        </div>
    `;
    
    return div;
}

// Screenshot Download
function downloadScreenshot() {
    console.log('Starting screenshot download...');
    
    if (studentsData.length === 0) {
        showError('No leaderboard to capture. Please upload a file first!');
        return;
    }
    
    if (!downloadBtn) return;
    
    const originalHTML = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-camera fa-spin"></i> <span>Capturing...</span>';
    downloadBtn.disabled = true;
    
    // Create a clean version for screenshot
    const screenshotContainer = document.createElement('div');
    screenshotContainer.style.cssText = `
        position: absolute;
        left: -9999px;
        top: 0;
        background: var(--color-background);
        padding: 60px;
        border-radius: 20px;
        font-family: var(--font-family-base);
        min-width: 800px;
    `;
    
    // Add title
    const title = document.createElement('h1');
    title.textContent = 'Smart Study Classes Toppers';
    title.style.cssText = `
        text-align: center;
        margin-bottom: 40px;
        font-size: 2.5rem;
        font-weight: 900;
        color: var(--color-primary);
        text-transform: uppercase;
    `;
    screenshotContainer.appendChild(title);
    
    // Add PIN info
    if (currentPin) {
        const pinInfo = document.createElement('div');
        pinInfo.style.cssText = `
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: var(--color-bg-1);
            border-radius: 10px;
            border: 2px solid var(--color-primary);
        `;
        pinInfo.innerHTML = `
            <p style="margin: 0; color: var(--color-text-secondary); font-size: 1rem;">Share PIN: <strong style="font-family: var(--font-family-mono); font-size: 1.5rem; color: var(--color-primary);">${currentPin}</strong></p>
        `;
        screenshotContainer.appendChild(pinInfo);
    }
    
    // Clone podium and leaderboard
    if (podium) {
        const podiumClone = podium.cloneNode(true);
        screenshotContainer.appendChild(podiumClone);
    }
    
    if (completeStudentList) {
        const leaderboardClone = completeStudentList.cloneNode(true);
        screenshotContainer.appendChild(leaderboardClone);
    }
    
    document.body.appendChild(screenshotContainer);
    
    html2canvas(screenshotContainer, {
        backgroundColor: '#f8f9fa',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        height: screenshotContainer.scrollHeight,
        width: screenshotContainer.scrollWidth
    }).then(canvas => {
        document.body.removeChild(screenshotContainer);
        
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 10);
        link.download = `Smart_Study_Classes_Leaderboard_${currentPin || 'demo'}_${timestamp}.png`;
        link.href = canvas.toDataURL('image/png');
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showSuccess('Screenshot downloaded successfully! 🎉');
        
    }).catch(error => {
        console.error('Error generating screenshot:', error);
        showError('Error capturing screenshot. Please try again!');
        
        if (document.body.contains(screenshotContainer)) {
            document.body.removeChild(screenshotContainer);
        }
    }).finally(() => {
        downloadBtn.innerHTML = originalHTML;
        downloadBtn.disabled = false;
    });
}

// Loading State Management
function showLoading() {
    if (loadingContainer) {
        loadingContainer.classList.remove('hidden');
        loadingContainer.style.display = 'flex';
    }
    hideError();
    hideSuccess();
}

function hideLoading() {
    if (loadingContainer) {
        loadingContainer.classList.add('hidden');
        loadingContainer.style.display = 'none';
    }
}

// Message Management
function showSuccess(message) {
    if (successText) successText.textContent = message;
    if (successMessage) {
        successMessage.classList.remove('hidden');
        setTimeout(() => hideSuccess(), 4000);
    }
}

function hideSuccess() {
    if (successMessage) successMessage.classList.add('hidden');
}

function showError(message) {
    hideLoading();
    if (errorText) errorText.textContent = message;
    if (errorMessage) {
        errorMessage.classList.remove('hidden');
        setTimeout(() => hideError(), 6000);
    }
}

function hideError() {
    if (errorMessage) errorMessage.classList.add('hidden');
}

// Entrance animations on load
window.addEventListener('load', function() {
    console.log('Window loaded, starting entrance animations');
    
    const headerElements = document.querySelectorAll('.header-content *');
    headerElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});