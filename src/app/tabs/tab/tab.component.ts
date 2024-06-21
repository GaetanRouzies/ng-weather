import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html'
})
export class TabComponent {
    @Input({required: true})
    title: string;

    @Output()
    onClose = new EventEmitter();

    active = false;
}
