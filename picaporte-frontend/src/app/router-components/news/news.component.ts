import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CKEditorModule } from 'ckeditor4-angular';
import { catchError } from 'rxjs';
import { NewsService } from 'src/app/api-service/news/news.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { Image } from 'src/app/models/image.model';
import { News } from 'src/app/models/news.model';
import { NewsValidationObject, ValidationService } from 'src/app/services/validation-service/validation.service';
import { apiEndpoints, environment } from 'src/environments/environment';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  url: string = environment.apiUrl + apiEndpoints.image.binary
  
  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  
  isDataFetched: boolean = false;

  isOnListView: boolean = true;

  news: Array<News>;
  onlineNews: Array<News>;
  selectedNews: News;
  selectedNewsIndex: number = -1;
  newsValidationObject: NewsValidationObject = new NewsValidationObject();

  public model = {
    editorData: '<p>Hello, world!</p>'
  };

  constructor(
    private newsService: NewsService,
    private authenticationService: AuthenticationService,
    private validationService: ValidationService
  ) {
    this.news = new Array<News>();
    this.onlineNews = new Array<News>();
    this.selectedNews = new News();
  }

  onFocus_file() {
    this.newsValidationObject.isFileValid.isValid = true;
  }

  onFocus_title() {
    this.newsValidationObject.isTitleValid.isValid = true;
  }

  onFocus_content() {
    this.newsValidationObject.isContentValid.isValid = true;
  }

  onChange_file(event: any) {
    var file = event.target.files[0];
    this.getBase64(file, event, this.selectedNews.image);
  }

  private getBase64(file: any, event: any, imageStructure: Image) {
    var reader = new FileReader();
    reader.onload = function () {
      event.target.files[0].binary = (reader.result);
      imageStructure.content = event.target.files[0].binary;
      imageStructure.filename = event.target.files[0].name;
    };
    reader.readAsDataURL(file);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  onClick_addNew() {
    this.selectedNews = new News();
    this.selectedNewsIndex = -1;
    this.isOnListView = false;
  }

  onClick_edit(index: number) {
    this.selectedNews = this.news[index];
    this.selectedNewsIndex = index;
    this.isOnListView = false;
  }

  onClick_editOnline(index: number) {
    this.selectedNews = this.onlineNews[index];
    this.selectedNewsIndex = index;
    this.isOnListView = false;
  }

  onClick_selectedNewsOnline(isOnline: boolean) {
    this.selectedNews.isOnline = isOnline;
  }

  onClick_close() {
    this.isOnListView = true;
  }

  onClick_submit() {
    this.newsValidationObject = new NewsValidationObject();
    this.newsValidationObject = this.validationService.validateNews(this.selectedNews.image.content, this.selectedNews.title, this.selectedNews.content);
    if (this.newsValidationObject.isValid) {
      this.isDataFetched = false;
      this.isOnListView = true;
      if(this.selectedNews.id == 0) {
        this.post_news();
      } else {
        this.put_news();
      }
    }
  }

  onClick_confirmDelete() {
    this.isDataFetched = false;
    this.isOnListView = true;
    this.delete_news();
  }

  ngOnInit(): void {
    this.get_news();
  }

  private get_news() {
    this.isDataFetched = false;
    this.isOnListView = true;
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.newsService.Get_News(resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        var tempNews = <News[]>data;
        this.news = tempNews.filter(prop => prop.isOnline == false);
        this.onlineNews = tempNews.filter(prop => prop.isOnline == true);
        this.isDataFetched = true;
      });
    });
  }

  private post_news() {
    this.authenticationService.authorizeUser().then((resolve:any) => { 
      this.newsService.Post_News(this.selectedNews, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(() => {
        this.get_news();
      });
    });
  }

  private put_news() {
    this.authenticationService.authorizeUser().then((resolve:any) => { 
      this.newsService.Put_News(this.selectedNews.id, this.selectedNews, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(() => {
        this.get_news();
      });
    });
  }

  private delete_news() {
    this.authenticationService.authorizeUser().then((resolve:any) => { 
      this.newsService.Delete_News(this.selectedNews.id, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(() => {
        this.get_news();
      });
    });
  }
}
