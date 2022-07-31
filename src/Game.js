import React, { useState } from "react";

import { Button } from "reactstrap";
import "./index.css";

import rock from "./rock.png";
import paper from "./paper.png";
import scissors from "./scissors.png";
import newPaper from "./newPaper.png";
import timerImg from "./timer.png";
import timerGif from "./timer-gif.gif";

const Game = () => {
  const [selectGame, setSelectGame] = useState(true);
  const [selectGameType, setSelectGameType] = useState("user-vs-com");
  const [playGame, setPlayGame] = useState(false);
  const [resultGame, setResultGame] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = React.useState({});
  const [comPlayGame, setComPlayGame] = useState(false);
  const [comValue, setComValue] = useState("");
  const [finalResult, setFinalResult] = React.useState({});

  const selectBtnHandler = (event) => {
    setSelectGame(false);
    setPlayGame(true);
  };

  const comVsComBtnHandler = () => {
    setSelectGameType("com-vs-com");
    let allValue = ["rock", "paper", "scissors"];
    let resultValue = Math.floor(Math.random() * 3);

    setComValue(allValue[resultValue]);
    setSelectGame(false);
    setComPlayGame(true);

    ResultData(allValue[resultValue]);
  };

  const palyBtnHandler = (event) => {
    setSelectGameType("user-vs-com");

    let choseValue = event.target.getAttribute("value");
    ResultData(choseValue);
  };

  const ResultData = (choseValue) => {
    let allValue = ["rock", "paper", "scissors"];
    let resultValue = Math.floor(Math.random() * 3);

    let resultImg = "";
    if (allValue[resultValue] == "rock") {
      resultImg = rock;
    } else if (allValue[resultValue] == "paper") {
      resultImg = newPaper;
    } else {
      resultImg = scissors;
    }

    setResult({
      choseValue: choseValue,
      resultValue: allValue[resultValue],
      resultImg: resultImg,
    });

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setPlayGame(false);
      setComPlayGame(false);
      setResultGame(true);

      // resultOutput
      resultOutput(choseValue,allValue[resultValue]);
    }, 5000);

    
  };

  const tryAgainBtnHandler = (event) => {
    if (selectGameType == "user-vs-com") {
      setResultGame(false);
      setSelectGame(false);
      setComPlayGame(false);
      setPlayGame(true);
    } else {
      setResultGame(false);
      setSelectGame(false);
      setPlayGame(false);
      setComPlayGame(true);

      comVsComBtnHandler();
    }
  };

  const changeModeBtnHandler = (event) => {
    setResultGame(false);
    setComPlayGame(false);
    setPlayGame(false);
    setSelectGame(true);
  };

  const resultOutput = (player,computer) => {
    let result;
    
      let playerText = "Player Win";
      let computerText = "Computer Win";

      if(  selectGameType == 'com-vs-com'){
        playerText = "Computer 1 Win";
        computerText = "Computer 2 Win";
      }




    if (player === computer) {
      result = {
        player: 0,
        computer: 0,
        message: "Tie",
      };
    } else if (player == "rock") {
      if (computer == "paper") {
        result = {
          player: 0,
          computer: 1,
          message: computerText,
        };
      } else {
        result = {
          player: 1,
          computer: 0,
          message: playerText,
        };
      }
    } else if (player == "scissors") {
      if (computer == "rock") {
        result = {
          player: 0,
          computer: 1,
          message: computerText,
        };
      } else {
        result = {
          player: 1,
          computer: 0,
          message: playerText,
        };
      }
    } else if (player == "paper") {
      if (computer == "scissors") {
        result = {
          player: 0,
          computer: 1,
          message: computerText,
        };
      } else {
        result = {
          player: 1,
          computer: 0,
          message: playerText,
        };
      }
    }

    console.log('resultOutput',result);

    // setFinalResult
    setFinalResult(result);
  };

  return (
    <div className="game-play-container">
      {selectGame && (
        <div className="game-select-container">
          <h3 className="game-select-text">Select Play Mode</h3>
          <div className="button-content">
            <div className="first-button mt-2">
              <Button
                color="warning"
                onClick={(event) => selectBtnHandler(event)}
              >
                Player VS Computer
              </Button>
            </div>
            <div className="second-button mt-3">
              <Button color="warning" onClick={(event) => comVsComBtnHandler()}>
                Computer VS Computer
              </Button>
            </div>
          </div>
        </div>
      )}
      {playGame && (
        <div className="play-game-content">
          <div className="play-game-body">
            <div className="game_score">
              <span>
                <img
                  className="timer"
                  src={loading ? timerGif : timerImg}
                  alt="newPaper"
                  width="100"
                  height="60"
                ></img>
                <p className="timer-text">Timer</p>
              </span>
            </div>
            <div className="player-content">
              <div className="first-player mt-2">
                <strong>Computer</strong>
              </div>
              <div className="hr-line">
                <hr className="sm" />
              </div>
              <div className="second-player mt-2">
                <strong>Player</strong>
              </div>
            </div>
            <div className="choose-move">
              <p>Choose your move</p>
            </div>
            <div className="playGame-icon-group">
              <img
                value="rock"
                onClick={(event) => palyBtnHandler(event)}
                src={rock}
                alt="rock"
                width="100"
                height="50"
              ></img>
              <img
                value="paper"
                onClick={(event) => palyBtnHandler(event)}
                src={paper}
                alt="paper"
                width="100"
                height="50"
              ></img>
              <img
                value="scissors"
                onClick={(event) => palyBtnHandler(event)}
                src={scissors}
                alt="scissors"
                width="100"
                height="50"
              ></img>
            </div>
          </div>
        </div>
      )}

      {comPlayGame && (
        <div className="play-game-content">
          <div className="play-game-body">
            <div className="game_score">
              <span>
                <img
                  className="timer"
                  src={loading ? timerGif : timerImg}
                  alt="newPaper"
                  width="100"
                  height="60"
                ></img>
                <p className="timer-text">Timer</p>
              </span>
            </div>
            <div className="player-content">
              <div className="first-player mt-2">
                <strong>Computer 2</strong>
              </div>
              <div className="hr-line">
                <hr className="sm" />
              </div>
              <div className="second-player mt-2">
                <strong>Computer 1</strong>
              </div>
            </div>
            <div className="choose-move">
              <p>Choose your move</p>
            </div>
            <div className="icon-group">
              <img
                src={rock}
                className={comValue == "rock" ? "active" : "disable"}
                alt="rock"
                width="100"
                height="50"
              ></img>
              <img
                src={paper}
                className={comValue == "paper" ? "active" : "disable"}
                alt="paper"
                width="100"
                height="50"
              ></img>
              <img
                src={scissors}
                className={comValue == "scissors" ? "active" : "disable"}
                alt="scissors"
                width="100"
                height="50"
              ></img>
            </div>
          </div>
        </div>
      )}

      {resultGame && (
        <div className="result-content">
          <img
            className="paper-icon"
            src={result.resultImg}
            alt="newPaper"
            width="100"
            height="60"
          ></img>
          <div className="result-close-text" >
            <h1>
              {finalResult.message}
            </h1>
            <div className="result-close-text" >
              <table border={1} >
                <tr>
                  <th>Candidate</th>
                  <th>Score</th>
                </tr>
                <tr>
                  <th>{ ( selectGameType == 'com-vs-com') ? "Computer 1" : "Player" }</th>
                  <th>{finalResult.player}</th>
                </tr>
                <tr>
                  <th>{ ( selectGameType == 'com-vs-com') ? "Computer 2" : "Computer" }</th>
                  <th>{finalResult.computer}</th>
                </tr>
              </table>
            </div>

          </div>
          <div className="result-button-content">
            <div className="game-play-button mt-2">
              <button
                type="button"
                onClick={(event) => {
                  tryAgainBtnHandler(event);
                }}
                class="btn btn-warning"
              >
                Play Again!
              </button>
              <button
                type="button"
                onClick={(event) => {
                  changeModeBtnHandler(event);
                }}
                class="btn btn-warning"
              >
                Change Mode
              </button>
            </div>
          </div>
          <div className="icon-group">
            <img
              src={rock}
              className={result.choseValue == "rock" ? "active" : "disable"}
              alt="rock"
              width="100"
              height="50"
            ></img>
            <img
              src={paper}
              className={result.choseValue == "paper" ? "active" : "disable"}
              alt="paper"
              width="100"
              height="50"
            ></img>
            <img
              src={scissors}
              className={result.choseValue == "scissors" ? "active" : "disable"}
              alt="scissors"
              width="100"
              height="50"
            ></img>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
