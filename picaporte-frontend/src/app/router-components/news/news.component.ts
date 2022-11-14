import { Component, Input, OnInit } from '@angular/core';
import { CKEditorModule } from 'ckeditor4-angular';
import { NewsService } from 'src/app/api-service/news/news.service';
import { News } from 'src/app/models/news.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  isDataFetched: boolean = false;

  isOnListView: boolean = true;

  news: Array<News>;
  onlineNews: Array<News>;
  selectedNews: News;
  selectedNewsIndex: number = -1;

  public model = {
    editorData: '<p>Hello, world!</p>'
  };

  constructor(private newsService: NewsService) {
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
    this.newsService.Get_News().subscribe((data: {}) => {
      this.news = <News[]>data;
      this.onlineNews = this.news.filter(prop => prop.isOnline);
      this.isDataFetched = true;
    });
  }

  private post_news() {
    this.newsService.Post_News(this.selectedNews).subscribe(() => {
      this.get_news();
    });
  }

  private put_news() {
    this.newsService.Put_News(this.selectedNews.id, this.selectedNews).subscribe(() => {
      this.get_news();
    });
  }

  private delete_news() {
    this.newsService.Delete_News(this.selectedNews.id).subscribe(() => {
      this.get_news();
    });
  }
}
