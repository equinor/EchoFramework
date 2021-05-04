import React from 'react';
import style from './layout.module.css';
export interface LayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    return (
        <div className={style.applicationWrapper}>
            <div className={style.mainLayoutWrapper}>{children}</div>
        </div>
    );
};

export const ColorLayout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    return <div className={style.colorLayout}>{children}</div>;
};

export const PdfViewerNative: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    return <div className={style.pdfViewerNative}>{children}</div>;
};

export const CameraLayout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    return <div style={{ backgroundColor: 'transparent' }}>{children}</div>;
};

export const DefaultLayout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    return <>{children}</>;
};
