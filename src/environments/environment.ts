// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //  apiUrl: 'https://devibmsapi.aspiromit.com/',
  // apiUrl: 'https://demoibmsapi.aspiromtech.com/',
  apiUrl: 'https://testibmsapi.aspiromit.com/',
  //  apiUrl: 'http://192.168.50.59/',
  // apiUrl: 'https://testolobillzapi.aspiromit.com/',
  // apiUrl: 'https://testolobillzapi.aspiromtech.com/',
  // apiUrl: 'https://chinnoosbakeryapi.olobillz.com/',
  allowFileExtension:['pdf','doc','docx','xls','xlsx'],
  allowExtesions: ['pdf', 'doc', 'docx'],
  maximumFileSize: 104857600,
  branchUUID:'0cfe8e86-b036-47f4-833e-fc2042f6c99d',
  deviceUUID:'3FA85F64-5717-4562-B3FC-2C963F66AFA6',
  dateFormat:'dd-MM-yyyy',
  financialYear:'april',
  pageSizeOptions:[10, 25,30, 50, 100],
  initialPageSize:10,
  weekStart:1,
  currency:'INR',
  dummyImage:'/assets/images/dummy.jpg',
  firebase:{
    apiKey: "AIzaSyAXT7qWjquc_SFkuQu48vQwdcsui9llXT8",
    authDomain: "testingnotification-1bad3.firebaseapp.com",
    projectId: "testingnotification-1bad3",
    storageBucket: "testingnotification-1bad3.appspot.com",
    messagingSenderId: "963432986155",
    appId: "1:963432986155:web:70076e9e4f8e28411c9c6e",
    measurementId: "G-WHFWE0PGJX",
    vpaidKey:"BPudnqHtnd-ErHRvNRazVU-mrp5tI2LVdSToxwF87qGUKJR42pvtsj7_r9Sm5cPxUqe_3pBiAW8f-aEEQUmLoYA"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.