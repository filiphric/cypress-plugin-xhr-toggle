import { addStyles } from '../../dist/addStyles'

const getTopEl = (selector: string) => {
  return cy.wrap(top.document.querySelector(selector), { log: false })
}

const setupReporterDOM = () => {
  // create a minimal #unified-reporter structure that the plugin expects
  if (!top.document.querySelector('#unified-reporter')) {
    const reporter = document.createElement('div')
    reporter.setAttribute('id', 'unified-reporter')
    reporter.classList.add('reporter')
    const header = document.createElement('header')
    reporter.appendChild(header)
    top.document.body.appendChild(reporter)
  }
}

const cleanupReporterDOM = () => {
  top.document.querySelector('#unified-reporter')?.remove()
}

describe('XHR Toggle Plugin', () => {

  beforeEach(() => {
    cleanupReporterDOM()
    setupReporterDOM()
    cy.visit('/server/index.html')
  })

  after(() => {
    cleanupReporterDOM()
  })

  it('injects style element into reporter', () => {
    addStyles()
    getTopEl('#xhrStyle').should('exist')
  })

  it('injects toggle controls into reporter header', () => {
    addStyles()
    getTopEl('#xhrControls').should('exist')
    getTopEl('#xhrToggle').should('exist')
    getTopEl('#xhrTooltip').should('exist')
    getTopEl('[for=xhrToggle]').should('exist')
  })

  it('hides XHR by default when hideXhr is not set', () => {
    addStyles()
    getTopEl('#xhrToggle').should('be.checked')
    getTopEl('#xhrTooltip').should('have.text', 'Turn on XHR visibility')
  })

  it('toggles XHR visibility when checkbox is clicked', () => {
    addStyles()

    // starts checked (hidden)
    getTopEl('#xhrToggle').should('be.checked')

    // uncheck - show XHR
    getTopEl('#xhrToggle').then($el => {
      ($el[0] as HTMLInputElement).click()
    })
    getTopEl('#xhrToggle').should('not.be.checked')
    getTopEl('#xhrTooltip').should('have.text', 'Turn off XHR visibility')

    // check again - hide XHR
    getTopEl('#xhrToggle').then($el => {
      ($el[0] as HTMLInputElement).click()
    })
    getTopEl('#xhrToggle').should('be.checked')
    getTopEl('#xhrTooltip').should('have.text', 'Turn on XHR visibility')
  })

  it('shows XHR when hideXhr env is set to false', () => {
    Cypress.env('hideXhr', false)
    addStyles()

    getTopEl('#xhrToggle').should('not.be.checked')
    getTopEl('#xhrTooltip').should('have.text', 'Turn off XHR visibility')

    // cleanup
    Cypress.env('hideXhr', undefined)
  })

  it('hides XHR when hideXhr env is set to true', () => {
    Cypress.env('hideXhr', true)
    addStyles()

    getTopEl('#xhrToggle').should('be.checked')
    getTopEl('#xhrTooltip').should('have.text', 'Turn on XHR visibility')

    // cleanup
    Cypress.env('hideXhr', undefined)
  })

  it('does not duplicate elements when addStyles is called multiple times', () => {
    addStyles()
    addStyles()
    addStyles()

    cy.wrap(top.document.querySelectorAll('#xhrStyle'), { log: false })
      .should('have.length', 1)
    cy.wrap(top.document.querySelectorAll('#xhrToggle'), { log: false })
      .should('have.length', 1)
  })

  it('uses Cypress.expose when available (Cypress 15+)', () => {
    const original = (Cypress as any).expose;
    (Cypress as any).expose = cy.stub().returns(true)

    addStyles()

    expect((Cypress as any).expose).to.have.been.calledWith('hideXhr')
    getTopEl('#xhrToggle').should('be.checked')

    // cleanup
    if (original) {
      (Cypress as any).expose = original
    } else {
      delete (Cypress as any).expose
    }
  })

  it('falls back to Cypress.env when Cypress.expose is not available', () => {
    const original = (Cypress as any).expose
    delete (Cypress as any).expose

    Cypress.env('hideXhr', false)
    addStyles()

    getTopEl('#xhrToggle').should('not.be.checked')

    // cleanup
    Cypress.env('hideXhr', undefined)
    if (original) {
      (Cypress as any).expose = original
    }
  })
})
