import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  constructor() {}

  public stripeToken = 'stripeToken';
  public testEnv = 'testEnv';
}
