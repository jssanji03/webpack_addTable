//import js套件
import 'jquery';
import "bootstrap";
import 'datatables.net';
import 'datatables.net-responsive-dt';

//import scss
import './scss/index.scss';

//import 共用 js
import './js/sidebar'
import { sidebar } from './js/menu';
import { addForm } from './pages/addTable';
import { addCart } from './js/component';


sidebar()
addForm()
if (module.hot) {
    module.hot.accept();
 }