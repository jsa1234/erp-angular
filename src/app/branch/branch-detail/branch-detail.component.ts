import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBranch } from '@core/domain-classes/branch';
import { BranchType, BranchTypeArray, BranchTypeMapping } from '@core/domain-classes/enums/branch-type.enum';
import { environment } from '@environments/environment';
import { Observable, of} from 'rxjs';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-branch-detail',
  templateUrl: './branch-detail.component.html',
  styleUrls: ['./branch-detail.component.scss']
})
export class BranchDetailComponent extends BaseComponent implements OnInit {
  branch: IBranch;
  imagePath$: Observable<string> ;
  branchTypeList: BranchTypeMapping[] = BranchTypeArray;

  constructor(private route:ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.getSingleBranch()
  }
  getSingleBranch(): void {
    this.sub$.sink = this.route.data.subscribe(
      (data: { branchData:IBranch }) => {
        if (!data.branchData) {
          return;
        }
        this.branch = { ...data.branchData };
        this.imagePath$ = this.branch.logo? of(`${environment.apiUrl}${this.branch.logo}`) : of(environment.dummyImage)

      }
    );
  
  }

  getBranchTypeString(branchType:BranchType): string {
    if(branchType == null || branchType == undefined)return ''
    const branch= this.branchTypeList.find(item => item.key === branchType);
    return branch.valueEnglish || ''
  }
  
  
}
