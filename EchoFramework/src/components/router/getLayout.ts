import { DefaultLayout, LayoutProps, MainLayout } from '../containers/layouts';

export function getLayout(layoutKey?: string): React.FC<LayoutProps> {
    switch (layoutKey) {
        case 'main':
            return MainLayout;
        case 'app':
            return MainLayout;
        default:
            return DefaultLayout;
    }
}
