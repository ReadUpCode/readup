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

  it('should have a HomeController with values', function(){
  	browser().navigateTo("#/");
  	expect(browser().location().path()).toBe("/");
  	expect(element('div[ng-controller="HomeController"]').html()).toContain('homepage-title');
  });

  it('should have a FormController with values', function(){
  	browser().navigateTo("#/");
  	expect(browser().location().path()).toBe("/");
  	expect(element('div[ng-controller="FormController"]').html()).toContain('form');
	});  	

  it('should allow you to enter a value in the post textbox', function(){
  	browser().navigateTo("#/");
  	expect(browser().location().path()).toBe("/");
  	
  });  
});