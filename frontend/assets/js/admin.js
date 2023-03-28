$(document).ready(function () {
    // Make Axios GET call
    axios.get('http://localhost:4001/doctorGet')
        .then(response => {
            const data = response.data;

            console.log(data);
            // Initialize DataTable
            const dataTable = $('#data-table').DataTable({
                data: data,
                columns: [
                    { data: 'name' },
                    { data: 'email' },
                    { data: 'region' },
                    { data: 'hq' },
                    { data: 'fsoname' },
                    { data: 'doctorNumber' }
                ]
            });
        })
        .catch(error => {
            console.error(error);
        });
})