import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // Declaración de variables iniciales
  public board: any= []
  BoardSize: number = 9;
  activePlayer: String = 'X';
  turnCount: number = 0;
  isGameRunning: boolean = false;
  isGameOver: boolean = false;
  winner: boolean = false

  constructor() {
    // Se llama a la función newGame() para iniciar un nuevo juego
    this.newGame();
  }

  // Inicia un nuevo juego
  newGame() {
    this.activePlayer = 'X';
    this.turnCount = 0;
    this.isGameRunning = false;
    this.isGameOver = false;
    this.winner = false;

    // Crea un nuevo tablero vacío
    this.board = this.createBoard()
  }

  // Crea un tablero vacío
  createBoard() {
    let board = [];
    for(let i = 0; i < 9; i++) {
      board.push({id: i, state: null})
    }
    return board
  }

  // Devuelve el tablero actual
  get getBoard(){
    return this.board
  }

  // Actualiza el tablero actual
  set setBoard(board: any) {
    this.board = [...board]
  }

  // Cambia el turno de jugador
  changePlayerTurn(squareClicked: any){
    this.updateBoard(squareClicked)
    if(!this.isGameOver) this.activePlayer = this.activePlayer === "X" ? "O" : "X"
    this.turnCount++;
    this.isGameOver = this.isGameOver ? true : false;
  }

  // Actualiza el estado del tablero en función del cuadrado que se ha hecho clic
  updateBoard(squareClicked: any) {
    this.board[squareClicked.id].state = squareClicked.state;
    if(this.isWinner) {
      this.winner = true;
      this.isGameOver = false;
      this.isGameOver = true
    }
  }

  // Devuelve verdadero si el juego ha terminado (8 turnos han pasado o hay un ganador)
  get gameOver():boolean {
   return this.turnCount > 8 || this.winner ? true : false;
  }

  // Devuelve verdadero si hay un ganador (diagonal, fila o columna)
  get isWinner():boolean {
    return this.checkDiag() || this.checkRows(this.board, "row") || this.checkRows(this.board, "col") ? true : false;
  }

  // Comprueba si hay una fila o columna ganadora
  checkRows(board: any, mode: any) {
    const
    ROW = mode === 'row' ? true : false,
    DIST = ROW ? 1: 3,
    INC = ROW ? 3 : 1,
    NUMTIMES = ROW ? 7 : 3;

    for(let i = 0; i < NUMTIMES; i+= INC) {
      let firstSquare = board[i].state,
      secondSquare = board[i + DIST].state,
      thirdSquare = board[i + (DIST * 2)].state;

      if(firstSquare && secondSquare && thirdSquare) {
        if(firstSquare === secondSquare && secondSquare === thirdSquare) return true;
      }
    }
    return false
  }

  // Comprueba si hay una diagonal ganadora
  checkDiag() {
    const timesRun = 2,
    midSquare = this.board[4].state;

    for(let i = 0; i <= timesRun; i += 2) {
      let
      upperCorner = this.board[i].state,
      lowerCorner = this.board[8 - i].state;

      if(midSquare && upperCorner &&  lowerCorner ) {
        if(midSquare === upperCorner && upperCorner === lowerCorner ) return true
      }
    }
    return false
  }

}
