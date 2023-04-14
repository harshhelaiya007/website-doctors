import React, { useEffect } from "react";
import $, { data } from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-responsive";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "./Admin.css";
import axios from 'axios';


pdfMake.vfs = pdfFonts.pdfMake.vfs;
function Admin() {

  useEffect(() => {
    var loaderEle = document.querySelector(".lds-dual-ring");
    loaderEle.classList.add("active");
    document.querySelector(".form-section").classList.add("dsp-none");
    document.querySelector(".header").classList.add("dsp-none");
    // Fetch data from the API
    fetch("/doctors")
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
            { data: "reference" },
            {
              data: (row) => {
                // console.log(row);
                return `<a href="/image/${row["image"]}" download ="${row["name"]}">${row["image"]}</a>`;
              },
            },
          ],
          dom: "Bfrtip",
          buttons: ["csv", "excel", "pdf", "print"],
          bDestroy: true,
          responsive: true,
        });

        var rowData;

        $("#data-table tbody").on("click", "tr", function (e) {
          let curEle = e.target.parentNode;
          rowData = dataTable.row($(this)).data();
          localStorage.setItem("selected", JSON.stringify(rowData));
          dataTable.$("tr.selected").removeClass("selected");
          // dataTable.$("tr.selected").classList.remove("selected");
          if (curEle.classList.contains("selected")) {
            curEle.classList.remove("selected");
          } else {
            // dataTable.$("tr.selected").classList.remove("selected");
            curEle.classList.add("selected");
          }
          curEle.classList.add("selected");
        });

        $("#button").on("click", function () {
          var dataGet = localStorage.getItem("selected");
          if (!dataGet == "") {
            dataGet = JSON.parse(localStorage.getItem("selected"));
          }
          axios
            .delete(`/doctors/${dataGet.name}`)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
              alert('Retry Deleting Data');
            });
            window.location.reload();
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
        if (error.status === 400) {
          alert("BAD REQUEST");
        } else {
          alert("Server Error");
        }
      });
  }, []);

  return (
    <section className="form-section">
      <div className="container">
        <div className="card-section admin-panel">
          <h2 className="heading-title">Admin Panel</h2>
          <button id="button" className="deleteBtn">
            Delete selected row
          </button>
          <table id="data-table" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Region</th>
                <th>HQ</th>
                <th>FSOName</th>
                <th>Reference</th>
                <th>Image</th>
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
