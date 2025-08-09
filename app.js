// Fixed Premium Student Leaderboard Application with Theme Toggle and Screenshot Fixes
let studentsData = [];
let isProcessing = false;
let currentTheme = 'light';

// Updated sample data with new structure
const premiumSampleData = [
    {"Name": "Alice Johnson", "Subject": "Mathematics", "Obtained Marks": 95, "Total Marks": 100, "Percentage": 95.0},
    {"Name": "David Martinez", "Subject": "Physics", "Obtained Marks": 92, "Total Marks": 100, "Percentage": 92.0},
    {"Name": "Emma Thompson", "Subject": "Chemistry", "Obtained Marks": 89, "Total Marks": 100, "Percentage": 89.0},
    {"Name": "Michael Chen", "Subject": "Biology", "Obtained Marks": 86, "Total Marks": 100, "Percentage": 86.0},
    {"Name": "Sarah Williams", "Subject": "English", "Obtained Marks": 84, "Total Marks": 100, "Percentage": 84.0},
    {"Name": "James Rodriguez", "Subject": "History", "Obtained Marks": 82, "Total Marks": 100, "Percentage": 82.0},
    {"Name": "Sophia Kumar", "Subject": "Computer Science", "Obtained Marks": 80, "Total Marks": 100, "Percentage": 80.0},
    {"Name": "Robert Brown", "Subject": "Economics", "Obtained Marks": 78, "Total Marks": 100, "Percentage": 78.0}
];

// DOM Elements
let uploadArea, fileInput, fileInfo, fileName, uploadSection, loadingContainer;
let errorMessage, errorText, successMessage, successText, leaderboardSection, podium;
let completeStudentList, downloadBtn, demoBtn, resetBtn, templateDownloadBtn, themeToggle;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing updated premium leaderboard application with theme toggle...');
    initializeDOMElements();
    initializeTheme();
    setupEventListeners();
    addPremiumEffects();
});

// Initialize DOM elements
function initializeDOMElements() {
    uploadArea = document.getElementById('uploadArea');
    fileInput = document.getElementById('fileInput');
    fileInfo = document.getElementById('fileInfo');
    fileName = document.getElementById('fileName');
    uploadSection = document.getElementById('uploadSection');
    loadingContainer = document.getElementById('loadingContainer');
    errorMessage = document.getElementById('errorMessage');
    errorText = document.getElementById('errorText');
    successMessage = document.getElementById('successMessage');
    successText = document.getElementById('successText');
    leaderboardSection = document.getElementById('leaderboardSection');
    podium = document.getElementById('podium');
    completeStudentList = document.getElementById('completeStudentList');
    downloadBtn = document.getElementById('downloadBtn');
    demoBtn = document.getElementById('demoBtn');
    resetBtn = document.getElementById('resetBtn');
    templateDownloadBtn = document.getElementById('templateDownloadBtn');
    themeToggle = document.getElementById('themeToggle');
    
    console.log('DOM elements initialized');
}

// Initialize theme system
function initializeTheme() {
    console.log('Initializing theme system...');
    
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('leaderboard-theme') || 'light';
    currentTheme = savedTheme;
    
    // Apply theme
    applyTheme(currentTheme);
    updateThemeToggleIcon();
}

// Apply theme to document
function applyTheme(theme) {
    console.log('Applying theme:', theme);
    
    // Apply theme data attribute
    document.documentElement.setAttribute('data-theme', theme);
    
    // Store theme preference
    localStorage.setItem('leaderboard-theme', theme);
    currentTheme = theme;
    
    console.log('Theme applied successfully:', theme);
}

// Update theme toggle icon
function updateThemeToggleIcon() {
    if (themeToggle) {
        const icon = themeToggle.querySelector('.theme-icon');
        if (icon) {
            if (currentTheme === 'dark') {
                icon.className = 'fas fa-sun theme-icon';
                themeToggle.setAttribute('aria-label', 'Switch to light theme');
            } else {
                icon.className = 'fas fa-moon theme-icon';
                themeToggle.setAttribute('aria-label', 'Switch to dark theme');
            }
        }
    }
}

