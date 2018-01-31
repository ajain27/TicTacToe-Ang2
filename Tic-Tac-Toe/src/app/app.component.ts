import { Component } from '@angular/core';
import { PlayerService } from './player.service';
import { BlockService } from './block.service';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GameService]
})
export class AppComponent {
  lock = false;

  constructor(public gameService: GameService) {	}
		
	newGame() {
		this.gameService.freeBlocksRemaining = 9;
		this.gameService.initBlocks();
		this.lock = false;
		this.gameService.turn = 0;
	}

	resetGame(event) {
		location.reload();
		event.preventDefault();
	}
		playerClick(i) {
		if( this.gameService.blocks[i].free == false || this.lock == true ) { // If Block is already fill, don't Do anything
			return;
		}

		this.gameService.freeBlocksRemaining -= 1; // Reduce no. of free blocks after each selection
		if( this.gameService.freeBlocksRemaining <= 0 ) {

			this.gameService.draw += 1;
			this.lock = true;
			// this.snackBar.open("Game:", "Draw", {
		 //      duration: 4000,
		 //    });
			this.newGame();
			return;
		}


		this.gameService.blocks[i].free = false;

		if( this.gameService.turn == 0 ) { // Player1 Turn
			this.gameService.blocks[i].setValue("tick");
		
		} else { // Bot Turn
			this.gameService.blocks[i].setValue("cross");	
		}

		var complete = this.gameService.blockSetComplete();

		if( complete == false ) {
			this.changeTurn();	
			return;
			
		} else {
			this.lock = true;
			this.gameService.players[this.gameService.turn].score += 1;
			// this.snackBar.open("Winner:", "Player "+ (this.gameService.turn +1), {
		 //      duration: 4000,
		 //    });

		    this.newGame();
		    return;
		}
		
	}
		changeTurn() {
		var player = this.gameService.changeTurn();

		if( player == 1 ) { // Bot Turn
			this.botTurn();
		
		}
	}
	botTurn() {

		if( this.gameService.freeBlocksRemaining <= 0 ) {
			return;
		}

		var bot_selected = this.gameService.figureBotMove()-1;
		
		if( this.gameService.blocks[bot_selected].free == true ) {
			this.playerClick(bot_selected);	
		} else {
			this.botTurn();
			return;
		}

	}

}
