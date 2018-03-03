module.exports = {
  'Title is Pissedtrest': function(browser) {
    // Browser is the browser that is being controlled
    browser
      .url('http://localhost:3000') // Navigate to the url
      .waitForElementVisible('body', 1000) // Wait until you can see the body element.
      .verify.title('Pissedtrest') // Verify that the title is 'Pissedtrest'
      .end() // This must be called to close the browser at the end
    }
}