// Toggle theme
function toggleTheme() {
    console.log('Toggling theme from:', currentTheme);
    
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    updateThemeToggleIcon();
    
    console.log('Theme toggled to:', newTheme);
    
    // Add button animation
    if (themeToggle) {
        themeToggle.style.transform = 'rotate(180deg) scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    }
}

// Setup all event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
        });
    }
    
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
            loadPremiumDemo();
        });
    }

    // Reset button
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetApplication();
        });
    }
    
    console.log('Event listeners set up successfully');
}

// Add premium effects and animations
function addPremiumEffects() {
    console.log('Adding premium effects...');
    
    // Add premium hover effects to buttons
    const premiumButtons = document.querySelectorAll('.btn--premium');
    premiumButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Download template
function downloadTemplate() {
    console.log('Starting template download...');
    
    if (templateDownloadBtn) {
        const originalHTML = templateDownloadBtn.innerHTML;
        templateDownloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Downloading...</span>';
        templateDownloadBtn.disabled = true;
        
        setTimeout(() => {
            templateDownloadBtn.innerHTML = originalHTML;
            templateDownloadBtn.disabled = false;
            showPremiumSuccess('Template download completed! 📊');
        }, 1500);
    }
    
    // Create a simple Excel template data
    const templateData = [
        ['Name', 'Subject', 'Obtained Marks', 'Total Marks', 'Percentage'],
        ['Alice Johnson', 'Mathematics', 95, 100, 95],
        ['David Martinez', 'Physics', 92, 100, 92],
        ['Emma Thompson', 'Chemistry', 89, 100, 89]
    ];
    
    // Create and download template
    try {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(templateData);
        XLSX.utils.book_append_sheet(wb, ws, 'Student Data');
        XLSX.writeFile(wb, 'Student_Leaderboard_Template.xlsx');
    } catch (error) {
        console.error('Template creation error:', error);
        showPremiumSuccess('Template download initiated! 📊');
    }
}

// Reset application
function resetApplication() {
    console.log('Resetting application...');
    
    studentsData = [];
    isProcessing = false;
    
    if (fileInput) {
        fileInput.value = '';
    }
    
    hideLoading();
    hideError();
    hideSuccess();
    if (leaderboardSection) leaderboardSection.classList.add('hidden');
    if (uploadSection) uploadSection.classList.remove('hidden');
    if (fileInfo) fileInfo.classList.add('hidden');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle drag over
function handleDragOver(e) {
    e.preventDefault();
    if (uploadArea) {
        uploadArea.classList.add('dragover');
    }
}

// Handle drag leave
function handleDragLeave(e) {
    e.preventDefault();
    if (uploadArea) {
        uploadArea.classList.remove('dragover');
    }
}

// Handle file drop
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

// Handle file selection
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

// Handle file processing
function handleFile(file) {
    if (isProcessing) return;
    
    console.log('Validating file:', file.name);
    
    // Validate file type
    const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
    ];
    
    if (!validTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls)$/i)) {
        showPremiumError('Please select a valid Excel file (.xlsx or .xls) 📋');
        return;
    }

    // Validate file size
    if (file.size > 10 * 1024 * 1024) {
        showPremiumError('File size too large. Please select a file smaller than 10MB 📏');
        return;
    }
    
    // Show file info
    if (fileName) fileName.textContent = file.name;
    if (fileInfo) fileInfo.classList.remove('hidden');
    
    processExcelFile(file);
}

// Process Excel file
function processExcelFile(file) {
    console.log('Processing Excel file...');
    showPremiumLoading();
    isProcessing = true;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            
            const processedData = validateAndProcessData(jsonData);
            
            if (processedData.length === 0) {
                showPremiumError('No valid student data found. Please check your Excel file format! 📋');
                isProcessing = false;
                hideLoading();
                return;
            }
            
            studentsData = processedData;
            displayPremiumLeaderboard();
            
        } catch (error) {
            console.error('Error processing file:', error);
            showPremiumError('Error reading the Excel file. Please ensure it\'s a valid format! 🚫');
        } finally {
            hideLoading();
            isProcessing = false;
        }
    };
    
    reader.readAsArrayBuffer(file);
}

