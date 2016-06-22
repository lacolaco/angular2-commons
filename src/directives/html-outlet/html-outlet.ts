import {
    ComponentMetadata,
    ComponentResolver,
    Directive,
    Input,
    ReflectiveInjector,
    ViewContainerRef,
} from '@angular/core';

import { htmlOutletConfig } from './provider';
import { createDynamicComponent } from '../../utils/dynamic-component-factory';

@Directive({
    selector: 'cm-html-outlet,[cmHtmlOutlet]',
})
export class CmHtmlOutlet {
    
    private _src: string = '';

    @Input() set src(value: string) {
        this._src = value;
    }

    @Input() set cmHtmlOutlet(value: string) {
        this._src = value;
    }
    
    @Input() global: boolean = false;
    
    constructor(private cmpResolver: ComponentResolver, private vcRef: ViewContainerRef) {
    }

    ngOnChanges() {
        this.updateView();
    }

    private updateView() {
        if (!this._src) {
            return;
        }
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
        const metadata = injector.get(htmlOutletConfig) as ComponentMetadata;
        metadata.template = this._src;
        createDynamicComponent(this.cmpResolver, metadata, {}).then(factory => {
            this.vcRef.createComponent(factory, 0, injector, []);
        }).catch(error => {
            console.error(error);
        });
    }
}