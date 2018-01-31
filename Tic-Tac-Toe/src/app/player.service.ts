import { Injectable } from '@angular/core';

@Injectable()
export class PlayerService {

  constructor() { }
  bot: boolean = true;
	score: number = 0;

	updateScore(total: number) {
		this.score += total;
		return this.score;
	}

}
