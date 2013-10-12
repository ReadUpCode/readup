describe("End To End: Testing Routes", function() {
  beforeEach(function(){
    browser().navigateTo("/");
  });

  it("should jump to a requested tag", function() {
    browser().navigateTo("#/");
    expect(browser().location().path()).toBe("/");
  });

  it("should jump to a requested tag", function() {
    browser().navigateTo("#/news");
    expect(browser().location().path()).toBe("/news");
  });

  it("should jump to a requested tag", function() {
    browser().navigateTo("#/ipad");
    expect(browser().location().path()).toBe("/ipad");
  });

  it("should jump to a requested tag", function() {
    browser().navigateTo("#/qt");
    expect(browser().location().path()).toBe("/qt");
  });

  it("should jump to a requested tag", function() {
    browser().navigateTo("#/hello");
    expect(browser().location().path()).toBe("/hello");
  });

  it("should jump to a requested tag", function() {
    browser().navigateTo("#/angularjs");
    expect(browser().location().path()).toBe("/angularjs");
  });

  it("should jump to a requested tag", function() {
    browser().navigateTo("#/browser");
    expect(browser().location().path()).not().toBe("/browsers");
    expect(browser().location().path()).toBe("/browser");
  });

  it("should handle a tag that isn't in database", function() {
    browser().navigateTo("#/NotTagInDatabase");
    expect(browser().location().path()).toBe("/NotTagInDatabase");
  });

  // Doesn't work.  navigation bad?
  // it("should return to homepage when navigating to authorization page", function() {
  // 	browser().navigateTo("auth/github");
  // 	pause();
	//  expect(browser().location().url()).toBe("/");
  // });
});