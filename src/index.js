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
import { addForm,deletedItem,editItem} from './pages/addTable';
// import './pages/addTable';


sidebar()
addForm()
deletedItem()
editItem()
if (module.hot) {
    module.hot.accept();
 }