import { Component, OnInit , Input} from '@angular/core';


@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.scss']
})
export class NoAccessComponent implements OnInit {
  @Input() status: string
  constructor() { }

  ngOnInit(): void {
  }

}
