let morpion = document.querySelector('#container-morpion');
let cases = [...document.querySelectorAll(".cases")];
let player = document.querySelector('#current-player');
let score = document.getElementById("winner");
let rematch = document.getElementById("rematch");

let state = {
    joueurEnCours: 1,
    case1: 0,
    case2: 0,
    case3: 0,
    case4: 0,
    case5: 0,
    case6: 0,
    case7: 0,
    case8: 0,
    case9: 0,
};

const changementJoueur = (e) => {
    if (state.joueurEnCours == 1) {
        e.target.textContent = "X";
        state.joueurEnCours = 2;
        player.textContent = state.joueurEnCours;
    } else {
        e.target.textContent = "O";
        state.joueurEnCours = 1;
        player.textContent = state.joueurEnCours;
    }
}

const resetState = () => {
    state.joueurEnCours = 1;
    state.case1 = 0;
    state.case2 = 0;
    state.case3 = 0;
    state.case4 = 0;
    state.case5 = 0;
    state.case6 = 0;
    state.case7 = 0;
    state.case8 = 0;
    state.case9 = 0;
    winner.textContent = "";
    player.textContent = state.joueurEnCours;
    cases.forEach((c) => {
        c.textContent = "";
        c.addEventListener("click", jouerCase);
    });;
}

const verifVictoire = () => {
    if ((state.case1 == state.case2 && state.case2 == state.case3 && state.case1 > 0) ||
        (state.case1 == state.case4 && state.case4 == state.case7 && state.case1 > 0) ||
        (state.case4 == state.case5 && state.case5 == state.case6 && state.case4 > 0) ||
        (state.case7 == state.case8 && state.case8 == state.case9 && state.case7 > 0) ||
        (state.case2 == state.case5 && state.case5 == state.case8 && state.case2 > 0) ||
        (state.case3 == state.case6 && state.case6 == state.case9 && state.case3 > 0) ||
        (state.case7 == state.case5 && state.case5 == state.case3 && state.case7 > 0) ||
        (state.case1 == state.case5 && state.case5 == state.case9 && state.case1 > 0)
    ) {
        return true;
    } else if (state.case1 != 0 &&
        state.case2 != 0 &&
        state.case3 != 0 &&
        state.case4 != 0 &&
        state.case5 != 0 &&
        state.case6 != 0 &&
        state.case7 != 0 &&
        state.case8 != 0 &&
        state.case9 != 0) {
        return null;
    } else {
        return false;
    }
}

const jouerCase = (e) => {
    let idCase = e.target.id;
    // console.log(state[idCase]);
    if (state[idCase] != 0) {
        return;
    }
    state[idCase] = state.joueurEnCours;
    // console.log(state[idCase]);
    let isVictoire = verifVictoire();
    if (isVictoire === true) {
        (state.joueurEnCours == 1 ? e.target.textContent = "X" : e.target.textContent = "O");
        winner.textContent = "Le gagnant est le joueur " + state.joueurEnCours;
        cases.forEach((c) => {
            c.removeEventListener("click", jouerCase);
        })
    } else if (isVictoire === null) {
        (state.joueurEnCours == 1 ? e.target.textContent = "X" : e.target.textContent = "O")
        winner.textContent = "Egalité";
    } else if (isVictoire === false) {
        changementJoueur(e);
    }
}

cases.forEach((c) => {
    c.addEventListener("click", jouerCase);
});

rematch.addEventListener("click", resetState);