import { Injectable } from '@angular/core';
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/pro-regular-svg-icons';

export class FontawesomeIcon {
  prefix: string = "";
  iconName: string = "";
}

@Injectable({
  providedIn: 'root',
})
export class FontawesomeService {
  private icons: Array<FontawesomeIcon> = new Array<FontawesomeIcon>();

  constructor() {
    this.addIcons(far, 'far');
    //this.addIcons(fad, 'fad');
    //this.addIcons(fab, 'fab');
  }

  private addIcons(iconPack: any, prefix: string): void {
    for (const iconName in iconPack) {
      const icon = iconPack[iconName];
      this.icons.push({
        prefix: icon.prefix,
        iconName: icon.iconName
      });
      library.add(icon);
    }
  }

  getAllIcons(): Array<FontawesomeIcon> {
    console.log(this.icons);
    
    return this.icons;
  }
}