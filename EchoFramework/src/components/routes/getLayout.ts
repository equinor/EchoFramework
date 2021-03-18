import { DefaultLayout, LayoutProps, MainLayout } from '../containers/MainLayout';

export function getLayout(layoutKey?: string): React.FC<LayoutProps> {
    switch (layoutKey) {
        case 'main':
            return MainLayout;
        case 'test':
            return MainLayout;
        default:
            return DefaultLayout;
    }
}
