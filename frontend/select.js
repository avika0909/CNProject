function redirectToQuiz(quizType) {
    // Add a slight delay for a smooth transition effect
    setTimeout(() => {
        window.location.href = `quiz.html?type=${quizType}`;
    }, 300); // 300ms delay
}