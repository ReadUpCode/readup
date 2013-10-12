describe('End To End: Testing Form Controller', function(){
	beforeEach(function() {
		browser().navigateTo("/");
	});

  it('should have a default page with specific controllers', function(){
  	browser().navigateTo("#/");
  	expect(browser().location().path()).toBe("/");
  	expect(element('body').html()).toContain('ng-view');
  	expect(element('body').html()).toContain('div ng-controller="HomeController"');
    expect(element('body').html()).toContain('div ng-controller="FormController"');
    expect(element('body').html()).toContain('div ng-controller="LoginController"');
  });

  it('should have a HomeController with values', function(){browser().navigateTo("#/"); expect(browser().location().path()).toBe("/");
  	expect(element('div[ng-controller="HomeController"]').html()).toContain('homepage-title');
  });

  it('should have a FormController with values', function(){
  	browser().navigateTo("#/");
  	expect(browser().location().path()).toBe("/");
  	expect(element('div[ng-controller="FormController"]').html()).toContain('form');
	});  	

  it('should have a textbox to input a search', function() {
    browser().navigateTo("#/");
    input('searchValue').enter('javascript');
    expect(input('searchValue').val()).toBe("javascript");
  });

  it('should have a textbox to input a URL', function() {
    browser().navigateTo("#/");
    input('item.link').enter('http://www.angularjs.org');

    expect(input('item.link').val()).toBe('http://www.angularjs.org');
  });

  it('should return a searched item', function() {
    browser().navigateTo("#/");
    input('searchValue').enter('javascript');
    // need a way to submit a form by hitting enter in textbox
    expect(input('searchValue').val()).toBe("javascript");
  });

  it('should have a button to click to bring up tag modal', function() {
    browser().navigateTo("#/");

    expect(element('form[name="itemForm"]').html()).toContain('button');
  //   // can't click button into tag modal because of security error
  //   // Uncaught SecurityError: Blocked a frame with origin "http://localhost:9876" from 
  //   // accessing a frame with origin "null".  The frame requesting access has a protocol of "http", 
  //   // the frame being accessed has a protocol of "data". Protocols must match.
  //   // element('.btn').click();  
  });
});