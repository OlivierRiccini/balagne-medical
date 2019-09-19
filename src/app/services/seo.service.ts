import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta) { }

  public addMetaTags() {
    this.meta.addTags([
      {
        name: 'description',
        content: `Spécialiste de la location et de la vente de matériel médical:
        particuliers, professionnels de santé, collectivités, hôpitaux, unités de soins, EPHAD.`
      },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'Olivier Riccini' },
      {
        name: 'keywords',
        content: `location, vente, matériel medical, location de matériel medical, vente de matériel medical,
        corse, calvi, calenzana, île rousse, balagne, magasin matériel médical,
        paramédical, lit medical, fauteuil roulant, confort et bien être, santé,
        orthopédie, nutrition, désinfection et protection, pharmacie, matériels professionnel de santé`
      },
      { httpEquiv: 'Content-Type', content: 'text/html'},
      { property: 'og:title', content:  'Balagne Médical Service' },
      { charset: 'UTF-8'}
   ]);
  }

}
