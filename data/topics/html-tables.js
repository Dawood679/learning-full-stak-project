export const htmlTablesContent = {
  slug: "html-tables",
  briefDescription: [
    "HTML tables let you display data in rows and columns using the <table> element. A table is built from three main parts: <thead> (table header), <tbody> (table body), and <tfoot> (table footer). Inside each section you place <tr> (table row) elements, and within rows you use <th> for header cells and <td> for data cells. Browsers automatically style <th> elements with bold text and center alignment.",
    "Tables support merging cells across multiple columns or rows using the colspan and rowspan attributes. Setting colspan='2' on a <td> makes it span two columns horizontally. Setting rowspan='3' makes it stretch down three rows vertically. This is essential for creating complex layouts like calendars, pricing tables, or comparison charts where some cells need to span multiple positions.",
    "For accessibility and proper semantics, always include a <caption> element to describe the table, use <th scope='col'> for column headers and <th scope='row'> for row headers, and associate data cells with headers. Modern HTML5 tables should not use the table element for page layout — CSS Grid and Flexbox are the right tools for that. Tables are for tabular data only.",
  ],
  keyConcepts: [
    "<table>: Root element that creates the table container",
    "<thead>, <tbody>, <tfoot>: Semantic grouping sections for header, body, and footer rows",
    "<tr>: Table Row — each horizontal row of cells",
    "<th>: Table Header cell — bold, centered by default; use scope='col' or scope='row'",
    "<td>: Table Data cell — regular data content",
    "colspan attribute: Makes a cell span multiple columns horizontally",
    "rowspan attribute: Makes a cell span multiple rows vertically",
    "<caption>: Provides a title/description for the table (accessibility best practice)",
    "border-collapse: collapse CSS property — removes double borders between cells",
    "Tables are for tabular data only — never use them for page layout",
  ],
  codeExample: {
    language: "html",
    title: "HTML Table with colspan, rowspan, thead, tbody, tfoot",
    code: `<table style="border-collapse: collapse; width: 100%;">
  <caption>Monthly Sales Report</caption>

  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
      <th scope="col">Total</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <th scope="row">Widget A</th>
      <td>120</td>
      <td>150</td>
      <td>270</td>
    </tr>
    <tr>
      <th scope="row">Widget B</th>
      <td colspan="2">Data combined across Q1 & Q2</td>
      <td>310</td>
    </tr>
    <tr>
      <th scope="row" rowspan="2">Bundle</th>
      <td>80</td>
      <td>90</td>
      <td>170</td>
    </tr>
    <tr>
      <!-- rowspan above spans into this row — no <th> needed -->
      <td>60</td>
      <td>70</td>
      <td>130</td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <th scope="row">Grand Total</th>
      <td>260</td>
      <td>310</td>
      <td>880</td>
    </tr>
  </tfoot>
</table>`,
  },
}
