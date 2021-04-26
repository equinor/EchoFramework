import { DefaultLayout, LayoutProps, MainLayout } from '../containers/layouts';

const layouts = {
    main: MainLayout,
    app: MainLayout
};
export function useLayout(layoutKey?: string): React.FC<LayoutProps> {
    const Layout: React.FC<LayoutProps> | undefined = layoutKey && layouts[layoutKey];
    if (Layout) {
        return Layout;
    }

    return DefaultLayout;
}
