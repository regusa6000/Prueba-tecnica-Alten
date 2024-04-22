import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../../interfaces/hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Spider-Man' },
      { id: 2, name: 'Iron Man' },
      { id: 3, name: 'Capitana Marvel' },
      { id: 4, name: 'Thor' },
      { id: 5, name: 'Hulk' },
      { id: 6, name: 'Black Widow' },
      { id: 7, name: 'Wolverine' },
      { id: 8, name: 'Capitán América' },
      { id: 9, name: 'Deadpool' },
      { id: 10, name: 'Doctor Strange' },
    ];
    return { heroes };
  }
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
