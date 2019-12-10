import { Directive } from '@angular/core';
import { MapService  } from 'ngx-mapbox-gl';
import * as mapBoxGl from 'mapbox-gl';

@Directive({
  selector: '[appRtl]'
})
export class RtlDirective {

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapService.mapCreated$.subscribe(() => {
      console.log('test')
      mapBoxGl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.0/mapbox-gl-rtl-text.js', () => {});
    });
  }

}
