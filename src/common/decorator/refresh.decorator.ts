import { SetMetadata } from '@nestjs/common';

export const IS_REFRESH_KEY = 'isRefresh';
export const Refresh = () => SetMetadata(IS_REFRESH_KEY, true);
