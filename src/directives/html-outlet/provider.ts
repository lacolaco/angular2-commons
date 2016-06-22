import { ComponentMetadata, OpaqueToken } from '@angular/core';

export const htmlOutletConfig = new OpaqueToken('htmlOutletConfig');

export function provideHtmlOutlet(config?: ComponentMetadata): any[] {
    config = config || {} as ComponentMetadata;
    return [
        {
            provide: htmlOutletConfig,
            useValue: <ComponentMetadata>{
                selector: config.selector || 'cm-html',
                directives: config.directives || [],
                styles: config.styles || [],
                styleUrls: config.styleUrls || [],
                changeDetection: config.changeDetection || null,
                encapsulation: config.encapsulation || null,
            }
        }
    ]
}