import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { District } from "@core/domain-classes/district";
import { BaseComponent } from "src/app/base.component";
import { ManageDistrictComponent } from "../manage-district/manage-district.component";
import { CommonDialogService } from "@core/common-dialog/common-dialog.service";
import { TranslationService } from "@core/services/translation.service";
import { LocationsResourceParameter } from "@core/domain-classes/masters/locations-resource-parameter";
import { DistrictDataSource } from "../district-datasource";
import { MatPaginator } from "@angular/material/paginator";
import { DistrictService } from "../district.service";
import { ResponseHeader } from "@core/domain-classes/response-header";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-district-list-presentation",
  templateUrl: "./district-list-presentation.component.html",
  styleUrls: ["./district-list-presentation.component.scss"],
})
export class DistrictListPresentationComponent
  extends BaseComponent
  implements OnInit
{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: DistrictDataSource;
  districtResource: LocationsResourceParameter;
  @Output() deleteDistrictHandler: EventEmitter<string> =
    new EventEmitter<string>();
  constructor(
    private dialog: MatDialog,
    private commonDialogService: CommonDialogService,
    public translationService: TranslationService,
    private districtService: DistrictService
  ) {
    super();
    this.districtResource = new LocationsResourceParameter();
    this.districtResource.pageSize = 10;
  }
  displayedColumns: string[] = [
    "Country",
    "State",
    "nameEnglish",
    "Status",
    "Action",
    // 'nameSecondLanguage',
  ];
  footerToDisplayed: string[] = ["footer"];

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.dataSource = new DistrictDataSource(this.districtService);
    this.dataSource.loadData(this.districtResource);
    this.getResourceParameter();
  }

  ngAfterViewInit() {
    this.paginator.pageIndex = 0;
    this.sub$.sink = this.paginator.page
      .pipe(
        tap((c: any) => {
          this.districtResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.districtResource.pageSize = this.paginator.pageSize;
          this.dataSource.loadData(this.districtResource);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.districtResource.pageSize = c.pageSize;
          this.districtResource.skip = c.skip;
          this.districtResource.totalCount = c.totalCount;
        }
      }
    );
  }
  manageDistrict(district: District) {
    this.dialog
      .open(ManageDistrictComponent, {
        width: "450px",
        data: Object.assign({}, district),
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (!res) return;
        this.loadData();
      });
  }

  deleteDistrict(district: District): void {
    const areU = this.translationService.getValue(
      "COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE"
    );
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(
        `${areU} :: ${
          this.translationService.getSelectedLanguage() == "en"
            ? district.nameEnglish
            : district.nameSecondLanguage
        }`
      )
      .subscribe((isTrue) => {
        if (isTrue) {
          this.deleteDistrictHandler.emit(district.districtUUID);
        }
      });
  }
}
