const wordPairs = [
  ["Listen", "Silent"],
  ["Dusty", "Study"],
  ["Night", "Thing"],
  ["Race", "Care"],
  ["Angel", "Glean"],
  ["Debit card", "Bad credit"],
  ["Stressed", "Desserts"],
  ["Brag", "Grab"],
  ["Save", "Vase"],
  ["Fired", "Fried"],
  ["Earnest", "Nearest"],
  ["Act", "Cat"],
  ["Cinema", "Iceman"],
  ["Clint Eastwood", "Old West Action"],
  ["Alert", "Later"],
  ["Drawer", "Reward"],
  ["Elbow", "Below"],
  ["State", "Taste"],
  ["Cider", "Cried"],
  ["Dare", "Read"],
  ["Fate", "Feat"],
  ["Loop", "Polo"],
  ["Army", "Mary"],
  ["Notes", "Stone"],
  ["Shout", "South"],
  ["Pots", "Stop"],
  ["Meet", "Teem"],
  ["Bored", "Robed"],
  ["Stew", "West"],
  ["Snap", "Pans"],
  ["Racecar", "Cerrace"],
  ["Flow", "Wolf"],
  ["Neat", "Ante"],
  ["Gallery", "Largely"],
  ["Earn", "Near"],
  ["Listen", "Inlets"],
  ["Flesh", "Shelf"],
  ["Nightmare", "Mating her"],
  ["Least", "Slate"],
  ["Looped", "Poodle"],
  ["Strain", "Trains"],
  ["Spare", "Spears"],
  ["Peach", "Cheap"],
  ["Par", "Rap"],
  ["Covers", "Vectors"],
  ["Inches", "Chines"],
  ["Trainee", "Retinae"],
  ["Sadder", "Dreads"],
  ["Fate", "Feat"],
  ["Sting", "Tings"],
  ["Horse", "Shore"],
  ["Scar", "Cars"],
  ["Master", "Stream"],
  ["Earth", "Heart"],
  ["Rescue", "Secure"],
  ["Plaid", "Lipid"],
  ["Swipe", "Wipes"],
  ["Diet", "Tide"],
  ["Clothes", "Clohes"],
  ["Care", "Race"],
  ["Fries", "Rifes"],
  ["Cheat", "Teach"],
  ["Actors", "Costar"],
  ["Mile", "Lime"],
  ["Enlist", "Silent"],
  ["Silent", "Listen"],
  ["Tired", "Tried"],
  ["Listen", "Inlets"],
  ["Emits", "Items"],
  ["Reins", "Rinse"],
  ["Anagram", "Nag a ram"],
  ["Time", "Item"],
  ["Dates", "Stade"],
  ["Mode", "Dome"],
  ["Rifle", "Flier"],
  ["Earn", "Near"],
  ["Flap", "Palf"],
  ["Gallery", "Largely"],
  ["Apple", "Pepla"],
  ["Sink", "Skin"],
  ["Glean", "Angel"],
  ["Brag", "Grab"],
  ["Rope", "Pore"],
  ["Arrest", "Rarest"],
  ["Elapse", "Please"],
  ["Trades", "Stared"],
  ["Below", "Elbow"],
  ["Dirt", "Drip"],
  ["Mister", "Remits"],
  ["Night", "Thing"],
  ["Slight", "Lights"],
  ["Tacos", "Coats"],
  ["Rope", "Pore"],
  ["Male", "Meal"],
  ["Rise", "Sire"],
  ["Cheating", "Teaching"],
  ["File", "Life"],
  ["Save", "Vase"],
  ["Sore", "Rose"],
  ["Dare", "Read"],
];

let currentPair = [];
let score = 0;
let level = 1;
let timeLeft = 10; //10 Seconds per round
let timerInterval;

function areAnagrams(str1, str2) {
  const normalize = (str) => str.replace(/[^a-z]/gi, "").toLowerCase();
  return (
    normalize(str1).split("").sort().join("") ===
    normalize(str2).split("").sort().join("")
  );
}

function getRandomPairs() {
  const randomIndex = Math.floor(Math.random() * wordPairs.length);
  return wordPairs[randomIndex];
}

function newRound() {
  if (level > 10) {
    endGame();
    return;
  }

  currentPair = getRandomPairs();
  document.getElementById(
    "wordPair"
  ).innerText = `"${currentPair[0]}" and "${currentPair[1]}"`;
  document.getElementById("result").innerText = "";
  document.getElementById("level").innerText = level;
  startTimer();
}

function endGame() {
  clearInterval(timerInterval);
  document.getElementById("wordPair").style.display = "none";
  document.getElementById("yesBtn").style.display = "none";
  document.getElementById("noBtn").style.display = "none";
  document.getElementById("gameOver").style.display = "block";
  document.getElementById("restartBtn").style.display = "block";
}

function startTimer() {
  clearInterval(timerInterval); //clear previous timer

  timeLeft = Math.max(3, 10 - level);
  document.getElementById("timeLeft").innerText = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timeLeft").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById("result").innerText = "Time's up!";
      score = Math.max(0, score - 1); // deduct point for every time out
      document.getElementById("score").innerText = score;
      setTimeout(newRound, 2000);
    }
  }, 1000);
}

function handleChoice(isAnagram) {
  clearInterval(timerInterval); //Stop timer once answer is submitted

  const correctAnswer = areAnagrams(currentPair[0], currentPair[1]);

  if (isAnagram === correctAnswer) {
    score++;
    document.getElementById("result").innerText = "Correct!";
    document.getElementById("result").style.color = "green";
  } else {
    score = Math.max(0, score - 1);
    document.getElementById("result").innerText = "Wrong!";
    document.getElementById("result").style.color = "red";
  }

  document.getElementById("score").innerText = score;
  level++;
  setTimeout(newRound, 2000);
}

document.getElementById("yesBtn").addEventListener("click", () => {
  handleChoice(true);
});

document.getElementById("noBtn").addEventListener("click", () => {
  handleChoice(false);
});

document.getElementById("restartBtn").addEventListener("click", () => {
  location.reload();
});

newRound();
