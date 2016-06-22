import { Component, ComponentResolver, ComponentMetadata, ComponentFactory, Type } from '@angular/core';

export function createDynamicComponent(resolver: ComponentResolver, metadata: ComponentMetadata, context: any = {}): Promise<ComponentFactory<any>> {
    const cmpClass = class dynamicComponent {
        constructor() {
            if ('dynamicOnInit' in this) {
                (this as any)['dynamicOnInit'](this);
            }
        }
    };
    (cmpClass.prototype as any)['dynamicOnInit'] = (self: any) => {
        Object.keys(context).forEach(key => {
            self[key] = context[key];
        });
    };
    const decoratedCmp = Component(metadata)(cmpClass);
    return resolver.resolveComponent(decoratedCmp as Type);
}