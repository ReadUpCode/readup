describe("End To End: Testing Routes", function() {
	beforeEach(function(){
	  browser().navigateTo("/");	
	});

	it("should jump to ", function() {
		browser().navigateTo("#/");
		expect(browser().location().path()).toBe("/");
	});
	it("should jump to ", function() {
		browser().navigateTo("#/news");
		expect(browser().location().path()).toBe("/news");
	});
	it("should jump to ", function() {
		browser().navigateTo("#/ipad");
		expect(browser().location().path()).toBe("/ipad");
	});
	it("should jump to ", function() {
		browser().navigateTo("#/qt");
		expect(browser().location().path()).toBe("/qt");
	});
	it("should jump to ", function() {
		browser().navigateTo("#/hello");
		expect(browser().location().path()).toBe("/hello");
	});
	it("should jump to ", function() {
		browser().navigateTo("#/browser");
		expect(browser().location().path()).not().toBe("/browsers");
		expect(browser().location().path()).toBe("/browser");
	});
});