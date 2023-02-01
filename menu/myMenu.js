// lines 2-11 copies the constructor from Scene_Menu and repurposes it to myMenu,  
function myMenu() {
    this.initialize.apply(this, arguments);
}

myMenu.prototype = Object.create(Scene_MenuBase.prototype);
myMenu.prototype.constructor = myMenu;

myMenu.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

//make your menu scene contain the window
myMenu.prototype.create = function(){
    Scene_MenuBase.prototype.create.call(this);
    this._customWindow = new myWindow(0,0,300,300);
    this.addWindow(this._customWindow);
}

myMenu.prototype.update = function(){
    if(!this.drawnWindows){
        this._customWindow.drawAllItems();
        this.drawnWindows = true;
    }
    //let me close the menu
    if(Input.isTriggered("cancel")) SceneManager.pop();
}

function myWindow() {
    this.initialize.apply(this, arguments);
}

myWindow.prototype = Object.create(Window_Base.prototype);
myWindow.prototype.constructor = myWindow;

myWindow.prototype.initialize = function(x,y,width, height){
    Window_Base.prototype.initialize.call(this, x, y, width, height)
    this.drawAllItems();
}

myWindow.prototype.drawAllItems = function(){
    this.drawText("Test",0,100, this.width - this.padding*2,"center");
    this.drawFace("HeroMenu",0,95,0,125,100);
};

//assing the letter p to call myMenu()
Input.keyMapper['80'] = 'myMenu';

//make it so I can call p in the map
aliasSceneMapUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
    aliasSceneMapUpdate.call(this);
    if(Input.isTriggered("myMenu")) SceneManager.push(myMenu);
}