import React from 'react';

export interface LayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    return <div>{children}</div>;
};

export const DefaultLayout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    return <div>{children}</div>;
};
