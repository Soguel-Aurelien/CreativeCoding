describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://www.berufsbildung-vs.ch/')
    cy.get('#navigation span:nth-child(2)').click();
    cy.get('#navigation span.responsive_navigation_toggle span:nth-child(1)').click();
    cy.get('#navigation span:nth-child(2)').should('be.visible');
    cy.get('#navigation span:nth-child(2)').click();
    cy.get('#rwdnav-21 a[href="https://www.berufsbildung-vs.ch/berufslehre"]').click();
    cy.get('#rwdnav-21 a[href="https://www.berufsbildung-vs.ch/berufslehre"] span').click();
    cy.get('[name="search_text"]').click();
    cy.get('[name="search_text"]').type('Informatik');
    cy.get('#siteframe [name="submitter"]').click();
    cy.get('#listing_entry_id_311 a.listing_entry_link').click();
    
    cy.get('#select2-select_job-container').click({force:true});
    cy.get("body").type("{esc}");
    
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    cy.get('#lesson_timetable button.fc-prev-button').click();
    
  })
});

it('formular', function() {
  cy.visit("https://www.youtube.com/");
});