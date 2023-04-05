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
    var loaderEle = document.querySelector(".lds-dual-ring");
    loaderEle.classList.add("active");
    document.querySelector(".form-section").classList.add("dsp-none");
    document.querySelector(".header").classList.add("dsp-none");
    // Fetch data from the API
    fetch("http://localhost:80/doctors")
      .then((response) => response.json())
      .then((data) => {
        // Initialize DataTable
        const dataTable = $("#data-table").DataTable({
          data: data.doctors,
          columns: [
            { data: "name" },
            { data: "region" },
            { data: "hq" },
            { data: "fsoname" },
            { data: "doctorNumber" },
            { data: "reference" },
            { data: "image" },
          ],
          dom: "Bfrtip",
          buttons: ["csv", "excel", "pdf", "print"],
          bDestroy: true,
        });
        var loaderEle = document.querySelector(".lds-dual-ring");
        loaderEle.classList.remove("active");
        document.querySelector(".form-section").classList.remove("dsp-none");
        document.querySelector(".header").classList.remove("dsp-none");
      })
      .catch((error) => {
        var loaderEle = document.querySelector(".lds-dual-ring");
        loaderEle.classList.remove("active");
        document.querySelector(".form-section").classList.remove("dsp-none");
        document.querySelector(".header").classList.remove("dsp-none");
        if (error.response.status === 400) {
          alert("BAD REQUEST");
        } else {
          alert("Server Error");
        }
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
                <th>Region</th>
                <th>HQ</th>
                <th>FSOName</th>
                <th>Doctor Number</th>
                <th>Reference</th>
                <th>IMAGE</th>
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
