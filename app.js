// Updated Premium Student Leaderboard Application
let studentsData = [];
let isProcessing = false;

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

// Updated template URL
const TEMPLATE_URL = 'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/9ea9241e214f607036b115403f329b5b/98b39614-2f12-4d3b-bf34-2f6a1927042e/84f400ec.xlsx';

// DOM Elements
let uploadArea, fileInput, fileInfo, fileName, uploadSection, loadingContainer;
let errorMessage, errorText, successMessage, successText, leaderboardSection, podium;
let completeStudentList, downloadBtn, demoBtn, resetBtn, templateDownloadBtn;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing updated premium leaderboard application...');
    initializeDOMElements();
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
    
    console.log('DOM elements initialized');
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
                if (fileInput) {
                    fileInput.click();
                }
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

    // Add hover effects to upload area
    if (uploadArea) {
        uploadArea.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        uploadArea.addEventListener('mouseleave', function() {
            if (!this.classList.contains('dragover')) {
                this.style.transform = 'translateY(0)';
            }
        });
    }
}

// Download updated template
function downloadTemplate() {
    console.log('Starting template download...');
    
    if (templateDownloadBtn) {
        const originalHTML = templateDownloadBtn.innerHTML;
        templateDownloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Downloading...</span>';
        templateDownloadBtn.disabled = true;
        
        setTimeout(() => {
            templateDownloadBtn.innerHTML = originalHTML;
            templateDownloadBtn.disabled = false;
        }, 2000);
    }

    try {
        const link = document.createElement('a');
        link.href = TEMPLATE_URL;
        link.download = 'Updated_Student_Leaderboard_Template.xlsx';
        link.target = '_blank';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showPremiumSuccess('Updated template downloaded successfully! 📊');
    } catch (error) {
        console.error('Template download error:', error);
        showPremiumError('Error downloading template. Please try again! 🚫');
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
    
    smoothScrollToTop();
}

// Premium smooth scroll
function smoothScrollToTop() {
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

// Handle file processing with validation
function handleFile(file) {
    if (isProcessing) {
        return;
    }
    
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

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        showPremiumError('File size too large. Please select a file smaller than 10MB 📏');
        return;
    }
    
    // Show file info
    if (fileName) {
        fileName.textContent = file.name;
    }
    if (fileInfo) {
        fileInfo.classList.remove('hidden');
    }
    
    processExcelFile(file);
}

// Process Excel file with updated data structure
function processExcelFile(file) {
    console.log('Processing Excel file with new structure...');
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
            console.log('Raw JSON data:', jsonData);
            
            const processedData = validateAndProcessNewData(jsonData);
            console.log('Processed data:', processedData);
            
            if (processedData.length === 0) {
                showPremiumError('No valid student data found. Please check your Excel file format and try our updated template! 📋');
                return;
            }
            
            studentsData = processedData;
            displayPremiumLeaderboard();
            
        } catch (error) {
            console.error('Error processing file:', error);
            showPremiumError('Error reading the Excel file. Please ensure it\'s a valid Excel format! 🚫');
        } finally {
            hideLoading();
            isProcessing = false;
        }
    };
    
    reader.onerror = function(error) {
        console.error('FileReader error:', error);
        showPremiumError('Error reading the file. Please try again! 🔄');
        hideLoading();
        isProcessing = false;
    };
    
    reader.readAsArrayBuffer(file);
}

// Enhanced data validation for new structure
function validateAndProcessNewData(data) {
    console.log('Validating data with new structure...');
    const processed = [];
    
    data.forEach((row, index) => {
        // Look for required columns (case-insensitive)
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
    const sorted = processed.sort((a, b) => b.percentage - a.percentage);
    console.log('Processed and sorted data:', sorted);
    return sorted;
}

// Find column value with flexible column names
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
    console.log('Loading premium demo with new data structure...');
    
    if (isProcessing) {
        return;
    }
    
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
            
            displayPremiumLeaderboard();
        } catch (error) {
            console.error('Error loading demo data:', error);
            showPremiumError('Error loading premium demo data. Please try again! 🚫');
        } finally {
            hideLoading();
            isProcessing = false;
        }
    }, 2000);
}

// Display premium leaderboard with new structure
function displayPremiumLeaderboard() {
    console.log('Displaying premium leaderboard with', studentsData.length, 'students');
    
    hideError();
    hideSuccess();
    
    if (uploadSection) {
        uploadSection.classList.add('hidden');
    }
    if (leaderboardSection) {
        leaderboardSection.classList.remove('hidden');
    }
    
    setTimeout(() => {
        if (leaderboardSection) {
            leaderboardSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 300);
    
    // Display top 3 in premium podium
    displayPremiumPodium();
    
    // Display ALL students in complete leaderboard
    displayCompleteLeaderboard();
    
    showPremiumSuccess(`🎉 Premium leaderboard generated with ${studentsData.length} students!`);
}

// Display premium podium with updated data structure
function displayPremiumPodium() {
    console.log('Creating premium podium...');
    
    if (!podium) {
        return;
    }
    
    podium.innerHTML = '';
    
    const top3 = studentsData.slice(0, 3);
    
    if (top3.length === 0) {
        return;
    }
    
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
        }, index * 300);
    });
}

