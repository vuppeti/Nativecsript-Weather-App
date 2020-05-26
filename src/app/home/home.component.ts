import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

let serviceUrl: String = 'https://api.openweathermap.org/data/2.5/weather'
let apiKey: String = '2ccef5d4a466a7c18c5134e92a5cb01d' 


@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    model: any = {
        
    };
    city:String;

    constructor(private http: HttpClient) { }
    load(city) {
        return this.http.get(serviceUrl + '?q=' + city + '&APPID=' + apiKey)
       }
     
    getIconUrl(icon: String) {
        return 'http://openweathermap.org/img/w/' + icon + ".png"
      }
      onTap($event){
        this.load(this.city)
        .subscribe(data => {
            this.model.cityData = data['name']
            this.model.conditions = data['weather'][0]['main']
            this.model.temperature = Math.round((data['main']['temp'] - 273.15)) + '°C'
            this.model.icon = this.getIconUrl(data['weather'][0]['icon'])
            console.log(this.model.cityData)
        })
      }
    ngOnInit(): void {
        this.model.mytext = 'Lorem Ipsum ...';
        
    }
}
