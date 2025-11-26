import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/login/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { SharedServiceService } from "src/app/services/shared-service.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mainPage = '';
  isLoggedIn = false;
  username : string;
  role : string;

  message:string;
  subscription: Subscription;

  constructor(private data: SharedServiceService, private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService, public translate: TranslateService) { 
      translate.addLangs(['en', 'de', 'es']);
      translate.setDefaultLang('en');
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|de|es/) ? browserLang : 'en');

      this.username = this.authenticationService.username;
    }
  
    ngOnInit() {
      this.isLoggedIn = this.authenticationService.isUserLoggedIn();
      this.subscription = this.data.currentMessage.subscribe(message => this.message = message);
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  
    adminClick(){
      this.mainPage = 'Administrator';
      this.data.changeMessage("admin");
    }
  
    techClick(){
      this.mainPage = 'Technician';
      this.data.changeMessage("tech");
    }

    getRole(){
      this.role = this.authenticationService.getRole();
    }
    

  handleLogout() {
    this.authenticationService.logout();
  }
}
