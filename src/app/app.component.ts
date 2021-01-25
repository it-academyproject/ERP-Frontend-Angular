import { Component, OnInit } from '@angular/core';

//////////////////////////
// Bootstrap JS imports //
//////////////////////////

/* TODO:
1. Before production, review B5 JS imports you actually used.
   Comment out those not used, to reduce final production bundle.

2. plus, if you're completely sure, you're not using components
   which require "popper.js", you can comment them out
   and also uninstall popper from this project.
   Check package.json to be sure '@popperjs/core' was removed successfully

   npm uninstall @popperjs/core
*/

import 'bootstrap/js/dist/alert';
import 'bootstrap/js/dist/dropdown'; // @popperjs/core
import 'bootstrap/js/dist/collapse'; // ~navbar, ~transitions, ~accordion
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/toast';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/tooltip'; // @popperjs/core
import 'bootstrap/js/dist/popover'; // @popperjs/core
import 'bootstrap/js/dist/scrollspy'; // onepage or section
import 'bootstrap/js/dist/button'; // ~toggle buttons on/of state
import 'bootstrap/js/dist/tab'; // tabbable panes of local content

//////////////////////////////////////////
// Font Awesome Single Icon npm Library //
//////////////////////////////////////////

import { library, dom } from '@fortawesome/fontawesome-svg-core';
<<<<<<< HEAD
import {
  faBlind,
  faPalette,
  faSpinner,
  faUser,
} from '@fortawesome/free-solid-svg-icons'; // we only installed the solids
=======
import { faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons'; // we only installed the solids
>>>>>>> a996a412511a3ec644e14455d80b0ef5d450a9ec

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ITProject-ERP-Frontend';

  ngOnInit() {
    //  FONT AWESOME ICONS add plugin  //

    // We are only using the user-astronaut icon
<<<<<<< HEAD
    library.add(faBlind, faPalette, faSpinner, faUser);
=======
    library.add(faUserPlus, faSignInAlt);
>>>>>>> a996a412511a3ec644e14455d80b0ef5d450a9ec
    // Replace any existing <i> tags with <svg> and set up a MutationObserver to
    // continue doing this as the DOM changes.
    dom.watch();
  }
}
