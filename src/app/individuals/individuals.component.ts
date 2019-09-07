import { Component } from '@angular/core';
import { IContent } from '../models/content';
import { INDIVIDUALS_CONTENT } from '../../assets/contents/individuals';

@Component({
  selector: 'app-individuals',
  templateUrl: './individuals.component.html',
  styleUrls: ['./individuals.component.scss']
})
export class IndividualsComponent {
  public content: IContent = INDIVIDUALS_CONTENT;
}
