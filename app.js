// Prevent animation on load
setTimeout(() => {
    document.body.classList.remove("preload");
  }, 500);
  
  // DOM
  const btnRules = document.querySelector(".rules-btn");
  const btnClose = document.querySelector(".close-btn");
  const modalRules = document.querySelector(".modal");
  
  const CHOICES = [
    {
      name: "paper",
      beats: "rock",
    },
    {
      name: "scissors",
      beats: "paper",
    },
    {
      name: "rock",
      beats: "scissors",
    },
  ];
  const choiceButtons = document.querySelectorAll(".choice-btn");
  const gameDiv = document.querySelector(".game");
  const resultsDiv = document.querySelector(".results");
  const resultDivs = document.querySelectorAll(".results__result");





  const congratulation = document.querySelector(".congo-btn");


  const resultWinner = document.querySelector(".results__winner");
  const resultText = document.querySelector(".results__text");
  
  const playAgainBtn = document.querySelector(".play-again");
  
  const scoreNumber = document.querySelector(".score__number");
  const scorePc = document.querySelector(".score__Pc");
  let score = 0;
  let PcScore = 0;
  
  // Game Logic
  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const choiceName = button.dataset.choice;
      const choice = CHOICES.find((choice) => choice.name === choiceName);
      choose(choice);
    });
  });
  
  function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
  }
  
  function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
  }
  
  function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
      setTimeout(() => {
        resultDiv.innerHTML = `
          <div class="choice ${results[idx].name}">
            <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
          </div>
        `;
      }, idx * 1000);
    });
  
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
  }
  
  function displayWinner(results) {
    setTimeout(() => {
      const userWins = isWinner(results);
      const aiWins = isWinner(results.reverse());
  
      if (userWins) {
        resultText.innerText = " YOU WIN AGAINST PC";
        resultDivs[0].classList.toggle("winner");
        keepScore(1);
        // increasePcScore(-1);
       
        const button = document.createElement("button");
        button.innerText = "NEXT";
        button.classList.add("winner-button");
        button.addEventListener("click", () => {
            // Navigate to "apple.html" when the button is clicked
            window.location.href = "page2.html";
        });
        // Append the button to the resultWinner div
        resultWinner.appendChild(button);
        
      




      } else if (aiWins) {
        resultText.innerText = " YOU LOST AGAINST PC";
        resultDivs[1].classList.toggle("winner");
        // keepScore(-1);
        increasePcScore(1);
       
      } else {
        resultText.innerText = "TIE UP";
      }

      resultWinner.classList.toggle("hidden");
      resultsDiv.classList.toggle("show-winner");
    }, 1000);
  }
  
  function isWinner(results) {
    return results[0].beats === results[1].name;
  }
  


  
  

  function keepScore(point) {
    score += point;
    scoreNumber.innerText = score;
  }

 
  function increasePcScore(point) {
    PcScore += point;
    scorePc.innerText = PcScore;
  }

  
  // Play Again
  playAgainBtn.addEventListener("click", () => {
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
  
    resultDivs.forEach((resultDiv) => {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("winner");
    });
  
    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  });
  
  // Show/Hide Rules
  btnRules.addEventListener("click", () => {
    modalRules.classList.toggle("show-modal");
  });
  btnClose.addEventListener("click", () => {
    modalRules.classList.toggle("show-modal");
  });

  

  document.getElementById("goToPage2").addEventListener("click", function() {
    // Navigate to Page 2
    window.location.href = "page2.html";
});