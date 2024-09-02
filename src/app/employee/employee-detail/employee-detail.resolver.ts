import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Employee } from "@core/domain-classes/employee";
import { Observable, of } from "rxjs";
import { mergeMap, take } from "rxjs/operators";
import { EmployeeService } from "../employee.service";

@Injectable()
export class EmployeeDetailResolverServices implements Resolve<Employee>{
    /**
     *
     */
    constructor(private employeeServices: EmployeeService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee> | null {
        const id = route.paramMap.get('id');
        if (id === 'addItem') {
            return null;
        }
        return this.employeeServices.getEmployee(id).pipe(
            take(1),
            mergeMap(employee => {
                if (employee) {
                    return of(employee);
                }
                else
                    this.router.navigate(['/employee']);
                return null;
            })
        )
    }
}