import { Component } from '@angular/core';
import { IContent } from '../models/content';
import { PROFESSIONALS_CONTENT } from '../../assets/contents/professionals';

@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.scss']
})
export class ProfessionalsComponent {
  public content: IContent = PROFESSIONALS_CONTENT;
}
