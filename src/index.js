//import js套件
import 'jquery';
import "bootstrap";
import 'datatables.net-dt';
import 'datatables.net-responsive-dt';

//import scss
import '@fortawesome/fontawesome-free/js/all'
import './scss/index.scss';

//import 共用 js
import './js/sidebar'
import { sidebar } from './js/menu';
import { addForm } from './pages/addTable';


sidebar()
addForm()
if (module.hot) {
    module.hot.accept();
 }