/**
 * Google Apps Script - 藥師決策卡問卷 → Google Sheets
 *
 * 使用方式：
 * 1. 開啟 Google Sheets（新建或使用既有的「藥師決策卡問卷」試算表）
 * 2. 點選「擴充功能」→「Apps Script」
 * 3. 將此程式碼貼入 Code.gs
 * 4. 點選「部署」→「新增部署作業」
 *    - 類型選擇「網頁應用程式」
 *    - 執行身分：「我」
 *    - 存取權限：「所有人」
 * 5. 複製部署後的 Web App URL
 * 6. 將 URL 貼到 index.html 中的 GOOGLE_SHEET_URL 變數
 */

// 處理 POST 請求
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // 如果是第一次（沒有標題列），先加入標題
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Q1. 你目前的身分最接近下列哪一項？（單選）',
        'Q2. 你的執業年資大約是？（單選）',
        'Q3. 以下哪些情境，最常讓你在第一線感到卡住？（選 3 項）',
        'Q4. 在這些情境中，你現在通常怎麼處理？（單選）',
        'Q5. 以下哪些健康主題，是你在第一線實際最常遇到、也最容易卡住的？（選 3 項）',
        'Q6. 當遇到需要查詢時，您主要會採用哪種方式？（單選）',
        'Q7. 如果有一套「決策卡」，你最希望它幫你做到什麼？（選 2 項）',
        'Q8. 你最不能接受的，是以下哪一種狀況？（單選）',
        'Q9. 你過去在查詢過程或使用任何決策工具時，您遇過哪些困擾或期望改進的地方？（歡迎自由填寫）',
        'Q10. 如果未來開放「限量早鳥測試訂閱」，以下哪一種「藥師決策卡方案」最接近你會考慮的選項？（單選）',
        'Q11. 是否願意留下email聯絡方式，以便收到後續通知？',
        'Q12. 是否願意收到藥師決策卡的測試／更新通知？',
        'Q13. 如果你願意，請用一句話告訴我：「你最希望『藥師決策卡』幫你解決的第一線困擾是什麼？」',
        'Submitted At',
        'Token'
      ]);
    }

    // 寫入資料列
    sheet.appendRow([
      data.q1  || '',
      data.q2  || '',
      data.q3  || '',
      data.q4  || '',
      data.q5  || '',
      data.q6  || '',
      data.q7  || '',
      data.q8  || '',
      data.q9  || '',
      data.q10 || '',
      data.q11 || '',
      data.q12 || '',
      data.q13 || '',
      data.submittedAt || '',
      data.token || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 處理 GET 請求（可選，用於測試）
function doGet(e) {
  return ContentService
    .createTextOutput('藥師決策卡問卷 API 運作中！')
    .setMimeType(ContentService.MimeType.TEXT);
}
