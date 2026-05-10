import { Component, OnInit, signal } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-hello',
  imports: [],
  templateUrl: './hello.html',
  styleUrl: './hello.css',
})
export class Hello implements OnInit {
  helloMessage = signal<string>("Server did not respond.");

  constructor(private homeService: HomeService) { }


  ngOnInit(): void {
    this.homeService.hello().subscribe((hello) => {
      console.log(hello);
      this.helloMessage.set(hello);
    });
  }
}
