// Premium Student Leaderboard Application
let studentsData = [];
let isProcessing = false;

// Premium sample data for demo
const premiumSampleData = [
    {"Name": "Alice Johnson", "Course": "Computer Science", "Marks": 98},
    {"Name": "David Martinez", "Course": "Mathematics", "Marks": 95},
    {"Name": "Emma Thompson", "Course": "Physics", "Marks": 92},
    {"Name": "Michael Chen", "Course": "Chemistry", "Marks": 90},
    {"Name": "Sarah Williams", "Course": "Biology", "Marks": 88},
    {"Name": "James Rodriguez", "Course": "English Literature", "Marks": 86},
    {"Name": "Sophia Kumar", "Course": "History", "Marks": 84},
    {"Name": "Robert Brown", "Course": "Economics", "Marks": 82}
];

// Template file URL
const TEMPLATE_URL = 'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/47d42ad63b85db28546c8556fe71e939/d9d2445f-ccde-44fc-84e3-f63f31a9a0fb/55aef6c4.xlsx';

// DOM Elements
let uploadArea, fileInput, fileInfo, fileName, uploadSection, loadingContainer;
let errorMessage, errorText, successMessage, successText, leaderboardSection, podium, studentList;
let downloadBtn, demoBtn, resetBtn, templateDownloadBtn;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing premium leaderboard application...');
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
    studentList = document.getElementById('studentList');
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
        console.log('File input listener added');
    }
    
    // Drag and drop events
    if (uploadArea) {
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleFileDrop);
        uploadArea.addEventListener('click', function(e) {
            console.log('Upload area clicked');
            if (e.target.classList.contains('upload-btn') || e.target.closest('.upload-btn')) {
                console.log('Upload button clicked, opening file dialog');
                if (fileInput) {
                    fileInput.click();
                }
                return;
            }
            if (fileInput) {
                fileInput.click();
            }
        });
        console.log('Upload area listeners added');
    }
    
    // Template download button
    if (templateDownloadBtn) {
        templateDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Template download button clicked');
            downloadTemplate();
        });
        console.log('Template download listener added');
    }
    
    // Download screenshot button
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Screenshot download button clicked');
            downloadScreenshot();
        });
        console.log('Screenshot download listener added');
    }
    
    // Demo button
    if (demoBtn) {
        demoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Demo button clicked');
            loadPremiumDemo();
        });
        console.log('Demo button listener added');
    }

    // Reset button
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Reset button clicked');
            resetApplication();
        });
        console.log('Reset button listener added');
    }
}

// Add premium effects and animations
function addPremiumEffects() {
    console.log('Adding premium effects...');
    
    // Add parallax effect to background gradients
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.bg-gradient-1, .bg-gradient-2, .bg-gradient-3');
        
        parallax.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

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
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        uploadArea.addEventListener('mouseleave', function() {
            if (!this.classList.contains('dragover')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            }
        });
    }
    
    console.log('Premium effects added');
}

// Download premium template
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
        // Create a temporary link to download the template
        const link = document.createElement('a');
        link.href = TEMPLATE_URL;
        link.download = 'Premium_Student_Leaderboard_Template.xlsx';
        link.target = '_blank';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        showPremiumSuccess('Premium template downloaded successfully! 📊');
        console.log('Template download initiated');
    } catch (error) {
        console.error('Template download error:', error);
        showPremiumError('Error downloading template. Please try again! 🚫');
    }
}

// Reset application to initial state
function resetApplication() {
    console.log('Resetting application...');
    
    // Clear data
    studentsData = [];
    isProcessing = false;
    
    // Reset form
    if (fileInput) {
        fileInput.value = '';
    }
    
    // Hide all sections except upload
    hideLoading();
    hideError();
    hideSuccess();
    if (leaderboardSection) leaderboardSection.classList.add('hidden');
    if (uploadSection) uploadSection.classList.remove('hidden');
    
    // Clear file info
    if (fileInfo) fileInfo.classList.add('hidden');
    
    // Smooth scroll to top with premium effect
    smoothScrollToTop();
}

