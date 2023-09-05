import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [DataService],
      imports: [
        HttpClientTestingModule,
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
  });

  /*
   * Pruebas
   * */
  it('Debe crear la app', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cambiar el valor de isLoading a true cuando se llame la funcion handlePromise', () => {
    component.isLoading = false;
    component.handlePromise();
    expect(component.isLoading).toBeTrue();
  });

  it('Debe obtener los entities y actualizar el arreglo de pokemones', () => {
    const mockData = {
      results: [
        {
          'name': 'metapod',
          'url': 'https://pokeapi.co/api/v2/pokemon/11/',
        },
        {
          'name': 'butterfree',
          'url': 'https://pokeapi.co/api/v2/pokemon/12/',
        },
        {
          'name': 'weedle',
          'url': 'https://pokeapi.co/api/v2/pokemon/13/',
        },
      ],
    };

    // Simula la respuesta de la llamada a getEntries del servicio
    spyOn(dataService, 'getEntries').and.returnValue(of(mockData));

    // Llama al método getEntities
    component.getEntities();

    // Comprueba que el servicio haya sido llamado
    expect(dataService.getEntries).toHaveBeenCalled();

    // Comprueba que el array entities se haya actualizado correctamente
    fixture.detectChanges(); // Detecta los cambios después de la suscripción
    expect(component.entities).toEqual(mockData.results);
  });

  it('Debe de llamar simulateRequest cuando se ejecuta handlePromise', fakeAsync(() => {
    spyOn(dataService, 'simulateRequest').and.returnValue(Promise.resolve('Success'));
    component.handlePromise();
    tick();
    expect(dataService.simulateRequest).toHaveBeenCalled();
  }));

  it('Debe establecer isLoading en false después de que handlePromise finalice con éxito', fakeAsync(() => {
    spyOn(dataService, 'simulateRequest').and.returnValue(Promise.resolve('Success'));

    component.handlePromise();
    tick();

    expect(component.isLoading).toBeFalse();
  }));
});
