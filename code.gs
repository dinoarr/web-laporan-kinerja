function doPost(e) {
   var response = {};
   var postData = e.parameter;

   try {
      // Ganti dengan ID spreadsheet Anda
      var spreadsheetId = "11KTpv50bgIehaUw_H2P6JN76J1_eizzwJwIzZZsfeN8";
      var sheetName = "Sheet1"; // Ganti dengan nama sheet Anda

      var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      var sheet = spreadsheet.getSheetByName(sheetName);

      var data = postData.image_activity;
      var imageUrl = "data:image/png;base64," + data;
      //var imageBlob = Utilities.newBlob(Utilities.base64Decode(data), 'image/*', 'sample');
      var lastRow = sheet.getLastRow() + 1;

      // Menambahkan data ke dalam spreadsheet
      sheet.appendRow([
         postData.nomor_laporan,
         postData.nama_kegiatan,
         postData.jenis_kegiatan,
         postData.datePicker,
         postData.uraian_kegiatan,
         postData.target_capaian,
      ]);

      //sheet.insertImage(imageBlob, 7, lastRow);
      const image = SpreadsheetApp.newCellImage()
         .setSourceUrl(imageUrl)
         .build();
      const range = SpreadsheetApp.getActiveSheet().getRange("G" + lastRow);
      range.setValue(image);

      response.status = "success";
      response.message = "Data berhasil disimpan";
   } catch (error) {
      response.status = "error";
      response.message = "Gagal menyimpan data: " + error.message;
   }

   // Redirect kembali ke halaman web sukses
   var successUrl = "https://web-laporan-kinerja.vercel.app/";
   return HtmlService.createHtmlOutput(
      '<script>window.location.replace("' + successUrl + '");</script>'
   );
}
