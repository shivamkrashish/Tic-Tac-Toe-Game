let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn0 = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    msg.innerText = "";
};

const disableBoxes = () => {
    boxes.forEach((box) => box.classList.add("disabled"));
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.classList.remove("disabled");
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkDraw = () => {
    return [...boxes].every((box) => box.innerText !== "");
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return;
        }
    }
    if (checkDraw()) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!box.classList.contains("disabled")) {
            box.innerText = turn0 ? "O" : "X";
            turn0 = !turn0;
            box.classList.add("disabled");
            checkWinner();
        }
    });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
