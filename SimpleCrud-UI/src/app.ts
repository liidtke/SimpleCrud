import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import * as jQuery from 'jquery';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Simple Crud';
    config.map([

      { route: ['', 'home'], moduleId: PLATFORM.moduleName('./home/home-page'), name: 'home', title: 'Home' },
      { route: ['/people', 'people'], moduleId: PLATFORM.moduleName('./pages/people-list'), name: 'people', title: 'People' }
      
    ]);
  }


}