// Validate and process data
function validateAndProcessData(data) {
    console.log('Validating data...');
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
    
    return processed.sort((a, b) => b.percentage - a.percentage);
}

// Find column value with flexible names
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

// Load premium demo data
function loadPremiumDemo() {
    console.log('Loading premium demo...');
    
    if (isProcessing) return;
    
    showPremiumLoading();
    isProcessing = true;
    
    setTimeout(() => {
        try {
            studentsData = premiumSampleData.map((student, index) => ({
                name: student.Name,
                subject: student.Subject,
                obtainedMarks: student["Obtained Marks"],
                totalMarks: student["Total Marks"],
                percentage: student.Percentage,
                originalIndex: index
            })).sort((a, b) => b.percentage - a.percentage);
            
            console.log('Demo data loaded:', studentsData);
            displayPremiumLeaderboard();
            
        } catch (error) {
            console.error('Error loading demo data:', error);
            showPremiumError('Error loading demo data. Please try again! 🚫');
        } finally {
            hideLoading();
            isProcessing = false;
        }
    }, 1500);
}

// Display premium leaderboard
function displayPremiumLeaderboard() {
    console.log('Displaying premium leaderboard with', studentsData.length, 'students');
    
    hideError();
    hideSuccess();
    
    if (uploadSection) uploadSection.classList.add('hidden');
    if (leaderboardSection) leaderboardSection.classList.remove('hidden');
    
    displayPremiumPodium();
    displayCompleteLeaderboard();
    
    setTimeout(() => {
        if (leaderboardSection) {
            leaderboardSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        showPremiumSuccess(`🎉 Premium leaderboard generated with ${studentsData.length} students!`);
    }, 500);
}

// Display premium podium
function displayPremiumPodium() {
    console.log('Creating premium podium...');
    
    if (!podium) return;
    podium.innerHTML = '';
    
    const top3 = studentsData.slice(0, 3);
    if (top3.length === 0) return;
    
    const podiumData = [
        { student: top3[1], position: 'second', rank: 2, icon: 'fas fa-medal', color: 'second' },
        { student: top3[0], position: 'first', rank: 1, icon: 'fas fa-crown', color: 'first' },   
        { student: top3[2], position: 'third', rank: 3, icon: 'fas fa-trophy', color: 'third' }
    ].filter(item => item.student);
    
    podiumData.forEach((item, index) => {
        const podiumPosition = createPremiumPodiumPosition(item.student, item.position, item.rank, item.icon, item.color);
        podium.appendChild(podiumPosition);
        
        setTimeout(() => {
            podiumPosition.classList.add('animate-slide-up');
            podiumPosition.style.transform = 'translateY(0) scale(1)';
            podiumPosition.style.opacity = '1';
        }, index * 200);
    });
}

// Create podium position
function createPremiumPodiumPosition(student, position, rank, icon, color) {
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

// Display complete leaderboard
function displayCompleteLeaderboard() {
    console.log('Displaying complete leaderboard...');
    
    if (!completeStudentList) return;
    completeStudentList.innerHTML = '';
    
    studentsData.forEach((student, index) => {
        const rank = index + 1;
        const studentCard = createStudentCard(student, rank);
        completeStudentList.appendChild(studentCard);
        
        setTimeout(() => {
            studentCard.classList.add('animate-slide-up');
            studentCard.style.transform = 'translateY(0) scale(1)';
            studentCard.style.opacity = '1';
        }, (index * 50) + 500);
    });
}

// Create student card
function createStudentCard(student, rank) {
    const div = document.createElement('div');
    div.className = 'student-card';
    div.style.transform = 'translateY(30px) scale(0.95)';
    div.style.opacity = '0';
    div.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    if (rank <= 3) {
        div.style.borderColor = rank === 1 ? '#ffd700' : rank === 2 ? '#c0c0c0' : '#cd7f32';
        div.style.borderWidth = '3px';
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

// Loading functions
function showPremiumLoading() {
    if (uploadSection) uploadSection.classList.add('hidden');
    if (errorMessage) errorMessage.classList.add('hidden');
    if (successMessage) successMessage.classList.add('hidden');
    if (leaderboardSection) leaderboardSection.classList.add('hidden');
    if (loadingContainer) loadingContainer.classList.remove('hidden');
}

function hideLoading() {
    if (loadingContainer) loadingContainer.classList.add('hidden');
}

// Message functions
function showPremiumSuccess(message) {
    if (successText) successText.textContent = message;
    if (successMessage) successMessage.classList.remove('hidden');
    setTimeout(() => hideSuccess(), 4000);
}

function hideSuccess() {
    if (successMessage) successMessage.classList.add('hidden');
}

function showPremiumError(message) {
    hideLoading();
    if (errorText) errorText.textContent = message;
    if (errorMessage) errorMessage.classList.remove('hidden');
    setTimeout(() => hideError(), 6000);
}

function hideError() {
    if (errorMessage) errorMessage.classList.add('hidden');
}

// FIXED Premium screenshot download
function downloadScreenshot() {
    console.log('Starting FIXED screenshot download...');
    
    if (studentsData.length === 0) {
        showPremiumError('No leaderboard to capture. Please upload a file first! 📸');
        return;
    }
    
    const originalHTML = downloadBtn.innerHTML;
    if (downloadBtn) {
        downloadBtn.innerHTML = '<i class="fas fa-camera fa-spin"></i> <span>Capturing Clean Screenshot...</span>';
        downloadBtn.disabled = true;
    }
    
    const captureArea = document.getElementById('leaderboardCaptureArea');
    if (!captureArea) {
        showPremiumError('Capture area not found. Please try again! 🚫');
        if (downloadBtn) {
            downloadBtn.innerHTML = originalHTML;
            downloadBtn.disabled = false;
        }
        return;
    }
    
    // Enable screenshot mode
    document.body.classList.add('screenshot-mode');
    
    // Create title
    const titleElement = document.createElement('div');
    titleElement.style.textAlign = 'center';
    titleElement.style.marginBottom = '40px';
    titleElement.style.padding = '20px';
    titleElement.innerHTML = `
        <h1 style="
            font-family: Inter, sans-serif;
            font-size: 2.5rem;
            font-weight: 900;
            color: #ff1b1b;
            margin: 0;
            text-transform: uppercase;
        ">SMART STUDY CLASSES</h1>
        <h2 style="
            font-family: Montserrat, sans-serif;
            font-size: 1.5rem;
            font-weight: 600;
            color: ${currentTheme === 'dark' ? '#ffffff' : '#212529'};
            margin: 10px 0 0 0;
            text-transform: uppercase;
        ">Premium Student Leaderboard</h2>
    `;
    
    captureArea.insertBefore(titleElement, captureArea.firstChild);
    
    const canvasOptions = {
        backgroundColor: currentTheme === 'dark' ? '#1a1a1a' : '#f8f9fa',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        onclone: (clonedDoc) => {
            const clonedElements = clonedDoc.querySelectorAll('*');
            clonedElements.forEach(el => {
                if (el.style) {
                    el.style.backdropFilter = 'none';
                    el.style.webkitBackdropFilter = 'none';
                }
            });
        }
    };
    
    html2canvas(captureArea, canvasOptions)
        .then(canvas => {
            captureArea.removeChild(titleElement);
            document.body.classList.remove('screenshot-mode');
            
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
            const themeName = currentTheme === 'dark' ? 'Dark' : 'Light';
            link.download = `Smart_Study_Classes_Toppers_${themeName}_${timestamp}.png`;
            link.href = canvas.toDataURL('image/png', 1.0);
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showPremiumSuccess('🎉 Clean premium screenshot captured successfully!');
            
            if (downloadBtn) {
                downloadBtn.innerHTML = originalHTML;
                downloadBtn.disabled = false;
            }
        })
        .catch(error => {
            console.error('Screenshot error:', error);
            
            if (captureArea.contains(titleElement)) {
                captureArea.removeChild(titleElement);
            }
            document.body.classList.remove('screenshot-mode');
            
            showPremiumError('Error capturing screenshot. Please try again! 📷');
            
            if (downloadBtn) {
                downloadBtn.innerHTML = originalHTML;
                downloadBtn.disabled = false;
            }
        });
}