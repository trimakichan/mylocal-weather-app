import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms'
import {debounceTime} from 'rxjs/operators'

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {
 search = new FormControl('', [Validators.minLength(3)]);

 @Output () searchEvent =  new EventEmitter<string | any>()

  ngOnInit(): void {
    this.search.valueChanges
    .pipe(debounceTime(1000))
    .subscribe(searchValue => {
      if(!this.search.invalid){
        console.log(searchValue)
        this.searchEvent.emit(searchValue)
      }
    })
  
}

}
