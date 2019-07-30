import { Engine } from './engine';
import { Color } from './color';
import { Wheels } from './wheels';

export interface Customization {
    price: number;
    engine: Engine;
    color: Color;
    wheels: Wheels;
}
