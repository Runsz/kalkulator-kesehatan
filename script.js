document
  .getElementById("health-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("results").style.display = "block";

    // Get form values
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value) / 100;
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const activity = document.getElementById("activity").value;

    // Calculate BMI
    const bmi = (weight / (height * height)).toFixed(2);

    let bmiStatus = "";
    let recommendation = "";
    if (bmi < 18.5) {
      bmiStatus = "Kekurangan Berat Badan";
      recommendation =
        "Disarankan untuk meningkatkan asupan kalori harian dan melakukan latihan kekuatan untuk menambah massa otot.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      bmiStatus = "Normal (Ideal)";
      recommendation =
        "Pertahankan pola makan seimbang dan aktivitas fisik yang teratur untuk menjaga berat badan ideal.";
    } else if (bmi >= 25 && bmi < 29.9) {
      bmiStatus = "Kelebihan Berat Badan";
      recommendation =
        "Disarankan untuk mengurangi asupan kalori dan meningkatkan aktivitas fisik untuk menurunkan berat badan.";
    } else {
      bmiStatus = "Kegemukan (Obesitas)";
      recommendation =
        "Penting untuk berkonsultasi dengan ahli gizi atau dokter untuk mendapatkan rencana diet dan latihan yang sesuai.";
    }

    // Calculate BMR
    let bmr;
    if (gender === "male") {
      bmr = 88.362 + 13.397 * weight + 4.799 * height * 100 - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * weight + 3.098 * height * 100 - 4.33 * age;
    }

    // Calculate daily calorie needs
    let activityMultiplier;
    switch (activity) {
      case "sedentary":
        activityMultiplier = 1.2;
        break;
      case "light":
        activityMultiplier = 1.375;
        break;
      case "moderate":
        activityMultiplier = 1.55;
        break;
      case "active":
        activityMultiplier = 1.725;
        break;
      case "very-active":
        activityMultiplier = 1.9;
        break;
      default:
        activityMultiplier = 1.2;
    }

    const dailyCalories = (bmr * activityMultiplier).toFixed(2);

    // Display results with animation
    const bmiResult = document.getElementById("bmi-result");
    const calorieResult = document.getElementById("calorie-result");
    const recommendationResult = document.getElementById("recommendation");

    bmiResult.innerHTML = `BMI Anda adalah ${bmi} (${bmiStatus})`;
    calorieResult.innerHTML = `Kebutuhan kalori harian Anda adalah ${dailyCalories} kalori.`;
    recommendationResult.innerHTML = recommendation;

    bmiResult.classList.add("fade-in");
    calorieResult.classList.add("fade-in");
    recommendationResult.classList.add("fade-in");

    setTimeout(() => {
      bmiResult.classList.remove("fade-in");
      calorieResult.classList.remove("fade-in");
      recommendationResult.classList.remove("fade-in");
    }, 1000);
  });
