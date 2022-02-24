export const dataTableResponsive = () => {
    $('.datatable-RWD').DataTable(
        {
            responsive: true,
            searching: false,
            "paging": false,
            "ordering": false,
            "info": false,
            "autoWidth": true,
            scroller: true,
        }
    );
}
