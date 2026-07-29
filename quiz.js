// ==========================================
// Nila Herbals - Skin Consultation Quiz logic
// ==========================================

const quizAnswers = {
    step1: null, // Skin type
    step2: null, // Skin concern
    step3: null  // Routine depth
};

// 1. Option Selector
function selectOption(step, element) {
    const parent = element.parentElement;
    
    // Remove selected class from sibling options
    parent.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
    });

    // Add selected class to current option
    element.classList.add('selected');

    // Save choice
    const val = element.getAttribute('data-value');
    quizAnswers[`step${step}`] = val;

    // Enable next buttons
    const nextBtn = document.getElementById(`nextBtn${step}`);
    if (nextBtn) {
        nextBtn.removeAttribute('disabled');
    }
}

// 2. Step Navigator
function navigateQuiz(toStep) {
    // Hide all steps
    document.querySelectorAll('.quiz-step').forEach(step => {
        step.classList.remove('active');
    });

    // Show selected step
    const target = document.getElementById(`step${toStep}`);
    if (target) {
        target.classList.add('active');
    }

    // Update Progress Bar
    const progressPercent = ((toStep - 1) / 3) * 100;
    document.getElementById('quizProgressBar').style.width = `${progressPercent}%`;
}

// 3. Calculation Engine
function calculateRoutine() {
    const type = quizAnswers.step1;
    const concern = quizAnswers.step2;
    const depth = quizAnswers.step3;

    // Hide steps, show results
    document.querySelectorAll('.quiz-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('stepResult').classList.add('active');
    document.getElementById('quizProgressBar').style.width = '100%';

    // Set summary text
    const summary = document.getElementById('quizSummaryText');
    summary.innerHTML = `Personalized for your <b>${type.toUpperCase()}</b> skin addressing <b>${concern.toUpperCase()}</b> (${depth === 'minimal' ? 'Essential 2-step' : 'Complete 3-step'} Routine)`;

    // Calculate dynamic routine lists
    let amSteps = [];
    let pmSteps = [];

    // Base Products logic mapping
    if (concern === 'hairfall') {
        amSteps = [
            { step: 1, name: "Wash hair with a mild organic shampoo" },
            { step: 2, name: "Herbal Rosemary Spray (100ml)" }
        ];
        
        pmSteps = [
            { step: 1, name: "Apply Herbal Hair Oil (100ml) to scalp & massage" },
            { step: 2, name: "Leave-in Rosemary Hair nourishment" }
        ];
        
        if (depth === 'standard') {
            amSteps.push({ step: 3, name: "Light hair brushing to stimulate hair roots" });
            pmSteps.push({ step: 3, name: "Warm oil compress treatment before sleeping" });
        }
    } else {
        // Skincare Routine Mapping
        let mainGel = "Aloe Vitamin Gel";
        let secondaryGel = "Saffron Gel";
        
        if (concern === 'dullness') {
            mainGel = "Saffron Gel (75gm)";
            secondaryGel = "Aloe Vitamin Gel (75gm)";
        } else if (concern === 'acne') {
            mainGel = "Glutathione Gel (75gm)";
            secondaryGel = "Blue Pea Gel (75gm)";
        } else if (concern === 'dryness') {
            mainGel = "Aloe Vitamin Gel (75gm)";
            secondaryGel = "Saffron Gel (75gm)";
        }

        // AM Steps
        amSteps = [
            { step: 1, name: "Cleanse with cold fresh water" },
            { step: 2, name: `${mainGel} - Apply gently on damp face` }
        ];

        // PM Steps
        pmSteps = [
            { step: 1, name: "Cleanse with a mild natural face wash" },
            { step: 2, name: `${secondaryGel} - Deep overnight absorption` }
        ];

        if (depth === 'standard') {
            amSteps.push({ step: 3, name: "Apply daily natural sunscreen" });
            
            // Add a treatment step for PM
            let pmExtra = "Herbal Face Pack (100g) - Apply 2x a week";
            pmSteps.push({ step: 3, name: pmExtra });
        }
    }

    // Render HTML
    const container = document.getElementById('routineGridContainer');
    container.innerHTML = `
        <!-- Morning Routine -->
        <div class="routine-card">
            <h4>☀️ Morning (AM) Routine</h4>
            <div class="routine-steps">
                ${amSteps.map(item => `
                    <div class="step-item">
                        <span class="step-number">${item.step}</span>
                        <span class="step-name">${item.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Evening Routine -->
        <div class="routine-card pm-routine">
            <h4>🌙 Night (PM) Routine</h4>
            <div class="routine-steps">
                ${pmSteps.map(item => `
                    <div class="step-item">
                        <span class="step-number">${item.step}</span>
                        <span class="step-name">${item.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// 4. Reset Quiz
function restartQuiz() {
    quizAnswers.step1 = null;
    quizAnswers.step2 = null;
    quizAnswers.step3 = null;

    // Reset button states
    document.getElementById('nextBtn1').setAttribute('disabled', 'true');
    document.getElementById('nextBtn2').setAttribute('disabled', 'true');
    document.getElementById('nextBtn3').setAttribute('disabled', 'true');

    // Deselect all selected options
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
    });

    // Go to step 1
    navigateQuiz(1);
}