// Create premium podium position with updated data
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

// Display complete leaderboard (ALL students including top 3)
function displayCompleteLeaderboard() {
    console.log('Displaying complete leaderboard with ALL students...');
    
    if (!completeStudentList) {
        return;
    }
    
    completeStudentList.innerHTML = '';
    
    // Display ALL students (including top 3)
    studentsData.forEach((student, index) => {
        const rank = index + 1;
        const studentCard = createUpdatedStudentCard(student, rank);
        completeStudentList.appendChild(studentCard);
        
        // Staggered animation
        setTimeout(() => {
            studentCard.classList.add('animate-slide-up');
            studentCard.style.transform = 'translateY(0) scale(1)';
            studentCard.style.opacity = '1';
        }, (index * 100) + 1000);
    });
}

// Create student card with updated data structure
function createUpdatedStudentCard(student, rank) {
    const div = document.createElement('div');
    div.className = 'student-card';
    div.style.transform = 'translateY(30px) scale(0.95)';
    div.style.opacity = '0';
    div.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    // Add special styling for top 3
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

// Loading state
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

// Success message
function showPremiumSuccess(message) {
    if (successText) successText.textContent = message;
    if (successMessage) {
        successMessage.classList.remove('hidden');
    }
    
    setTimeout(() => {
        hideSuccess();
    }, 4000);
}

function hideSuccess() {
    if (successMessage) successMessage.classList.add('hidden');
}

// Error message
function showPremiumError(message) {
    hideLoading();
    if (errorText) errorText.textContent = message;
    if (errorMessage) {
        errorMessage.classList.remove('hidden');
    }
    
    setTimeout(() => {
        hideError();
    }, 6000);
}

function hideError() {
    if (errorMessage) errorMessage.classList.add('hidden');
}

// Premium screenshot download
function downloadScreenshot() {
    console.log('Starting screenshot download...');
    
    if (studentsData.length === 0) {
        showPremiumError('No leaderboard to capture. Please upload a file first! 📸');
        return;
    }
    
    const originalHTML = downloadBtn.innerHTML;
    if (downloadBtn) {
        downloadBtn.innerHTML = '<i class="fas fa-camera fa-spin"></i> <span>Capturing Premium Screenshot...</span>';
        downloadBtn.disabled = true;
    }
    
    const leaderboardElement = document.getElementById('leaderboardSection');
    if (!leaderboardElement) {
        showPremiumError('Leaderboard not found. Please try again! 🚫');
        return;
    }
    
    const cleanElement = leaderboardElement.cloneNode(true);
    const controls = cleanElement.querySelector('.leaderboard-controls');
    if (controls) controls.remove();
    const downloadSection = cleanElement.querySelector('.download-section');
    if (downloadSection) downloadSection.remove();
    
    // Style for screenshot
    cleanElement.style.position = 'absolute';
    cleanElement.style.left = '-9999px';
    cleanElement.style.top = '0';
    cleanElement.style.background = '#f8f9fa';
    cleanElement.style.padding = '60px';
    cleanElement.style.borderRadius = '20px';
    cleanElement.style.border = '2px solid #007bff';
    document.body.appendChild(cleanElement);
    
    // Add title for screenshot
    const title = document.createElement('h1');
    title.textContent = 'Smart Study Classes Toppers';
    title.style.textAlign = 'center';
    title.style.marginBottom = '40px';
    title.style.fontSize = '2.5rem';
    title.style.fontWeight = '900';
    title.style.color = '#ff1b1b';
    title.style.fontFamily = 'Inter, sans-serif';
    title.style.textTransform = 'uppercase';
    cleanElement.insertBefore(title, cleanElement.firstChild);
    
    html2canvas(cleanElement, {
        backgroundColor: '#f8f9fa',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        height: cleanElement.scrollHeight,
        width: cleanElement.scrollWidth
    }).then(canvas => {
        document.body.removeChild(cleanElement);
        
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 10);
        link.download = `Smart_Study_Classes_Toppers_${timestamp}.png`;
        link.href = canvas.toDataURL('image/png');
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showPremiumSuccess('🎉 Premium screenshot captured successfully!');
        
        if (downloadBtn) {
            downloadBtn.innerHTML = originalHTML;
            downloadBtn.disabled = false;
        }
        
    }).catch(error => {
        console.error('Error generating screenshot:', error);
        showPremiumError('Error capturing screenshot. Please try again! 📷');
        
        if (document.body.contains(cleanElement)) {
            document.body.removeChild(cleanElement);
        }
        
        if (downloadBtn) {
            downloadBtn.innerHTML = originalHTML;
            downloadBtn.disabled = false;
        }
    });
}

// Add entrance animations on load
window.addEventListener('load', function() {
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