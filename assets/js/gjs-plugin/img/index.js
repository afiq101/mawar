const column1 = ` <div class="flex flex-col justify-between items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"/></svg>
                    <span>1 Column</span>
                  </div>`;

const column2 = ` <div class="flex flex-col justify-between items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm9-1v18"/></svg>
                    <span>2 Columns</span>
                  </div>`;

const column3 = ` <div class="flex flex-col justify-between items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm6-1v18m6-18v18"/></svg>
                    <span>3 Columns</span>
                  </div>`;

const column3per7 = ` <div class="flex flex-col justify-between items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M2 20h5V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM10 20h12V4H10v16Zm-1 0V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1Z"></path>
                        </svg>
                        <span>2 Columns 3/7 </span>
                      </div>`;

const text = `  <div class="flex flex-col justify-between items-center gap-2"> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z"></path>
                  </svg>
                  <span>Text</span>
                </div>`;

const rsAlert = ` <div class="flex flex-col justify-between items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 256 256"><path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Zm-8-80V80a8 8 0 0 1 16 0v56a8 8 0 0 1-16 0Zm20 36a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z"/></svg>
                    <span>Alert</span>
                  </div>`;

const rsBadge = ` <div class="flex flex-col justify-between items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linejoin="round"><path stroke-linecap="round" stroke-width="1" d="M12.586 4.586A2 2 0 0 0 11.172 4H4v7.172a2 2 0 0 0 .586 1.414l7 7a2 2 0 0 0 2.828 0l5.172-5.172a2 2 0 0 0 0-2.828l-7-7Z"/><path stroke-width="3" d="M9 9h.01v.01H9z"/></g></svg>
                    <span>Badge</span>
                  </div>`;

const rsButton = `<div class="flex flex-col justify-between items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 32 32"><path fill="currentColor" d="M9 15h14v2H9z"/>
                      <path fill="currentColor" d="M28 22H4a2.002 2.002 0 0 1-2-2v-8a2.002 2.002 0 0 1 2-2h24a2.002 2.002 0 0 1 2 2v8a2.002 2.002 0 0 1-2 2ZM4 12v8h24v-8Z"/>
                     </svg>
                    <span>Button</span>
                  </div>`;

export default function (type) {
  switch (type) {
    case "1 Column":
      return column1;
    case "2 Columns":
      return column2;
    case "3 Columns":
      return column3;
    case "2 Columns 3/7":
      return column3per7;
    case "Text":
      return text;
    case "rs-alert":
      return rsAlert;
    case "rs-badge":
      return rsBadge;
    case "rs-button":
      return rsButton;
    default:
      return "";
  }
}
