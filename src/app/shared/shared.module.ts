import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';
import { ScrollNearEndDirective } from './directives/scroll-near-end.directive';
import { LazyImgDirective } from './directives/lazy-img.directive';

@NgModule({
  declarations: [
    LazyImageComponent,
    LazyImgDirective,
    ScrollNearEndDirective,
    SidebarComponent,
  ],
  imports: [CommonModule],
  exports: [
    LazyImageComponent,
    LazyImgDirective,
    ScrollNearEndDirective,
    SidebarComponent,
  ],
})
export class SharedModule {}
