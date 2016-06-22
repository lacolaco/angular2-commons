import {
    describe,
    expect,
    it,
    inject,
    async,
    beforeEach,
    beforeEachProviders
} from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CmHtmlOutlet } from './html-outlet';
import { provideHtmlOutlet } from './provider';

@Component({
    selector: 'test',
    template: ``,
    directives: [CmHtmlOutlet]
})
class TestComponent {
    src = '';
}

function compile(fixture: ComponentFixture<TestComponent>, html: string): Promise<{}> {
    return new Promise(resolve => {
        fixture.componentRef.instance.src = html;
        fixture.detectChanges();
        setTimeout(() => {
            fixture.detectChanges();
            resolve();
        }, 0);
    });
}

describe('CmHtmlOutlet', () => {

    let tcb: TestComponentBuilder;
    
    beforeEachProviders(() => [
        provideHtmlOutlet()
    ]);

    beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
        tcb = _tcb;
    }));

    it('cm-html-outlet', async(() => {
        tcb.overrideTemplate(TestComponent, `<cm-html-outlet [src]="src"></cm-html-outlet>`)
        .createAsync(TestComponent).then(fixture => {
            compile(fixture, '<h1>heading1</h1>').then(() => {
                console.info(fixture.debugElement.nativeElement);
                const rendered = fixture.debugElement.query(By.css('cm-html'));
                expect(rendered.nativeElement.innerHTML).toBe('<h1>heading1</h1>');
            });
        })
    }));

    it('cmHtmlOutlet', async(() => {
        tcb.overrideTemplate(TestComponent, `<div [cmHtmlOutlet]="src"></div>`)
        .createAsync(TestComponent).then(fixture => {
            compile(fixture, '<h1>heading1</h1>').then(() => {
                console.info(fixture.debugElement.nativeElement);
                const rendered = fixture.debugElement.query(By.css('cm-html'));
                expect(rendered.nativeElement.innerHTML).toBe('<h1>heading1</h1>');
            });
        })
    }));
});