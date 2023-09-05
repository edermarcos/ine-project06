import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, map, Subscription } from 'rxjs';

import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private minutes = 1;
  private interval = interval(this.minutes * 60 * 1000);

  subscription: Subscription | null = null;
  cont = 0;
  entities: IPokemon[] = [];
  isLoading = false;

  constructor(
    private dataService: DataService,
  ) {
    this.printTime();
    this.getEntities();

    this.subscription = this.interval.subscribe(() => {
      this.printTime();
      this.cont++;
      this.getEntities();
    });
  }

  ngOnInit(): void {
  }

  getEntities(): void {
    this.dataService.getEntries(this.cont)
      .pipe(
        map((res: any) => res.results),
      )
      .subscribe((data: any) => {
        this.entities = [
          ...this.entities,
          ...data,
        ];
      });
  }

  handlePromise(): void {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.dataService.simulateRequest()
      .then((mensaje) => {
        alert(mensaje);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  printTime(): void {
    const now = new Date();
    console.warn(`La hora actual es: ${now.toLocaleTimeString()}`);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

interface IPokemon {
  index?: number;
  name: string;
  url: string;
}
