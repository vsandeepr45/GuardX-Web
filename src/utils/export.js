import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ===============================
CSV EXPORT
=============================== */

export const exportCSV = (data, filename) => {

    const worksheet = XLSX.utils.json_to_sheet(data);

    const csv = XLSX.utils.sheet_to_csv(worksheet);

    const blob = new Blob([csv], {

        type: "text/csv;charset=utf-8;"

    });

    saveAs(blob, `${filename}.csv`);

};

/* ===============================
EXCEL EXPORT
=============================== */

export const exportExcel = (data, filename) => {

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        "Data"

    );

    XLSX.writeFile(

        workbook,

        `${filename}.xlsx`

    );

};

/* ===============================
PDF EXPORT
=============================== */

export const exportPDF = (data, filename) => {

    const doc = new jsPDF();

    if (!data.length) {

        doc.text("No Records Found", 20, 20);

        doc.save(`${filename}.pdf`);

        return;

    }

    autoTable(doc, {

        head: [

            Object.keys(data[0])

        ],

        body: data.map(Object.values)

    });

    doc.save(`${filename}.pdf`);

};

/* ===============================
PRINT
=============================== */

export const printTable = (data) => {

    const html = `

        <html>

        <head>

            <title>Print</title>

        </head>

        <body>

            <table border="1" cellspacing="0" cellpadding="8">

                <thead>

                    <tr>

                        ${Object.keys(data[0])

                            .map(h => `<th>${h}</th>`)

                            .join("")}

                    </tr>

                </thead>

                <tbody>

                    ${data.map(row =>

                        `<tr>

                        ${Object.values(row)

                            .map(v => `<td>${v ?? ""}</td>`)

                            .join("")}

                        </tr>`

                    ).join("")}

                </tbody>

            </table>

        </body>

        </html>

    `;

    const w = window.open("");

    w.document.write(html);

    w.document.close();

    w.print();

};