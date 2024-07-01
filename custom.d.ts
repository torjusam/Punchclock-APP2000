/*
    This file is used to declare the types of files that are not typescript files, but are used in the project.
    We use this in the project to declare the types of svg files.
    Code is from the next.js documentation.
*/
declare module "*.svg" {
    import * as React from 'react';
    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}