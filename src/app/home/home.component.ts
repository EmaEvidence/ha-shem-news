import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Article, Error } from '../types';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  articles: Array<Article>;
  loading: boolean;
  author: string;
  source: string;
  publishedDate: string;
  newsType: string;
  filteredArticles: Array<Article>;
  getError: Error | null;

  constructor(private _http: HttpService) {
    this.articles = [];
    this.loading = true;
    this.author = '';
    this.source = '';
    this.publishedDate = '';
    this.newsType = 'techcrunch';
    this.filteredArticles = [];
    this.getError = null;
  }

  

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    this.loading = true;
    let query = 'everything?sources=techcrunch';
    if (this.newsType === 'us') {
      query = 'top-headlines?country=us';
    }
    if (this.newsType === 'bitcoin') {
      query = 'everything?q=bitcoin';
    }
    this._http.getNews(query).subscribe((data) => {
      this.articles = data.articles;
      this.filteredArticles = this.articles;
      this.loading = false;
    }, err => {
      this.loading = false;
      this.getError = err.error;
    });
  }

  filterNews(type: string, value: string): void {
    if (value) {
      if (type === 'author') {
        this.filteredArticles = this.articles.filter((article) => {
          return article.author.toLowerCase().match(value.toLowerCase());
        });
      } else if (type === 'publishedDate') {
        this.filteredArticles = this.articles.filter((article) => {
          return article.publishedAt.toLowerCase().match(value.toLowerCase());
        });
      } else if (type === 'source') {
        this.filteredArticles = this.articles.filter((article) => {
          return article.source.name.toLowerCase().match(value.toLowerCase());
        });
      }
    }
  }

  setNewsType(type: string): void {
    this.newsType = type;
    this.getNews();
  }

  isActive(type: string): boolean {
    return type === this.newsType;
  }

  closeErrorDisplay(): void {
    this.getError = null;
  }
}
