import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CKEditorModule } from 'ckeditor4-angular';
import { catchError } from 'rxjs';
import { NewsService } from 'src/app/api-service/news/news.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { News } from 'src/app/models/news.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  
  isDataFetched: boolean = false;

  isOnListView: boolean = true;

  news: Array<News>;
  onlineNews: Array<News>;
  selectedNews: News;
  selectedNewsIndex: number = -1;

  public model = {
    editorData: '<p>Hello, world!</p>'
  };

  constructor(
    private newsService: NewsService,
    private authenticationService: AuthenticationService
  ) {
    this.news = new Array<News>();
    this.onlineNews = new Array<News>();
    this.selectedNews = new News();
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

  onClick_selectedNewsOnline(isOnline: boolean) {
    this.selectedNews.isOnline = isOnline;
  }

  onClick_close() {
    this.isOnListView = true;
  }

  onClick_submit() {
    if(this.selectedNews.id == 0 || this.selectedNews.id == null) {
      this.post_news();
    } else {
      this.put_news();
    }
  }

  onClick_confirmDelete() {
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
        this.news = <News[]>data;
        this.onlineNews = this.news.filter(prop => prop.isOnline);
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
