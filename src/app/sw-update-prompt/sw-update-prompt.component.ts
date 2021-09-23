import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'sw-update-prompt',
  templateUrl: './sw-update-prompt.component.html',
  styleUrls: ['./sw-update-prompt.component.css']
})
export class SwUpdatePromptComponent implements OnInit {
  isVisible = false;

  constructor(private swUpdate: SwUpdate) {
  }

  ngOnInit(): void {
    this.swUpdate.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);

      this.isVisible = true;
      //update silently -> just for demo purposes, it's better to show a popup before
      //doing this to check activated observable below
      // this.swUpdate.activateUpdate().then(() => {
      //   console.log('did updates!!');
      // });
    });
    // this.swUpdate.activated.subscribe(event => {
    //   console.log('old version was', event.previous);
    //   console.log('new version is', event.current);
    // });
  }

  updateSw() {
    this.swUpdate.activateUpdate().then(() => {
      this.isVisible = false;
      window.location.reload();
    });
  }
}
