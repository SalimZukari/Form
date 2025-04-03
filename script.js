const form = document.getElementById('surveyForm');
document.querySelectorAll('input[name="q6"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const checked = document.querySelectorAll('input[name="q6"]:checked');
        if (checked.length > 3) {
            this.checked = false;
            alert("You can choose up to 3 numbers only.");
        }
    });
});
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const q1 = document.querySelector('input[name="q1"]');
    const q2 = document.querySelector('input[name="q2"]');
    const q3 = document.querySelector('input[name="q3"]:checked');
    const q4 = document.querySelector('input[name="q4"]:checked');
    const q5 = document.querySelector('input[name="q5"]:checked');
    const q6 = document.querySelectorAll('input[name="q6"]:checked');
    const selectedValues = Array.from(q6).map(x => x.value);

    try {
        const res = await fetch('https://slmwzrd.pythonanywhere.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question1: q1?.value || "",
                question2: q2?.value || "",
                question3: q3?.value || "",
                question4: q4?.value || "",
                question5: q5?.value || "",
                question6: selectedValues
            })
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Unknown error');
        }

        const result = await res.json();
        console.log('Success:', result);
        alert("Thanks for submitting!");
        form.reset();
    } catch (error) {
        console.error('Submission error:', error);
        alert("Something went wrong: " + error.message);
    }
});