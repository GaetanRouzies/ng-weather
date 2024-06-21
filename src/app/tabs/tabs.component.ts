import {AfterContentChecked, Component, ContentChildren, QueryList} from '@angular/core';
import {TabComponent} from './tab/tab.component';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentChecked {
    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    selectTab(tab: TabComponent) {
        this.tabs.forEach(tab => tab.active = false);
        tab.active = true;
    }

    ngAfterContentChecked() {
        this.selectFirstTabIfNoActive();
    }

    selectFirstTabIfNoActive() {
        // If no tabs are active, select the first
        if (this.tabs.toArray().length > 0 && !this.tabs.toArray().some(tab => tab.active)) {
            setTimeout(() => {
                this.selectTab(this.tabs.toArray()[0]);
            });
        }
    }
}
