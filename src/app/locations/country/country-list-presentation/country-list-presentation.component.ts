import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CommonDialogService } from "@core/common-dialog/common-dialog.service";
import { Country } from "@core/domain-classes/country";
import { TranslationService } from "@core/services/translation.service";
import { BaseComponent } from "src/app/base.component";
import { ManageCountryComponent } from "../manage-country/manage-country.component";
import { CountryDataSource } from "../country-datasource";
import { LocationsResourceParameter } from "@core/domain-classes/masters/locations-resource-parameter";
import { MatPaginator } from "@angular/material/paginator";
import { CountryService } from "../country.service";
import { tap } from "rxjs/operators";
import { ResponseHeader } from "@core/domain-classes/response-header";

@Component({
  selector: "app-country-list-presentation",
  templateUrl: "./country-list-presentation.component.html",
  styleUrls: ["./country-list-presentation.component.scss"],
})
export class CountryListPresentationComponent
  extends BaseComponent
  implements OnInit
{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: CountryDataSource;
  countryResource: LocationsResourceParameter;
  @Output() deleteCountryHandler: EventEmitter<string> =
    new EventEmitter<string>();
  displayedColumns: string[] = [
    "nameEnglish",
    "code",
    "status",
    "action",
    // 'nameSecondLanguage',
  ];
  footerToDisplayed: string[] = ["footer"];

  constructor(
    private dialog: MatDialog,
    private countryService: CountryService,
    private commonDialogService: CommonDialogService,
    public translationService: TranslationService
  ) {
    super();
    this.countryResource = new LocationsResourceParameter();
    this.countryResource.pageSize = 10;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataSource = new CountryDataSource(this.countryService);
    this.dataSource.loadData(this.countryResource);
    this.getResourceParameter();
  }

  ngAfterViewInit() {
    this.paginator.pageIndex = 0;
    this.sub$.sink = this.paginator.page
      .pipe(
        tap((c: any) => {
          this.countryResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.countryResource.pageSize = this.paginator.pageSize;
          this.dataSource.loadData(this.countryResource);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.countryResource.pageSize = c.pageSize;
          this.countryResource.skip = c.skip;
          this.countryResource.totalCount = c.totalCount;
        }
      }
    );
  }
  manageCountry(country: Country): void {
    this.dialog
      .open(ManageCountryComponent, {
        width: "450px",
        data: Object.assign({}, country),
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (!res) return;
        this.loadData();
      });
  }

  deleteUnit(country: Country): void {
    const areU = this.translationService.getValue(
      "COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE"
    );
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(
        `${areU} :: ${
          this.translationService.getSelectedLanguage() == "en"
            ? country.nameEnglish
            : country.nameSecondLanguage
        }`
      )
      .subscribe((isTrue) => {
        if (isTrue) {
          this.deleteCountryHandler.emit(country.countryUUID);
        }
      });
  }
}
