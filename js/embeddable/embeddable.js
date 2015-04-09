// TODO: Refactor into vanilla JS with CS

// inject iframe and fire event
var loadResult = function(){
    document.getElements('#result iframe').each(function(el){
        el.destroy();
    });
    new Element('iframe', {
        'src': show_src,
    'sandbox': 'allow-forms allow-popups allow-scripts allow-same-origin',
        'styles': {
            'height': height
        }
    }).inject(document.id('result'));
};

this.switchTab = function(action, index, trigger){
    var actionParent = this.actions.getParent();
    this.sections.removeClass('active');
    this.sections[index].addClass('active');
    if (actionParent){
        actionParent.removeClass('active');
        actionParent[index].addClass('active');
    }
    if (trigger.get('data-trigger-type') === 'result'){
        loadResult();
    }
}

window.addEvents({
    load: function(){
        var window_height = force_height ? force_height : window.getSize().y;
        height = window_height;
        var tabs = document.id('tabs');
        var actions = document.id('actions');
        tabs.setStyle('height', height - 2); // -2px = combined border height

        this.sections   = tabs.getElements('.tCont');
        this.actions    = actions.getElements('a, select');

        this.actions.each(function(action, index){
            var self = this;
            action.addEvents({
                click: function(event){
                    if (event){
                        event.stop();
                    }
                    self.switchTab(action, index, this);
                },
                change: function(event){
                    self.switchTab(action, this.selectedIndex, self.actions[this.selectedIndex]);
                }
            });
        }, this);

        if (!this.sections[0].hasClass('result')){
            this.actions[0].fireEvent('click');
        }
    }
});
