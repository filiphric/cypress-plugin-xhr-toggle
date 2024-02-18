export const addStyles = () => {
    const hasStyles = top === null || top === void 0 ? void 0 : top.document.querySelector('#xhrStyle');
    const hasToggleButton = top === null || top === void 0 ? void 0 : top.document.querySelector('#xhrToggle');
    const defaultStyles = `
  .reporter header {
    overflow: visible;
    z-index: 2;
  }
  #xhrControls {
    position: relative;
    display: inline-block;
  }
  #xhrToggle {
    display: none;
  }
  #xhrControls label {
    background-color: transparent;
    padding-top: 5px;
  }
  #xhrControls #xhrTooltip {
    visibility: hidden;
    width: 134px;
    background-color: #f3f4fa;
    color: #1b1e2e;
    text-align: center;
    padding: 5px;
    border-radius: 3px;
    position: absolute;
    z-index: 1;
    top: 27px;
    right: 0px;
    height: 28px;
  }
  #xhrControls:hover #xhrTooltip {
    visibility: visible;
  }
  #xhrTooltip::after {
    content: " ";
    position: absolute;
    bottom: 100%;  /* At the top of the tooltip */
    left: 89%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #f3f4fa transparent;
  }
  .reporter:has(#xhrToggle:checked) .command.command-name-request:has(.command-is-event) {
    display:none
  }
  `;
    const turnOffXhrIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"><path fill="#afb3c7" d="M12 6.5c2.76 0 5 2.24 5 5c0 .51-.1 1-.24 1.46l3.06 3.06c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l2.17 2.17c.47-.14.96-.24 1.47-.24zM2.71 3.16a.996.996 0 0 0 0 1.41l1.97 1.97A11.892 11.892 0 0 0 1 11.5C2.73 15.89 7 19 12 19c1.52 0 2.97-.3 4.31-.82l2.72 2.72a.996.996 0 1 0 1.41-1.41L4.13 3.16c-.39-.39-1.03-.39-1.42 0zM12 16.5c-2.76 0-5-2.24-5-5c0-.77.18-1.5.49-2.14l1.57 1.57c-.03.18-.06.37-.06.57c0 1.66 1.34 3 3 3c.2 0 .38-.03.57-.07L14.14 16c-.65.32-1.37.5-2.14.5zm2.97-5.33a2.97 2.97 0 0 0-2.64-2.64l2.64 2.64z"/></svg>`;
    const turnOnXhrIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"><path fill="#afb3c7" d="M12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z"/></svg>`;
    const turnOffXhrDescription = 'Turn off XHR visibility';
    const turnOnXhrDescription = 'Turn on XHR visibility';
    // append styles
    if (!hasStyles) {
        const reporterEl = top === null || top === void 0 ? void 0 : top.document.querySelector('#unified-reporter');
        const reporterStyleEl = document.createElement('style');
        reporterStyleEl.setAttribute('id', 'xhrStyle');
        reporterStyleEl.innerHTML = defaultStyles;
        reporterEl === null || reporterEl === void 0 ? void 0 : reporterEl.appendChild(reporterStyleEl);
    }
    if (!hasToggleButton) {
        const header = top === null || top === void 0 ? void 0 : top.document.querySelector('#unified-reporter header');
        const headerToggleDiv = document.createElement('div');
        const headerToggleSpan = document.createElement('span');
        const headerToggleTooltip = document.createElement('span');
        const headerToggleButton = document.createElement('button');
        const headerToggleInput = document.createElement('input');
        const headerToggleLabel = document.createElement('label');
        headerToggleInput.setAttribute('type', 'checkbox');
        headerToggleInput.setAttribute('id', 'xhrToggle');
        headerToggleLabel.setAttribute('for', 'xhrToggle');
        headerToggleLabel.innerHTML = turnOffXhrIcon;
        headerToggleDiv.setAttribute('class', 'controls');
        headerToggleDiv.setAttribute('id', 'xhrControls');
        headerToggleTooltip.setAttribute('id', 'xhrTooltip');
        headerToggleTooltip.innerText = turnOffXhrDescription;
        headerToggleButton.setAttribute('aria-label', turnOffXhrDescription);
        header === null || header === void 0 ? void 0 : header.appendChild(headerToggleDiv);
        headerToggleDiv === null || headerToggleDiv === void 0 ? void 0 : headerToggleDiv.appendChild(headerToggleSpan);
        headerToggleDiv === null || headerToggleDiv === void 0 ? void 0 : headerToggleDiv.appendChild(headerToggleTooltip);
        headerToggleSpan === null || headerToggleSpan === void 0 ? void 0 : headerToggleSpan.appendChild(headerToggleButton);
        headerToggleButton === null || headerToggleButton === void 0 ? void 0 : headerToggleButton.appendChild(headerToggleInput);
        headerToggleButton === null || headerToggleButton === void 0 ? void 0 : headerToggleButton.appendChild(headerToggleLabel);
    }
    const xhrToggleElement = top.document.querySelector('#xhrToggle');
    const xhrToggleLabelElement = top.document.querySelector('[for=xhrToggle]');
    const xhrTooltipElement = top.document.querySelector('#xhrTooltip');
    if (xhrToggleElement && xhrToggleLabelElement && xhrTooltipElement) {
        if (Cypress.env('hideXhr') === true || Cypress.env('hideXhr') === undefined) {
            xhrToggleElement.checked = true;
            xhrToggleLabelElement.innerHTML = turnOnXhrIcon;
            xhrTooltipElement.innerHTML = turnOnXhrDescription;
        }
        else {
            xhrToggleElement.checked = false;
            xhrToggleLabelElement.innerHTML = turnOffXhrIcon;
            xhrTooltipElement.innerHTML = turnOffXhrDescription;
        }
    }
    xhrToggleElement === null || xhrToggleElement === void 0 ? void 0 : xhrToggleElement.addEventListener('change', (e) => {
        // @ts-ignore errors about HTMLElement
        if (e.target.checked) {
            // when checked, xhr elements are hidden
            xhrToggleLabelElement.innerHTML = turnOnXhrIcon;
            xhrTooltipElement.innerHTML = turnOnXhrDescription;
        }
        else {
            // when unchecked, xhr elements are visible
            xhrToggleLabelElement.innerHTML = turnOffXhrIcon;
            xhrTooltipElement.innerHTML = turnOffXhrDescription;
        }
    });
};
