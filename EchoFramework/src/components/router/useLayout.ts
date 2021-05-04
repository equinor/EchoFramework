import { useCallback } from 'react';
import {
    CameraLayout,
    ColorLayout,
    DefaultLayout,
    LayoutProps,
    MainLayout,
    PdfViewerNative
} from '../containers/layouts';

const layouts = {
    main: MainLayout,
    app: MainLayout,
    camera: CameraLayout,
    nativePdf: PdfViewerNative,
    colorLayout: ColorLayout
};
export function useLayout(): (layoutKey?: string) => React.FC<LayoutProps> {
    const getLayout = useCallback((layoutKey?: string): React.FC<LayoutProps> => {
        const Layout: React.FC<LayoutProps> | undefined = layoutKey && layouts[`${layoutKey}`];
        if (Layout) {
            return Layout;
        }
        return DefaultLayout;
    }, []);

    return getLayout;
}
