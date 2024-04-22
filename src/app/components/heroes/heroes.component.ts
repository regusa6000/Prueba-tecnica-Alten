import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../services/hero.sevice';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormHeroComponent } from '../dialog-form-hero/form-hero.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { MatSort } from '@angular/material/sort';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass'],
})
export class HeroesComponent implements OnInit, AfterViewInit {
  heroes: Hero[] = [];
  heroesLength: number | undefined;
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataHeroe = new MatTableDataSource<Hero>();
  dataHeroeLength: any;
  showSpinner = false;

  public totalSize = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private heroService: HeroService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.showSpinner = true;
    this.heroService.getHeroes().subscribe({
      next: (heroe) => {
        this.dataHeroe = new MatTableDataSource<Hero>(heroe);
      },
      error: (err) => console.log(err),
      complete: () => (this.showSpinner = false),
    });
  }

  addHeroe(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe({
      next: (hero) => {
        this.heroes.push(hero);
        this.getHeroes();
      },
      error: (err) => console.log(err),
    });
  }

  deleteHeroe(hero: Hero): void {
    this.showSpinner = true;
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe({
      next: () => this.getHeroes(),
      error: (err) => console.log(err),
      complete: () => (this.showSpinner = false),
    });
  }

  ngAfterViewInit() {
    this.dataHeroe.paginator = this.paginator;
    this.dataHeroe.sort = this.sort;
  }

  openFormHeroDialog() {
    const dialogFormHero = this.dialog.open(FormHeroComponent);

    dialogFormHero.afterClosed().subscribe({
      next: (result) => {
        if (result && result.name) {
          this.addHeroe(result.name);
        }
      },
      error: (err) => console.log(err)
    });
  }

  openDeleteHeroDialog(hero: Hero) {
    const dialogDeleteHero = this.dialog.open(DialogDeleteComponent, {
      data: hero,
    });

    dialogDeleteHero.afterClosed().subscribe({
      next: (result) => {
        if (result == true) {
          this.deleteHeroe(hero);
        }
      },
      error: (err) => console.log(err)
    });
  }

  openFormHeroDetailDialog(heroDetail: Hero) {
    const dialogFormDetailHero = this.dialog.open(HeroDetailComponent, {
      data: heroDetail,
    });
    dialogFormDetailHero.afterClosed().subscribe({
      next: (result) => {
        if (result && result.id && result.name) {
          this.heroService.updateHero(result).subscribe({
            next: () => this.getHeroes(),
          });
        }
      },
      error: (err) => console.log(err)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataHeroe.filter = filterValue.trim().toLowerCase();

    if (this.dataHeroe.paginator) {
      this.dataHeroe.paginator.firstPage();
    }
  }
}
