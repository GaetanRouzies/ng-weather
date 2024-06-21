import {AfterContentInit, Component, ContentChildren, inject, QueryList, Signal} from '@angular/core';
import {TabComponent} from './tab/tab.component';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {
    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    ngAfterContentInit() {
        console.log('ngAfterContentInit', this.tabs);
        console.log('ngAfterContentInit', this.tabs.length);

        const activeTab = this.tabs.toArray().find(tab => tab.active) || this.tabs.toArray()[0];
        setTimeout(() => {
            this.selectTab(activeTab);
        })
    }

    selectTab(tab: TabComponent) {
        this.tabs.forEach(tab => tab.active = false);
        tab.active = true;
    }
}
