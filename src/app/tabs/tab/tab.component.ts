import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.css']
})
export class TabComponent {
    @Input({required: true})
    title: string;

    @Input()
    active = false;

    @Output()
    onClose = new EventEmitter();
}
