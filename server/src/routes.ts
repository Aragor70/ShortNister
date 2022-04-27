import { Routes } from 'nest-router';
import { AuthModule } from './auth/auth.module';
import { UrlModule } from './url/url.module';

export const routes: Routes = [
  {
    path: '/api',
    module: UrlModule,
  },
  {
    path: '/api',
    module: AuthModule,
  },
];