// Premium smooth scroll
function smoothScrollToTop() {
    const startPosition = window.pageYOffset;
    const startTime = performance.now();
    const duration = 1000;

    function scrollAnimation(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function for smooth animation
        const ease = 1 - Math.pow(1 - progress, 3);
        
        window.scrollTo(0, startPosition * (1 - ease));
        
        if (progress < 1) {
            requestAnimationFrame(scrollAnimation);
        }
    }
    
    requestAnimationFrame(scrollAnimation);
}

// Handle drag over with premium effects
function handleDragOver(e) {
    e.preventDefault();
    if (uploadArea) {
        uploadArea.classList.add('dragover');
        uploadArea.style.transform = 'translateY(-5px) scale(1.02)';
        uploadArea.style.borderColor = 'rgba(59, 130, 246, 0.8)';
    }
}

// Handle drag leave
function handleDragLeave(e) {
    e.preventDefault();
    if (uploadArea) {
        uploadArea.classList.remove('dragover');
        uploadArea.style.transform = 'translateY(0) scale(1)';
        uploadArea.style.borderColor = '';
    }
}

// Handle file drop with premium animations
function handleFileDrop(e) {
    e.preventDefault();
    console.log('File dropped');
    
    if (uploadArea) {
        uploadArea.classList.remove('dragover');
        uploadArea.style.transform = 'scale(1.05)';
        setTimeout(() => {
            uploadArea.style.transform = 'scale(1)';
        }, 200);
    }
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        console.log('Processing dropped file:', files[0].name);
        handleFile(files[0]);
    }
}

// Handle file selection
function handleFileSelect(e) {
    console.log('File selected');
    const file = e.target.files[0];
    if (file) {
        console.log('Processing selected file:', file.name);
        handleFile(file);
    }
}

