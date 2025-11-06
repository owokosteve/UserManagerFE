import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.css'],
  standalone: false
})
export class GettingStartedComponent implements OnInit {
  markdownContent: SafeHtml = '';
  isLoading: boolean = true;
  error: string = '';

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loadReadmeContent();
  }

  private loadReadmeContent(): void {
    // For now, we'll load the README.md content directly
    // In a real implementation, you might want to use a markdown parser library
    this.http.get('/assets/README.md', { responseType: 'text' })
      .subscribe({
        next: (content) => {
          this.markdownContent = this.sanitizer.bypassSecurityTrustHtml(this.parseMarkdown(content));
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load README content';
          this.isLoading = false;
          console.error('Error loading README:', err);
        }
      });
  }

  private parseMarkdown(markdown: string): string {
    // Basic markdown to HTML conversion with basscss utility classes
    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="tcPrimaryText font-16 mb1 mt2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="tcBrand font-18 mb2 mt2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="tcBrand font-24 mb2 mt3">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-600">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      // Code blocks
      .replace(/```([\s\S]*?)```/gim, '<pre class="bcSecondary border br1 mx1 p1 my2"><code class="p0 m0">$1</code></pre>')
      // Inline code
      .replace(/`([^`]*)`/gim, '<code class="bcSecondary border br1 px1">$1</code>')
      // Links
      .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2" target="_blank" class="tcBrand underline">$1</a>')
      // Line breaks
      .replace(/\n/gim, '<br>');

    return html;
  }
}