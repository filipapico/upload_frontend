import {Component} from '@angular/core';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {CardModule, CollapseModule} from "@coreui/angular";

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss']
})

export class CollapseComponent {
  faBars = faBars;
  visible = false;

  toggleCollapse(): void {
    this.visible = !this.visible;
    console.log("this visible",this.visible)
  }
}
