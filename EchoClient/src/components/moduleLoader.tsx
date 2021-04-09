import React from 'react';
import Loading from './loading';
interface EchoApp {
    setup: () => React.FC;
}

declare global {
    interface HTMLScriptElement {
        app?: EchoApp;
    }
}

export interface AvailableDependencies {
    [name: string]: any;
}
function requireModule(name: string, dependencies: AvailableDependencies) {
    const dependency = dependencies[name];

    if (!dependency) {
        const error = new Error(`Cannot find module '${name}'`);
        (error as any).code = 'MODULE_NOT_FOUND';
        throw error;
    }

    return dependency;
}

export const globalDependencies: AvailableDependencies = {
    react: require('react'),
    'react-dom': require('react-dom'),
    '@equinor/echo-core': require('@equinor/echo-core'),
    '@equinor/echo-framework': require('@equinor/echo-framework')
};

function checkAppAsync(app?: EchoApp | Promise<EchoApp>): Promise<EchoApp> {
    return Promise.resolve(app).then((resolvedApp) => checkApp(resolvedApp));
}

function getLocalRequire(dependencies: AvailableDependencies = {}) {
    return (moduleName: string) => requireModule(moduleName, dependencies);
}

function checkApp(app?: EchoApp): EchoApp {
    if (!app) {
        console.error('Invalid module found.', app);
    } else if (typeof app.setup !== 'function') {
        console.warn('Setup function is missing.');
    } else {
        return app;
    }

    return {
        setup() {
            return Default;
        }
    };
}

function loadApp(link: string, depName: string) {
    return new Promise<EchoApp | undefined>((resolve, reject) => {
        const s = document.createElement('script');
        s.async = true;
        s.src = link;

        s.crossOrigin = 'cross-origin';
        window[depName] = getLocalRequire(globalDependencies);
        s.onload = () => {
            const app = checkAppAsync(s.app);
            resolve(app);
        };
        s.onerror = () => reject('choud not load');
        document.head.appendChild(s);
    });
}

async function getApp(link: string) {
    return await loadApp(link, 'app');
}

const Default = () => {
    return <div>No module mounted</div>;
};

let Component = Loading;

getApp('/app-bundle.js').then((a) => {
    const data = a?.setup();
    if (data) {
        Component = data;
    }
});

function ModuleLoader() {
    return <Component />;
}

export default ModuleLoader;
