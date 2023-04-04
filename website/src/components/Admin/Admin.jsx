import React, { useEffect } from "react";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "./Admin.css";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
function Admin() {
  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:3000/doctors")
      .then((response) => response.json())
      .then((data) => {
        // Initialize DataTable
        const dataTable = $("#data-table").DataTable({
          data: data,
          columns: [
            { data: "name" },
            { data: "email" },
            { data: "region" },
            { data: "hq" },
            { data: "fsoname" },
            { data: "doctorNumber" },
            { data: "reference"}
          ],
          dom: "Bfrtip",
          buttons: ["copy", "csv", "excel", "pdf", "print"],
          bDestroy: true,
        });
      });
  }, []);

  return (
    <section className="form-section">
      <div className="container">
        <div className="card-section">
          <h2 className="heading-title">Admin Panel</h2>
          <table id="data-table" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Region</th>
                <th>HQ</th>
                <th>FSOName</th>
                <th>Doctor Number</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Admin;
