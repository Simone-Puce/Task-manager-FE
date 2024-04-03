import { Board } from "../../model/Board";

export interface IBoardPageContent {
    board: Board
    isBoardSpinning: boolean
    reset: () =>  void
    seed: number
}