// Handle file processing with premium validation
function handleFile(file) {
    if (isProcessing) {
        console.log('Already processing, ignoring new file');
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
    
    // Show file info with premium animation
    if (fileName) {
        fileName.textContent = file.name;
    }
    if (fileInfo) {
        fileInfo.classList.remove('hidden');
        fileInfo.style.animation = 'slideUp 0.5s ease-out';
    }
    
    // Process the file
    console.log('Starting file processing...');
    processExcelFile(file);
}

// Process Excel file with enhanced error handling
function processExcelFile(file) {
    console.log('Processing Excel file...');
    showPremiumLoading();
    isProcessing = true;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        console.log('File loaded, parsing...');
        
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Get the first worksheet
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            
            console.log('Worksheet loaded:', sheetName);
            
            // Convert to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            console.log('Raw JSON data:', jsonData);
            
            // Validate and process data
            const processedData = validateAndProcessData(jsonData);
            console.log('Processed data:', processedData);
            
            if (processedData.length === 0) {
                showPremiumError('No valid student data found. Please check your Excel file format and try our premium template! 📋');
                return;
            }
            
            // Store and display data
            studentsData = processedData;
            console.log('Students data stored, displaying leaderboard...');
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

// Enhanced data validation
function validateAndProcessData(data) {
    console.log('Validating data...');
    const processed = [];
    
    data.forEach((row, index) => {
        // Check for required columns (case-insensitive)
        const name = findColumnValue(row, ['name', 'student name', 'student_name', 'studentname']);
        const course = findColumnValue(row, ['course', 'subject', 'class', 'stream', 'department']);
        const marks = findColumnValue(row, ['marks', 'percentage', 'score', 'marks/percentage', 'total marks', 'grade']);
        
        if (name && course && marks !== null && marks !== undefined) {
            let numericMarks = parseFloat(String(marks).replace(/[^\d.-]/g, ''));
            
            // Handle percentage symbols and convert if needed
            if (String(marks).includes('%')) {
                numericMarks = parseFloat(String(marks).replace('%', ''));
            }
            
            if (!isNaN(numericMarks) && numericMarks >= 0 && numericMarks <= 100) {
                processed.push({
                    name: String(name).trim(),
                    course: String(course).trim(),
                    marks: Math.round(numericMarks * 100) / 100, // Round to 2 decimal places
                    originalIndex: index
                });
            }
        }
    });
    
    // Sort by marks in descending order
    const sorted = processed.sort((a, b) => b.marks - a.marks);
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
    console.log('Loading premium demo...');
    
    if (isProcessing) {
        console.log('Already processing, ignoring demo request');
        return;
    }
    
    showPremiumLoading();
    isProcessing = true;
    
    // Simulate processing time with premium loading
    setTimeout(() => {
        try {
            console.log('Processing demo data...');
            studentsData = premiumSampleData.map((student, index) => ({
                name: student.Name,
                course: student.Course,
                marks: student.Marks,
                originalIndex: index
            })).sort((a, b) => b.marks - a.marks);
            
            console.log('Demo data processed:', studentsData);
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

// Display premium leaderboard with animations
function displayPremiumLeaderboard() {
    console.log('Displaying premium leaderboard with', studentsData.length, 'students');
    
    hideError();
    hideSuccess();
    
    // Hide upload section and show leaderboard
    if (uploadSection) {
        uploadSection.classList.add('hidden');
        console.log('Upload section hidden');
    }
    if (leaderboardSection) {
        leaderboardSection.classList.remove('hidden');
        console.log('Leaderboard section shown');
    }
    
    // Premium scroll to leaderboard
    setTimeout(() => {
        if (leaderboardSection) {
            leaderboardSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            console.log('Scrolled to leaderboard');
        }
    }, 300);
    
    // Display top 3 in premium podium
    displayPremiumPodium();
    
    // Display remaining students with staggered animation
    displayRemainingStudents();
    
    // Show success message
    showPremiumSuccess(`🎉 Premium leaderboard generated with ${studentsData.length} students!`);
}

// Display premium podium with 3D effects
function displayPremiumPodium() {
    console.log('Creating premium podium...');
    
    if (!podium) {
        console.error('Podium element not found');
        return;
    }
    
    podium.innerHTML = '';
    
    const top3 = studentsData.slice(0, 3);
    console.log('Top 3 students:', top3);
    
    if (top3.length === 0) {
        console.log('No students for podium');
        return;
    }
    
    const podiumData = [
        { student: top3[1], position: 'second', rank: 2, icon: 'fas fa-medal', color: 'second' },
        { student: top3[0], position: 'first', rank: 1, icon: 'fas fa-crown', color: 'first' },   
        { student: top3[2], position: 'third', rank: 3, icon: 'fas fa-trophy', color: 'third' }
    ].filter(item => item.student); // Only include positions with students
    
    console.log('Podium data:', podiumData);
    
    podiumData.forEach((item, index) => {
        const podiumPosition = createPremiumPodiumPosition(item.student, item.position, item.rank, item.icon, item.color);
        podium.appendChild(podiumPosition);
        console.log(`Added podium position ${item.rank}`);
        
        // Staggered premium animation
        setTimeout(() => {
            podiumPosition.classList.add('animate-slide-up');
            podiumPosition.style.transform = 'translateY(0) scale(1)';
            podiumPosition.style.opacity = '1';
        }, index * 300);
    });
}

// Create premium podium position with enhanced styling
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
            <div class="podium-course">${student.course}</div>
            <div class="podium-marks">${student.marks}%</div>
        </div>
    `;
    
    console.log(`Created podium position for ${student.name}`);
    return div;
}

// Display remaining students with premium effects
function displayRemainingStudents() {
    console.log('Displaying remaining students...');
    
    if (!studentList) {
        console.error('Student list element not found');
        return;
    }
    
    studentList.innerHTML = '';
    
    const remainingStudents = studentsData.slice(3);
    console.log('Remaining students:', remainingStudents.length);
    
    const remainingStudentsSection = document.querySelector('.remaining-students');
    if (remainingStudents.length === 0) {
        if (remainingStudentsSection) {
            remainingStudentsSection.style.display = 'none';
        }
        console.log('No remaining students to display');
        return;
    }
    
    if (remainingStudentsSection) {
        remainingStudentsSection.style.display = 'block';
    }
    
    remainingStudents.forEach((student, index) => {
        const rank = index + 4;
        const studentCard = createPremiumStudentCard(student, rank);
        studentList.appendChild(studentCard);
        console.log(`Added student card for ${student.name} (rank ${rank})`);
        
        // Staggered animation
        setTimeout(() => {
            studentCard.classList.add('animate-slide-up');
            studentCard.style.transform = 'translateY(0) scale(1)';
            studentCard.style.opacity = '1';
        }, (index * 150) + 1000);
    });
}

// Create premium student card
function createPremiumStudentCard(student, rank) {
    const div = document.createElement('div');
    div.className = 'student-card';
    div.style.transform = 'translateY(30px) scale(0.95)';
    div.style.opacity = '0';
    div.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    div.innerHTML = `
        <div class="student-rank">${rank}</div>
        <div class="student-info">
            <h4>${student.name}</h4>
            <p>${student.course}</p>
        </div>
        <div class="student-marks">
            <div class="marks">${student.marks}%</div>
            <div class="percentage">Score</div>
        </div>
    `;
    
    return div;
}

// Premium loading state
function showPremiumLoading() {
    console.log('Showing premium loading...');
    if (uploadSection) uploadSection.classList.add('hidden');
    if (errorMessage) errorMessage.classList.add('hidden');
    if (successMessage) successMessage.classList.add('hidden');
    if (leaderboardSection) leaderboardSection.classList.add('hidden');
    if (loadingContainer) loadingContainer.classList.remove('hidden');
}

// Hide loading state
function hideLoading() {
    console.log('Hiding loading...');
    if (loadingContainer) loadingContainer.classList.add('hidden');
}

// Premium success message
function showPremiumSuccess(message) {
    console.log('Showing success:', message);
    if (successText) successText.textContent = message;
    if (successMessage) {
        successMessage.classList.remove('hidden');
        successMessage.style.animation = 'messageSlide 0.5s ease-out';
    }
    
    setTimeout(() => {
        hideSuccess();
    }, 4000);
}

// Hide success message
function hideSuccess() {
    if (successMessage) successMessage.classList.add('hidden');
}

// Premium error message
function showPremiumError(message) {
    console.log('Showing error:', message);
    hideLoading();
    if (errorText) errorText.textContent = message;
    if (errorMessage) {
        errorMessage.classList.remove('hidden');
        errorMessage.style.animation = 'messageSlide 0.5s ease-out';
    }
    
    setTimeout(() => {
        hideError();
    }, 6000);
}

// Hide error message
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
    
    // Create clean version for screenshot
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
    cleanElement.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
    cleanElement.style.padding = '60px';
    cleanElement.style.borderRadius = '20px';
    cleanElement.style.border = '2px solid rgba(255, 255, 255, 0.1)';
    document.body.appendChild(cleanElement);
    
    // Add title for screenshot
    const title = document.createElement('h1');
    title.textContent = 'Smart Study Classes Toppers';
    title.style.textAlign = 'center';
    title.style.marginBottom = '40px';
    title.style.fontSize = '2.5rem';
    title.style.fontWeight = '900';
    title.style.background = 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)';
    title.style.webkitBackgroundClip = 'text';
    title.style.webkitTextFillColor = 'transparent';
    title.style.fontFamily = 'Inter, sans-serif';
    cleanElement.insertBefore(title, cleanElement.firstChild);
    
    // Capture premium screenshot
    html2canvas(cleanElement, {
        backgroundColor: '#0f172a',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        height: cleanElement.scrollHeight,
        width: cleanElement.scrollWidth
    }).then(canvas => {
        document.body.removeChild(cleanElement);
        
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 10);
        link.download = `Smart_Study_Classes_Premium_Toppers_${timestamp}.png`;
        link.href = canvas.toDataURL('image/png');
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showPremiumSuccess('🎉 Premium screenshot captured successfully!');
        console.log('Screenshot captured and downloaded');
        
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

// Add premium interactions on window load
window.addEventListener('load', function() {
    console.log('Window loaded, adding entrance animations...');
    
    // Add premium entrance animations
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

// Premium resize handling
window.addEventListener('resize', function() {
    // Refresh premium effects on resize
    if (studentsData.length > 0) {
        console.log('Window resized, refreshing layout');
    }
});