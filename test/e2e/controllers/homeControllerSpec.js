describe('End to End: Testing Home Controller', function(){
	beforeEach(function() {
		browser().navigateTo("/");
	});

	it('should be able to navigate to a topic and have items returned', function(){
		browser().navigateTo("#/angularjs");
		expect(element('body').html()).toContain('h1');
		expect(element('body').html()).toContain('div class="votes"');
	});
});