import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import {  ActivatedRoute } from '@angular/router';
import { IJournal, Journal } from '@core/domain-classes/journal';
import { IJournalDetail } from '@core/domain-classes/journal-details';
import { TranslationService } from '@core/services/translation.service';
import { ClonerService } from '@core/services/clone.service';
import { SecurityService } from '@core/security/security.service';
import { Company, ICompany } from '@core/domain-classes/company';


@Component({
  selector: 'app-journal-detail',
  templateUrl: './journal-detail.component.html',
  styleUrls: ['./journal-detail.component.scss']
})
export class JournalDetailComponent extends BaseComponent implements OnInit {
  journalDetail: IJournalDetail[] = []
  Ijournal: IJournal
  journalInvoice : IJournal
  journal: Journal;

  constructor(
    private route: ActivatedRoute,
    public translationService:TranslationService,
    private clonerService: ClonerService,

  ) {
    super();
      }

  ngOnInit(): void {
    this.loadData();
  }
  loadData():void{
    this.sub$.sink = this.route.data.subscribe((data:{journal:IJournal})=>{
      if(data.journal){
        this.Ijournal = {...data.journal}
        this.journal = new Journal(this.Ijournal)
        this.journalDetail = this.Ijournal.journalDetails

      }
    })
  }


  generateInvoice():void {
    this.journalInvoice = this.clonerService.deepClone<IJournal>(this.Ijournal);
  }

}
