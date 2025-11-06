import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';
import { environment } from './app/environments/environment';
import { enableRipple, registerLicense } from '@syncfusion/ej2-base';
import { enableProdMode } from '@angular/core';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NDaF5cWWtCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWH1ccHRRRWJfVE1zX0I=');
enableRipple(true);
if (environment.Production) {
  enableProdMode();
}

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
